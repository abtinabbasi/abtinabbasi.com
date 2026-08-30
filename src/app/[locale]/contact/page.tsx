import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmailReveal } from "@/components/email-reveal";
import { site } from "@/content/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    // Same box as the companies ledger, so the heading starts on the left edge
    // the nav wordmark and the ledger rules already share.
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pt-24 pb-4 sm:px-10 sm:pt-28">
      {/* Titled, unlike the ledger: with one line and one control on the page,
          the heading is the page rather than a label on top of it. */}
      <h1 className="text-[clamp(2.25rem,7vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
        {dict.contact.title}
      </h1>

      {/* Measure is held on the paragraph itself rather than on a wrapper: the
          rule below has to run to the same right edge as the footer's and the
          ledger's, and a shared wrapper would cut it short. */}
      <p className="text-muted mt-5 max-w-md text-[15px] leading-relaxed">
        {dict.contact.intro}
      </p>

      {/* The rule does the same work it does in a ledger row: separates the
          statement from the record beneath it. */}
      <div className="border-line mt-10 border-t pt-9">
        <EmailReveal encoded={site.emailEncoded} label={dict.contact.reveal} />
      </div>
    </div>
  );
}
