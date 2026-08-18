import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyList } from "@/components/company-list";
import { companies } from "@/content/companies";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/companies">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.companies.title,
    alternates: { canonical: `/${locale}/companies` },
  };
}

export default async function CompaniesPage({
  params,
}: PageProps<"/[locale]/companies">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    // Bottom padding is deliberately short of the top: the footer already
    // carries 96px of its own space above its rule, so matching pads here
    // would centre the ledger in the box while leaving it high on the screen.
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pt-24 pb-4 sm:px-10 sm:pt-28">
      {/* Deliberately untitled. The heading is here for document structure and
          assistive tech, not as a visual element. */}
      <h1 className="sr-only">{dict.companies.title}</h1>

      <CompanyList companies={companies} locale={locale} dict={dict} />
    </div>
  );
}
