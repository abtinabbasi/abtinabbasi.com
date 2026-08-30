"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The address is held reversed and base64'd and is decoded inside the click
 * handler, so nothing address-shaped reaches the HTML, the RSC payload, or the
 * DOM until a person asks for it. Harvesters read markup; they don't press
 * buttons. A headless crawler that runs the bundle would still have to decide
 * to click, which is the point — this is a spam filter, not a secret.
 */
export function EmailReveal({
  encoded,
  label,
}: {
  encoded: string;
  label: string;
}) {
  const [address, setAddress] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // The button is replaced by the link it produced. Without this, a keyboard
  // user's focus falls back to the top of the document at the exact moment
  // the thing they asked for appears.
  useEffect(() => {
    if (address) linkRef.current?.focus();
  }, [address]);

  // Same box in both states: the envelope holds its position while the label
  // swaps to the address, so the reveal reads as a change of content rather
  // than as the control being torn out and replaced.
  const shell =
    "group inline-flex items-center gap-3 text-[clamp(1.05rem,3.6vw,1.4rem)] font-semibold tracking-tight";

  if (address === null) {
    return (
      <button
        type="button"
        onClick={() => setAddress(decode(encoded))}
        className={shell}
      >
        <EnvelopeIcon />
        {/* Dotted underline: the same affordance as the address it becomes,
            drawn provisionally, so the control reads as one step short of a
            link rather than as a dead heading. */}
        <span className="decoration-fg/35 group-hover:decoration-fg underline decoration-dotted underline-offset-[6px] transition-colors">
          {label}
        </span>
      </button>
    );
  }

  return (
    <a ref={linkRef} href={`mailto:${address}`} className={shell}>
      <EnvelopeIcon />
      <span className="underline-offset-[6px] group-hover:underline">
        {address}
      </span>
    </a>
  );
}

function decode(encoded: string) {
  return [...atob(encoded)].reverse().join("");
}

// Drawn rather than typed, same reasoning as the arrow on the company links:
// the ✉ codepoint has an emoji presentation on most platforms.
function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-faint group-hover:text-fg size-4 shrink-0 transition-colors"
    >
      <rect x="1.4" y="3.4" width="13.2" height="9.2" rx="1.6" />
      <path d="M2 4.6 8 8.9l6-4.3" />
    </svg>
  );
}
