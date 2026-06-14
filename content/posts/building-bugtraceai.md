---
title: "Building BugTraceAI: A 6-Phase Autonomous Security Scanning Pipeline"
date: "2026-01-26"
track: "engineering"
readingTime: "9 min read"
excerpt: "How I built BugTraceAI, a self-hosted autonomous scanner that pairs Go fuzzers and Playwright with LLM-guided payload mutation across a 6-phase pipeline - and why consensus voting and circuit breakers are what make it usable."
tags:
  - "bugtraceai"
  - "llm-agents"
  - "appsec"
  - "go"
  - "playwright"
---

Most "AI security scanners" are a thin wrapper around a chat completion and a hopeful prompt. They hallucinate findings, drown you in false positives, and fall over the moment a target returns a 500. I wanted the opposite: a system that behaves like a careful human tester, treats the LLM as one fallible signal among many, and proves its findings before it shows them to you. That is BugTraceAI - a self-hosted platform I architected around a 6-phase pipeline, with Go fuzzers, Playwright browser checks, and LLM-guided payload mutation underneath. The public demo ran 145 findings down to 43 validated issues. This post is how it actually works.

## The 6-phase pipeline

The core insight is that scanning is not one task - it is six, and conflating them is where naive tools fail. BugTraceAI runs **discovery → analysis → consolidation → exploitation → validation → reporting** as discrete stages, each with its own inputs, outputs, and failure semantics.

- **Discovery** maps the attack surface: routes, parameters, auth flows, JS-driven endpoints, GraphQL introspection.
- **Analysis** runs specialist agents across 14 vulnerability classes (IDOR/BOLA, SSRF, auth/logic bypass, race conditions, injection, sensitive-data exposure, and so on), each producing *candidate* findings.
- **Consolidation** deduplicates and clusters candidates so ten variations of one IDOR become one tracked issue.
- **Exploitation** attempts to actually trigger the behaviour with mutated payloads.
- **Validation** independently re-checks every claimed success against strict oracles.
- **Reporting** writes the human-readable output with reproduction steps.

The hard rule: nothing reaches a report unless validation signs off. The LLM is allowed to be wrong everywhere upstream, because validation is deterministic.

## Go fuzzers and Playwright doing the real work

The LLM never touches the wire directly. Two engines do. A set of **Go fuzzers** handles high-throughput request mutation - parameter pollution, type juggling, boundary values, and race-condition windows where I fire N near-simultaneous requests and diff the responses. Go's goroutines make the concurrency cheap, which matters for last-byte-sync race attacks.

**Playwright** handles everything the request layer can't see: client-side rendering, DOM-based sinks, multi-step authenticated flows, and CSP behaviour. Authenticated scanning runs through a real browser context so session handling is honest rather than a forged cookie header.

The LLM's job is narrower and more useful: **guided payload mutation**. Given a candidate parameter and the surrounding response context, an agent proposes the *next* payload to try, reasoning about likely backend behaviour rather than brute-forcing a static list.

```python
async def mutate_payload(ctx: FindingContext) -> list[Payload]:
    proposals = await agent.suggest(
        vuln_class=ctx.vuln_class,
        param=ctx.param,
        last_response=ctx.truncated_response,   # bounded, never raw-dumped
        prior_attempts=ctx.history[-5:],
    )
    # Agent output is untrusted: schema-validate and sandbox every payload
    return [p for p in proposals if payload_schema.validate(p) and not p.escapes_scope(ctx.scope)]
```

Two non-negotiables here. First, every model output is **schema-validated and scope-checked** before it ever leaves the process - an LLM proposing an out-of-scope host is a bug, not an instruction. Second, the response context fed back in is truncated and bounded so a single agent call cannot blow the token budget or leak the entire DOM.

## Consensus voting kills false positives

A single agent saying "this is an IDOR" is worth almost nothing. So analysis runs each candidate past multiple independent agent evaluations and only promotes findings that reach a **consensus threshold**. Crucially, agents see only the evidence, not each other's verdicts, so I get independent votes rather than a confidence echo chamber.

```yaml
consensus:
  voters: 3
  promote_threshold: 0.66      # 2 of 3 must agree to advance
  validation_required: true     # consensus is necessary, never sufficient
  tie_break: conservative       # ambiguity drops the finding, never inflates it
```

Consensus moves a candidate forward; it does **not** confirm it. That is what dragged 145 raw candidates down to 43 validated issues in the demo - roughly a 70% cull. The remaining 43 each carried a deterministic reproduction, which is the only thing a triager actually trusts.

## Circuit breakers keep it from self-destructing

Autonomous tooling against live targets is dangerous to both sides. Without guardrails, a retry loop becomes a denial-of-service attack on your own scope, and a misbehaving model can burn your whole token budget on one stuck endpoint. BugTraceAI wraps every external interaction - HTTP engine, browser, and LLM provider - in **circuit breakers**.

Each breaker trips on consecutive failures, latency spikes, or error-rate thresholds, then opens to stop hammering the dependency. A half-open probe tests recovery before traffic resumes.

```python
breaker = CircuitBreaker(
    failure_threshold=5,       # trip after 5 consecutive failures
    recovery_timeout=30,       # seconds before a half-open probe
    half_open_max=1,           # one trial request before re-closing
)

async def call_target(req):
    async with breaker:                 # raises CircuitOpen when tripped
        return await http.send(req, rate=adaptive_rate(req.host))
```

Per-host adaptive rate limiting sits alongside this, so a fragile staging box gets gentler treatment than a hardened prod API. The combination means a single flaky service degrades gracefully instead of cascading into a failed scan.

## The stack and why it's self-hosted

The platform is **Python + FastAPI** for orchestration and the API, **Go** for the fuzzing engine, **Playwright** for browser checks, **React** for the dashboard, and **PostgreSQL** for state. It is deliberately self-hosted: scoping data, session tokens, and target traffic never leave your infrastructure, which is the only posture serious AppSec teams will accept. Specialist agents, consensus voting, and circuit breakers all plug into the same orchestration layer, so adding a 15th vulnerability class is mostly a new agent and an oracle - not a rewrite.

You can see the architecture and demo write-up at [https://github.com/imRamis/bugtraceai](https://github.com/imRamis/bugtraceai) and [https://bugtraceai.ramis.me](https://bugtraceai.ramis.me).

## Takeaways

- **Treat the LLM as one untrusted signal**, never the source of truth - schema-validate and scope-check every output.
- **Separate "interesting" from "confirmed"**: consensus advances candidates; deterministic validation confirms them. That split is what produced 43 trustworthy findings from 145 candidates.
- **Phase your pipeline** so each stage has clear inputs, outputs, and failure modes - conflating discovery, exploitation, and validation is how scanners hallucinate.
- **Wrap everything external in circuit breakers** with per-host rate limiting; autonomy without guardrails attacks your own scope and budget.
- **Let purpose-built engines do the wire work** - Go for concurrency-heavy fuzzing, Playwright for client-side truth - and keep the model on reasoning, not requests.
