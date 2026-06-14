---
title: "An ML Anomaly Detector for Auth Logs That a SOC Actually Trusts"
date: "2026-02-23"
track: "aiml"
readingTime: "8 min read"
excerpt: "A practical walkthrough of building an unsupervised anomaly detector for authentication logs - feature engineering that survives contact with reality, isolation forest versus autoencoder, taming false positives, and giving analysts an explanation they can act on."
tags:
  - "anomaly-detection"
  - "machine-learning"
  - "soc"
  - "authentication"
  - "explainability"
---

Most ML detection projects die the same way: the model flags 400 "anomalies" a night, the SOC triages the first dozen, finds them all benign, and quietly mutes the feed. The model was never wrong about the maths - it was wrong about the operating context. When I built an anomaly detector over authentication logs, my single hardest constraint was not AUC. It was earning an analyst's trust on day three, when the novelty has worn off and every false positive is a personal insult.

This post is how I got there: the features that mattered, why I shipped an isolation forest before an autoencoder, how I held false positives to something a human can absorb, and the explainability layer that made the difference between "ignore" and "investigate".

## Why authentication logs, and why unsupervised

Auth logs are a sweet spot. They are high volume, structurally consistent (user, source IP, timestamp, result, user agent, geo), and the interesting events - credential stuffing, impossible travel, low-and-slow brute force, a service account suddenly logging in from a workstation - are genuinely rare. Rare and unlabelled is exactly where unsupervised anomaly detection belongs. You almost never have clean labels for "compromised login", and by the time you do, the technique has moved on.

So the framing is: model what *normal* looks like per entity, and score deviation. No attack signatures, no chasing yesterday's IOCs.

## Feature engineering is 80% of the result

The model is almost an afterthought next to the features. Raw log lines are useless; the signal lives in *behavioural context* relative to an entity's own baseline. I engineer features per (user, hour-bucket) window:

- **Velocity**: failed logins in the last 1/5/60 minutes; distinct source IPs per user per hour.
- **Novelty**: is this ASN/country/user-agent new for *this* user in the trailing 30 days? (boolean + days-since-first-seen)
- **Temporal**: hour-of-day and day-of-week encoded as sine/cosine pairs so 23:00 and 00:00 are neighbours, not opposites.
- **Impossible travel**: great-circle distance / time-delta between consecutive successful logins, capped at a sane max speed.
- **Entity rarity**: smoothed frequency of the source IP and ASN across the whole population.

Two rules saved me. First, compute baselines on a **trailing window that excludes the event being scored** - otherwise the anomaly contaminates its own baseline and the score collapses. Second, log-scale every count feature; raw counts give the model a heavy tail it will obsess over.

```python
import numpy as np

def encode_cyclical(series, period):
    radians = 2 * np.pi * series / period
    return np.sin(radians), np.cos(radians)

def build_features(df):
    df["fail_1m"]  = rolling_count(df, "result", "fail", "1min")
    df["fail_5m"]  = rolling_count(df, "result", "fail", "5min")
    df["distinct_ip_1h"] = rolling_nunique(df, "src_ip", "1h")
    df["new_country"]    = is_new_for_user(df, "country", window="30d")
    df["days_since_asn"] = days_since_first_seen(df, "asn")
    df["travel_kmh"]     = impossible_travel_speed(df)
    df["hour_sin"], df["hour_cos"] = encode_cyclical(df["hour"], 24)
    count_cols = ["fail_1m", "fail_5m", "distinct_ip_1h", "travel_kmh"]
    df[count_cols] = np.log1p(df[count_cols].clip(lower=0))
    return df
```

## Isolation forest vs autoencoder

I prototyped both. The honest summary:

**Isolation forest** isolates points by random axis-aligned splits; anomalies need fewer splits to isolate. It is fast, needs almost no tuning, handles mixed-scale features gracefully, and - critically - its path-length contribution per feature is *directly attributable*. It shipped first.

**Autoencoder** (a small dense net, 32-16-8-16-32) reconstructs normal behaviour and flags high reconstruction error. It captured non-linear feature *interactions* the forest missed - e.g. "new country is fine, and 02:00 is fine, but new country *at* 02:00 *with* a fresh user-agent is not". The cost: it needs more data per entity, a GPU is nice, retraining discipline is mandatory, and explaining it is harder.

My decision: **isolation forest as the workhorse, autoencoder as a second-opinion ensemble** on the forest's borderline band. A login is escalated only if both score it anomalous, which crushed the false-positive rate on its own. I validated this offline against a held-out set of confirmed account-takeover incidents and red-team logins; the ensemble recovered the autoencoder's interaction sensitivity without inheriting its noisier tail. This is the same consensus-voting pattern I lean on in my BugTraceAI scanner - independent detectors agreeing is a far stronger signal than one detector shouting.

## Controlling false positives so the feed survives

Raw anomaly scores are not alerts. The pipeline between them is where trust is won or lost:

1. **Per-entity thresholds, not a global one.** A service account's "normal" is tighter than a sales rep's. I set the contamination threshold from each entity's own score distribution (a high percentile of its trailing scores), not one number for the org.
2. **Score, don't gate, then rank.** Everything gets a 0-100 risk score. Analysts see a ranked queue, not a binary firehose. The top 20 each morning is a contract they can keep.
3. **Suppression rules for known-benign anomalies.** VPN egress ranges, the quarterly travelling-exec pattern, CI runners. These are *legitimately* anomalous and *legitimately* boring; they get allow-listed with an expiry so the list does not rot.
4. **Analyst feedback loop.** Every dismissal writes back a label. Weekly, I use that to recalibrate thresholds and surface features that correlate with "dismissed". This LLM-assisted triage style cut duplicate review effort by 61% on a separate scanner stream I run.

The metric I report to the SOC is not precision in the abstract - it is **alerts per analyst per shift** and **percentage of escalations that became a ticket**. Those are the numbers that decide whether the feed stays on.

## Explainability: the part that actually earns trust

An anomaly score of 0.97 tells an analyst nothing. So every alert ships with a plain-language reason derived from per-feature attribution. For the isolation forest I compute each feature's contribution to the short path length; for the ensemble I reconcile that with the autoencoder's per-feature reconstruction error. The output reads like:

> Score 91/100. Drivers: login from a **new country** (Brazil; first-ever for this user), **new ASN**, at **02:14 local** (user normally active 08:00-18:00), following **6 failed attempts in 4 minutes**. Travel speed since prior login: **impossible (1,900 km/h)**.

That sentence is the product. It lets an analyst confirm or dismiss in seconds, and it teaches them what the model weighs - which is how a team graduates from suspicion to trust.

## Takeaways

- Spend your time on entity-relative behavioural features; the model is the easy part.
- Compute baselines on a window that excludes the scored event, and log-scale counts.
- Isolation forest first for speed and attribution; add an autoencoder as an ensemble second opinion for interaction effects.
- Rank by risk score, set per-entity thresholds, and treat analyst dismissals as labels.
- Ship a plain-language reason with every alert - explainability is the trust mechanism, not a nice-to-have.
- Measure alerts-per-shift and escalation-to-ticket rate, not just AUC.
