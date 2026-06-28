/* Auto-generated from content/posts/*.md by build-posts.mjs. Do not edit by hand. */
window.POSTS = [
  {
    "slug": "cache-poisoning-account-takeover",
    "title": "From Self-XSS to Account Takeover: Chaining Web Cache Poisoning on a Public Bug-Bounty Target",
    "date": "2026-04-02",
    "track": "cybersecurity",
    "tags": [
      "web-cache-poisoning",
      "self-xss",
      "account-takeover",
      "cache-key",
      "bug-bounty",
      "burp-suite"
    ],
    "readingTime": "8 min read",
    "excerpt": "A sanitised write-up of how I turned a \"won't fix\" self-XSS into a zero-click account takeover by abusing a CDN cache that keyed on the wrong inputs. The methodology, the cache key confusion, the payload, the impact rating, and the layered fix."
  },
  {
    "slug": "red-teaming-llm-agents-harness",
    "title": "A Repeatable Red-Team Harness for LLM Agents: From Corpora to Guardrails",
    "date": "2026-03-28",
    "track": "aiml",
    "tags": [
      "llm-security",
      "red-teaming",
      "prompt-injection",
      "ai-agents",
      "evaluation"
    ],
    "readingTime": "8 min read",
    "excerpt": "Most teams test LLM agents by poking at them in a chat window. That does not scale and it does not regress. Here is the repeatable harness I built: prompt-injection corpora, tool-abuse scenarios, dual scoring with an LLM judge plus deterministic checks, and a feedback loop that turns findings into guardrails."
  },
  {
    "slug": "payments-race-condition-double-spend",
    "title": "Spending a Voucher Twice in 40ms: A TOCTOU Race Condition in a Payments Flow",
    "date": "2026-03-19",
    "track": "cybersecurity",
    "tags": [
      "race-condition",
      "toctou",
      "payments",
      "turbo-intruder",
      "idempotency",
      "bug-bounty"
    ],
    "readingTime": "8 min read",
    "excerpt": "How I turned a single-use £25 voucher into £75 of credit by firing three redemption requests inside a 40ms window. A practical walk-through of detecting a TOCTOU double-spend with Burp Turbo Intruder, proving impact without theft, and the row-lock plus idempotency-key fix that closes it."
  },
  {
    "slug": "choose-your-lens-portfolio-ux",
    "title": "Choose Your Lens: Designing a Portfolio for a Multi-Disciplinary Career",
    "date": "2026-03-04",
    "track": "uiux",
    "tags": [
      "UX",
      "Accessibility",
      "CSS",
      "Design Systems",
      "Frontend",
      "Motion Design"
    ],
    "readingTime": "8 min read",
    "excerpt": "How I redesigned a penetration-tester-and-engineer portfolio around a \"choose your lens\" entry point: persona-driven theming on a single token set, progressive disclosure that never traps the reader, and motion that respects prefers-reduced-motion."
  },
  {
    "slug": "ml-anomaly-detection-auth-logs",
    "title": "An ML Anomaly Detector for Auth Logs That a SOC Actually Trusts",
    "date": "2026-02-23",
    "track": "aiml",
    "tags": [
      "anomaly-detection",
      "machine-learning",
      "soc",
      "authentication",
      "explainability"
    ],
    "readingTime": "8 min read",
    "excerpt": "A practical walkthrough of building an unsupervised anomaly detector for authentication logs - feature engineering that survives contact with reality, isolation forest versus autoencoder, taming false positives, and giving analysts an explanation they can act on."
  },
  {
    "slug": "prompt-injection-agentic-workflows",
    "title": "Breaking Tool Trust Boundaries in Agentic Multi-LLM Workflows",
    "date": "2026-02-09",
    "track": "cybersecurity",
    "tags": [
      "prompt-injection",
      "ai-security",
      "llm-agents",
      "bug-bounty",
      "tool-invocation"
    ],
    "readingTime": "9 min read",
    "excerpt": "Agentic LLM systems collapse the boundary between data and instructions, and most of them invoke tools on the model's word alone. Here is how I test that trust boundary, with concrete payloads, a triage harness, and the bugs I report."
  },
  {
    "slug": "building-bugtraceai",
    "title": "Building BugTraceAI: A 6-Phase Autonomous Security Scanning Pipeline",
    "date": "2026-01-26",
    "track": "engineering",
    "tags": [
      "bugtraceai",
      "llm-agents",
      "appsec",
      "go",
      "playwright"
    ],
    "readingTime": "9 min read",
    "excerpt": "How I built BugTraceAI, a self-hosted autonomous scanner that pairs Go fuzzers and Playwright with LLM-guided payload mutation across a 6-phase pipeline - and why consensus voting and circuit breakers are what make it usable."
  },
  {
    "slug": "idempotent-kafka-consumers-spring",
    "title": "Event-Driven at Scale: Idempotent Apache Kafka Consumers in Spring Boot",
    "date": "2025-12-30",
    "track": "engineering",
    "tags": [
      "kafka",
      "spring-boot",
      "idempotency",
      "event-driven",
      "testcontainers",
      "java"
    ],
    "readingTime": "9 min read",
    "excerpt": "Kafka gives you at-least-once delivery, which means your consumers will eventually see the same event twice. Here is how I build genuinely idempotent Spring Boot consumers - the transactional outbox, dedup keys, retry and DLQ topics, and a TestContainers harness that proves it under failure."
  },
  {
    "slug": "gdpr-controls-in-cicd",
    "title": "Closing 24 GDPR Control Gaps by Wiring Article 30/32 into CI/CD",
    "date": "2025-12-15",
    "track": "cybersecurity",
    "tags": [
      "gdpr",
      "ci-cd",
      "appsec",
      "compliance-as-code",
      "data-protection"
    ],
    "readingTime": "8 min read",
    "excerpt": "How I turned GDPR Articles 30 and 32 from a quarterly spreadsheet exercise into automated pipeline gates, closing 24 control gaps and mapping 74 PII fields before they ever reached production."
  },
  {
    "slug": "idor-to-account-takeover",
    "title": "From IDOR to Full Account Takeover: A Repeatable Authorization-Matrix Workflow",
    "date": "2025-11-18",
    "track": "cybersecurity",
    "tags": [
      "idor",
      "bola",
      "account-takeover",
      "burp-suite",
      "api-security",
      "bug-bounty"
    ],
    "readingTime": "8 min read",
    "excerpt": "A practical, repeatable method for finding IDOR/BOLA and chaining it into full account takeover, built on a Burp plus Python authorization-matrix workflow. Drawn from accepted findings across YesWeHack and Intigriti programmes."
  },
  {
    "slug": "post-quantum-blind-signatures",
    "title": "Benchmarking Post-Quantum Blind Signatures: Lessons From My MSc Dissertation",
    "date": "2025-11-02",
    "track": "research",
    "tags": [
      "post-quantum",
      "cryptography",
      "benchmarking",
      "rust",
      "research"
    ],
    "readingTime": "9 min read",
    "excerpt": "What I learned building a reproducible, multi-language benchmarking framework for post-quantum blind signature schemes - and why honest performance numbers are harder to produce than the schemes themselves."
  },
  {
    "slug": "accessibility-as-a-security-control",
    "title": "Accessibility Is a Security Control: WCAG 2.2 AA in High-Stakes Dashboards",
    "date": "2025-10-12",
    "track": "uiux",
    "tags": [
      "accessibility",
      "wcag",
      "appsec",
      "frontend-security",
      "ui-ux"
    ],
    "readingTime": "7 min read",
    "excerpt": "Accessibility is usually filed under compliance, but in security and ops dashboards the same WCAG 2.2 AA requirements that help screen-reader users also harden the interface against confused-operator failures and a whole class of UI-driven security bugs."
  },
  {
    "slug": "llm-assisted-vuln-triage",
    "title": "Cutting Scanner Alert Fatigue 61% With an Embeddings-Based LLM Triage Layer",
    "date": "2025-09-30",
    "track": "cybersecurity",
    "tags": [
      "llm",
      "triage",
      "appsec",
      "embeddings",
      "vulnerability-management",
      "owasp"
    ],
    "readingTime": "9 min read",
    "excerpt": "How I built an embeddings-and-LLM triage layer over CWE/OWASP notes and historical findings to cut duplicate review on 8,400 weekly scanner alerts by 61% - architecture, consensus voting, and the pitfalls that nearly broke it."
  },
  {
    "slug": "dotnet-microservices-9999-uptime",
    "title": "Engineering a .NET Core Microservices Estate for 99.99% Uptime",
    "date": "2025-08-21",
    "track": "engineering",
    "tags": [
      "dotnet",
      "kubernetes",
      "observability",
      "resilience",
      "sre"
    ],
    "readingTime": "9 min read",
    "excerpt": "How I took a C#/.NET Core microservices estate to 99.99% availability using Polly resilience policies, AKS rolling updates with Helm, Serilog plus OpenTelemetry tracing, and k6 latency budgets that fail builds before customers feel the pain."
  }
];
