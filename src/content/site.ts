// ─────────────────────────────────────────────────────────────
// The only file you need to edit to change what the site says.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: "https://abtinabbasi.com",
  name: "Abtin Abbasi",
  role: "Software Engineer",
  location: "TODO — city, country",

  // One or two sentences. Say what you build and who it's for.
  tagline:
    "I build software for the web — small, fast, and finished.",

  // The longer version. 2–4 short paragraphs.
  about: [
    "TODO — Replace this. What you work on day to day, and what you care about when you build things.",
    "TODO — A second paragraph: background, how you got here, what you're deep in right now.",
  ],

  email: "abtin.abbasi.dv@gmail.com",

  socials: [
    { label: "GitHub", href: "https://github.com/abtinabbasi" },
    { label: "X", href: "https://x.com/TODO" },
    { label: "LinkedIn", href: "https://linkedin.com/in/TODO" },
  ],

  work: [
    {
      role: "TODO — Your title",
      org: "TODO — Company",
      period: "2024 — Present",
      note: "One line on what you actually did there.",
      href: "",
    },
    {
      role: "TODO — Previous title",
      org: "TODO — Company",
      period: "2022 — 2024",
      note: "One line on what you actually did there.",
      href: "",
    },
  ],

  projects: [
    {
      name: "TODO — Project name",
      blurb:
        "What it does in one sentence, and why anyone should care about it.",
      stack: ["TypeScript", "Next.js", "Postgres"],
      href: "https://github.com/abtinabbasi",
      year: "2026",
    },
    {
      name: "TODO — Another project",
      blurb: "One sentence. Resist the urge to write a paragraph.",
      stack: ["Rust", "WASM"],
      href: "https://github.com/abtinabbasi",
      year: "2025",
    },
  ],
} as const;
