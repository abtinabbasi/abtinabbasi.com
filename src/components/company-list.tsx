import Image from "next/image";
import type { ReactNode } from "react";
import type { Company } from "@/content/companies";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

// A ledger, not a grid. Each company owns a full-width row, so one entry reads
// as deliberate rather than as two-thirds of an empty shelf. No client state
// and no dialog: everything the row knows is already on the page, and the one
// destination worth a click is the company itself.
export function CompanyList({
  companies,
  locale,
  dict,
}: {
  companies: Company[];
  locale: Locale;
  dict: Dictionary;
}) {
  if (companies.length === 0) {
    return <p className="text-muted">{dict.companies.empty}</p>;
  }

  return (
    // The closing rule lives on the list, not on every item: each row already
    // opens with one under its own number, and a rule at the very top would
    // run straight into the floating nav.
    <ol className="border-line border-b">
      {companies.map((company, index) => (
        <li key={company.slug}>
          <CompanyRow
            company={company}
            index={index}
            locale={locale}
            dict={dict}
          />
        </li>
      ))}
    </ol>
  );
}

function CompanyRow({
  company,
  index,
  locale,
  dict,
}: {
  company: Company;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const record: { label: string; value: ReactNode }[] = [
    { label: dict.companies.role, value: company.role[locale] },
  ];
  if (company.founders.length > 0) {
    record.push({
      label: dict.companies.founders,
      value: company.founders.join(", "),
    });
  }
  if (company.location) {
    record.push({ label: dict.companies.based, value: company.location });
  }
  if (company.socials?.length) {
    record.push({
      label: dict.companies.follow,
      value: (
        <span className="flex flex-wrap gap-x-4">
          {company.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {social.label}
            </a>
          ))}
        </span>
      ),
    });
  }

  return (
    <article className="group py-10 lg:py-12">
      {/* Ledger head. 01 with nothing after it reads as the first of a series;
          an empty 02 would read as a gap. */}
      <div className="border-line text-faint flex items-baseline justify-between border-b pb-4 font-mono text-[11px] tracking-[0.18em] uppercase">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{company.founded}</span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-start lg:gap-14">
        {/* Rows alternate so a long list never becomes a column of stripes. */}
        <Visual
          company={company}
          locale={locale}
          priority={index === 0}
          className={index % 2 === 1 ? "lg:order-2" : undefined}
        />

        <div>
          {/* Nudged up so the cap-height, not the line box, lines up with the
              top edge of the capture. */}
          <h2 className="text-[clamp(1.75rem,3.2vw,2.35rem)] leading-[1.05] font-semibold tracking-[-0.035em] lg:-mt-1.5">
            {company.name[locale]}
          </h2>

          <p className="text-muted mt-4 max-w-sm text-[15px] leading-relaxed">
            {company.description[locale]}
          </p>

          <dl className="border-line mt-8 space-y-2.5 border-t pt-7 text-[13px]">
            {record.map((row) => (
              <div key={row.label} className="flex gap-5">
                <dt className="text-faint w-24 shrink-0">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-8 inline-flex items-center gap-2 text-[13px] font-semibold"
            >
              <span className="underline-offset-[6px] group-hover/link:underline">
                {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
              {/* Drawn, not typed: the ↗ codepoint has an emoji presentation
                  and several platforms render it as a blue tile. */}
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-2.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              >
                <path d="M3.2 8.8 8.8 3.2M4.4 3.2h4.4v4.4" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Visual({
  company,
  locale,
  priority,
  className,
}: {
  company: Company;
  locale: Locale;
  priority: boolean;
  className?: string;
}) {
  // Depth from the shadow alone, same treatment as the portrait: a hairline
  // holds the edge against the canvas, two ambient layers lift it off.
  const lift =
    "block w-full shadow-[var(--shadow-print)] transition-transform duration-500 ease-out group-hover:-translate-y-1";

  if (company.hero) {
    const capture = (
      <Image
        src={company.hero.src[locale]}
        alt={company.hero.alt[locale]}
        width={company.hero.width}
        height={company.hero.height}
        priority={priority}
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 88vw, 92vw"
        className={lift}
      />
    );

    // Only a link when there is somewhere to go — an anchor to "#" is a dead
    // control that still announces itself as a link.
    return company.website ? (
      <a
        href={company.website}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {capture}
      </a>
    ) : (
      <div className={className}>{capture}</div>
    );
  }

  // No capture yet — the wordmark on a plate, at the same footprint so the
  // row keeps its shape.
  return (
    <div className={className}>
      <div
        className={`bg-raised flex aspect-[8/5] items-center justify-center ${lift}`}
      >
        {company.logo ? (
          <>
            <Image
              src={company.logo.light}
              alt={company.name[locale]}
              width={company.logo.width}
              height={company.logo.height}
              className="on-light h-auto w-[42%] max-w-56 object-contain"
            />
            <Image
              src={company.logo.dark}
              alt={company.name[locale]}
              width={company.logo.width}
              height={company.logo.height}
              className="on-dark h-auto w-[42%] max-w-56 object-contain"
            />
          </>
        ) : (
          <span className="text-fg/80 text-[2rem] font-semibold tracking-tight">
            {company.name[locale]}
          </span>
        )}
      </div>
    </div>
  );
}
