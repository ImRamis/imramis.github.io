---
title: "Choose Your Lens: Designing a Portfolio for a Multi-Disciplinary Career"
date: "2026-03-04"
track: "uiux"
readingTime: "8 min read"
excerpt: "How I redesigned a penetration-tester-and-engineer portfolio around a \"choose your lens\" entry point: persona-driven theming on a single token set, progressive disclosure that never traps the reader, and motion that respects prefers-reduced-motion."
tags:
  - "UX"
  - "Accessibility"
  - "CSS"
  - "Design Systems"
  - "Frontend"
  - "Motion Design"
---

A multi-disciplinary career is an asset in interviews and a liability on a landing page. I am a penetration tester and a software engineer with eight-plus years of hybrid experience, and for years my portfolio tried to be both at once. The result was a wall of badges that asked every visitor to do the filtering themselves. A bug-bounty programme manager scanning for OSCP+ and IDOR write-ups had to wade through .NET microservice metrics; a hiring manager for a senior web role had to ignore Ghidra and BloodHound. Nobody's first thirty seconds were good.

So I rebuilt the front door around a single question: **"Choose your lens."** This post is the UX and engineering reasoning behind it.

## The actual UX problem: one site, several audiences

The mistake is treating breadth as a feature to display. It is not. Breadth is context you owe the visitor *after* they have told you who they are. The five lenses I ship are concrete personas, not moods: **Offensive Security**, **AppSec / Engineering**, **Full-Stack**, **Research**, and **Everything**. Each maps to a real reader I have met — a red-team lead, an AppSec manager, a product engineering lead, an academic or post-quantum-curious reviewer, and the recruiter who genuinely wants the whole picture.

The lens is not just a project filter. It changes the hero copy, reorders sections, swaps the featured project (BugTraceAI for security lenses, the post-quantum blind-signature library for research), and selects a theme. One decision, many downstream effects.

## Progressive disclosure, not a maze

The temptation with a chooser is to gate everything behind it. That punishes the recruiter and anyone arriving from a deep link. My rule: the lens reorders and emphasises, it never *hides the exit*. "Everything" is always one click away, every section still exists in the DOM, and the URL carries the choice (`ramis.me/?lens=offensive`) so a shared link lands pre-filtered.

Disclosure happens in three tiers: headline claim, then expandable evidence, then the external proof. A bug-bounty card shows "51 accepted findings across 5 programmes", expands to the per-platform breakdown (YesWeHack: 4 Critical / 12 High / 5 Medium, and so on), and only then links out to a write-up at `https://ramis.me/blog/bola-chain-saas`. Nobody is forced through all three, but the path is there for the reader who wants depth.

## Theming per persona with one set of tokens

The site already runs on CSS custom properties and a `data-theme` attribute on `<body>`, so persona theming is a token swap, not a rebuild. The offensive lens gets the high-contrast terminal palette; the engineering lens gets a calmer, lighter scheme that reads as "production systems", not "capture the flag". Crucially, every theme is defined as the *same variables* with different values, so components never know which lens is active.

```css
:root {
  --accent-color: #000000;
  --bg-primary: #ffffff;
  --transition-time: 0.3s;
}
body[data-theme="hacker"] {
  --accent-color: #00ff00;
  --bg-primary: #000000;
  --text-primary: #00ff00;
}
body[data-theme="engineering"] {
  --accent-color: #0066cc;
  --bg-primary: #ffffff;
  --text-primary: #212529;
}
```

Selecting a lens is one attribute write plus a persisted preference:

```javascript
function applyLens(lens) {
  const theme = LENS_THEME[lens] ?? 'monochrome';
  document.body.dataset.theme = theme;
  document.body.dataset.lens = lens;
  localStorage.setItem('lens', lens);
  history.replaceState(null, '', `?lens=${lens}`);
  window.dispatchEvent(new CustomEvent('lenschange', { detail: { lens } }));
}
```

Sections subscribe to `lenschange` and reorder themselves; the featured-project module listens too. Because the contract is an event plus tokens, I can add a sixth lens later without touching component internals.

## Motion design that earns its place

Motion here has one job: confirm that the *content* changed, since the URL and palette shift can otherwise feel like a full reload. I use a short FLIP-style reflow on the project grid — measure positions, change order, animate the delta — capped around 240ms. The hero subtitle cross-fades rather than retyping, because a second typewriter animation on every lens switch is annoying the moment you switch twice.

The two heaviest effects, the particle field and the matrix rain, are decorative and persona-flavoured. They are also the first things I throttle. Decorative motion is opt-out by default for anyone who has signalled they do not want it.

## Respecting prefers-reduced-motion

This is non-negotiable and trivially cheap, so there is no excuse to skip it. I treat the media query as a hard gate in CSS for transitions, and as a runtime check in JS before starting any animation loop.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
function startMatrixRain() {
  if (reduce.matches) return;      // never start the loop at all
  // ...spawn characters
}
reduce.addEventListener('change', e => {
  if (e.matches) stopAllDecorativeMotion();
});
```

The key detail is the `change` listener: a visitor who flips the OS setting mid-session gets the calm version immediately, and the matrix `setInterval` is actually cleared rather than left running invisibly. Lens switches still work with reduced motion — the grid reorders instantly, the cross-fade collapses to a hard swap. Function is preserved; only the flourish is dropped.

I also keep the lens chooser fully keyboard-navigable with real `aria-pressed` buttons, and the live region announces "Showing offensive security work" so a screen-reader user gets the same orientation a sighted user gets from the palette change.

## Takeaways

- Design for **named personas**, not for showing off breadth; the lens is a promise about the next thirty seconds.
- Progressive disclosure should **reorder and emphasise**, never trap — keep "Everything" and deep links always reachable.
- Drive persona theming through **one token set** so components stay lens-agnostic and adding a lens is cheap.
- Let motion **confirm change**, cap it tightly, and make decorative effects the first thing you cut.
- Treat `prefers-reduced-motion` as a **hard gate with a live `change` listener**, and verify the loops actually stop.
- Persist the choice in `localStorage` **and** the URL so the experience survives refreshes and shares.
