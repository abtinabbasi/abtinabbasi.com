// ─────────────────────────────────────────────────────────────
// A record, not a pitch. State facts; no adjectives, no selling.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: "https://abtinabbasi.com",
  name: "Abtin Abbasi",

  // Reversed, then base64'd. Address harvesters read markup, so the rule is
  // that nothing address-shaped — no `mailto:`, no `name@host` — may exist in
  // the HTML; <EmailReveal> decodes this in the browser when someone presses
  // the button. Base64 alone would still leave a readable address in the
  // bundle, hence the reverse: what decodes is `moc.tsoh@eman`, which no email
  // pattern matches. Regenerate after a change with:
  //   node -e "console.log(Buffer.from([...'you@example.com'].reverse().join('')).toString('base64'))"
  emailEncoded: "bW9jLmxpYW1nQHZkLmlzYWJiYS5uaXRiYQ==",

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
