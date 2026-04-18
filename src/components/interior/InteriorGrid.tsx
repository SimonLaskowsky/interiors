"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type House, type Tile } from "../houses";
import Hotspot from "./Hotspot";

type Props = {
  house: House;
  onBack: () => void;
};

const TILE_WIDTH: Record<Tile["span"], string> = {
  big: "w-[min(70vw,56rem)]",
  wide: "w-[min(60vw,44rem)]",
  tall: "w-[min(30vw,24rem)]",
  std: "w-[min(32vw,28rem)]",
};

export default function InteriorGrid({ house, onBack }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number>(0);
  const [offset, setOffset] = useState(0);
  const [progress, setProgress] = useState(0);

  // Measure the strip to decide how tall the outer <section> should be.
  // Section height = viewport height + horizontal scroll distance.
  useLayoutEffect(() => {
    const measure = () => {
      const strip = stripRef.current;
      if (!strip) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const stripWidth = strip.scrollWidth;
      const horizontalDistance = Math.max(0, stripWidth - vw);
      setSectionHeight(vh + horizontalDistance);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [house.id]);

  // On scroll: map document scroll position into horizontal strip offset.
  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const t = total <= 0 ? 0 : scrolled / total;
      const maxOffset = Math.max(0, strip.scrollWidth - vw);
      setOffset(t * maxOffset);
      setProgress(t);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [house.id, sectionHeight]);

  // Reset to top when switching houses.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [house.id]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ink text-concrete"
      style={{ height: sectionHeight ? `${sectionHeight}px` : "100vh" }}
    >
      {/* Pinned viewport-sized stage — stays in view while the user scrolls. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <header className="shrink-0 flex items-center justify-between px-6 md:px-10 py-5 bg-ink/75 backdrop-blur-md border-b border-concrete/10 z-20">
          <button
            onClick={onBack}
            data-cursor="hover"
            className="flex items-center gap-2 text-xs uppercase tracking-brutal text-concrete/80 hover:text-moss-glow transition-colors"
          >
            <span>←</span> Back to exterior
          </button>
          <div className="tracking-brutal text-xs uppercase text-concrete/60 hidden md:block">
            {house.name} · {house.subtitle}
          </div>
          <nav className="flex gap-6 text-xs uppercase tracking-brutal text-concrete/70">
            <a href="#" className="hover:text-moss-glow">
              Studio
            </a>
            <a href="#" className="hover:text-moss-glow">
              Contact
            </a>
          </nav>
        </header>

        <div className="shrink-0 px-6 md:px-10 pt-10 pb-8 max-w-[1600px] mx-auto w-full">
          <div className="tracking-brutal text-[10px] uppercase text-moss-glow/80 mb-3">
            {house.name} — Selected Works
          </div>
          <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1] font-normal max-w-3xl italic">
            {house.tagline}
          </h2>
        </div>

        {/* The horizontal strip — translated purely via transform based on
            document scroll progress. No native overflow; no wheel hijack. */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={stripRef}
            className="absolute top-0 left-0 h-full flex items-center gap-6 pl-6 md:pl-10 pr-[40vw] will-change-transform"
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          >
            {house.tiles.map((tile, i) => (
              <article
                key={tile.id}
                className={`relative h-[min(72vh,44rem)] flex-none ${TILE_WIDTH[tile.span]} overflow-hidden group bg-concrete-dark`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-brutal text-concrete/60">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(house.tiles.length).padStart(2, "0")}
                </div>
                {tile.caption && (
                  <div className="absolute bottom-4 left-5 font-serif italic text-concrete/90 text-lg">
                    {tile.caption}
                  </div>
                )}
                {tile.hotspots.map((h, j) => (
                  <Hotspot key={j} data={h} />
                ))}
              </article>
            ))}

            {/* End plate */}
            <div className="flex-none w-[30vw] flex flex-col justify-center gap-4">
              <div className="tracking-brutal text-[10px] uppercase text-moss-glow/80">
                End of reel
              </div>
              <div className="font-serif italic text-2xl text-concrete">
                Step back outside,
                <br />
                or write to us.
              </div>
              <div className="flex gap-4 pt-2 text-[10px] uppercase tracking-brutal">
                <button
                  onClick={onBack}
                  data-cursor="hover"
                  className="border border-concrete/30 hover:border-moss-glow px-4 py-3 text-concrete hover:text-moss-glow transition-colors"
                >
                  ← Back to exterior
                </button>
                <a
                  href="mailto:hello@laskowski.studio"
                  data-cursor="hover"
                  className="border border-concrete/30 hover:border-moss-glow px-4 py-3 text-concrete hover:text-moss-glow transition-colors"
                >
                  hello@laskowski.studio
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="shrink-0 px-6 md:px-10 py-5 flex items-center gap-4 border-t border-concrete/10 z-20 bg-ink/80 backdrop-blur">
          <div className="text-[10px] uppercase tracking-brutal text-concrete/50 w-16">
            Scroll
          </div>
          <div className="flex-1 h-[2px] bg-concrete/15 relative">
            <div
              className="absolute inset-y-0 left-0 bg-moss-glow"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="text-[10px] uppercase tracking-brutal text-concrete/50 w-16 text-right tabular-nums">
            {String(Math.round(progress * 100)).padStart(2, "0")}%
          </div>
        </div>
      </div>
    </section>
  );
}
