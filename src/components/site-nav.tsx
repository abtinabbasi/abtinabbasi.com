"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

export function SiteNav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();

  const tabs = [{ href: `/${locale}/companies`, label: dict.nav.companies }];

  return (
    // Floating and detached — the canvas shows through around it.
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      {/* Two rows on phones, one on everything wider. Order is reassigned
          rather than duplicating the controls into a second markup block. */}
      {/* Sized to the content grid rather than to its own contents, and padded
          to match it: the wordmark sits on the same left edge as the page's
          rules, and the controls end on the same right edge. */}
      {/* Wrapping flex on phones; on anything wider a three-track grid whose
          outer tracks are both 1fr, so the tabs sit on the bar's centre line
          rather than wherever the wordmark happens to end. */}
      <header className="border-line/80 bg-surface/80 pointer-events-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border px-5 py-2.5 backdrop-blur-xl sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-x-7 sm:px-10 sm:py-3">
        <Link
          href={`/${locale}`}
          aria-label={site.name}
          className="hover:text-accent order-1 shrink-0 text-[17px] leading-none font-semibold tracking-tight transition-colors sm:col-start-1 sm:row-start-1 sm:justify-self-start"
        >
          {site.name}
        </Link>

        {/* ml-auto carries the phone layout, where these share row one with the
            wordmark; the grid track handles it from sm up. */}
        <div className="order-2 ml-auto flex shrink-0 items-center gap-x-3 sm:col-start-3 sm:row-start-1 sm:ml-0 sm:justify-self-end">
          <LocaleSwitcher locale={locale} label={dict.meta.switchTo} />
          <ThemeToggle />
        </div>

        <nav
          aria-label={dict.nav.primary}
          className="order-3 w-full sm:col-start-2 sm:row-start-1 sm:w-auto"
        >
          <ul className="flex items-center gap-x-3 sm:gap-x-5">
            {tabs.map((tab) => {
              const active =
                pathname === tab.href || pathname.startsWith(`${tab.href}/`);
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    // Weight carries the state so it never relies on colour.
                    className={
                      active
                        ? "text-fg text-[12px] font-semibold whitespace-nowrap sm:text-[13px]"
                        : "text-muted hover:text-fg text-[12px] whitespace-nowrap transition-colors sm:text-[13px]"
                    }
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </div>
  );
}
