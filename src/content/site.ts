// ─────────────────────────────────────────────────────────────
// A record, not a pitch. State facts; no adjectives, no selling.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: "https://abtinabbasi.com",
  name: "Abtin Abbasi",

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abtin-abbasi/" },
    { label: "GitHub", href: "https://github.com/abtinabbasi" },
  ],

  // Rotated upright from the source (EXIF orientation 6). Full frame, uncropped.
  portrait: {
    // Filename changes with the image on purpose: replacing an asset at the
    // same URL leaves returning visitors with the previous one cached.
    src: "/portrait-full.jpg",
    alt: "Portrait of Abtin Abbasi",
    width: 1200,
    height: 1600,
  },
};
