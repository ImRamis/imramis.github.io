---
title: "Event-Driven at Scale: Idempotent Apache Kafka Consumers in Spring Boot"
date: "2025-12-30"
track: "engineering"
readingTime: "9 min read"
excerpt: "Kafka gives you at-least-once delivery, which means your consumers will eventually see the same event twice. Here is how I build genuinely idempotent Spring Boot consumers — the transactional outbox, dedup keys, retry and DLQ topics, and a TestContainers harness that proves it under failure."
tags:
  - "kafka"
  - "spring-boot"
  - "idempotency"
  - "event-driven"
  - "testcontainers"
  - "java"
---

Kafka does not deliver every message exactly once, and any system that assumes it does is one rebalance away from a duplicate charge. The honest default is at-least-once: a consumer processes a record, crashes before its offset commit lands, and on restart the same record arrives again. On the Java services I ran for a payments platform — Spring Boot over Kafka, north of 50,000 financial transactions a day — "exactly-once" was never a delivery guarantee I could buy. It was a property I had to engineer into the consumer. This post is how I do that: the transactional outbox on the producer side, dedup keys and idempotent writes on the consumer side, retry and dead-letter topics for poison messages, and a TestContainers harness that proves the whole thing survives a mid-flight crash.

## Why "exactly-once" is a lie you tell yourself

Kafka's `read_committed` isolation and transactional producers give you exactly-once *within* the Kafka boundary — between topics, inside Kafka Streams. The moment your consumer talks to Postgres, calls a payment gateway, or pushes to another system, you are back to at-least-once for those side effects. The offset commit and the database write are two separate commits, and any two-commit operation has a window where one succeeds and the other does not.

So I stop chasing exactly-once *delivery* and engineer exactly-once *effect*. The rule: processing the same event N times must leave the system in the same state as processing it once. That is idempotency, and it is the only property that actually holds under the failures Kafka guarantees you will hit.

## The transactional outbox: stop dual-writing

The first duplicate source is on the producer, not the consumer. A service that updates its database *and* publishes to Kafka in the same method is dual-writing across two systems with no shared transaction. The DB commit succeeds, the broker call times out, the service retries — and now you have either a lost event or a duplicate.

The outbox pattern collapses that into a single local transaction. The service writes the business change and an `outbox` row atomically; a separate relay (Debezium CDC, or a polling publisher) ships outbox rows to Kafka afterwards.

```java
@Transactional
public void placeOrder(Order order) {
    orderRepository.save(order);
    outboxRepository.save(new OutboxEvent(
        UUID.randomUUID(),          // event_id — the dedup key downstream
        "order.placed",
        order.getId(),
        toJson(order)
    ));
    // No KafkaTemplate.send() here. The relay publishes from the outbox.
}
```

Because both writes share one JPA transaction, they commit or roll back together. The relay may still publish a row twice (it crashes after sending, before marking the row done) — but that is fine, because every event now carries a stable `event_id` the consumer can deduplicate on. The outbox converts an unsolvable distributed-transaction problem into a solvable idempotency problem.

## Dedup keys and idempotent writes on the consumer

Every event must carry a key that is identical across redeliveries and unique across distinct events. The outbox `event_id` is perfect. The consumer records processed ids in a dedup table and makes the side effect conditional on the insert.

```java
@KafkaListener(topics = "order.placed", groupId = "billing")
public void onOrderPlaced(ConsumerRecord<String, OrderEvent> rec) {
    UUID eventId = UUID.fromString(rec.value().eventId());
    txTemplate.executeWithoutResult(status -> {
        int inserted = dedupRepository.insertIfAbsent(eventId);  // INSERT ... ON CONFLICT DO NOTHING
        if (inserted == 0) {
            log.info("Duplicate {} ignored", eventId);
            return;                                              // already processed
        }
        billingService.charge(rec.value());                     // same tx as the dedup insert
    });
}
```

Two details carry the whole pattern. First, the dedup insert and the business write are in **one database transaction**, so a crash between them rolls both back and redelivery cleanly retries. Second, `insertIfAbsent` leans on a `UNIQUE` constraint and `ON CONFLICT DO NOTHING`, so concurrent consumers in the same group racing on the same id resolve at the database, not in application logic. The unique constraint is the actual guarantee; everything else is ergonomics.

Where the business write is naturally idempotent — an upsert keyed by a natural id, a `SET status = 'PAID' WHERE status = 'PENDING'` — I prefer that to a dedup table, because it needs no extra state. The dedup table is for side effects that cannot be expressed as an idempotent write, like calling an external API.

For consumer config, I commit offsets manually and only after the transaction succeeds:

```yaml
spring:
  kafka:
    consumer:
      enable-auto-commit: false
      isolation-level: read_committed
      max-poll-records: 200
    listener:
      ack-mode: record        # ack after each record's handler returns cleanly
```

`read_committed` keeps the consumer from ever seeing aborted transactional writes, and manual ack means an exception leaves the offset uncommitted so the record is redelivered rather than silently skipped.

## Retry and DLQ topics for poison messages

Not every failure is transient. A malformed payload or a permanently rejected charge will fail forever, and an in-memory retry loop on that record blocks the partition for every well-formed message behind it. The fix is non-blocking retries on dedicated topics, with a dead-letter topic as the terminus. Spring Kafka ships this:

```java
@RetryableTopic(
    attempts = "4",
    backoff = @Backoff(delay = 1000, multiplier = 2.0),   // 1s, 2s, 4s
    dltStrategy = DltStrategy.FAIL_ON_ERROR,
    autoCreateTopics = "true",
    exclude = { DeserializationException.class })           // poison payloads go straight to DLT
)
@KafkaListener(topics = "order.placed", groupId = "billing")
public void onOrderPlaced(ConsumerRecord<String, OrderEvent> rec) { ... }

@DltHandler
public void onDlt(ConsumerRecord<String, byte[]> rec,
                  @Header(KafkaHeaders.EXCEPTION_MESSAGE) String error) {
    deadLetterStore.save(rec, error);   // alert + manual replay, never drop silently
}
```

A failed record moves to `order.placed-retry-0`, then `-retry-1`, with exponential backoff so a flaky downstream gets breathing room, and only on exhaustion lands in `order.placed-dlt`. Because the consumer is idempotent, replaying from the DLT after a fix is safe — the dedup key absorbs anything that already partially succeeded. That safety is *why* the idempotency work pays for itself.

## Proving it with TestContainers

None of this is real until I have watched a consumer survive a crash. Unit tests with mocked brokers cannot reproduce rebalances or redelivery, so I run a real Kafka and a real Postgres in TestContainers and assert on *effect*, not on logs.

```java
@Testcontainers
class IdempotencyIT {
    @Container static KafkaContainer kafka =
        new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka:7.6.0"));
    @Container static PostgreSQLContainer<?> pg =
        new PostgreSQLContainer<>("postgres:16");

    @Test
    void duplicateDeliveryChargesOnce() {
        var event = orderEvent(UUID.randomUUID());
        producer.send("order.placed", event);
        producer.send("order.placed", event);   // same event_id, delivered twice

        await().atMost(Duration.ofSeconds(10))
               .untilAsserted(() ->
                   assertThat(charges.countByOrder(event.orderId())).isEqualTo(1));
    }
}
```

I run three scenarios that mirror production failures: the same `event_id` delivered twice must produce exactly one charge; killing the consumer container mid-transaction and restarting it must still produce exactly one charge; and a deliberately poisoned payload must land in the DLT without blocking the records behind it. I pair these with PACT contract tests so producer and consumer cannot drift on the event schema — a renamed `event_id` field would silently break deduplication, and that is precisely the bug TestContainers and contract testing exist to catch before it reaches production.

## Takeaways

- Kafka gives you at-least-once; design for **exactly-once effect**, not exactly-once delivery.
- Kill dual writes with a **transactional outbox** so the DB change and the event commit atomically, and let every event carry a stable `event_id`.
- Deduplicate on the consumer with a **unique constraint plus `ON CONFLICT DO NOTHING`** in the *same* transaction as the side effect; prefer naturally idempotent upserts where you can.
- Commit offsets manually after the transaction, under `read_committed`, so failures redeliver rather than skip.
- Use **non-blocking retry topics and a DLT** so poison messages never stall a partition, and rely on idempotency to make DLT replay safe.
- Prove it with **TestContainers**: assert one charge after duplicate delivery and a mid-flight crash, and lock the event schema with contract tests.
