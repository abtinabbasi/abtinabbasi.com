import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThemeScript } from "@/components/theme-script";
import { companies } from "@/content/companies";
import { site } from "@/content/site";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.hero.subtitle}`,
      template: `%s — ${site.name}`,
    },
    description: dict.hero.subtitle,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "profile",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: `${site.name} — ${dict.hero.subtitle}`,
      description: dict.hero.subtitle,
      locale: locale === "fr" ? "fr_CA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${dict.hero.subtitle}`,
      description: dict.hero.subtitle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // A graph rather than one node: schema.org defines `founder` on Organization,
  // not on Person, so the relationship has to be stated from the company's side
  // and pointed back by @id. Person keeps `worksFor`, which is valid on Person.
  const personId = `${site.url}/#person`;
  const orgId = (slug: string) => `${site.url}/#organization-${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        description: dict.hero.subtitle,
        sameAs: site.socials.map((s) => s.href),
        worksFor: companies.map((c) => ({ "@id": orgId(c.slug) })),
      },
      ...companies.map((c) => ({
        "@type": "Organization",
        "@id": orgId(c.slug),
        name: c.name[locale],
        description: c.description[locale],
        foundingDate: c.founded,
        founder: { "@id": personId },
        ...(c.website ? { url: c.website } : {}),
      })),
    ],
  };

  return (
    // The theme script sets data-theme before paint, so server markup and the
    // first client render legitimately differ on this element.
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <SiteNav locale={locale} dict={dict} />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
