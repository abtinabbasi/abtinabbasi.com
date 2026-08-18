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
Bilingual (EN/FR), fully prerendered, deployed on Vercel with DNS on Cloudflare.

No web fonts, no client-side data fetching, no runtime code on any request path.

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
| `npm run typecheck`    | `next typegen && tsc --noEmit`   |
| `npm run format`       | Write Prettier formatting        |
| `npm run format:check` | Verify formatting (what CI runs) |

Ports 3000 and 3001 belong to other local projects, so this one is pinned
to 3005.

## Structure

```
src/
  content/          facts — what the site says
    site.ts           identity, socials, portrait
    companies.ts      one entry per company, localised
  messages/         interface strings, one file per locale
    en.json  fr.json
  i18n/
    config.ts         locales, Locale type, isLocale guard
    dictionary.ts     static locale → strings lookup
  app/
    [locale]/
      layout.tsx        metadata, JSON-LD graph, chrome
      page.tsx          home
      companies/        the ledger
      opengraph-image.tsx
    globals.css       design tokens (light + dark)
    sitemap.ts  robots.ts
  components/       nav, footer, company list, theme toggle, cursor
```

Content and interface strings are deliberately separate. `src/content` holds
facts about the world that happen to need translating; `src/messages` holds
labels that exist only because there is a user interface. Changing what the
site _says_ should never require touching markup.

## How the bilingual routing works

Every page lives under a `[locale]` segment, and `generateStaticParams`
enumerates the locales — so `/en/...` and `/fr/...` are prerendered as static
HTML at build time. `/` redirects to the default locale through
`next.config.ts` rather than middleware, so no code runs at request time and
nothing opts a route out of static rendering.

Both dictionaries are imported statically in `dictionary.ts`. That bundles a
few kilobytes of unused strings per locale, which is a cheaper trade than a
dynamic import that would force a request-time boundary.

The language switcher is a plain `<a>`, not `<Link>`. Switching locale changes
`<html lang>`, so a full document navigation is the honest behaviour — and a
soft one would re-render the root layout on the client, which makes React warn
about the inline scripts it contains.

## Theming

Three-step cascade in `globals.css`: `:root` defines the light palette, a
`prefers-color-scheme: dark` block overrides it for anyone who has not chosen
explicitly, and `:root[data-theme="dark"]` overrides it again so a manual
toggle wins in both directions.

A small inline script in `<head>` applies the stored choice before first paint,
which is why it is a real `<script>` and not `next/script` — nothing that runs
after hydration can prevent a flash. The toggle itself is stateless: which icon
and label to show is decided by the same CSS cascade, so there is no hydration
mismatch and nothing to reconcile on mount.

Every text token clears WCAG AA (4.5:1) against every canvas it can land on, in
both themes. The measured worst case is recorded at the top of `globals.css` —
re-measure before changing any of them, because CI gates accessibility at 100.

## Quality gates

Every push and pull request runs:

- **Formatting** — Prettier, with Tailwind class sorting
- **Lint** — ESLint (`next/core-web-vitals` + TypeScript)
- **Types** — `tsc --noEmit`, after `next typegen` so generated route types
  exist on a clean clone
- **Build** — production `next build`
- **Lighthouse** — against the real production build, asserting **100
  accessibility, 100 SEO, 100 best practices**, and warning below 95 performance
- **CodeQL** — `security-and-quality` queries, plus a weekly scheduled scan
- **Dependency review** — blocks pull requests introducing high-severity advisories

`main` is protected: checks must pass before merge. Dependabot opens grouped
dependency PRs weekly; the majors it is told to skip are documented with
reasons in `.github/dependabot.yml`.

## Deploying

Merges to `main` deploy to production automatically. Every pull request gets
its own Vercel preview URL.

## License

The **code** in this repository is MIT licensed — see [LICENSE](./LICENSE).
Take the patterns, the CI setup, whatever is useful.

The **content** is not: the written copy, biographical text, name, likeness,
and the company logos and captures in `public/` are reserved. Please don't
republish them as your own.
