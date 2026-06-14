---
title: "Benchmarking Post-Quantum Blind Signatures: Lessons From My MSc Dissertation"
date: "2025-11-02"
track: "research"
readingTime: "9 min read"
excerpt: "What I learned building a reproducible, multi-language benchmarking framework for post-quantum blind signature schemes - and why honest performance numbers are harder to produce than the schemes themselves."
tags:
  - "post-quantum"
  - "cryptography"
  - "benchmarking"
  - "rust"
  - "research"
---

Blind signatures are a deceptively small primitive with an outsized footprint: e-cash, anonymous credentials, privacy-preserving attestation, and unlinkable tokens all lean on them. The user obtains a valid signature over a message the signer never sees. Classically you reach for RSA or Schnorr blind signatures and move on. The moment you add "must survive a cryptographically relevant quantum computer", the comfortable assumptions evaporate - and the published numbers stop agreeing with each other.

My MSc dissertation at the University of Sheffield set out to fix the second problem. Not to invent a new scheme, but to build a **comparative framework** that produces *reproducible* performance and security trade-off data across lattice- and hash-based candidates. This post is the engineering retrospective: what I built, the decisions that mattered, and the mistakes I would warn anyone away from.

## Why a framework, not a paper

When I started reading the literature, the headline issue was not a shortage of constructions. It was that no two papers measured the same thing. One reported signing in CPU cycles on a tuned AVX2 reference implementation; another reported wall-clock milliseconds in pure Python; a third folded network serialisation into "signature time". You cannot draw a trade-off curve from numbers gathered under incompatible conditions.

So the deliverable became a harness with three properties:

1. **Identical workloads** across every scheme - same message sizes, same blinding rounds, same warm-up and sample counts.
2. **Language transparency** - implementations in Python, Rust, and Node.js behind a common interface, so I could separate *algorithmic* cost from *implementation* cost.
3. **Reproducible** - pinned toolchains, fixed seeds, containerised runs, and a results schema that a Django dashboard could ingest without hand-editing.

## Architecture

Each scheme implements a narrow contract: `keygen`, `blind`, `sign`, `unblind`, `verify`. Those primitives are exposed over both **gRPC** and **REST**. gRPC carried the benchmark traffic because its protobuf framing kept serialisation overhead small and predictable; REST existed so the dashboard and ad-hoc tooling could poke a scheme without a generated stub.

The contract that every backend honours looks like this:

```protobuf
service BlindSig {
  rpc Keygen(KeygenRequest) returns (KeyPair);
  rpc Blind(BlindRequest) returns (BlindedMessage);   // user side
  rpc Sign(SignRequest) returns (BlindSignature);     // signer side
  rpc Unblind(UnblindRequest) returns (Signature);    // user side
  rpc Verify(VerifyRequest) returns (VerifyResult);
}
```

A scheme registered in Rust and one registered in Python are indistinguishable to the benchmark driver. That single decision is what made cross-language comparison meaningful instead of anecdotal.

The driver pins everything that drifts:

```yaml
benchmark:
  schemes: [lattice_a, lattice_b, hash_based_c]
  message_bytes: [32, 256, 4096]
  warmup_iterations: 200
  measured_iterations: 2000
  rng_seed: 0xC0FFEE
  transport: grpc
  isolate: per_scheme_container   # cgroup-pinned, single core
```

Results land in a normalised table - operation, scheme, language, message size, p50/p95/p99 latency, peak RSS, and artefact sizes (public key, blinded message, signature). The Django dashboard then renders the trade-off plots directly from that table, so a figure can never disagree with the raw data behind it.

## Measuring honestly

The hardest part was not running the schemes. It was *not lying to myself* about what I measured. Three traps cost me days each:

- **JIT and allocator warm-up.** Node.js and the Python interpreter both improve over the first few hundred calls. Without a generous warm-up window, the first scheme to run looked artificially slow. I fixed the warm-up count and discarded it from every series.
- **Garbage collection bleeding into samples.** A GC pause landing mid-measurement inflated p99 by an order of magnitude. I reported p50/p95/p99 separately rather than means, because for these primitives the tail *is* the story - a verifier that occasionally stalls 40 ms matters operationally.
- **Serialisation masquerading as crypto.** Large lattice signatures spend real time being marshalled. I instrumented the blinding and signing operations *inside* the process boundary and recorded transport cost as a distinct column, so "sign" never silently absorbed protobuf encoding.

A short driver excerpt shows the discipline:

```python
def measure(op, iterations, warmup):
    for _ in range(warmup):
        op()                      # warm JIT / allocator, results discarded
    samples = []
    for _ in range(iterations):
        t0 = time.perf_counter_ns()
        op()
        samples.append(time.perf_counter_ns() - t0)
    samples.sort()
    return {
        "p50": samples[len(samples) // 2],
        "p95": samples[int(len(samples) * 0.95)],
        "p99": samples[int(len(samples) * 0.99)],
    }
```

## What the trade-off curves showed

I will keep specifics scheme-agnostic, but the shape of the findings generalises. Lattice candidates were fast to sign and verify but paid for it in **bandwidth** - public keys and signatures dwarfed their classical counterparts, which dominates the cost in any token-passing protocol. Hash-based approaches were friendlier on assumptions and key sizes but front-loaded cost into signing.

The language axis was just as instructive. Rust and the optimised native paths were consistently faster, but the *ratios between schemes* held across Python, Rust, and Node.js. That is the reassuring result: the algorithmic ranking is real, not an artefact of one runtime. Where the languages diverged was the tail - managed runtimes had noisier p99s, which is exactly the metric a production verifier cares about.

Security-wise, the trade-off is never just "post-quantum: yes/no". It is parameter sets, the soundness of the blindness argument under concurrent sessions, and whether the unforgeability proof survives the blinding transformation at all. The framework let me hold performance fixed and vary parameters to see the security/cost elbow rather than guess at it.

## Takeaways

- **Reproducibility is a feature you build, not a footnote.** Pin toolchains, seed RNGs, isolate runs, and let the dashboard read only normalised results.
- **A common interface across languages** is what turns "interesting numbers" into a defensible comparison. gRPC for the hot path, REST for tooling.
- **Report tails, not means.** For signature verification, p99 is the operational truth.
- **Separate crypto from plumbing.** Serialisation and transport must be their own columns or your conclusions are noise.
- **Bandwidth, not just CPU, decides PQ blind-signature viability** in real token protocols.

Code and the benchmark harness write-up: [github.com/imRamis/pq-blind-signature-bench](https://github.com/imRamis/pq-blind-signature-bench) and the full dissertation notes at [ramis.me/blog/post-quantum-blind-signatures](https://ramis.me/blog/post-quantum-blind-signatures).
