import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    /* Hero owns a full screen. The emptiness is the point. */
    <section className="flex flex-1 flex-col justify-center px-6 sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 sm:flex-row sm:justify-center sm:gap-20">
        <Portrait />
        <div className="text-center sm:text-right">
          {/* One word per line, read from the name rather than hard-coded, so
              the content file stays the only place the name is written. */}
          <h1 className="text-[clamp(3rem,10vw,6.25rem)] leading-[0.92] font-semibold tracking-[-0.045em]">
            {site.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-muted mt-5 text-[15px] tracking-tight">
            {dict.hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  const { portrait } = site;

  return (
    <Image
      src={portrait.src}
      alt={portrait.alt}
      width={portrait.width}
      height={portrait.height}
      priority
      sizes="(min-width: 640px) 208px, 160px"
      // Depth comes from the shadow alone: a hairline holds the edge against
      // the canvas, then two ambient layers lift it off the page.
      className="block w-40 shrink-0 shadow-[var(--shadow-print)] sm:w-52"
    />
  );
}
