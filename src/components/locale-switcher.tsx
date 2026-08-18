"use client";

import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LocaleSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const other = locales.find((l) => l !== locale) ?? locale;

  // Swap only the leading locale segment, keep the rest of the path.
  const segments = pathname.split("/");
  segments[1] = other;
  const href = segments.join("/") || `/${other}`;

  return (
    // A plain anchor, not next/link, on purpose. Switching locale changes the
    // document's lang, so a full navigation is the honest thing — and a soft
    // one would re-render the root layout on the client, which makes React
    // warn about the inline theme and JSON-LD scripts it contains.
    <a
      href={href}
      hrefLang={other}
      aria-label={label}
      title={label}
      className="text-faint hover:text-fg font-mono text-[11px] tracking-wider transition-colors"
    >
      {localeNames[other]}
    </a>
  );
}
