"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  text: string;
  className?: string;
  trigger?: string | number; // change to replay animation
  delay?: number;
  stagger?: number;
};

// Splits text into character <span>s and staggers them in on mount /
// whenever `trigger` changes. Preserves spaces using a real " " char.
export default function SplitText({
  text,
  className,
  trigger,
  delay = 0,
  stagger = 0.028,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll(".char");
    gsap.set(chars, { yPercent: 110, opacity: 0 });
    gsap.to(chars, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      ease: "expo.out",
      stagger,
      delay,
    });
  }, [trigger, delay, stagger]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className="char" aria-hidden>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}
