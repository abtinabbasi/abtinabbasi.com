import { site } from "@/content/site";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mb-8">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20 sm:py-28">
      {/* Hero */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          {site.name}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted">
          {site.role} · {site.location}
        </p>
        <p className="mt-8 text-lg sm:text-xl leading-relaxed text-fg/90 text-balance">
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
        <div className="space-y-4 leading-relaxed text-muted">
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="mt-20 sm:mt-28" aria-labelledby="work">
        <SectionLabel>Work</SectionLabel>
        <ul className="divide-y divide-line border-y border-line">
          {site.work.map((w) => (
            <li key={`${w.org}-${w.period}`} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-medium">
                  {w.role}{" "}
                  <span className="text-muted font-normal">at {w.org}</span>
                </p>
                <p className="font-mono text-xs text-faint tabular-nums">
                  {w.period}
                </p>
              </div>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">
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
                <span className="font-mono text-xs text-faint tabular-nums">
                  {p.year}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">
                {p.blurb}
              </p>
              <p className="mt-2.5 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-faint border border-line rounded px-1.5 py-0.5"
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
      <footer className="mt-20 sm:mt-28 pt-8 border-t border-line">
        <SectionLabel>Get in touch</SectionLabel>
        <p className="leading-relaxed text-muted">
          Best way to reach me is{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline decoration-accent/40 hover:decoration-accent"
          >
            {site.email}
          </a>
          .
        </p>
        <p className="mt-10 font-mono text-xs text-faint">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </main>
  );
}
