"use client";

/**
 * Stateless on purpose. Which icon and label to show is decided in CSS from
 * the same `data-theme` / `prefers-color-scheme` cascade that drives the
 * tokens, so there is nothing to read during render — no hydration mismatch,
 * no setState in an effect, and no flash while mounting.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";

    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Blocked storage: the choice won't survive a reload, page still switches.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-muted hover:text-fg -m-1.5 grid h-8 w-8 place-items-center rounded p-1.5 transition-colors"
    >
      <MoonIcon />
      <SunIcon />
      {/* Accessible name tracks the theme via the same CSS switch. */}
      <span className="on-light sr-only">Switch to dark theme</span>
      <span className="on-dark sr-only">Switch to light theme</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="on-dark h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.9 5.9 4.4 4.4M19.6 19.6l-1.5-1.5M18.1 5.9l1.5-1.5M4.4 19.6l1.5-1.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="on-light h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
    </svg>
  );
}
