---
title: "From IDOR to Full Account Takeover: A Repeatable Authorization-Matrix Workflow"
date: "2025-11-18"
track: "cybersecurity"
readingTime: "8 min read"
excerpt: "A practical, repeatable method for finding IDOR/BOLA and chaining it into full account takeover, built on a Burp plus Python authorization-matrix workflow. Drawn from accepted findings across YesWeHack and Intigriti programmes."
tags:
  - "idor"
  - "bola"
  - "account-takeover"
  - "burp-suite"
  - "api-security"
  - "bug-bounty"
---

Most IDOR write-ups stop at "I changed `id=1001` to `id=1002` and saw someone else's invoice." That is a finding, but it is rarely the finding. The reports that get triaged as Critical are the ones where a flat object-reference bug becomes a lever: read someone's data, then write to it, then pivot into the bits of an account that let you own it outright. This post is the method I use to get there reliably, built around an authorization matrix that I drive with Burp and a small Python harness. I have used this exact workflow to land accepted submissions across YesWeHack and Intigriti programmes, and the value is that it is boring and repeatable rather than clever.

## Why a matrix beats one-off poking

The core mistake with manual IDOR hunting is that you test one endpoint at a time and forget context. Broken Object Level Authorization (BOLA) is fundamentally a question of *who* can touch *which object* via *which verb*. That is three dimensions, and your brain cannot hold them. So I build a literal table.

Rows are object references I have collected (user IDs, order IDs, document UUIDs, team IDs). Columns are the identities I control: typically two low-privilege accounts in the same tenant (Alice and Bob), plus an unauthenticated session and, where relevant, a second tenant. Cells record the response for each `GET/PUT/PATCH/DELETE` against that object as that identity. The bug is any cell where a cross-identity request succeeds when it should 403.

The discipline this enforces is what catches takeover chains: you stop thinking "can I read it" and start thinking "as Bob, what can I *write* to Alice's objects."

## Step 1 - Map the object space with two accounts

Register two accounts and drive the app through every flow with Burp's proxy capturing both. The goal is to enumerate every parameter that looks like an object handle. I tag them in Burp and export with a small extension, but the manual version is just careful sitemap review.

Watch specifically for: sequential integers (trivially enumerable), UUIDs leaked in earlier responses (so authorization, not unguessability, is the only control), composite keys like `/teams/{tid}/members/{uid}`, and references hidden in request bodies or JWT-adjacent fields rather than the URL.

## Step 2 - Run the matrix programmatically

Manual swapping does not scale past a handful of objects. I drive the matrix with a Python harness that replays each request as each identity and diffs the outcome. The key is comparing the cross-identity response against the legitimate-owner baseline, not just the status code - plenty of broken endpoints return `200` with an empty body, and plenty of well-behaved ones return `200` with a generic "no access" page.

```python
import requests, hashlib

# identities -> session cookies / bearer tokens
IDS = {
    "alice": {"Authorization": "Bearer A..."},
    "bob":   {"Authorization": "Bearer B..."},
    "anon":  {},
}

# (method, url-template, owner) - owner is who legitimately controls it
OBJECTS = [
    ("GET",   "https://api.target/v2/orders/{}", "alice", "8841"),
    ("PATCH", "https://api.target/v2/users/{}/email", "alice", "8841"),
]

def fingerprint(r):
    body = r.text[:4096]
    return r.status_code, hashlib.sha1(body.encode()).hexdigest()[:10]

for method, tpl, owner, ref in OBJECTS:
    url = tpl.format(ref)
    base = requests.request(method, url, headers=IDS[owner],
                            json={"email": "pwn@evil.test"} if method != "GET" else None)
    print(f"\n{method} {url} (owner={owner}) -> {fingerprint(base)}")
    for who, hdr in IDS.items():
        if who == owner:
            continue
        r = requests.request(method, url, headers=hdr,
                             json={"email": "pwn@evil.test"} if method != "GET" else None)
        flag = "POSSIBLE BOLA" if r.status_code < 400 else "ok"
        print(f"  as {who:6} -> {fingerprint(r)}  [{flag}]")
```

Anything flagged goes back into Burp Repeater for manual confirmation. The harness is a triage filter, not the proof.

## Step 3 - Promote a read into a write

A read-only IDOR on order history is Medium at best. To escalate, walk the same object through its other verbs. The pattern that has paid off most often for me: the `GET` is properly scoped but the `PUT`/`PATCH` on the same resource is not, because the team bolted authorization onto the read path and assumed writes inherited it. Always test the mutating verbs explicitly even when the read is locked down - they are separate code paths far more often than people expect.

## Step 4 - Chain toward takeover

This is where the matrix earns its keep. Account takeover almost never comes from one endpoint; it comes from a writable object that influences authentication. Look for cross-identity writes to:

- **Email or phone fields** on another user's profile - if the reset flow trusts the stored email, you have just redirected their recovery.
- **`PATCH /users/{id}/email`** with no re-verification, then trigger a standard password reset to the new address.
- **OAuth or SSO linking** endpoints that bind an identity provider to a user ID taken from the request body rather than the session.
- **Role or membership writes** that let Bob add himself to Alice's team, or escalate his own role.

The strongest chains I have reported looked like this: an enumerable user ID (info-only on its own), plus an unauthenticated-relative `PATCH` to the email field (a writable BOLA), plus a reset flow that emailed a token to the attacker-controlled address. Individually, two of those three barely register. Composed, they are full takeover. Write the report as that single attack narrative - triagers reward an end-to-end proof of impact far more than three loosely related notes.

## Reporting so it gets paid

Lead with the impact sentence: "An authenticated user can take over any other account by changing the victim's recovery email via an unauthorised PATCH." Then give the minimal reproduction as raw HTTP, a clean two-account setup, and a single screenshot or video showing you logged into the victim. Note the root cause as object-level authorization missing on the write path - programme owners fix faster when you hand them the *why*.

## Takeaways

- IDOR/BOLA is a three-dimensional problem (identity x object x verb); track it in a literal matrix, not in your head.
- Always test mutating verbs separately - read scoping rarely guarantees write scoping.
- Escalation comes from chaining a writable object into the authentication flow (email, phone, SSO link, role).
- Automate the matrix to triage; confirm everything by hand in Repeater before reporting.
- Report the full chain as one impact narrative; that is the difference between Medium and Critical.
