<h1 align="center">abtinabbasi.com</h1>

<p align="center">
  My personal site — <a href="https://abtinabbasi.com">abtinabbasi.com</a>
</p>

<p align="center">
  <a href="https://github.com/abtinabbasi/abtinabbasi.com/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/abtinabbasi/abtinabbasi.com/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/abtinabbasi/abtinabbasi.com/actions/workflows/codeql.yml"><img alt="Security" src="https://github.com/abtinabbasi/abtinabbasi.com/actions/workflows/codeql.yml/badge.svg"></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

---

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript.
Statically prerendered, deployed on Vercel, DNS on Cloudflare.

## Editing content

All copy lives in **`src/content/site.ts`**. Name, tagline, about, work history,
projects, and links are read from there — you should never need to touch markup
to change what the site says.

## Local development

```bash
npm install          # also installs the pre-commit hook
npm run dev          # http://localhost:3005
```

| Script                 | Does                             |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Dev server on port 3005          |
| `npm run build`        | Production build                 |
| `npm run start`        | Serve the production build       |
| `npm run lint`         | ESLint                           |
| `npm run typecheck`    | `tsc --noEmit`                   |
| `npm run format`       | Write Prettier formatting        |
| `npm run format:check` | Verify formatting (what CI runs) |

Ports 3000 and 3001 are used by other local projects, so this one is pinned
to 3005.

## Structure

```
src/
  content/site.ts        ← all content
  app/
    layout.tsx           ← metadata, fonts, JSON-LD Person schema
    page.tsx             ← the page
    globals.css          ← design tokens (light + dark)
    opengraph-image.tsx  ← generated social card
    sitemap.ts
    robots.ts
.github/workflows/
  ci.yml                 ← format · lint · types · build · Lighthouse
  codeql.yml             ← CodeQL + dependency review
```

## Quality gates

Every push and pull request runs:

- **Formatting** — Prettier, with Tailwind class sorting
- **Lint** — ESLint (`next/core-web-vitals` + TypeScript)
- **Types** — `tsc --noEmit`
- **Build** — production `next build`
- **Lighthouse** — 3 runs against the real production build, asserting
  **100 accessibility, 100 SEO, 100 best practices**, and warning below 95
  performance
- **CodeQL** — `security-and-quality` queries, plus a weekly scheduled scan
- **Dependency review** — blocks pull requests introducing high-severity advisories

`main` is protected: checks must pass before merge. Dependabot opens grouped
dependency PRs weekly.

Design tokens are held to WCAG AA contrast — every text color is verified
against its background, which is why the Lighthouse accessibility gate is set
at 100 rather than something softer.

## Deploying

Merges to `main` deploy to production automatically. Every pull request gets
its own Vercel preview URL.

## License

The **code** in this repository is MIT licensed — see [LICENSE](./LICENSE).
Take the patterns, the CI setup, whatever is useful.

The **content** is not: the written copy, biographical text, name, and likeness
are reserved. Please don't republish them as your own.
