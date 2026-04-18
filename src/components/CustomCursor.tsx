"use client";

import { useEffect, useRef } from "react";

// Elements that should trigger the expanded cursor ring
const HOVER_SELECTOR =
  'a, button, [role="button"], [data-cursor="hover"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = 0,
      dotY = 0,
      ringX = 0,
      ringY = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let isOver = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // Single source of truth — re-evaluate on every move, so crossing
      // nested child boundaries inside the same hoverable doesn't flicker.
      const el = e.target as HTMLElement | null;
      const shouldHover = !!el?.closest?.(HOVER_SELECTOR);
      if (shouldHover !== isOver) {
        isOver = shouldHover;
        ring.classList.toggle("is-over", isOver);
      }
    };

    const onLeave = () => {
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
    };
    const onEnter = () => {
      dot.classList.remove("is-hidden");
      ring.classList.remove("is-hidden");
    };

    let raf = 0;
    const tick = () => {
      // Dot sticks to cursor tightly
      dotX += (target.x - dotX) * 0.65;
      dotY += (target.y - dotY) * 0.65;
      // Ring lags behind for a soft trailing feel
      ringX += (target.x - ringX) * 0.18;
      ringY += (target.y - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
