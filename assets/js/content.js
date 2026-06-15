/* Auto-generated: tracks (5 lenses), overview, bug bounty. Edit via build-content.mjs. */
window.CONTENT = {
  "tracks": [
    {
      "id": "cybersecurity",
      "label": "Cybersecurity",
      "short": "Cybersecurity",
      "icon": "shield-halved",
      "tagline": "Red and blue in one operator: I break web, API, AD, cloud and LLM systems, then build the detection that stops them.",
      "summary": "I am an OSCP+ penetration tester and security engineer with 10+ years spanning both sides of the wire and 51 accepted bug bounty findings across several public and private programs. I find authorization, logic, race-condition and SSRF flaws by hand, develop exploits at the binary level, and lead AI/LLM offensive research, then turn that attacker knowledge into detection engineering, SAST/DAST automation, LLM-assisted triage and hardened zero-trust infrastructure. Thinking like an attacker is exactly what lets me ship defences that make breaking in expensive.",
      "stats": [
        {
          "value": "51",
          "label": "Accepted bounty findings"
        },
        {
          "value": "OSCP+",
          "label": "Certified (OSED in prog.)"
        },
        {
          "value": "4th",
          "label": "OffSec Gauntlet 2025"
        },
        {
          "value": "61%",
          "label": "Triage noise cut by LLM"
        }
      ],
      "focusAreas": [
        "Web, API and BOLA/IDOR exploitation, auth and business-logic bypass, race conditions and SSRF chains",
        "Active Directory exploitation (Kerberoasting, ACL abuse, lateral movement) and AWS/Azure cloud attack paths",
        "Exploit development and binary analysis on the OSED track (Ghidra/IDA, WinDbg, ROP)",
        "AI/LLM offensive research: prompt injection, unsafe tool invocation and model data leakage, plus AI-driven scanning",
        "Red and purple teaming with attack-path mapping and detection validation against the kill chain",
        "SAST/DAST automation wired into CI/CD (Semgrep, CodeQL, GitHub Actions) with LLM-assisted triage and deduplication",
        "Detection engineering with SIEM/ELK and Suricata IDS/IPS, and threat modelling (STRIDE/DREAD)",
        "Secure SDLC, developer security enablement and GDPR Article 30/32 privacy controls",
        "Infrastructure hardening, CIS-benchmark automation (Ansible) and zero-trust network segmentation",
        "Incident response, digital forensics and live attack mitigation"
      ],
      "tools": [
        "Burp Suite Pro",
        "Nmap",
        "Metasploit",
        "BloodHound",
        "Impacket",
        "Ghidra",
        "IDA Pro",
        "Frida",
        "Semgrep",
        "CodeQL",
        "Nessus",
        "Kali Linux",
        "ELK Stack",
        "Suricata",
        "Ansible",
        "Playwright",
        "Python",
        "Go"
      ],
      "projects": [
        {
          "title": "51 Accepted Bug-Bounty Findings Across Public & Private Programs",
          "type": "Bug bounty portfolio",
          "blurb": "Sustained coordinated disclosure across several public and private programs, totalling 51 accepted findings. The bulk are authorization and logic flaws (IDOR/BOLA, broken function-level authorization, race conditions and SSRF chains) alongside emerging AI/LLM abuse cases such as prompt injection and unsafe tool invocation. Every submission shipped with a reproducible PoC and a clear impact narrative to accelerate triage and remediation.",
          "stack": [
            "Burp Suite Pro",
            "Python",
            "HTTP/2",
            "GraphQL",
            "OAuth/JWT"
          ],
          "metrics": [
            "8 Critical + 41 High/Medium accepted",
            "2 P2/S2 in Google Bug Hunters",
            "Across public and private programs",
            "Focus: IDOR/BOLA, race conditions, SSRF, LLM abuse"
          ],
          "tags": [
            "bug-bounty",
            "api",
            "authorization",
            "LLM"
          ],
          "links": {
            "repo": "https://github.com/imRamis/bounty-poc-toolkit",
            "writeup": "https://ramis.me/blog/bug-bounty-51-findings",
            "demo": "https://hackerone.com/imramis"
          }
        },
        {
          "title": "SSRF to Domain Admin - Red-Team Attack Chain with Detection Handover",
          "type": "Red/purple-team engagement",
          "blurb": "A representative internal red-team narrative: external recon to an exposed application, then an SSRF into cloud metadata to harvest temporary IAM credentials, pivoting into Active Directory via Kerberoasting and ACL abuse mapped in BloodHound, and escalating to domain-wide control. The engagement ran purple: every step in the chain was paired with Sigma detection rules and SIEM validation so the blue team could confirm coverage and close the gaps.",
          "stack": [
            "BloodHound",
            "Impacket",
            "Burp Suite Pro",
            "AWS IAM",
            "Sigma",
            "PowerShell"
          ],
          "metrics": [
            "SSRF to IAM credential takeover demonstrated",
            "Kerberoasting + ACL abuse to domain admin",
            "Attack paths mapped in BloodHound",
            "Each step paired with Sigma rule + SIEM validation"
          ],
          "tags": [
            "active-directory",
            "cloud",
            "red-team",
            "detection"
          ],
          "links": {
            "repo": "https://github.com/imRamis/ad-cloud-attack-notes",
            "writeup": "https://ramis.me/blog/ssrf-to-domain-admin-chain"
          }
        },
        {
          "title": "LLM-Assisted Vulnerability Triage Pipeline",
          "type": "Detection & triage automation",
          "blurb": "A triage layer that ingests roughly 8,400 weekly SAST/DAST findings and classifies them with an LLM judge backed by deterministic rules and historical labels. It clusters duplicates, scores exploitability against the actual codebase, and routes only high-signal items to engineers. The pipeline cut duplicate review effort by 61% while preserving recall on genuine criticals, freeing the AppSec team from triage fatigue.",
          "stack": [
            "Python",
            "FastAPI",
            "Semgrep",
            "CodeQL",
            "PostgreSQL",
            "LLM agents",
            "GitHub Actions"
          ],
          "metrics": [
            "8,400 scanner results triaged weekly",
            "61% reduction in duplicate review",
            "Exploitability scored against real source",
            "Deterministic guardrails around LLM judgements"
          ],
          "tags": [
            "SAST",
            "DAST",
            "AI/LLM",
            "appsec"
          ],
          "links": {
            "repo": "https://github.com/imRamis/llm-triage-engine",
            "demo": "https://triage.ramis.me",
            "writeup": "https://ramis.me/blog/llm-scanner-triage-61-percent"
          }
        },
        {
          "title": "Zero-Trust Hardening & Detection Stack (ELK + Suricata + Ansible)",
          "type": "Infrastructure hardening & detection engineering",
          "blurb": "Hardened Linux cluster environments with Ansible playbooks enforcing CIS benchmarks for patching and configuration drift, then deployed an ELK-based SIEM and Suricata IDS/IPS with curated detection rules tuned against real attack telemetry. Designed zero-trust segmentation around the most sensitive workloads so that lateral movement was contained by default. The combined visibility and automation halved incident response time and held critical services at 99.99% uptime.",
          "stack": [
            "Ansible",
            "ELK Stack",
            "Suricata",
            "Docker",
            "Kubernetes",
            "Terraform",
            "Linux"
          ],
          "metrics": [
            "50% faster incident response",
            "99.99% uptime on critical services",
            "CIS-benchmarked config enforced via Ansible",
            "Zero-trust segmentation around sensitive workloads"
          ],
          "tags": [
            "hardening",
            "SIEM",
            "zero-trust",
            "detection"
          ],
          "links": {
            "repo": "https://github.com/imRamis/zero-trust-detection-stack",
            "writeup": "https://ramis.me/blog/zero-trust-elk-suricata"
          }
        },
        {
          "title": "Secure SDLC, GDPR Controls & Live Incident Response",
          "type": "Secure SDLC, privacy & incident response",
          "blurb": "Embedded security across e-commerce and payment delivery: SAST/DAST gates and threat modelling in the SDLC, plus a privacy effort that mapped 74 PII fields end-to-end and closed 24 GDPR Article 30/32 control gaps with encryption, retention and access enforced in code. When a live CMS came under active attack, I restored integrity in under two hours, ran forensics to recover the exploit chain, remediated five-plus critical vulnerabilities including an RCE, and re-architected the platform against the OWASP Top 10 with an IDPS for continuous detection.",
          "stack": [
            "Python",
            "PHP/Laravel",
            "Suricata",
            "Burp Suite",
            "PostgreSQL",
            "AWS"
          ],
          "metrics": [
            "74 PII fields mapped, 24 GDPR control gaps closed",
            "Integrity restored in under 2 hours during live attack",
            "5+ critical vulns remediated (incl. RCE)",
            "SAST/DAST gates + threat modelling in the SDLC"
          ],
          "tags": [
            "secure-sdlc",
            "GDPR",
            "incident-response",
            "forensics"
          ],
          "links": {
            "repo": "https://github.com/imRamis/secure-sdlc-gdpr-toolkit",
            "writeup": "https://ramis.me/blog/secure-sdlc-gdpr-incident-response"
          }
        }
      ],
      "contributions": [
        {
          "label": "OffSec The Gauntlet: Echo Response - 4th globally · 2025",
          "url": "https://ramis.me/blog/offsec-gauntlet-echo-response",
          "note": "Placed 4th of ~9,000 competitors in the 2025 forensics challenge, blending offensive analysis with incident reconstruction."
        },
        {
          "label": "ShefESH CTF - 1st place (web exploitation)",
          "url": "https://ramis.me/blog/shefesh-ctf-web-first-place",
          "note": "Won the web exploitation track at the University of Sheffield CTF."
        },
        {
          "label": "HackerOne disclosure profile",
          "url": "https://hackerone.com/reports/XXXXXXX",
          "note": "Representative coordinated disclosures from the 51-finding portfolio."
        }
      ]
    },
    {
      "id": "engineering",
      "label": "Software Engineering",
      "short": "Engineering",
      "icon": "code",
      "tagline": "Event-driven Java backends and full-stack platforms built to scale, stay up, and ship securely.",
      "summary": "I am a software engineer with 10+ years building backend and full-stack platforms, with deep Java at the core: Spring Boot, Spring Data JPA/Hibernate and Apache Kafka event-driven services running 50K+ daily financial transactions, designed 12-factor and tested hard with JUnit 5, Mockito, TestContainers and PACT. Around that Java core I ship polyglot - C#/.NET Core microservices, Node, Go, Rust and PHP/Laravel - on EKS/AKS with Helm, Terraform and CI/CD. I have run e-commerce APIs at 6.5M requests a day and Java services at 800K+ daily requests and 99.8% availability, and I bring a security engineer's instinct so the platforms I build are as hard to break as they are to outgrow.",
      "stats": [
        {
          "value": "10+ yrs",
          "label": "Backend & full-stack engineering"
        },
        {
          "value": "6.5M/day",
          "label": "Peak API requests served"
        },
        {
          "value": "88%",
          "label": "Test coverage on core Java services"
        },
        {
          "value": "65%",
          "label": "Production incidents reduced"
        }
      ],
      "focusAreas": [
        "Spring Boot 2.x/3.x backends with Spring Data JPA, Hibernate and clean 12-factor configuration",
        "Event-driven systems on Apache Kafka and Kafka Streams (50K+ daily financial transactions, exactly-once semantics)",
        "TDD/BDD discipline with JUnit 5, Mockito, TestContainers, PACT contract testing and Cucumber (88% coverage)",
        "High-scale REST and gRPC API design and performance tuning (6.5M req/day, 800K+ daily req, multi-TB datastores)",
        "Cloud-native deployment on AWS EKS and Azure AKS with Helm, Terraform and GitHub Actions/Jenkins CI/CD",
        "Resilient C#/.NET Core microservices with Polly, Serilog and OpenTelemetry at 99.99% uptime",
        "Polyglot platform engineering across Java, C#/.NET, Node/Express, Go, Rust and PHP/Laravel",
        "Observability and SLOs with Micrometer, Prometheus, Grafana, Datadog and distributed tracing",
        "Real-time systems with Spring WebSocket and message queues at thousands of concurrent users sub-100ms",
        "Secure SDLC: SAST/DAST gates, threat modelling and authorization-first API design"
      ],
      "tools": [
        "Java 17/21",
        "Spring Boot",
        "Spring Data JPA / Hibernate",
        "Apache Kafka / Kafka Streams",
        "Maven / Gradle",
        "JUnit 5 / Mockito",
        "TestContainers / PACT",
        "C#/.NET Core",
        "Node.js / Express",
        "Python",
        "Go",
        "Rust",
        "PHP/Laravel",
        "gRPC",
        "PostgreSQL / Redis",
        "AWS EKS / Azure AKS",
        "Helm / Terraform",
        "Prometheus / Grafana / Datadog",
        "GitHub Actions / Jenkins"
      ],
      "projects": [
        {
          "title": "Event-Driven Payments Platform (Spring Boot + Kafka)",
          "type": "Java backend platform",
          "shot": "architecture",
          "role": "Lead engineer",
          "blurb": "Designed and led a Spring Boot 3 payments and ledger backend built around Apache Kafka and Kafka Streams, processing 50K+ daily financial transactions with exactly-once semantics and an idempotent outbox pattern. Domain services use Spring Data JPA and Hibernate over PostgreSQL, are packaged 12-factor and deployed on AWS EKS via Helm. A full test pyramid - JUnit 5, Mockito, TestContainers for real Kafka and Postgres, plus PACT contract tests between producers and consumers - held coverage at 88% and helped cut production incidents by 65%.",
          "stack": [
            "Java 21",
            "Spring Boot 3",
            "Apache Kafka / Kafka Streams",
            "Spring Data JPA / Hibernate",
            "PostgreSQL",
            "AWS EKS",
            "Helm",
            "TestContainers / PACT"
          ],
          "metrics": [
            "50K+ daily financial transactions, exactly-once",
            "88% test coverage across the service estate",
            "65% reduction in production incidents",
            "Idempotent outbox + Kafka Streams for replay safety"
          ],
          "tags": [
            "java",
            "spring-boot",
            "kafka",
            "event-driven"
          ],
          "links": {
            "repo": "https://github.com/imRamis/spring-kafka-payments-platform",
            "demo": "https://payments-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/event-driven-payments-spring-kafka"
          }
        },
        {
          "title": "Apricart High-Throughput Java Services",
          "type": "High-scale backend engineering",
          "shot": "analytics-dashboard",
          "role": "Contributor",
          "blurb": "Built and operated the Spring Boot backend services behind a regulated e-commerce and payments platform, sustaining 800K+ daily requests at 99.8% availability. Work spanned Spring Data JPA query and index tuning, Redis caching, Kafka-based order and inventory events, and read-replica routing across a busy MySQL/PostgreSQL estate. Services were instrumented with Micrometer and Prometheus, traced end-to-end, and gated by JUnit 5 and TestContainers integration suites so releases stayed safe under heavy retail traffic.",
          "stack": [
            "Java 17",
            "Spring Boot 2.x",
            "Spring Data JPA / Hibernate",
            "Apache Kafka",
            "Redis",
            "PostgreSQL / MySQL",
            "Micrometer / Prometheus",
            "AWS EKS"
          ],
          "metrics": [
            "800K+ requests served per day",
            "99.8% service availability",
            "Sub-200ms p95 on hot read paths after tuning",
            "Micrometer + Prometheus SLOs on every service"
          ],
          "tags": [
            "java",
            "high-scale",
            "spring-boot",
            "performance"
          ],
          "links": {
            "repo": "https://github.com/imRamis/apricart-java-services",
            "demo": "https://apricart-api-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/scaling-spring-boot-800k-daily-requests"
          }
        },
        {
          "title": "Resilient .NET Core Microservices Platform",
          "type": "Cloud-native backend",
          "shot": "microservices",
          "role": "Contributor",
          "blurb": "Architected a C#/.NET Core microservices backend powering business-critical workflows at 99.99% uptime. Used Polly for retries, circuit breakers and bulkheads, deployed on Azure AKS with Helm, and wired full observability through Serilog and OpenTelemetry into Datadog. Service-to-service auth, idempotent message handling and graceful degradation were baked in from day one, with PACT contract tests guarding the boundaries against breaking changes.",
          "stack": [
            "C#/.NET Core",
            "ASP.NET Core",
            "Polly",
            "Azure AKS",
            "Helm",
            "OpenTelemetry / Serilog",
            "Datadog",
            "PostgreSQL / Redis"
          ],
          "metrics": [
            "99.99% uptime across the service mesh",
            "Circuit breakers cut cascade failures to near zero",
            "p99 latency held under 120ms at peak",
            "Contract-tested boundaries via PACT"
          ],
          "tags": [
            "dotnet",
            "microservices",
            "resilience",
            "observability"
          ],
          "links": {
            "repo": "https://github.com/imRamis/dotnet-resilient-microservices",
            "demo": "https://services-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/dotnet-resilience-polly-aks"
          }
        },
        {
          "title": "High-Scale E-commerce API Layer",
          "type": "Backend platform engineering",
          "role": "Contributor",
          "blurb": "Hardened and scaled the API layer behind a large e-commerce platform serving 6.5M daily requests and 2.8M monthly active users on top of a multi-TB datastore. Work spanned read-replica routing, Redis caching strategies, query and index tuning, rate limiting and PCI-relevant payment flows. The result was a backend that stayed fast and predictable under heavy, bursty retail traffic, with response times cut 25% after profiling.",
          "stack": [
            "PHP/Laravel",
            "MySQL",
            "Redis",
            "Nginx",
            "AWS",
            "REST APIs",
            "Varnish"
          ],
          "metrics": [
            "6.5M API requests served per day",
            "2.8M monthly active users supported",
            "Multi-TB datastore kept query-fast under load",
            "25% faster API response times after tuning"
          ],
          "tags": [
            "high-scale",
            "api",
            "ecommerce",
            "performance"
          ],
          "links": {
            "repo": "https://github.com/imRamis/ecommerce-api-scale-kit",
            "demo": "https://shop-api-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/scaling-ecommerce-apis-6m-requests"
          }
        },
        {
          "title": "Polyglot CI/CD & Infrastructure-as-Code Toolkit",
          "type": "Platform & DevOps engineering",
          "role": "Creator",
          "blurb": "Built the deployment backbone shared across Java, .NET, Go and Node services: reusable GitHub Actions and Jenkins pipelines that run Maven/Gradle builds, JUnit/TestContainers suites, SAST/DAST gates and PACT contract verification before promotion. Terraform modules and Helm charts provision EKS/AKS clusters, observability (Prometheus, Grafana, Datadog) and secrets, giving every team a 12-factor, secure-by-default path from commit to production. Standardising the pipeline cut mean time to deploy and made rollbacks routine.",
          "stack": [
            "Terraform",
            "Helm",
            "Kubernetes (EKS/AKS)",
            "GitHub Actions / Jenkins",
            "Maven / Gradle",
            "Prometheus / Grafana",
            "Datadog",
            "Go"
          ],
          "metrics": [
            "One pipeline pattern across 4 language stacks",
            "SAST/DAST + PACT verification gated pre-deploy",
            "Terraform/Helm IaC for reproducible clusters",
            "Mean time to deploy cut, rollbacks made routine"
          ],
          "tags": [
            "devops",
            "kubernetes",
            "terraform",
            "ci-cd"
          ],
          "links": {
            "repo": "https://github.com/imRamis/polyglot-cicd-iac",
            "demo": "https://deploy-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/polyglot-cicd-eks-terraform"
          }
        },
        {
          "title": "Real-Time Messaging Backend (Spring WebSocket)",
          "type": "Real-time systems",
          "role": "Contributor",
          "blurb": "Engineered a real-time messaging backend that sustained 5K-8K concurrent users with sub-100ms delivery, originally for Chatcloud's SaaS product. Built on Spring WebSocket with a STOMP message broker and Redis-backed pub/sub, it scaled horizontally behind Nginx with auto-scaling and failover on Kubernetes. An embeddable JavaScript plugin and an admin dashboard rounded out the offering, with JUnit and TestContainers integration tests covering the messaging guarantees.",
          "stack": [
            "Java",
            "Spring WebSocket / STOMP",
            "Redis",
            "MongoDB",
            "Kubernetes",
            "Nginx",
            "JUnit 5 / TestContainers"
          ],
          "metrics": [
            "5K-8K concurrent users sustained",
            "Sub-100ms message delivery",
            "99.9% platform availability",
            "15% lower infra cost after optimisation"
          ],
          "tags": [
            "real-time",
            "spring-websocket",
            "scalability",
            "saas"
          ],
          "links": {
            "repo": "https://github.com/imRamis/realtime-messaging-core",
            "demo": "https://chat-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/realtime-messaging-spring-websocket-8k"
          }
        },
        {
          "title": "Multi-Region API Gateway & GraphQL Federation",
          "type": "API platform engineering",
          "shot": "gateway",
          "role": "Creator",
          "blurb": "A polyglot API edge that federates a dozen Spring Boot, Go and Node services behind a single typed GraphQL schema, with a thin Go gateway handling auth, rate limiting, request coalescing and per-field authorization. It runs active-active across two AWS regions with latency-based routing and graceful failover, so a regional outage degrades rather than drops. Persisted queries, response caching and schema-change CI checks (composition + breaking-change detection) keep the contract safe as teams ship independently.",
          "stack": [
            "Go",
            "GraphQL Federation",
            "Spring Boot",
            "Node.js",
            "Redis",
            "AWS (multi-region)",
            "Terraform"
          ],
          "metrics": [
            "12+ services federated behind one typed schema",
            "Active-active across 2 regions with latency routing",
            "Per-field authorization at the edge",
            "Breaking-change detection gated in CI"
          ],
          "tags": [
            "api",
            "graphql",
            "go",
            "multi-region"
          ],
          "links": {
            "repo": "https://github.com/imRamis/edge-graphql-federation",
            "demo": "https://gateway-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/graphql-federation-edge-gateway"
          }
        },
        {
          "title": "Event-Sourced Inventory Engine (CQRS + Kafka)",
          "type": "Distributed systems",
          "role": "Creator",
          "blurb": "An inventory and reservation engine built on event sourcing and CQRS: every stock movement is an immutable event on Kafka, projections are rebuilt on demand, and read models are tuned per query pattern. The design made overselling structurally impossible under concurrency, gave a complete audit trail for free, and let new read views (analytics, alerting, search) be added without touching the write path. Snapshotting and idempotent consumers keep replay fast even with tens of millions of events.",
          "stack": [
            "Java 21",
            "Spring Boot 3",
            "Apache Kafka",
            "Axon / CQRS",
            "PostgreSQL",
            "Redis",
            "Kubernetes"
          ],
          "metrics": [
            "Overselling eliminated under high concurrency",
            "Full immutable audit trail of every stock movement",
            "New read models added without write-path changes",
            "Snapshotting keeps event replay fast at 10M+ events"
          ],
          "tags": [
            "event-sourcing",
            "cqrs",
            "kafka",
            "java"
          ],
          "links": {
            "repo": "https://github.com/imRamis/event-sourced-inventory",
            "writeup": "https://ramis.me/#/blog/event-sourcing-cqrs-inventory"
          }
        },
        {
          "title": "Feature-Flag & Experimentation Service",
          "type": "Developer platform",
          "role": "Creator",
          "blurb": "A self-hosted feature-flag and A/B experimentation service with a low-latency Go evaluation engine, streaming flag updates over SSE so changes propagate to clients in under a second without redeploys. It supports percentage rollouts, targeting rules, kill switches and sticky bucketing, with a typed SDK for Java, Node and React. An audit log records who flipped what and when, and a guarded-rollout mode auto-reverts a flag if error rates spike - turning risky releases into routine, observable ones.",
          "stack": [
            "Go",
            "TypeScript SDK",
            "React",
            "PostgreSQL",
            "Redis",
            "Server-Sent Events"
          ],
          "metrics": [
            "Sub-second flag propagation via SSE, no redeploys",
            "Percentage rollouts, targeting and sticky bucketing",
            "Typed SDKs for Java, Node and React",
            "Guarded rollout auto-reverts on error-rate spike"
          ],
          "tags": [
            "platform",
            "feature-flags",
            "go",
            "developer-experience"
          ],
          "links": {
            "repo": "https://github.com/imRamis/flagforge",
            "demo": "https://flags-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/building-a-feature-flag-service"
          }
        },
        {
          "title": "Observability & SLO Platform (OpenTelemetry)",
          "type": "Platform & SRE engineering",
          "shot": "monitoring",
          "role": "Creator",
          "blurb": "The observability backbone standardised across the service estate: OpenTelemetry auto-instrumentation for traces, metrics and logs, shipped through a collector into Prometheus, Tempo and Grafana with Datadog for long-term retention. I defined SLOs and error budgets per service, wired multi-window burn-rate alerts that page only on real budget threats, and built reusable Grafana dashboards generated from code so every new service ships observable on day one. Mean time to detection dropped sharply and on-call noise fell with it.",
          "stack": [
            "OpenTelemetry",
            "Prometheus",
            "Grafana / Tempo",
            "Datadog",
            "Go",
            "Kubernetes",
            "Terraform"
          ],
          "metrics": [
            "Traces, metrics and logs unified via OTel collector",
            "Per-service SLOs with multi-window burn-rate alerts",
            "Dashboards generated from code, not clicked together",
            "Sharp drop in MTTD and on-call alert noise"
          ],
          "tags": [
            "observability",
            "slo",
            "opentelemetry",
            "sre"
          ],
          "links": {
            "repo": "https://github.com/imRamis/otel-slo-platform",
            "demo": "https://obs-demo.ramis.me",
            "writeup": "https://ramis.me/#/blog/slo-platform-with-opentelemetry"
          }
        }
      ],
      "contributions": [
        {
          "label": "Event-driven payments reference (Spring Boot + Kafka)",
          "url": "https://github.com/imRamis/spring-kafka-payments-platform",
          "note": "Reference architecture for a Spring Boot 3 + Kafka Streams payments backend with an idempotent outbox, TestContainers and PACT contract tests, drawn from a 50K+ daily transaction platform."
        },
        {
          "label": "Scaling Spring Boot to 800K daily requests",
          "url": "https://ramis.me/#/blog/scaling-spring-boot-800k-daily-requests",
          "note": "Engineering write-up on JPA/Hibernate tuning, Redis caching and Kafka events that kept Apricart's Java services fast at 800K+ requests a day and 99.8% availability."
        },
        {
          "label": "Polyglot CI/CD & IaC toolkit",
          "url": "https://github.com/imRamis/polyglot-cicd-iac",
          "note": "Reusable GitHub Actions/Jenkins pipelines and Terraform/Helm modules giving Java, .NET, Go and Node services a 12-factor, secure-by-default path to EKS/AKS."
        },
        {
          "label": "Resilient .NET microservices reference",
          "url": "https://github.com/imRamis/dotnet-resilient-microservices",
          "note": "Reference architecture for .NET Core services on AKS with Polly resilience, Helm charts, OpenTelemetry/Datadog wiring and PACT-tested boundaries."
        }
      ]
    },
    {
      "id": "aiml",
      "label": "AI / ML Engineering",
      "short": "AI / ML",
      "icon": "brain",
      "tagline": "I build LLM agent systems, RAG pipelines and ML - and ship them as product features teams can trust, with the evals and guardrails to back it up.",
      "summary": "I build applied AI/ML as real product features, not demos: LLM agent systems with planning and tool-use, retrieval-augmented generation with citation grounding, and the evaluation harnesses and deterministic guardrails that make non-deterministic models safe to ship. I care about the hard engineering around models - durable agent workflows, typed tool registries, observability, cost control and regression-gated evals - backed by an MSc in Cyber Security & AI (Distinction). I also red-team AI systems when the product needs it, but the throughline is shipping trustworthy AI, not just experimenting with it.",
      "stats": [
        {
          "value": "Agents",
          "label": "orchestration + tool-use"
        },
        {
          "value": "RAG",
          "label": "grounded retrieval + eval"
        },
        {
          "value": "MCP",
          "label": "typed tools for agents"
        },
        {
          "value": "MSc",
          "label": "Cyber Security & AI (Dist.)"
        }
      ],
      "focusAreas": [
        "Building LLM agent systems as product features: planning, tool-use orchestration and human-in-the-loop approval gates",
        "Durable, replayable agent workflows with deterministic retries and step-level observability (OpenTelemetry traces)",
        "Typed tool/function registries and Model Context Protocol (MCP) servers that expose internal APIs to agents under permission scopes",
        "Retrieval-augmented generation (RAG): hybrid dense + BM25 retrieval, cross-encoder re-ranking, semantic chunking and citation grounding",
        "Vector search and embedding pipelines (pgvector, FAISS, Qdrant) with incremental re-indexing",
        "Offline evaluation harnesses and LLM-as-judge scoring with recall@k / faithfulness regression gating in CI",
        "Deterministic guardrails around generative steps: schema-validated structured output, refusal-on-low-context and cost/latency control",
        "AI-assisted product engineering - shipping agentic and RAG features into real apps with typed SDKs and streaming UIs",
        "MLOps and serving: experiment tracking, fine-tuning (LoRA/PEFT) and self-hosted open-weight models (vLLM, Ollama)",
        "LLM security evaluation & red-teaming (prompt injection, jailbreaks, unsafe tool-use) - applied when a product needs it"
      ],
      "tools": [
        "Python",
        "TypeScript",
        "FastAPI",
        "Node.js",
        "LangGraph",
        "LangChain",
        "Model Context Protocol (MCP)",
        "PyTorch",
        "Hugging Face Transformers",
        "Sentence-Transformers",
        "Cross-encoder re-rankers",
        "pgvector",
        "FAISS",
        "Qdrant",
        "vLLM",
        "Ollama",
        "OpenTelemetry",
        "PostgreSQL",
        "Redis",
        "React"
      ],
      "projects": [
        {
          "title": "Orchestra - Multi-Agent Workflow Engine for Product Teams",
          "type": "Agentic development platform",
          "shot": "orchestra",
          "role": "Creator",
          "blurb": "A self-hosted engine for building and running production LLM agent workflows as a product feature, not a demo. Workflows are defined as typed graphs of planning, tool-use and review steps with a durable state machine, so long-running agent runs survive restarts, retry deterministically and can be replayed step-by-step for debugging. A typed tool registry exposes internal APIs to agents behind permission scopes and human-in-the-loop approval gates, structured outputs are schema-validated, and every run emits OpenTelemetry traces so teams can see exactly why an agent did what it did. It ships with a TypeScript SDK and a React run-inspector, and was built to make 'add an AI agent to our product' a safe, observable, reviewable engineering task.",
          "stack": [
            "TypeScript",
            "Node.js",
            "LangGraph",
            "Model Context Protocol (MCP)",
            "PostgreSQL",
            "Redis",
            "OpenTelemetry",
            "React"
          ],
          "metrics": [
            "Durable, replayable agent runs survive restarts and retry deterministically",
            "Typed tool registry with permission scopes and human-approval gates",
            "Per-step OpenTelemetry traces for full agent observability",
            "Schema-validated structured outputs with deterministic guardrails"
          ],
          "tags": [
            "agents",
            "orchestration",
            "developer-platform",
            "ai-engineering"
          ],
          "links": {
            "repo": "https://github.com/imRamis/orchestra-agents",
            "demo": "https://orchestra.ramis.me",
            "writeup": "https://ramis.me/#/blog/building-a-multi-agent-workflow-engine"
          }
        },
        {
          "title": "Lexica - Grounded RAG Engine for Product Knowledge",
          "type": "RAG product / retrieval platform",
          "shot": "lexica",
          "role": "Creator",
          "blurb": "A production retrieval-augmented-generation service that turns scattered product docs, tickets and changelogs into a fast, trustworthy in-app answer experience. It runs a hybrid retrieval stack - dense embeddings in pgvector fused with BM25, a cross-encoder re-ranker and semantic chunking - so answers stay grounded with inline citations and refuse to guess when context is thin. An offline evaluation harness tracks recall@k, faithfulness and answer latency on a labelled golden set and gates deploys on regression, while incremental re-indexing keeps the corpus fresh without full rebuilds. A streaming API and a typed React widget make it a drop-in 'ask your docs' feature for any product.",
          "stack": [
            "Python",
            "FastAPI",
            "pgvector",
            "PostgreSQL",
            "Sentence-Transformers",
            "Cross-encoder re-ranker",
            "Redis",
            "React"
          ],
          "metrics": [
            "Hybrid dense + BM25 retrieval with cross-encoder re-ranking",
            "Citation-grounded answers that refuse on low context",
            "recall@k and faithfulness gated in CI on a golden set",
            "Incremental re-indexing keeps the corpus fresh without full rebuilds"
          ],
          "tags": [
            "RAG",
            "vector-search",
            "retrieval-eval",
            "ai-engineering"
          ],
          "links": {
            "repo": "https://github.com/imRamis/lexica-rag",
            "demo": "https://lexica.ramis.me",
            "writeup": "https://ramis.me/#/blog/building-a-grounded-rag-engine"
          }
        },
        {
          "title": "BugTraceAI - Agentic AI Engineering R&D Platform",
          "type": "Personal AI-engineering project · agent orchestration",
          "note": "Personal AI-engineering R&D - an experiment in building reliable agent systems. Entirely separate from my bug-bounty work: all 51 accepted findings were discovered manually, by hand. I don't use BugTraceAI (or any LLM) to find or submit bounties.",
          "blurb": "A self-hosted product build where I push agentic engineering to its limits: specialist LLM agents driving a six-phase pipeline (discovery, analysis, consolidation, exploitation, validation, reporting) with structured tool-calling into Go fuzzers and Playwright browser checks, plus consensus voting and circuit breakers that suppress hallucinated output before it reaches a human. It's my R&D sandbox for the hard parts of building agent systems - planning, deterministic guardrails around generative steps, cost control and getting trustworthy, reproducible results out of non-deterministic models - applied to a security-testing domain I know well. The public demo run produced 145 candidate findings with 43 surviving validation, each carrying reproduction steps rather than raw model output.",
          "stack": [
            "Python",
            "FastAPI",
            "LLM Agents",
            "LangChain",
            "Go",
            "Playwright",
            "PostgreSQL"
          ],
          "metrics": [
            "145 findings, 43 validated on public demo",
            "14 vulnerability classes via specialist agents",
            "Consensus voting + circuit breakers cut hallucinated findings",
            "6-phase agentic pipeline from discovery to reporting"
          ],
          "tags": [
            "AI/LLM",
            "agents",
            "tool-use",
            "security"
          ],
          "links": {
            "repo": "https://github.com/imRamis/bugtrace-ai",
            "demo": "https://bugtrace.ramis.me",
            "writeup": "https://ramis.me/blog/bugtraceai-agent-orchestration"
          }
        },
        {
          "title": "LLM Triage Engine for Scanner Result Deduplication",
          "type": "Applied LLM classification",
          "blurb": "An LLM-backed classification service built during AppSec work at Sorvox to tame scanner sprawl. It ingests around 8,400 weekly SAST/DAST results, embeds and clusters duplicates with vector similarity, scores exploitability against the real codebase, and routes only high-signal items to engineers. An LLM-as-judge layer is wrapped in deterministic guardrails and historical labels so its verdicts stay calibrated, and a feedback loop from analyst decisions keeps precision climbing. The pipeline cut duplicate review effort by 61% without losing recall on genuine criticals.",
          "stack": [
            "Python",
            "FastAPI",
            "LangChain",
            "pgvector",
            "scikit-learn",
            "PostgreSQL",
            "LLM Agents"
          ],
          "metrics": [
            "8,400 results classified weekly",
            "61% reduction in duplicate review",
            "Vector clustering + LLM-judge with guardrails",
            "Analyst-feedback loop for continuous calibration"
          ],
          "tags": [
            "AI/LLM",
            "classification",
            "embeddings",
            "appsec"
          ],
          "links": {
            "repo": "https://github.com/imRamis/llm-triage-engine",
            "writeup": "https://ramis.me/blog/llm-scanner-triage-61-percent"
          }
        },
        {
          "title": "RedTeamLab - LLM Security Evaluation & Red-Teaming Harness",
          "type": "LLM security evaluation",
          "blurb": "An automated red-teaming harness that stress-tests LLM applications the way I'd attack any other target. It runs a versioned corpus of 600+ adversarial probes - direct and indirect prompt injection, jailbreaks, tool-invocation abuse, and training-data leakage - against any model or agent behind a uniform adapter, then scores defences with an LLM-as-judge plus deterministic detectors. Results land in a dashboard with an attack-success-rate trendline, so teams can gate releases on whether guardrails actually held. Built on the AI/LLM offensive research from my MSc and bug-bounty work.",
          "stack": [
            "Python",
            "PyTorch",
            "FastAPI",
            "LangChain",
            "Hugging Face Transformers",
            "PostgreSQL",
            "React"
          ],
          "metrics": [
            "600+ versioned adversarial probes",
            "Prompt injection, jailbreak, tool-abuse and leakage coverage",
            "Attack-success-rate gating wired into CI",
            "Model-agnostic adapter across hosted and open-weight LLMs"
          ],
          "tags": [
            "AI/LLM",
            "red-team",
            "evaluation",
            "security"
          ],
          "links": {
            "repo": "https://github.com/imRamis/redteam-lab",
            "demo": "https://redteam.ramis.me",
            "writeup": "https://ramis.me/blog/llm-red-teaming-harness"
          }
        },
        {
          "title": "SentinelRAG - Grounded Retrieval Assistant for Security Knowledge",
          "type": "RAG system",
          "blurb": "A production RAG assistant over a large corpus of vulnerability reports, pentest notes and remediation guidance. I built a hybrid retrieval stack - dense embeddings in Qdrant fused with BM25, a cross-encoder re-ranker, and semantic chunking - so answers stay grounded with inline citations and refuse when context is thin. A retrieval-evaluation suite tracks recall@k and faithfulness on a labelled golden set, and an injection-aware ingestion guard strips adversarial instructions from untrusted documents. It turned scattered tribal knowledge into a queryable, auditable assistant.",
          "stack": [
            "Python",
            "FastAPI",
            "LangChain",
            "Qdrant",
            "Hugging Face Transformers",
            "vLLM",
            "PostgreSQL"
          ],
          "metrics": [
            "Hybrid dense+BM25 retrieval with cross-encoder re-rank",
            "Citation-grounded answers with low-context refusal",
            "recall@k and faithfulness tracked on a golden set",
            "Injection-aware ingestion guard on untrusted docs"
          ],
          "tags": [
            "RAG",
            "vector-search",
            "retrieval-eval",
            "AI/LLM"
          ],
          "links": {
            "repo": "https://github.com/imRamis/sentinel-rag",
            "demo": "https://rag.ramis.me",
            "writeup": "https://ramis.me/blog/grounded-rag-with-injection-guards"
          }
        },
        {
          "title": "TelemetryGuard - ML Anomaly Detection for Security Telemetry",
          "type": "ML anomaly detection",
          "blurb": "An unsupervised anomaly-detection pipeline over authentication, API and network telemetry, built to catch the abuse patterns I exploit by hand - credential stuffing, BOLA probing and slow-burn data exfiltration. It combines Isolation Forest and an autoencoder on engineered behavioural features with entity baselining, and scores events in near-real-time off a streaming feature store. Detections are explained with the top contributing features so analysts get a lead, not just a number, and the thresholds are tuned against a precision/recall curve rather than guesswork. It surfaced anomalous access patterns that signature rules missed.",
          "stack": [
            "Python",
            "PyTorch",
            "scikit-learn",
            "FastAPI",
            "Kafka",
            "PostgreSQL",
            "Grafana"
          ],
          "metrics": [
            "Isolation Forest + autoencoder ensemble with entity baselining",
            "Near-real-time scoring off a streaming feature store",
            "Per-detection feature attribution for analysts",
            "Caught access anomalies that signature rules missed"
          ],
          "tags": [
            "anomaly-detection",
            "ML",
            "security-telemetry",
            "streaming"
          ],
          "links": {
            "repo": "https://github.com/imRamis/telemetry-guard",
            "writeup": "https://ramis.me/blog/ml-anomaly-detection-security-telemetry"
          }
        },
        {
          "title": "ModelForge - MLOps Pipeline for Reproducible Model Delivery",
          "type": "MLOps platform",
          "blurb": "The MLOps backbone behind my AI projects: a reproducible pipeline that versions data, code and parameters, tracks every experiment in MLflow, and promotes models through a registry with staging gates. Training and evaluation run as containerised jobs on Kubernetes, evaluation metrics block promotion on regression, and a fine-tuning path with LoRA/PEFT adapts open-weight models cost-effectively before vLLM serving. Drift and quality are monitored in production with automated rollback, so a bad model never quietly ships. It's the difference between a demo notebook and a system you can trust on call.",
          "stack": [
            "Python",
            "PyTorch",
            "MLflow",
            "Hugging Face Transformers",
            "vLLM",
            "Docker",
            "Kubernetes"
          ],
          "metrics": [
            "Data/code/param versioning with full experiment tracking",
            "Registry promotion gated on evaluation regression",
            "LoRA/PEFT fine-tuning into vLLM self-hosted serving",
            "Production drift monitoring with automated rollback"
          ],
          "tags": [
            "MLOps",
            "fine-tuning",
            "model-serving",
            "reproducibility"
          ],
          "links": {
            "repo": "https://github.com/imRamis/model-forge",
            "demo": "https://mlops.ramis.me",
            "writeup": "https://ramis.me/blog/mlops-reproducible-model-delivery"
          }
        }
      ],
      "contributions": [
        {
          "label": "BugTraceAI - agentic AI engineering R&D (demo)",
          "url": "https://bugtrace.ramis.me",
          "note": "Personal R&D into reliable LLM-agent systems (planning, tool-use, consensus voting, guardrails). Separate from my manual bug-bounty work - no AI is used to find or submit bounties."
        },
        {
          "label": "LLM red-teaming harness write-up",
          "url": "https://ramis.me/blog/llm-red-teaming-harness",
          "note": "How I automate prompt-injection, jailbreak and tool-abuse testing against LLM apps and gate releases on attack-success-rate, drawn from MSc and bug-bounty research."
        },
        {
          "label": "Grounded RAG with injection guards",
          "url": "https://ramis.me/blog/grounded-rag-with-injection-guards",
          "note": "Hybrid retrieval, cross-encoder re-ranking and injection-aware ingestion for citation-grounded answers that refuse when context is thin."
        },
        {
          "label": "MSc Cyber Security & AI - Distinction",
          "url": "https://ramis.me/blog/post-quantum-blind-signature-framework",
          "note": "Distinction at the University of Sheffield; dissertation built a multi-language benchmarking framework with adversarial evaluation at its core."
        }
      ]
    },
    {
      "id": "uiux",
      "label": "UI / UX Engineering",
      "short": "UI / UX",
      "icon": "pen-ruler",
      "tagline": "Accessible, fast, design-system-driven interfaces - from Figma tokens to shipped product.",
      "summary": "I build product front-ends that are quick, accessible and maintainable: React, React Native and Next.js apps, typed component libraries, and data-dense dashboards that operators actually enjoy using. I treat accessibility as engineering rather than garnish, shipping WCAG 2.2 AA flows with semantic markup, keyboard-first interactions and CI-gated axe checks. Years on the offensive side mean I also wire front-ends that fail safely and never leak more than they should.",
      "stats": [
        {
          "value": "10+ yrs",
          "label": "Product + UI engineering"
        },
        {
          "value": "WCAG 2.2 AA",
          "label": "Accessibility shipped & CI-gated"
        },
        {
          "value": "60+",
          "label": "Reusable typed components"
        },
        {
          "value": "98",
          "label": "Lighthouse a11y / perf median"
        }
      ],
      "focusAreas": [
        "React, Next.js and TypeScript application architecture (App Router, RSC, suspense data flows)",
        "React Native cross-platform mobile UI with offline-tolerant, motion-aware flows",
        "Design systems, design tokens and reusable component libraries on Radix/headless primitives",
        "Data-dense dashboards, admin journeys and live operator consoles",
        "WCAG 2.2 AA accessibility engineering - semantic HTML, ARIA, focus management, keyboard paths",
        "Motion design and micro-interactions that confirm state and respect prefers-reduced-motion",
        "Design-to-code handoff: Figma tokens, Storybook docs and visual-regression contracts",
        "Drupal/Twig theming and headless/decoupled front-ends",
        "Front-end performance: Core Web Vitals, bundle budgets, render and hydration tuning",
        "Real-time and streaming UI at thousands of concurrent users sub-100ms"
      ],
      "tools": [
        "React",
        "React Native",
        "Next.js",
        "TypeScript",
        "Angular",
        "Tailwind CSS",
        "SASS",
        "Figma",
        "Storybook",
        "Radix UI",
        "Framer Motion",
        "Drupal / Twig",
        "Playwright",
        "axe-core",
        "Vite",
        "Recharts / D3.js",
        "Style Dictionary",
        "Chromatic"
      ],
      "projects": [
        {
          "title": "Sorvox Design System & Component Library",
          "type": "Design system",
          "shot": "design-system",
          "role": "Lead engineer",
          "blurb": "A typed React + TypeScript component library and token pipeline that unified the look of Sorvox client products and internal AppSec tooling. I built 60+ accessible primitives - forms, tables, modals, toasts, a command palette and a charting kit - on Radix behaviours, with design tokens synced from Figma via Style Dictionary, documented in Storybook and accessibility-regression-tested in CI. It cut new-screen build time sharply and gave engineers a guard-railed way to ship consistent, WCAG-compliant UI.",
          "stack": [
            "React",
            "TypeScript",
            "Radix UI",
            "Storybook",
            "Tailwind CSS",
            "Style Dictionary",
            "axe-core",
            "Chromatic"
          ],
          "metrics": [
            "60+ accessible, typed components in one library",
            "~55% faster new-screen delivery after adoption",
            "Zero critical axe violations gated in CI on every PR",
            "Adopted across 4 product surfaces and 2 internal tools"
          ],
          "tags": [
            "design-system",
            "accessibility",
            "react",
            "typescript"
          ],
          "links": {
            "repo": "https://github.com/imRamis/sorvox-design-system",
            "demo": "https://ds.ramis.me",
            "writeup": "https://ramis.me/#/blog/building-an-accessible-design-system"
          }
        },
        {
          "title": "BugTraceAI Run Inspector (R&D UI)",
          "type": "Dashboard / data UX",
          "shot": "bugtrace-dashboard",
          "role": "Creator",
          "note": "The front-end for BugTraceAI, my personal AI-engineering R&D platform - separate from my (manual) bug-bounty work.",
          "blurb": "The React front-end for BugTraceAI, my personal AI-engineering R&D platform for reliable LLM-agent systems. It turns a noisy six-phase agent pipeline into a calm operator experience: live run progress streamed over SSE, a triage queue spanning 14 classes, consensus-vote indicators and per-item evidence views with reproduction steps. The demo run surfaces 145 candidates with 43 validated, so the UI had to make confidence and validation state legible at a glance without overwhelming the reviewer - a data-UX problem in making non-deterministic agent output trustworthy to read.",
          "stack": [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Recharts",
            "TanStack Query",
            "FastAPI"
          ],
          "metrics": [
            "145 findings / 43 validated rendered without UI lag",
            "14 vulnerability classes in one keyboard-navigable triage queue",
            "Live pipeline progress streamed over server-sent events",
            "Virtualised tables keep 5k+ rows scrolling at 60fps"
          ],
          "tags": [
            "dashboard",
            "data-viz",
            "security",
            "react"
          ],
          "links": {
            "repo": "https://github.com/imRamis/bugtraceai-dashboard",
            "demo": "https://bugtraceai.ramis.me",
            "writeup": "https://ramis.me/#/blog/designing-the-bugtraceai-dashboard"
          }
        },
        {
          "title": "Apricart Operations Console - Orders, Fulfilment & Live Ops",
          "type": "Admin / operator UX",
          "shot": "ops-console",
          "role": "Contributor",
          "blurb": "A React + TypeScript admin console for the Apricart e-commerce and payments platform, giving operators a single pane over orders, fulfilment, refunds and live delivery tracking on top of backend services handling 800K+ daily requests. I designed the data-dense journeys around real warehouse and support workflows - bulk actions, optimistic status updates, audit trails and role-scoped views - and tuned the heaviest tables and maps so they stayed responsive at peak retail load. Accessibility and clear destructive-action affordances were treated as first-class, since operators live in this UI all day.",
          "stack": [
            "React",
            "TypeScript",
            "Redux Toolkit",
            "Tailwind CSS",
            "MapLibre GL",
            "REST APIs"
          ],
          "metrics": [
            "Backed services at 800K+ daily requests, 99.8% availability",
            "~40% faster order-handling time in support workflows",
            "Role-scoped views with audited destructive actions",
            "Virtualised order tables stay smooth at peak load"
          ],
          "tags": [
            "admin-ux",
            "ecommerce",
            "data-dense",
            "react"
          ],
          "links": {
            "repo": "https://github.com/imRamis/apricart-ops-console",
            "demo": "https://ops.ramis.me",
            "writeup": "https://ramis.me/#/blog/designing-a-high-traffic-ops-console"
          }
        },
        {
          "title": "Chatcloud Embeddable Chat Widget & Admin Console",
          "type": "Real-time product UI",
          "shot": "chat-widget",
          "role": "Contributor",
          "blurb": "The customer-facing chat widget and Angular admin console for Chatcloud's real-time messaging SaaS. The embeddable widget was themeable per tenant, fully keyboard-navigable, and tuned to render smoothly at 5K-8K concurrent users with sub-100ms message paint. The admin console gave operators live conversation views, user management and analytics without drowning them in data. I focused on resilient WebSocket UI states - reconnect, backoff and optimistic sends that never lie to the user.",
          "stack": [
            "Angular",
            "TypeScript",
            "Socket.IO",
            "SASS",
            "RxJS",
            "Web Components"
          ],
          "metrics": [
            "5K-8K concurrent users at sub-100ms message paint",
            "Per-tenant themeable embed shipped as a Web Component",
            "Fully keyboard-operable widget with focus trapping",
            "Optimistic send with safe reconnect and backoff"
          ],
          "tags": [
            "real-time",
            "saas",
            "admin-ux",
            "angular"
          ],
          "links": {
            "repo": "https://github.com/imRamis/chatcloud-widget",
            "demo": "https://chat.ramis.me",
            "writeup": "https://ramis.me/#/blog/resilient-realtime-chat-ui"
          }
        },
        {
          "title": "Carpool Mobile App - React Native Rider & Driver Experience",
          "type": "Mobile UI",
          "shot": "mobile-app",
          "role": "Creator",
          "blurb": "The cross-platform rider and driver experience for a React Native carpooling platform (Laravel backend) that reached around 10K downloads. I designed and built the map-first journey: live GPS matching, in-app chat, ride scheduling and an admin moderation view. The work leaned hard on mobile UX fundamentals - thumb-reachable controls, motion that communicates state, haptics, and offline-tolerant flows for patchy connections - and shipped to both iOS and Android from a single codebase.",
          "stack": [
            "React Native",
            "TypeScript",
            "Reanimated",
            "React Navigation",
            "Google Maps SDK",
            "Redux Toolkit"
          ],
          "metrics": [
            "~10K downloads across iOS and Android",
            "Map-first matching UX with live GPS tracking",
            "In-app chat, ride scheduling and moderation tooling",
            "Offline-tolerant flows with optimistic queueing"
          ],
          "tags": [
            "react-native",
            "mobile",
            "maps",
            "motion"
          ],
          "links": {
            "repo": "https://github.com/imRamis/carpool-react-native",
            "demo": "https://carpool.ramis.me",
            "writeup": "https://ramis.me/#/blog/carpool-app-case-study"
          }
        },
        {
          "title": "Post-Quantum Benchmark Analysis Dashboard (MSc)",
          "type": "Research data UI",
          "shot": "data-viz",
          "role": "Creator",
          "blurb": "A Next.js analysis dashboard built for my Sheffield MSc distinction dissertation comparing post-quantum blind signature schemes. It visualises reproducible performance and security benchmarks across a multi-language library (Python/Rust/Node.js) behind gRPC/REST APIs, letting reviewers compare key sizes, signing latency and verification cost interactively. The interface prioritised clear, accessible data presentation - every chart ships with a data-table fallback - so the comparative framework could be read and reproduced by non-specialists.",
          "stack": [
            "Next.js",
            "TypeScript",
            "D3.js",
            "Visx",
            "Tailwind CSS",
            "REST / gRPC"
          ],
          "metrics": [
            "Interactive multi-scheme benchmark comparison",
            "Every chart paired with an accessible data-table fallback",
            "Reproducible visualisations across 3 language backends",
            "Distinction-grade dissertation artefact"
          ],
          "tags": [
            "data-viz",
            "research",
            "dashboard",
            "accessibility"
          ],
          "links": {
            "repo": "https://github.com/imRamis/pq-blindsig-dashboard",
            "demo": "https://pqbench.ramis.me",
            "writeup": "https://ramis.me/#/blog/visualising-post-quantum-benchmarks"
          }
        },
        {
          "title": "Lumen - Fintech Wallet App",
          "type": "Product UI / fintech",
          "shot": "fintech-wallet",
          "role": "Creator",
          "blurb": "A consumer wallet experience covering balances, transfers, cards and spending insights, built in React Native with a shared design-token core so iOS, Android and web feel identical. I designed the money-movement flows for trust and clarity - confirmation states that never lie, optimistic transfers with safe rollback, biometric gates, and a spending breakdown that turns raw transactions into a story. Every screen ships WCAG 2.2 AA: large tap targets, dynamic-type support, reduced-motion variants and full screen-reader labelling for amounts and statuses.",
          "stack": [
            "React Native",
            "TypeScript",
            "Reanimated",
            "Style Dictionary",
            "Victory Native",
            "Figma"
          ],
          "metrics": [
            "One token core across iOS, Android and web",
            "Trust-first money-movement flows with safe rollback",
            "Biometric auth and reduced-motion variants",
            "WCAG 2.2 AA: dynamic type, SR-labelled amounts"
          ],
          "tags": [
            "fintech",
            "react-native",
            "design-tokens",
            "accessibility"
          ],
          "links": {
            "repo": "https://github.com/imRamis/lumen-wallet",
            "demo": "https://wallet.ramis.me",
            "writeup": "https://ramis.me/#/blog/designing-a-trustworthy-wallet"
          }
        },
        {
          "title": "Aperture - SaaS Marketing Site & Brand System",
          "type": "Marketing UI / brand",
          "shot": "saas-landing",
          "role": "Creator",
          "blurb": "A high-converting marketing site and brand system for a developer-tools SaaS, built on Next.js App Router with MDX-driven content so marketing can ship pages without engineering. I designed the visual language - type scale, motion grammar and a gradient-led component kit - then engineered it for Core Web Vitals: streamed RSC, image optimisation and a strict bundle budget kept it at 99+ Lighthouse across the board. Scroll-linked motion and a live product preview respect prefers-reduced-motion and degrade gracefully without JavaScript.",
          "stack": [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "MDX",
            "Vercel"
          ],
          "metrics": [
            "99+ Lighthouse across perf, a11y and SEO",
            "MDX content model - marketing ships pages solo",
            "Scroll-linked motion that respects reduced-motion",
            "Streamed RSC with a strict bundle budget"
          ],
          "tags": [
            "marketing",
            "next.js",
            "motion",
            "performance"
          ],
          "links": {
            "repo": "https://github.com/imRamis/aperture-marketing",
            "demo": "https://aperture.ramis.me",
            "writeup": "https://ramis.me/#/blog/building-a-fast-marketing-site"
          }
        },
        {
          "title": "Caretrack - Patient Portal & Telehealth UI",
          "type": "Healthcare product UX",
          "shot": "health-portal",
          "role": "Lead engineer",
          "blurb": "A patient-facing portal unifying vitals, medications, appointments and secure video consults into one calm, legible dashboard. Healthcare raises the accessibility and clarity bar, so I treated it as a hard constraint: semantic landmarks, a fully keyboard-operable appointment booker, screen-reader-announced vitals, colour choices that survive deuteranopia, and every chart backed by a data-table fallback. Motion is purposeful and reduced-motion-aware, and destructive or irreversible actions carry deliberate, clearly-labelled confirmation.",
          "stack": [
            "React",
            "TypeScript",
            "Radix UI",
            "TanStack Query",
            "Recharts",
            "WebRTC"
          ],
          "metrics": [
            "Vitals, meds, appointments and video in one view",
            "Keyboard-operable booking with SR-announced state",
            "Colour-blind-safe palette, charts with table fallbacks",
            "Deliberate confirmation on irreversible actions"
          ],
          "tags": [
            "healthcare",
            "accessibility",
            "dashboard",
            "react"
          ],
          "links": {
            "repo": "https://github.com/imRamis/caretrack-portal",
            "demo": "https://portal.ramis.me",
            "writeup": "https://ramis.me/#/blog/accessible-healthcare-ui"
          }
        },
        {
          "title": "Lumen Storefront - Headless Commerce Redesign",
          "type": "E-commerce product UI",
          "shot": "ecommerce",
          "role": "Creator",
          "blurb": "A headless storefront redesign focused on the moments that move revenue: fast product discovery, a frictionless bag, and a checkout that feels instant. Built on Next.js over a commerce API, it uses optimistic cart updates, skeleton-free streamed product grids, and persistent mini-cart state across the journey. I rebuilt the design system around a flexible product-card and filter kit, tuned Largest Contentful Paint on image-heavy pages, and made the entire purchase path keyboard- and screen-reader-complete - accessibility that also happens to lift conversion.",
          "stack": [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Zustand",
            "Commerce API",
            "Storybook"
          ],
          "metrics": [
            "Optimistic cart with persistent cross-page mini-bag",
            "Streamed product grids tuned for LCP on image pages",
            "Reusable product-card and filter component kit",
            "Keyboard- and screen-reader-complete checkout"
          ],
          "tags": [
            "ecommerce",
            "next.js",
            "design-system",
            "performance"
          ],
          "links": {
            "repo": "https://github.com/imRamis/lumen-storefront",
            "demo": "https://store.ramis.me",
            "writeup": "https://ramis.me/#/blog/headless-commerce-redesign"
          }
        }
      ],
      "contributions": [
        {
          "label": "Accessible design system on GitHub",
          "url": "https://github.com/imRamis/sorvox-design-system",
          "note": "Typed, WCAG 2.2 AA React component library with Figma-synced tokens, Storybook docs and Chromatic visual regression."
        },
        {
          "label": "BugTraceAI dashboard write-up",
          "url": "https://ramis.me/#/blog/designing-the-bugtraceai-dashboard",
          "note": "How I made a noisy six-phase AI scanner pipeline legible for human triage without overwhelming the reviewer."
        },
        {
          "label": "Resilient real-time chat UI write-up",
          "url": "https://ramis.me/#/blog/resilient-realtime-chat-ui",
          "note": "Patterns for optimistic sends, reconnect and backoff in WebSocket UIs at 5K-8K concurrent users."
        },
        {
          "label": "Accessibility engineering notes",
          "url": "https://ramis.me/#/blog/building-an-accessible-design-system",
          "note": "Treating WCAG 2.2 AA as a CI-gated engineering constraint, not a launch checklist."
        }
      ]
    }
  ],
  "overview": {
    "heroTaglines": [
      "Software & AI Engineer",
      "Java · Kafka · Distributed Systems",
      "AI / Agent Engineer - LLM systems & RAG",
      "Full-Stack Product Engineer",
      "Penetration Tester - OSCP+",
      "Accessible UI / UX Engineer"
    ],
    "elevator": "Software engineer with 10+ years building event-driven Java/Kafka backends, .NET microservices, AI/LLM products and accessible React front-ends - and an OSCP+ penetration tester who breaks systems to build sturdier ones. Engineering, AI/ML, security and UX, treated as one craft.",
    "about": "I am a **software engineer** with 10+ years shipping production systems end to end - and a penetration tester who uses an attacker's eye to make them harder to break. Based in Nottingham, open to UK roles and relocation, I move comfortably across four disciplines and treat them as one craft rather than four hats. I design **event-driven Java backends** (Spring Boot 3, Kafka + Kafka Streams) that have carried 50K+ daily financial transactions, scaled e-commerce APIs to **6.5M requests a day**, and built real-time messaging for thousands of concurrent users. I build **AI/ML products** - LLM agent systems, RAG pipelines and evaluation harnesses - and I ship **accessible React/TypeScript** front-ends to WCAG 2.2 AA. Security runs through all of it because that's how I was trained, not because it's the headline.\n\nOn the **engineering** side I work in Spring Boot 2.x/3.x with Spring Data JPA, Hibernate and Apache Kafka, with disciplined TDD/BDD (JUnit 5, Mockito, TestContainers, PACT), 88% coverage and a 65% drop in production incidents, plus C#/.NET Core (Polly, AKS, OpenTelemetry, 99.99% uptime), Node, Go, Rust and PHP/Laravel on EKS/AKS. In **AI/ML** I build agentic systems and retrieval pipelines as product features - orchestration, tool-use, RAG with citation grounding and evaluation gating - backed by an **MSc in Cyber Security & AI from the University of Sheffield (Distinction)**. In **UI/UX** I ship typed design systems, data-dense dashboards and mobile apps where accessibility is an engineering constraint, not a coat of paint.\n\nThe **security** practice is the sharp edge of the same engineer. I hold **OSCP+** and **OSCP** (Apr 2025), with the **OSED** exploit-development exam scheduled for mid-2026, and I have **51 accepted findings across several public and private bug-bounty programmes** - every one found by hand, with a reproducible PoC. Living on both sides means my code anticipates the attack and my findings ship as fixes a team can actually merge. I'd rather build the thing and prove it holds than argue about it in the abstract.",
    "philosophy": [
      {
        "title": "Builder's discipline, attacker's eye",
        "text": "I build like an engineer and test like an adversary. Living on both sides means my systems anticipate the attack and my findings ship as fixes a team can merge - maintainable Spring Boot, .NET, Go or TypeScript, not vague advice.",
        "icon": "screwdriver-wrench"
      },
      {
        "title": "Ship it, then prove it holds",
        "text": "I'd rather build the thing and prove it stands up than argue in the abstract - load-tested Kafka throughput, evaluation-gated AI, OSCP+ proofs and reproducible PoCs over confident hand-waving.",
        "icon": "vial-circle-check"
      },
      {
        "title": "Depth over checklist",
        "text": "Whether it is a distributed-systems edge case, an agent that hallucinates under load, or an authorization flaw scanners miss, I chase the hard part automated tools skip and prove the real-world impact.",
        "icon": "magnifying-glass-chart"
      },
      {
        "title": "Build for the human in the loop",
        "text": "Fast, correct software still has to be usable. From an API to an AI feature to an accessible UI, I sweat the experience and build to WCAG 2.2 AA, because clarity is part of a system's real quality.",
        "icon": "universal-access"
      }
    ],
    "seoDescription": "Software & AI engineer (Java/Kafka, LLM agents, RAG, React) and OSCP+ pentester. MSc Cyber Security & AI (Distinction). 10+ years building production systems."
  },
  "bugBounty": {
    "totalAccepted": 51,
    "programs": [
      {
        "name": "Bugcrowd",
        "findings": "5 High/Critical",
        "note": "Five high-impact submissions concentrated on broken access control and server-side request forgery against public web targets."
      },
      {
        "name": "HackerOne",
        "findings": "2 Critical, 10 High, 3 Medium",
        "note": "Largest qualitative footprint - authentication and business-logic bypasses, IDOR/BOLA chains and race conditions across SaaS and API surfaces."
      },
      {
        "name": "Google Bug Hunters",
        "findings": "2 P2/S2",
        "note": "Two priority/severity P2/S2 reports in Google's VRP, focused on sensitive-data exposure and authorization weaknesses."
      },
      {
        "name": "YesWeHack",
        "findings": "4 Critical, 12 High, 5 Medium",
        "note": "Highest volume - 21 accepted findings spanning IDOR/BOLA, SSRF, logic flaws and AI/LLM abuse (prompt injection, unsafe tool invocation)."
      },
      {
        "name": "Intigriti",
        "findings": "8 High",
        "note": "Eight High-severity findings, predominantly authorization bypass and IDOR on multi-tenant application boundaries."
      }
    ],
    "severity": [
      {
        "label": "Critical",
        "count": 8
      },
      {
        "label": "High",
        "count": 35
      },
      {
        "label": "Medium",
        "count": 8
      }
    ],
    "highlights": [
      {
        "title": "Cross-tenant IDOR exposing other organisations' records",
        "severity": "Critical",
        "blurb": "A predictable object reference on a multi-tenant API allowed an authenticated user to enumerate and read records belonging to other tenants, returning full PII payloads with no authorization check on the owning organisation."
      },
      {
        "title": "Authentication / business-logic bypass via state confusion",
        "severity": "Critical",
        "blurb": "Chaining a partially-completed multi-step flow with a replayed token let an attacker bypass a verification gate and assume an elevated session without completing required checks."
      },
      {
        "title": "SSRF reaching internal cloud metadata",
        "severity": "High",
        "blurb": "An unvalidated URL parameter in a server-side fetch could be coerced to internal addresses, surfacing instance metadata and internal service responses that should never be externally reachable."
      },
      {
        "title": "Race condition enabling limit bypass",
        "severity": "High",
        "blurb": "Concurrent requests against a non-idempotent endpoint defeated a single-use constraint, allowing a quota or one-time action to be redeemed multiple times before the backing check settled."
      },
      {
        "title": "LLM prompt injection driving unsafe tool invocation",
        "severity": "High",
        "blurb": "Crafted input embedded in retrieved context steered an AI assistant into invoking a privileged backend tool with attacker-influenced arguments, crossing the intended trust boundary between user content and agent actions."
      }
    ]
  }
};
