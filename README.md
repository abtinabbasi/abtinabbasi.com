# abtinabbasi.com

Personal site. Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.
Deployed on Vercel, DNS on Cloudflare.

## Editing the site

All copy lives in **`src/content/site.ts`**. Change it there — the pages read from it.
Everything marked `TODO` is a placeholder.

## Local dev

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  content/site.ts        ← all content (edit this)
  app/
    layout.tsx           ← metadata, fonts, JSON-LD Person schema
    page.tsx             ← the page
    globals.css          ← design tokens (light + dark)
    opengraph-image.tsx  ← generated social preview card
    sitemap.ts / robots.ts
```

## Deploying

Pushes to `main` deploy to production automatically. Every other branch and PR
gets its own preview URL.
