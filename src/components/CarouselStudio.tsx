"use client";

import { useEffect, useState } from "react";

// Each slide is 1080 × 1350 (Instagram portrait 4:5 — the highest-reach ratio).
// Render one at a time, user screenshots with Cmd+Shift+4 + Space.

type Slide = {
  kind: "hero" | "title" | "detail" | "type" | "reel" | "credits";
  photo?: string;
  objectPosition?: string;
};

const SLIDES: Slide[] = [
  { kind: "hero", photo: "/hero/mansion.jpg", objectPosition: "50% 50%" },
  { kind: "title" },
  { kind: "detail", photo: "/hero/mansion.jpg", objectPosition: "54% 58%" },
  { kind: "type" },
  { kind: "reel" },
  { kind: "credits" },
];

export default function CarouselStudio() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const next = () => setI((v) => (v + 1) % SLIDES.length);
  const prev = () => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-ink text-concrete p-6 gap-6">
      <div className="w-full max-w-[1080px] flex items-center justify-between text-[11px] uppercase tracking-brutal text-concrete/70">
        <div>Carousel — 1080 × 1350 · slide {i + 1} / {SLIDES.length}</div>
        <div className="flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-6 w-6 border text-[10px] ${
                idx === i
                  ? "border-moss-glow text-moss-glow"
                  : "border-concrete/30 hover:border-concrete"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div
        id="carousel-frame"
        className="relative overflow-hidden bg-concrete-dark shrink-0"
        style={{
          width: "min(1080px, 80vmin)",
          aspectRatio: "4 / 5",
        }}
      >
        {slide.kind === "hero" && <HeroSlide photo={slide.photo!} pos={slide.objectPosition!} />}
        {slide.kind === "title" && <TitleSlide />}
        {slide.kind === "detail" && <DetailSlide photo={slide.photo!} pos={slide.objectPosition!} />}
        {slide.kind === "type" && <TypeSlide />}
        {slide.kind === "reel" && <ReelSlide />}
        {slide.kind === "credits" && <CreditsSlide />}
      </div>

      <div className="w-full max-w-[1080px] flex items-center justify-between text-[10px] uppercase tracking-brutal text-concrete/60 gap-4">
        <button
          onClick={prev}
          className="border border-concrete/30 hover:border-moss-glow px-4 py-2"
        >
          ← Prev
        </button>
        <div className="text-center opacity-70">
          Cmd+Shift+4 + Space → click the frame for a clean PNG
        </div>
        <button
          onClick={next}
          className="border border-concrete/30 hover:border-moss-glow px-4 py-2"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ---------- Slides ----------

function HeroSlide({ photo, pos }: { photo: string; pos: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: pos }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />
      {/* corner meta */}
      <div
        className="absolute top-[5%] left-[5%] right-[5%] flex items-start justify-between text-[min(1.6vmin,0.95rem)] uppercase tracking-brutal"
        style={{ mixBlendMode: "difference", color: "#fff" }}
      >
        <div>Laskowski.studio / 01</div>
        <div className="text-right leading-tight">
          Case 01
          <br />
          Residence 04
        </div>
      </div>
      {/* big hero title at bottom */}
      <div className="absolute left-[5%] right-[5%] bottom-[6%]">
        <div
          className="font-serif leading-[0.92] font-normal"
          style={{
            color: "#fff",
            mixBlendMode: "difference",
            fontSize: "min(14vmin, 9rem)",
          }}
        >
          Residence 04
        </div>
        <div
          className="font-serif italic mt-[2%] text-concrete"
          style={{
            textShadow: "0 2px 18px rgba(0,0,0,0.75)",
            fontSize: "min(2.4vmin, 1.4rem)",
          }}
        >
          A sunken planter, four walls, one opening.
        </div>
      </div>
    </>
  );
}

function TitleSlide() {
  return (
    <div className="absolute inset-0 bg-ink flex flex-col justify-between p-[6%]">
      <div className="flex items-start justify-between text-[min(1.6vmin,0.95rem)] uppercase tracking-brutal text-concrete/70">
        <div>Laskowski.studio / 01</div>
        <div>2026</div>
      </div>

      <div>
        <div className="tracking-brutal text-[min(1.8vmin,1rem)] uppercase text-moss-glow mb-[4%]">
          Project — Residence 04
        </div>
        <div
          className="font-serif leading-[0.95] font-normal text-concrete"
          style={{ fontSize: "min(11vmin, 7rem)" }}
        >
          Interiors,
          <br />
          <span className="italic text-moss-glow">carved</span>
          <br />
          from silence.
        </div>
      </div>

      <div
        className="font-serif italic text-concrete/80 max-w-[70%]"
        style={{ fontSize: "min(2.6vmin, 1.4rem)" }}
      >
        A multi-house landing experience. Three brutalist residences, each with
        its own door and story.
      </div>
    </div>
  );
}

function DetailSlide({ photo, pos }: { photo: string; pos: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-[1.8]"
        style={{ objectPosition: pos }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_58%,transparent_0%,rgba(11,13,10,0.5)_70%)]" />

      {/* pulsing hotspot mockup */}
      <div
        className="absolute"
        style={{ left: "54%", top: "58%", transform: "translate(-50%,-50%)" }}
      >
        <div className="flex items-center gap-3">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-moss-glow opacity-60 animate-ping" />
            <span
              className="relative inline-flex rounded-full bg-moss-glow ring-2 ring-moss-glow/40"
              style={{ width: "min(2.2vmin, 1.2rem)", height: "min(2.2vmin, 1.2rem)" }}
            />
          </span>
          <span
            className="whitespace-nowrap border border-concrete/40 bg-ink/60 backdrop-blur-sm px-3 py-2 uppercase tracking-brutal text-concrete"
            style={{ fontSize: "min(1.5vmin, 0.85rem)" }}
          >
            Enter · Residence 04
          </span>
        </div>
      </div>

      <div
        className="absolute top-[5%] left-[5%] right-[5%] flex items-start justify-between uppercase tracking-brutal"
        style={{ mixBlendMode: "difference", color: "#fff", fontSize: "min(1.6vmin,0.95rem)" }}
      >
        <div>Laskowski.studio / 01</div>
        <div>Detail — door hotspot</div>
      </div>

      <div className="absolute left-[5%] right-[5%] bottom-[6%]">
        <div
          className="font-serif leading-[0.95] font-normal"
          style={{
            color: "#fff",
            mixBlendMode: "difference",
            fontSize: "min(8vmin, 5rem)",
          }}
        >
          Click the door.
        </div>
        <div
          className="font-serif italic mt-[2%] text-concrete max-w-[70%]"
          style={{
            textShadow: "0 2px 18px rgba(0,0,0,0.75)",
            fontSize: "min(2.2vmin, 1.3rem)",
          }}
        >
          A magnetic hotspot pulls toward the cursor. Click triggers a clip-path
          reveal of the interior — the page is literally born out of the door.
        </div>
      </div>
    </>
  );
}

function TypeSlide() {
  return (
    <div className="absolute inset-0 bg-concrete-dark flex flex-col justify-between p-[6%] text-concrete">
      <div className="flex items-start justify-between text-[min(1.6vmin,0.95rem)] uppercase tracking-brutal text-concrete/70">
        <div>Laskowski.studio / 01</div>
        <div>Type & palette</div>
      </div>

      <div className="space-y-[4%]">
        <div
          className="font-serif leading-[0.9] font-normal"
          style={{ fontSize: "min(16vmin, 10rem)" }}
        >
          Aa
        </div>
        <div className="flex items-baseline gap-3 uppercase tracking-brutal">
          <span style={{ fontSize: "min(2.2vmin, 1.25rem)" }}>
            Instrument Serif
          </span>
          <span className="opacity-50" style={{ fontSize: "min(1.4vmin, 0.8rem)" }}>
            400 + italic
          </span>
        </div>
        <div className="flex items-baseline gap-3 uppercase tracking-brutal">
          <span className="font-sans" style={{ fontSize: "min(2vmin, 1.1rem)" }}>
            Geist Sans
          </span>
          <span className="opacity-50" style={{ fontSize: "min(1.4vmin, 0.8rem)" }}>
            UI · labels · micro
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { c: "#0b0d0a", label: "Ink" },
          { c: "#3a3a38", label: "Concrete-dk" },
          { c: "#c7c2b6", label: "Concrete" },
          { c: "#4a6b3a", label: "Moss" },
          { c: "#9cd07a", label: "Moss glow" },
        ].map((s) => (
          <div key={s.c} className="flex-1">
            <div
              className="w-full aspect-square border border-concrete/20"
              style={{ backgroundColor: s.c }}
            />
            <div
              className="mt-2 uppercase tracking-brutal text-concrete/70"
              style={{ fontSize: "min(1.2vmin, 0.7rem)" }}
            >
              {s.label}
              <br />
              <span className="opacity-50">{s.c}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReelSlide() {
  // Simulates the horizontal interior reel — three image tiles shifted
  // slightly to imply horizontal scroll, with a progress bar below.
  const tiles = [
    "https://picsum.photos/seed/concrete-living/900/1100",
    "https://picsum.photos/seed/stair-concrete/900/1100",
    "https://picsum.photos/seed/bedroom-linen/900/1100",
  ];
  return (
    <div className="absolute inset-0 bg-ink flex flex-col justify-between p-[6%]">
      <div className="flex items-start justify-between text-[min(1.6vmin,0.95rem)] uppercase tracking-brutal text-concrete/70">
        <div>Laskowski.studio / 01</div>
        <div>Horizontal reel</div>
      </div>

      <div>
        <div
          className="font-serif leading-[0.95] font-normal text-concrete mb-[5%]"
          style={{ fontSize: "min(8vmin, 5rem)" }}
        >
          Scroll down,
          <br />
          <span className="italic text-moss-glow">travel right.</span>
        </div>

        <div className="flex gap-3 h-[38vmin] overflow-hidden">
          {tiles.map((src, idx) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={idx}
              src={src}
              alt=""
              className="h-full flex-1 object-cover"
              style={{ transform: `translateX(${idx * -4}%)` }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div
            className="uppercase tracking-brutal text-concrete/50"
            style={{ fontSize: "min(1.2vmin, 0.7rem)" }}
          >
            Scroll
          </div>
          <div className="flex-1 h-[2px] bg-concrete/20 relative">
            <div className="absolute inset-y-0 left-0 bg-moss-glow" style={{ width: "42%" }} />
          </div>
          <div
            className="uppercase tracking-brutal text-concrete/50 tabular-nums"
            style={{ fontSize: "min(1.2vmin, 0.7rem)" }}
          >
            42%
          </div>
        </div>
        <div
          className="font-serif italic text-concrete/80 max-w-[80%]"
          style={{ fontSize: "min(2vmin, 1.1rem)" }}
        >
          Native document scroll translates vertical input into horizontal
          motion — no hijacking, browser momentum intact.
        </div>
      </div>
    </div>
  );
}

function CreditsSlide() {
  return (
    <div className="absolute inset-0 bg-ink flex flex-col justify-between p-[6%] text-concrete">
      <div className="flex items-start justify-between text-[min(1.6vmin,0.95rem)] uppercase tracking-brutal text-concrete/70">
        <div>Laskowski.studio / 01</div>
        <div>Credits</div>
      </div>

      <div>
        <div
          className="font-serif leading-[0.95] font-normal"
          style={{ fontSize: "min(11vmin, 7rem)" }}
        >
          Built by
          <br />
          <span className="italic text-moss-glow">Szymon</span> Laskowski.
        </div>
        <div
          className="font-serif italic text-concrete/80 mt-[3%] max-w-[75%]"
          style={{ fontSize: "min(2.6vmin, 1.4rem)" }}
        >
          A brutalist landing experience — three houses, one door each.
        </div>
      </div>

      <div
        className="grid grid-cols-2 gap-x-10 gap-y-2 uppercase tracking-brutal"
        style={{ fontSize: "min(1.4vmin, 0.8rem)" }}
      >
        <div className="flex justify-between border-b border-concrete/15 pb-2">
          <span className="text-concrete/50">Stack</span>
          <span>Next.js 16 · Tailwind · GSAP</span>
        </div>
        <div className="flex justify-between border-b border-concrete/15 pb-2">
          <span className="text-concrete/50">Type</span>
          <span>Instrument Serif · Geist</span>
        </div>
        <div className="flex justify-between border-b border-concrete/15 pb-2">
          <span className="text-concrete/50">Photos</span>
          <span>Unsplash</span>
        </div>
        <div className="flex justify-between border-b border-concrete/15 pb-2">
          <span className="text-concrete/50">Year</span>
          <span>2026</span>
        </div>
        <div className="flex justify-between border-b border-concrete/15 pb-2">
          <span className="text-concrete/50">Contact</span>
          <span>hello@laskowski.studio</span>
        </div>
        <div className="flex justify-between border-b border-concrete/15 pb-2">
          <span className="text-concrete/50">More</span>
          <span>@_lasq_ · link in bio</span>
        </div>
      </div>
    </div>
  );
}
