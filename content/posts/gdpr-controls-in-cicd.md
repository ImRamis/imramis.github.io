---
title: "Closing 24 GDPR Control Gaps by Wiring Article 30/32 into CI/CD"
date: "2025-12-15"
track: "cybersecurity"
readingTime: "8 min read"
excerpt: "How I turned GDPR Articles 30 and 32 from a quarterly spreadsheet exercise into automated pipeline gates, closing 24 control gaps and mapping 74 PII fields before they ever reached production."
tags:
  - "gdpr"
  - "ci-cd"
  - "appsec"
  - "compliance-as-code"
  - "data-protection"
---

Most teams treat GDPR like a fire drill: a frantic spreadsheet review the week before an audit, a few apologetic Jira tickets, and a promise to "do better next quarter". The problem is that data-protection debt accrues exactly where you ship fastest — in the pull requests that quietly add a new column, log a token, or wire up a third-party SDK. By the time the annual review catches it, the offending field has been in production for months.

On one engagement I inherited a Record of Processing Activities (RoPA) that was nine months stale and 24 documented control gaps spread across encryption, retention and audit trails. Rather than re-running the spreadsheet, I moved the relevant parts of **Article 30 (records of processing)** and **Article 32 (security of processing)** into the CI/CD pipeline as machine-checkable gates. This post is how that was built, and why it stuck.

## The two articles, reframed as checks

Article 30 is fundamentally an inventory problem: what personal data do you process, where does it flow, and on what legal basis. Article 32 is a controls problem: is that data encrypted in transit and at rest, is access logged, and can you demonstrate it. Neither needs to be a narrative document if you treat the codebase as the source of truth.

The trick is annotating data at the point of definition. I tagged every model field that touches personal data with a structured marker so the inventory could be generated, not hand-maintained.

```python
# models/customer.py
from dataclasses import dataclass, field

def pii(category: str, basis: str, retention_days: int):
    return field(metadata={"pii": True, "category": category,
                           "legal_basis": basis, "retention_days": retention_days})

@dataclass
class Customer:
    email: str        = pii("contact", "contract", 1095)
    full_name: str    = pii("identity", "contract", 1095)
    ip_address: str   = pii("technical", "legitimate_interest", 90)
    marketing_optin: bool = pii("preference", "consent", 730)
```

A simple AST walk over the repository harvests these markers into a generated `ropa.json`. That file *is* the Article 30 record — versioned, reviewable, and diffable in every PR. When this work landed, the harvester surfaced **74 PII fields**, eleven of which were undocumented and three of which had no defensible legal basis at all.

## Gate 1: the data-flow map must stay current

The first gate fails the build if the generated RoPA drifts from the committed one. This is what stops the inventory going stale, because adding a PII field without documenting it now breaks CI.

```yaml
# .github/workflows/gdpr-gates.yml
name: gdpr-controls
on: [pull_request]
jobs:
  ropa-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Regenerate RoPA from source
        run: python tools/harvest_ropa.py --out ropa.generated.json
      - name: Fail on undocumented PII
        run: |
          diff <(jq -S . ropa.json) <(jq -S . ropa.generated.json) \
            || { echo "::error::RoPA drift — update ropa.json"; exit 1; }
```

Because the diff is human-readable, the reviewer sees exactly which field changed and can sanity-check the legal basis in the same review. Compliance stops being a separate workflow and becomes a line in a code review.

## Gate 2: encryption and retention as policy

Article 32 cares about *how* the data is protected, so the second gate is a policy engine that reads the RoPA and asserts controls. I used Open Policy Agent because the rules are declarative and easy for non-engineers to read.

```rego
package gdpr.article32

deny[msg] {
    field := input.fields[_]
    field.retention_days > 1095
    msg := sprintf("%s retained %d days exceeds 3y cap", [field.name, field.retention_days])
}

deny[msg] {
    field := input.fields[_]
    field.category == "identity"
    not field.encrypted_at_rest
    msg := sprintf("identity field %s not encrypted at rest", [field.name])
}
```

The retention rule alone closed six of the 24 gaps — fields that had been quietly accumulating beyond any documented schedule. I paired it with a scheduled job that turns `retention_days` into actual deletion, so the policy and the database can never disagree for long. The rule is the contract; the cron job is the enforcement.

## Gate 3: no secrets in transit, no PII in logs

Two of the nastiest gaps were a payment service talking to an internal API over plain HTTP, and an access log writing raw email addresses. Both are detectable statically. I added a Semgrep ruleset to the same pipeline:

```bash
semgrep --config ./gdpr-rules/ --error \
  --severity ERROR --metrics off src/
```

The custom rules flagged `http://` literals pointing at internal hosts, logger calls receiving fields tagged as PII, and any `TLSv1.0`/`TLSv1.1` constants. Catching the log-leak pattern at PR time meant the audit-trail requirement under Article 32(1)(d) — being able to evaluate effectiveness of controls — was met by construction, because the logs themselves no longer needed redacting after the fact.

## Gate 4: tamper-evident audit trails

Demonstrability is half of Article 32. I required every service handling personal data to emit structured access events to an append-only sink, and added a contract test that fails if a handler reads a PII field without emitting a corresponding `data_access` event. It is a coverage check, not a runtime one, but it forces the audit trail to exist in the code path rather than being bolted on.

## What actually closed the 24 gaps

The breakdown was roughly: 6 retention overruns, 5 encryption-at-rest gaps, 4 in-transit weaknesses, 3 missing legal bases, 3 PII-in-logs issues, and 3 audit-trail blind spots. None required heroics. They required moving the check left so it ran on every merge instead of once a year.

The cultural shift mattered more than any single rule. Once engineers saw a red X on a PR explaining *which* field violated *which* article, the conversation moved from "is this compliant" to "here's the one-line fix". Compliance became a property of the build, not a project.

## Takeaways

- Treat the codebase as your Article 30 record: annotate PII at the point of definition and generate the RoPA, never hand-maintain it.
- A drift gate is what keeps the inventory honest — undocumented PII should break CI like any other failing test.
- Encode Article 32 as policy (OPA/Rego) so retention, encryption and TLS minimums are asserted, not assumed.
- Static analysis catches the highest-impact leaks — plaintext transit and PII in logs — before they ever ship.
- Make the audit trail a code-path requirement, not an afterthought, so demonstrability comes for free.
- Pair every retention policy with real deletion; a rule the database can violate is theatre.
