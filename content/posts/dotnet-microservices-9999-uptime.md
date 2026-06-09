---
title: "Engineering a .NET Core Microservices Estate for 99.99% Uptime"
date: "2025-08-21"
track: "engineering"
readingTime: "9 min read"
excerpt: "How I took a C#/.NET Core microservices estate to 99.99% availability using Polly resilience policies, AKS rolling updates with Helm, Serilog plus OpenTelemetry tracing, and k6 latency budgets that fail builds before customers feel the pain."
tags:
  - "dotnet"
  - "kubernetes"
  - "observability"
  - "resilience"
  - "sre"
---

99.99% uptime sounds like a marketing number until you do the arithmetic: it leaves you roughly 52 minutes of downtime per year, or about 4 minutes 23 seconds per month. You do not hit that with heroics during incidents. You hit it by making the boring path the default path, so that a dependency failing, a pod restarting, or a deploy rolling out never becomes a customer-visible event.

This is how I designed and operated a C#/.NET Core microservices estate handling 50k+ daily requests against that target. The four pillars were the same ones I reach for every time: resilience policies with Polly, controlled rollouts on AKS with Helm, end-to-end tracing with Serilog and OpenTelemetry, and latency budgets enforced in CI with k6.

## Resilience belongs in the client, not the incident channel

The single biggest availability win is refusing to let one slow dependency take down a request. In .NET I do this with Polly wired into `IHttpClientFactory`, so every outbound call inherits retry, timeout, and circuit-breaker behaviour without each service reinventing it.

```csharp
services.AddHttpClient<IPaymentsClient, PaymentsClient>()
    .AddPolicyHandler(Policy<HttpResponseMessage>
        .Handle<HttpRequestException>()
        .OrResult(r => (int)r.StatusCode >= 500)
        .WaitAndRetryAsync(3, attempt =>
            TimeSpan.FromMilliseconds(200 * Math.Pow(2, attempt))
              + TimeSpan.FromMilliseconds(Random.Shared.Next(0, 100))))
    .AddPolicyHandler(Policy.TimeoutAsync<HttpResponseMessage>(TimeSpan.FromSeconds(2)))
    .AddPolicyHandler(Policy<HttpResponseMessage>
        .Handle<HttpRequestException>()
        .OrResult(r => (int)r.StatusCode >= 500)
        .CircuitBreakerAsync(
            handledEventsAllowedBeforeBreaking: 8,
            durationOfBreak: TimeSpan.FromSeconds(30)));
```

Three rules I treat as non-negotiable. First, exponential backoff always carries jitter; synchronised retries are how you turn a blip into a thundering-herd outage. Second, retries only ever wrap idempotent operations, otherwise you double-charge a customer; for writes I lean on idempotency keys rather than naive retries. Third, the circuit breaker is there to fail fast, not to mask faults. When it opens, the service returns a degraded-but-correct response (a cached price, a queued job) and emits a metric. A breaker that opens silently is just a slower outage.

## Rolling updates that never drop a request

Deployment is the most common cause of self-inflicted downtime, so I make it the most boring part of the week. Every service runs on AKS, packaged with Helm, and uses a `RollingUpdate` strategy with surge headroom and zero unavailability:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%
    maxUnavailable: 0
readinessProbe:
  httpGet: { path: /health/ready, port: 8080 }
  periodSeconds: 5
  failureThreshold: 3
lifecycle:
  preStop:
    exec: { command: ["sleep", "10"] }
```

The details matter more than the strategy keyword. ASP.NET Core honours `SIGTERM` for graceful shutdown, but Kubernetes removes a pod from the Service endpoints and sends `SIGTERM` at roughly the same moment, so in-flight connections can still arrive at a dying pod. The 10-second `preStop` sleep buys time for the endpoint removal to propagate before the process stops accepting work. Readiness and liveness probes must be genuinely distinct: readiness checks dependencies the pod needs to serve traffic, liveness only checks the process is not deadlocked. Conflating them causes cascading restarts when a downstream wobbles. A `PodDisruptionBudget` of `minAvailable: 75%` then protects you during node drains and cluster upgrades, which are far more frequent than people expect.

## You cannot operate what you cannot see

At 4 minutes of monthly error budget, mean-time-to-detect dominates everything. Structured logs and distributed traces are the difference between a fix in 90 seconds and a war room. I use Serilog for structured JSON logs and OpenTelemetry for traces and metrics, sharing one correlation identifier across both.

```csharp
builder.Host.UseSerilog((ctx, cfg) => cfg
    .Enrich.FromLogContext()
    .Enrich.WithSpan() // injects TraceId/SpanId into every log line
    .WriteTo.Console(new RenderedCompactJsonFormatter()));

builder.Services.AddOpenTelemetry()
    .WithTracing(t => t
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddSource("Payments")
        .AddOtlpExporter())
    .WithMetrics(m => m
        .AddAspNetCoreInstrumentation()
        .AddRuntimeInstrumentation());
```

Because `WithSpan()` stamps the active `TraceId` onto every log line, I can pivot from a slow trace in the collector straight to the exact log entries for that request, across every service it touched. The Polly policies above also emit telemetry, so an open circuit breaker shows up as both a metric and a span event rather than as a mysterious latency spike. I alert on symptoms the customer feels (the SLO error rate and p99 latency burn), not on causes like CPU, which produces noise and trains people to ignore pages.

## Latency budgets enforced in CI, not in production

A service that returns the right answer too slowly is unavailable as far as the user is concerned. So I give every endpoint an explicit latency budget and enforce it with k6 in the pipeline, before release.

```javascript
import http from 'k6/http';
export const options = {
  thresholds: {
    http_req_failed:   ['rate<0.001'],          // 99.9% success
    http_req_duration: ['p(95)<150', 'p(99)<400'],
  },
  scenarios: { steady: { executor: 'constant-arrival-rate',
    rate: 200, timeUnit: '1s', duration: '2m',
    preAllocatedVUs: 50 } },
};
export default function () {
  http.get('https://staging.api.internal/v1/quote');
}
```

If p99 crosses 400ms or the failure rate exceeds 0.1%, the build fails and the deploy never happens. This turns latency from a thing we discover in an incident into a thing we catch in a pull request. I run it as a constant-arrival-rate test rather than fixed virtual users, because arrival rate is what reality looks like; closed-loop VU tests hide queueing problems by backing off when the system slows.

## How the pieces compound

None of these is remarkable alone. The compounding is the point. Polly absorbs transient downstream faults so they never reach the user. Rolling updates with proper probes and a `preStop` hook mean deploys cost zero downtime. Serilog and OpenTelemetry collapse detection time when something does break. And k6 budgets stop slow code shipping at all. Together they took an estate to 99.99% measured availability, with Polly resilience and AKS health gating doing most of the quiet, unglamorous work.

## Takeaways

- Put retries, timeouts, and circuit breakers in the HTTP client with Polly; always jitter backoff and only retry idempotent calls.
- `maxUnavailable: 0`, distinct readiness/liveness probes, a `preStop` drain, and a PodDisruptionBudget make rollouts and node drains invisible.
- Stamp the OpenTelemetry `TraceId` into every Serilog line so you can pivot from a slow trace to its logs instantly; alert on SLO burn, not CPU.
- Enforce p95/p99 latency and error-rate budgets with k6 in CI using constant-arrival-rate load, so slow releases fail the build instead of the customer.
