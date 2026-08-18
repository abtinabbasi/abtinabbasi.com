import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

// Without this the image route is server-rendered on demand, which would be
// the only request-time code on the site.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Literal hexes, not the CSS tokens: this renders in Satori, which never sees
// the stylesheet. Values mirror the dark theme in globals.css.
const BG = "#0c0c0d";
const FG = "#e8e7e3";
const MUTED = "#98978f";
const FAINT = "#84837c";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        color: FG,
        padding: 84,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, color: FAINT }}>
        {site.url.replace("https://", "")}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {site.name.split(" ").map((word) => (
          <div
            key={word}
            style={{ display: "flex", fontSize: 104, lineHeight: 1.02 }}
          >
            {word}
          </div>
        ))}
        <div
          style={{ display: "flex", fontSize: 34, color: MUTED, marginTop: 28 }}
        >
          {dict.hero.subtitle}
        </div>
      </div>
    </div>,
    size
  );
}
