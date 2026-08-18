import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pt-24 pb-12 sm:px-10">
      <div className="border-line text-faint border-t pt-8 text-[13px]">
        <ul className="flex justify-center gap-x-6">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fg transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
