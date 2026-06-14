# Muhammad Ramis's Portfolio (ramis.me)

A lens-driven personal portfolio with a Git-based CMS. On arrival, visitors
**choose a lens** (Cybersecurity, Engineering, AI/ML, UI/UX, or the full
**Overview**) and the whole site re-themes and re-focuses around that
discipline. Cybersecurity folds offence, defence and a 51-finding bug-bounty
record into one place.

## Highlights

- **"Choose your lens" gateway:** pick a discipline and the accent colour, hero
  copy, rotating roles (red / blue / purple), focus areas, toolkit, default
  project filter and an animated terminal all adapt. Switch lenses anytime from
  the nav.
- **Bug-bounty showcase:** 51 accepted findings across five programs with a
  severity breakdown and representative (sanitised) write-ups.
- **Blog + CMS:** posts are Markdown in `content/posts/`, editable in a browser
  via Decap CMS at `/admin`; CI compiles them to the live site. Hash-routed
  (`/#/blog/<slug>`) so it works on static hosting, with clean `/blog/<slug>`
  deep links resolved by `404.html`.
- **Heavy on UX:** glassmorphism, aurora background, cursor spotlight, card
  tilt, hero parallax, lens-change flash, scroll-reveal, animated counters,
  light/dark, full keyboard access and `prefers-reduced-motion` support.
- **Hybrid, but cheap:** static frontend on free GitHub Pages plus a Git-based
  content layer. No server, no database.

## Structure

```
index.html              # Shell: gateway, nav, sections, bug bounty, blog, contact
admin/                  # Decap CMS (config.yml + index.html); write posts at /admin
content/posts/*.md      # Blog / vuln write-ups (source of truth, edited via CMS)
404.html · CNAME · sw.js
assets/
  css/style.css         # Design system: theming, components, motion
  js/
    data.js             # Factual core: profile, lenses, certs, experience, awards
    content.js          # Generated: 4 lens packs, overview copy, bug-bounty data
    posts.js            # Generated from content/posts/*.md (do not hand-edit)
    app.js              # Lens engine, rendering, router, bug bounty, interactivity
  cv/                   # Publishable, neutral-named CV PDFs (per discipline)
build-posts.mjs         # content/posts/*.md -> assets/js/posts.js (runs in CI)
build-content.mjs       # one-time helper that produced content.js + seed posts
.github/workflows/      # Compile posts + static deploy to GitHub Pages
```

## Local preview

```bash
python -m http.server 8000          # then open http://localhost:8000
```

## Writing posts (CMS)

```bash
npx decap-server                    # local CMS backend (no auth needed)
# open http://localhost:8000/admin, write a post, it saves to content/posts/
node build-posts.mjs                # recompile assets/js/posts.js
```

For live editing on ramis.me, set up a GitHub OAuth app plus a small OAuth proxy
(or host the admin on Netlify with git-gateway); see comments in
`admin/config.yml`. Either way, CI runs `build-posts.mjs` before each deploy.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: it compiles the Markdown
posts, then publishes the repo root to GitHub Pages with the `ramis.me` custom
domain (`CNAME`). Point `ramis.me` DNS at GitHub Pages and enable HTTPS.

> Role-targeted source CVs in the repo root are git-ignored (kept private);
> the neutral copies in `assets/cv/` are served publicly.

## Editing content

- **Facts** (experience, certs, awards, contact, lenses, rotating roles): `assets/js/data.js`
- **Lens packs, overview copy, bug-bounty data**: `assets/js/content.js`
- **Blog posts**: `content/posts/*.md` (via `/admin`), then `build-posts.mjs`
- **Design**: `assets/css/style.css` (lens accents are the `[data-lens]` rules)

---

© 2026 Muhammad Ramis · [LinkedIn](https://linkedin.com/in/imramis) · [GitHub](https://github.com/ImRamis)
