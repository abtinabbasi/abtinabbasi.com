import type { Localized } from "@/i18n/config";

export type Company = {
  slug: string;
  /** Localised: the brand itself is translated, not just the copy around it. */
  name: Localized;
  /** Product or site capture. The row's visual anchor. One per locale, since
   *  the site being captured is itself bilingual. */
  hero?: { src: Localized; alt: Localized; width: number; height: number };
  /** Two variants because a wordmark that reads on one canvas disappears on
   *  the other; CSS picks per theme. */
  logo?: { light: string; dark: string; width: number; height: number };
  /** One line, in the company's own terms. */
  description: Localized;
  role: Localized;
  founded: string;
  founders: string[];
  location?: string;
  website?: string;
  socials?: { label: string; href: string }[];
};

// Newest first. No placeholders: an empty slot on a one-entry page reads as
// absence, not anticipation. The index number carries the promise instead.
export const companies: Company[] = [
  {
    slug: "ots-steel-solutions",
    name: {
      en: "OTS Steel Solutions",
      fr: "Solutions d'Acier OTS",
    },
    hero: {
      src: {
        en: "/ots-hero-1792.png",
        fr: "/ots-hero-fr-1792.png",
      },
      alt: {
        en: "The OTS Steel Solutions site, with the racking compliance portal below the fold.",
        fr: "Le site de Solutions d'Acier OTS, avec le portail de conformité des palettiers sous la ligne de flottaison.",
      },
      width: 1792,
      height: 1024,
    },
    logo: {
      light: "/logos/ots-light.png",
      dark: "/logos/ots-dark.png",
      width: 1066,
      height: 454,
    },
    description: {
      // "palettiers", not "racks": it is the word OTS uses on its own French site.
      en: "Vertical CMMS for Racking Compliance Management.",
      fr: "GMAO verticale pour la gestion de la conformité des palettiers.",
    },
    role: {
      en: "Founder & Chief Executive Officer",
      fr: "Fondateur et chef de la direction",
    },
    founded: "2025",
    founders: ["Abtin Abbasi"],
    location: "Montréal, Québec",
    website: "https://otssteelsolutions.com/",
    socials: [],
  },
];
