import { site } from "@/content/site";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-faint mb-8 font-mono text-[11px] tracking-[0.18em] uppercase">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20 sm:py-28">
      {/* Hero */}
      <header>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {site.name}
        </h1>
        <p className="text-muted mt-2 font-mono text-sm">
          {site.role} · {site.location}
        </p>
        <p className="text-fg/90 mt-8 text-lg leading-relaxed text-balance sm:text-xl">
          {site.tagline}
        </p>

        <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
          <a
            href={`mailto:${site.email}`}
            className="text-accent hover:underline"
          >
            Email
          </a>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-fg transition-colors"
            >
              {s.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </header>

      {/* About */}
      <section className="mt-20 sm:mt-28" aria-labelledby="about">
        <SectionLabel>About</SectionLabel>
        <div className="text-muted space-y-4 leading-relaxed">
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="mt-20 sm:mt-28" aria-labelledby="work">
        <SectionLabel>Work</SectionLabel>
        <ul className="divide-line border-line divide-y border-y">
          {site.work.map((w) => (
            <li key={`${w.org}-${w.period}`} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-medium">
                  {w.role}{" "}
                  <span className="text-muted font-normal">at {w.org}</span>
                </p>
                <p className="text-faint font-mono text-xs tabular-nums">
                  {w.period}
                </p>
              </div>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">
                {w.note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="mt-20 sm:mt-28" aria-labelledby="projects">
        <SectionLabel>Selected work</SectionLabel>
        <ul className="space-y-8">
          {site.projects.map((p) => (
            <li key={p.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="decoration-line hover:decoration-accent underline underline-offset-4 transition-colors"
                  >
                    {p.name}
                  </a>
                </h3>
                <span className="text-faint font-mono text-xs tabular-nums">
                  {p.year}
                </span>
              </div>
              <p className="text-muted mt-1.5 text-sm leading-relaxed">
                {p.blurb}
              </p>
              <p className="mt-2.5 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-faint border-line rounded border px-1.5 py-0.5 font-mono text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <footer className="border-line mt-20 border-t pt-8 sm:mt-28">
        <SectionLabel>Get in touch</SectionLabel>
        <p className="text-muted leading-relaxed">
          Best way to reach me is{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent decoration-accent/40 hover:decoration-accent underline"
          >
            {site.email}
          </a>
          .
        </p>
        <p className="text-faint mt-10 font-mono text-xs">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </main>
  );
}
