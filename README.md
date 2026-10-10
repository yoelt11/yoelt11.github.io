# Edgar Torres — portfolio

Personal profile site (Astro), deployed free to GitHub Pages. Modeled on the structure of ziyaerkoc.com: one tab per section, each section a **separate URL** with a **banner intro** + a **card grid**.

## URLs (this is how "tabs" become real links)

| Tab          | URL                        | File(s)                                  |
|--------------|----------------------------|------------------------------------------|
| Home         | `/`                        | `src/pages/index.astro`                  |
| Projects     | `/projects/`               | `src/pages/projects.astro`               |
| Project page | `/projects/<slug>/`        | `src/pages/projects/[...slug].astro`     |
| Publications | `/publications/`           | `src/pages/publications.astro`           |
| Blog         | `/blog/`                   | `src/pages/blog.astro`                   |
| Post page    | `/blog/<slug>/`            | `src/pages/blog/[...slug].astro`         |

**There is no "linking" between GitHub and individual sub-paths.** GitHub Pages serves your *whole repo* at your domain — any folder = a URL. A project lives at `/projects/worldagents/` purely because there's a file `src/content/projects/worldagents.md`; Astro turns it into `dist/projects/worldagents/index.html`, and GitHub serves it at `/projects/worldagents/`. Zero routing config.

## Add content (no HTML editing)

Drop a markdown file in `src/content/<section>/`:

```md
# src/content/projects/my-thing.md
---
title: "My Thing"
summary: "One-line teaser for the card."
year: 2026
tags: ["PINNs", "JAX"]
links:
  paper: https://arxiv.org/abs/XXXX.00000
  code: https://github.com/yoelt11/my-thing
---
Details / figures / abstract go here.
```

A card appears in the grid automatically and its own page `/projects/my-thing/` is generated. Same pattern for `publications/` and `posts/`.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

## Deploy → GitHub Pages (free)

**Deploy step**
```bash
cd portfolio
git init && git add -A && git commit -m "portfolio v1"
git branch -M main
git remote add origin https://github.com/yoelt11/yoelt11.github.io.git
git push -u origin main
```

**Done — no Pages settings needed.** A repo named `<username>.github.io` auto-serves on `main` at `https://yoelt11.github.io/` (~1–2 min to propagate). GitHub Issues/Pages tab will show it live.

## Custom domain (the Cloudflare part — optional, later)

1. In the repo **Settings → Pages** enter `yourdomain.com` under *Custom domain* and save. GitHub writes a `CNAME` file into your repo.
2. Your DNS provider (Cloudflare) keeps its role as *DNS only & optionally CDN* — the *linking* is done by step 1, not DNS:
   - **A record** `yourdomain.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME record** `www` → `yoelt11.github.io`
3. Back in Settings → Pages → **Enforce HTTPS** (free auto-cert).

> Note: today `ziyaerkoc.com` resolves *directly* to GitHub Pages IPs (no Cloudflare proxy in front). His Cloudflare is DNS-only. If you turn on Cloudflare's orange-cloud proxy, the A records must be generic `*` + proxied `CNAME` — the GitHub-CNAME file is unaffected.

## Costs

$0 for hosting and SSL (GitHub Pages). The only cost is the domain name itself (~$10/yr at Cloudflare). Nothing else.
