"use client";

import { useState } from "react";

type Variant = {
  photo: string;
  objectPosition: string;
  title: string;
  tagline?: string;
  titleSize: string; // tailwind clamp-ish size
  layout: "center" | "bottom-left" | "top";
};

const VARIANTS: Variant[] = [
  {
    photo: "/hero/mansion.jpg",
    objectPosition: "50% 50%",
    title: "laskowski.studio",
    tagline: "Websites with weight.",
    titleSize: "text-[clamp(2rem,9vmin,6rem)]",
    layout: "bottom-left",
  },
  {
    photo: "/hero/mansion.jpg",
    objectPosition: "30% 50%",
    title: "LASKOWSKI",
    tagline: "— studio",
    titleSize: "text-[clamp(2.5rem,11vmin,7rem)]",
    layout: "center",
  },
  {
    photo: "/hero/house-02.jpg",
    objectPosition: "50% 40%",
    title: "laskowski.studio",
    tagline: "Design & development",
    titleSize: "text-[clamp(2rem,9vmin,6rem)]",
    layout: "center",
  },
  {
    photo: "/hero/house-03.jpg",
    objectPosition: "60% 55%",
    title: "LSQ ——",
    tagline: "laskowski.studio",
    titleSize: "text-[clamp(2.5rem,12vmin,7.5rem)]",
    layout: "center",
  },
  {
    photo: "/hero/mansion.jpg",
    objectPosition: "70% 40%",
    title: "Laskowski",
    tagline: "websites ——",
    titleSize: "text-[clamp(2rem,10vmin,6.5rem)]",
    layout: "top",
  },
];

export default function AvatarStudio() {
  const [i, setI] = useState(0);
  const v = VARIANTS[i];

  const layoutClass =
    v.layout === "center"
      ? "items-center justify-center text-center"
      : v.layout === "top"
        ? "items-start justify-center text-center pt-[8%]"
        : "items-end justify-start text-left pl-[6%] pb-[10%]";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-ink text-concrete p-6 gap-6">
      {/* Instructions */}
      <div className="max-w-[1080px] w-full flex items-center justify-between text-[11px] uppercase tracking-brutal text-concrete/70">
        <div>Avatar preview — 1080 × 1080 · screenshot the square</div>
        <div className="flex gap-2">
          {VARIANTS.map((_, idx) => (
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

      {/* The actual 1080x1080 frame. Uses min() so it shrinks on smaller
          windows. At desktop size it renders as a real 1080px square. */}
      <div
        id="avatar-frame"
        className="relative aspect-square overflow-hidden bg-concrete-dark"
        style={{ width: "min(1080px, 92vmin)", height: "min(1080px, 92vmin)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.photo}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: v.objectPosition }}
        />
        {/* Subtle bottom-to-transparent scrim to keep the tagline readable
            without fighting the main title's difference-blend. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/40 pointer-events-none" />

        <div
          className={`absolute inset-0 flex flex-col ${layoutClass} gap-3 px-[4%]`}
        >
          <div
            className={`font-serif ${v.titleSize} leading-[0.95] font-normal`}
            style={{ color: "#ffffff", mixBlendMode: "difference" }}
          >
            {v.title}
          </div>
          {v.tagline && (
            <div
              className="font-serif italic text-[clamp(0.8rem,2.2vmin,1.25rem)] text-concrete"
              style={{ textShadow: "0 2px 18px rgba(0,0,0,0.8)" }}
            >
              {v.tagline}
            </div>
          )}
        </div>

        {/* Instagram circle-crop safe-zone guide — thin dashed ring at ~80%
            of the square. Your text should stay inside this to survive the
            IG profile-pic crop. Toggle hide with the button below. */}
        <div
          id="safe-zone"
          className="absolute inset-[10%] rounded-full border border-dashed border-moss-glow/40 pointer-events-none"
        />
      </div>

      <div className="max-w-[1080px] w-full flex items-center justify-between text-[10px] uppercase tracking-brutal text-concrete/60">
        <button
          onClick={() => {
            const el = document.getElementById("safe-zone");
            if (el) el.style.display = el.style.display === "none" ? "" : "none";
          }}
          className="border border-concrete/30 hover:border-moss-glow px-3 py-2"
        >
          Toggle safe-zone ring
        </button>
        <div className="text-right">
          Cmd+Shift+4 then Space → click the frame · or use⇧⌘5
        </div>
      </div>
    </div>
  );
}
