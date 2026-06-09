# Muhammad Ramis — Portfolio (ramis.me)

A lens-driven personal portfolio. On arrival, visitors **choose a lens** —
**Offensive · Defensive · Engineering · UI·UX** (or the full **Overview**) — and the
entire site re-themes and re-focuses around that discipline. Content spans
penetration testing, security engineering, cloud-native software and accessible
product UX, plus a built-in blog.

## ✨ Highlights

- **"Choose your lens" gateway** — pick a discipline; accent colour, hero copy,
  focus areas, toolkit, default project filter and an animated terminal all adapt.
  Switch lenses anytime from the nav.
- **Lens-aware content** — four curated content packs (focus areas, tools,
  projects, contributions) generated from the CV set and wired to one design system.
- **Blog** — hash-routed (`/#/blog/<slug>`), works on static hosting; clean
  `/blog/<slug>` deep links resolve via `404.html`.
- **Heavy on UX** — glassmorphism, aurora background, scroll-reveal, animated
  counters, marquee, light/dark theme, full keyboard access and
  `prefers-reduced-motion` support.
- **Zero build step** — plain HTML/CSS/JS. Open `index.html` and it runs.

## 📁 Structure

```
index.html              # Shell: gateway, nav, sections, blog, contact
404.html                # Clean-path → hash-route redirect
CNAME                   # ramis.me custom domain
sw.js                   # Unregisters any legacy service worker
assets/
  css/style.css         # The whole design system (theming + components + motion)
  js/
    data.js             # Factual core: profile, certs, education, experience, awards
    content.js          # Generated: career tracks, blog posts, overview copy
    app.js              # Lens engine, rendering, router, animations, markdown
  cv/                   # Publishable, neutral-named CV PDFs (per discipline)
  favicon.ico
build-data.mjs          # Local helper: sanitises generated content → content.js
.github/workflows/      # Static deploy to GitHub Pages
```

## 🚀 Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```

No dependencies, no bundler.

## 🌐 Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes the repo
root to GitHub Pages with the `ramis.me` custom domain (`CNAME`). Point the
`ramis.me` DNS at GitHub Pages and enable HTTPS in the repo's Pages settings.

> Role-targeted source CVs in the repo root are git-ignored (kept private);
> the neutral copies under `assets/cv/` are the ones served publicly.

## ✏️ Editing content

- **Facts** (experience, certs, awards, contact, lens metadata): `assets/js/data.js`.
- **Track packs, blog posts, overview copy**: `assets/js/content.js`.
- **Design**: `assets/css/style.css` (lens accents live in the `[data-lens="…"]` rules).

---

© 2026 Muhammad Ramis · [LinkedIn](https://linkedin.com/in/imramis) · [GitHub](https://github.com/imRamis)
