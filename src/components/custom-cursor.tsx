"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary';

/** How much of the remaining distance the ring closes each frame. */
const RING_EASING = 0.18;

/**
 * A 5px dot that tracks the pointer exactly, plus a ring that trails behind it
 * and expands over anything clickable.
 *
 * Only engages for precise pointers, and only after mount — touch devices and
 * anyone without JS keep the native cursor untouched. Positions are written
 * straight to style.transform rather than through React state, so pointer
 * movement never triggers a re-render.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    root.dataset.cursor = "on";

    // Hidden until the pointer reports a real position, so neither element
    // ever animates in from the middle of the screen.
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let seenPointer = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    // The ring's resting opacity lives in CSS; clearing the inline value hands
    // it back rather than hard-coding the number in two places.
    const setVisible = (visible: boolean) => {
      dot.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? "" : "0";
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!seenPointer) {
        seenPointer = true;
        ringX = pointerX;
        ringY = pointerY;
        place(ring, ringX, ringY);
        setVisible(true);
      }

      place(dot, pointerX, pointerY);

      // Trailing looks like lag to anyone who asked for less motion.
      if (reduceMotion) place(ring, pointerX, pointerY);

      const target = event.target as Element | null;
      root.dataset.cursorActive = target?.closest?.(INTERACTIVE) ? "1" : "0";
    };

    const tick = () => {
      ringX += (pointerX - ringX) * RING_EASING;
      ringY += (pointerY - ringY) * RING_EASING;
      place(ring, ringX, ringY);
      frame = requestAnimationFrame(tick);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    if (!reduceMotion) frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(frame);
      delete root.dataset.cursor;
      delete root.dataset.cursorActive;
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
