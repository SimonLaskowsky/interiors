"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroImage from "./HeroImage";
import InteriorGrid from "./interior/InteriorGrid";
import CustomCursor from "./CustomCursor";
import FilmGrain from "./FilmGrain";
import { houses } from "./houses";

export type Phase = "exterior" | "entering" | "interior";

export default function LandingExperience() {
  const [phase, setPhase] = useState<Phase>("exterior");
  const [index, setIndex] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % houses.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + houses.length) % houses.length),
    [],
  );

  useEffect(() => {
    if (phase !== "exterior") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Enter") setPhase("entering");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, next, prev]);

  const house = houses[index];

  // During "entering", apply --cx/--cy door coords and toggle .open to
  // trigger the CSS clip-path transition. On transitionend, commit to
  // the interior phase (drops the hero wrapper).
  useLayoutEffect(() => {
    if (phase !== "entering") return;
    const el = revealRef.current;
    if (!el) return;
    el.style.setProperty("--cx", `${house.door.x * 100}%`);
    el.style.setProperty("--cy", `${house.door.y * 100}%`);
    // Next frame so the initial (closed) clip-path is committed before
    // we toggle .open — otherwise the browser skips the transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add("open"));
    });
  }, [phase, house.door.x, house.door.y]);

  const onEnterComplete = useCallback(() => setPhase("interior"), []);

  // Toggle body scroll based on phase. Exterior/entering = locked;
  // interior = native document scroll (drives the horizontal reel).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("allow-scroll", phase === "interior");
    return () => {
      document.body.classList.remove("allow-scroll");
    };
  }, [phase]);

  return (
    <>
      <CustomCursor />
      <FilmGrain />

      {phase === "interior" ? (
        <InteriorGrid
          house={house}
          onBack={() => {
            window.scrollTo({ top: 0, behavior: "auto" });
            setPhase("exterior");
          }}
        />
      ) : (
        <div className="fixed inset-0 bg-ink text-concrete">
          <HeroImage
            key={house.id}
            house={house}
            phase={phase}
            index={index}
            total={houses.length}
            onEnter={() => setPhase("entering")}
            onPrev={prev}
            onNext={next}
          />

          {phase === "entering" && (
            <div
              ref={revealRef}
              className="fixed inset-0 z-50 clip-from-door bg-ink"
              onTransitionEnd={(e) => {
                if (e.currentTarget !== e.target) return;
                if (
                  e.propertyName === "clip-path" ||
                  e.propertyName === "-webkit-clip-path"
                ) {
                  onEnterComplete();
                }
              }}
            >
              <InteriorGrid house={house} onBack={() => setPhase("exterior")} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
