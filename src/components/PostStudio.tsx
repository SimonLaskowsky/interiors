"use client";

import { useState } from "react";

// A single-post "site poster" composition that captures the whole
// experience in one frame. Two layouts to choose from:
//   1. "Poster" — editorial, magazine-cover feel
//   2. "Mockup" — site shown inside a browser chrome

type Layout = "poster" | "mockup";

export default function PostStudio() {
  const [layout, setLayout] = useState<Layout>("poster");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-ink text-concrete p-6 gap-6">
      <div className="w-full max-w-[1080px] flex items-center justify-between text-[11px] uppercase tracking-brutal text-concrete/70">
        <div>Single post — 1080 × 1350 (IG portrait)</div>
        <div className="flex gap-2">
          {(["poster", "mockup"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setLayout(k)}
              className={`border px-3 py-1 text-[10px] uppercase tracking-brutal ${
                layout === k
                  ? "border-moss-glow text-moss-glow"
                  : "border-concrete/30 hover:border-concrete"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div
        id="post-frame"
        className="relative overflow-hidden bg-concrete-dark shrink-0"
        style={{ width: "min(1080px, 80vmin)", aspectRatio: "4 / 5" }}
      >
        {layout === "poster" ? <PosterLayout /> : <MockupLayout />}
      </div>

      <div className="w-full max-w-[1080px] text-center text-[10px] uppercase tracking-brutal text-concrete/60">
        Cmd+Shift+4 + Space → click the frame
      </div>
    </div>
  );
}

// ---------------- Poster — editorial feel ----------------

function PosterLayout() {
  return (
    <div className="absolute inset-0 flex flex-col bg-ink">
      {/* Top meta bar */}
      <div className="shrink-0 flex items-center justify-between px-[4%] py-[2.5%] border-b border-concrete/15 uppercase tracking-brutal text-concrete/70"
        style={{ fontSize: "min(1.4vmin, 0.8rem)" }}
      >
        <span>Laskowski.studio</span>
        <span>Case 01 — Residence 04</span>
        <span>2026</span>
      </div>

      {/* Hero photo — takes roughly 60% of height */}
      <div className="relative overflow-hidden" style={{ flex: "0 0 58%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/mansion.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/50 pointer-events-none" />

        {/* Hotspot marker on the door */}
        <div
          className="absolute flex items-center gap-2"
          style={{ left: "54.2%", top: "58.5%", transform: "translate(-50%, -50%)" }}
        >
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-moss-glow opacity-60 animate-ping" />
            <span
              className="relative inline-flex rounded-full bg-moss-glow ring-2 ring-moss-glow/40"
              style={{ width: "min(1.8vmin, 1rem)", height: "min(1.8vmin, 1rem)" }}
            />
          </span>
          <span
            className="whitespace-nowrap border border-concrete/40 bg-ink/60 backdrop-blur-sm px-2 py-1 uppercase tracking-brutal text-concrete"
            style={{ fontSize: "min(1.2vmin, 0.7rem)" }}
          >
            Enter
          </span>
        </div>

        {/* Title over photo */}
        <div className="absolute left-[4%] right-[4%] bottom-[5%]">
          <div
            className="font-serif leading-[0.92] font-normal"
            style={{
              color: "#fff",
              mixBlendMode: "difference",
              fontSize: "min(12vmin, 7.5rem)",
            }}
          >
            Residence 04
          </div>
          <div
            className="font-serif italic mt-[2%] text-concrete"
            style={{
              textShadow: "0 2px 18px rgba(0,0,0,0.75)",
              fontSize: "min(2vmin, 1.15rem)",
            }}
          >
            A sunken planter, four walls, one opening.
          </div>
        </div>
      </div>

      {/* Interior reel strip — three tiles suggesting horizontal motion */}
      <div className="shrink-0 relative overflow-hidden px-[4%] pt-[3%]" style={{ flex: "0 0 22%" }}>
        <div className="flex gap-[2%] h-full">
          {[
            "https://picsum.photos/seed/concrete-living/900/1100",
            "https://picsum.photos/seed/stair-concrete/900/1100",
            "https://picsum.photos/seed/bedroom-linen/900/1100",
            "https://picsum.photos/seed/kitchen-green/900/1100",
          ].map((src, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={src}
              alt=""
              className="h-full flex-1 object-cover"
            />
          ))}
        </div>
        {/* Right-edge fade to imply "more off-screen" */}
        <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-ink to-transparent pointer-events-none" />
      </div>

      {/* Scroll indicator row */}
      <div
        className="shrink-0 px-[4%] pt-[2%] flex items-center gap-3 uppercase tracking-brutal text-concrete/60"
        style={{ fontSize: "min(1.1vmin, 0.65rem)", flex: "0 0 5%" }}
      >
        <span>Scroll</span>
        <div className="flex-1 h-[1.5px] bg-concrete/15 relative">
          <div className="absolute inset-y-0 left-0 bg-moss-glow" style={{ width: "35%" }} />
        </div>
        <span className="tabular-nums">35%</span>
      </div>

      {/* Footer block — title + contact */}
      <div
        className="grow px-[4%] py-[2.5%] flex items-end justify-between border-t border-concrete/15"
      >
        <div
          className="font-serif italic text-concrete max-w-[60%]"
          style={{ fontSize: "min(2.2vmin, 1.3rem)" }}
        >
          Editorial web,
          <br />
          brutalist detail.
        </div>
        <div
          className="text-right uppercase tracking-brutal leading-relaxed text-concrete/70"
          style={{ fontSize: "min(1.3vmin, 0.75rem)" }}
        >
          Built by Szymon Laskowski
          <br />
          @_lasq_ · laskowski.studio
        </div>
      </div>
    </div>
  );
}

// ---------------- Mockup — site in a browser chrome ----------------

function MockupLayout() {
  return (
    <div className="absolute inset-0 bg-concrete-dark flex flex-col justify-center p-[5%] gap-[4%]">
      {/* Top meta */}
      <div
        className="flex items-center justify-between uppercase tracking-brutal text-concrete/70"
        style={{ fontSize: "min(1.4vmin, 0.8rem)" }}
      >
        <span>Laskowski.studio / 01</span>
        <span>Residence 04 — Brutalist Interiors</span>
      </div>

      {/* Browser window */}
      <div className="relative flex-1 bg-ink overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        {/* Chrome bar */}
        <div
          className="flex items-center gap-3 px-4 py-2 border-b border-concrete/10 bg-ink"
          style={{ height: "min(5vmin, 2.5rem)" }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div
            className="mx-auto px-4 py-0.5 bg-concrete/5 rounded-sm tracking-brutal text-concrete/60"
            style={{ fontSize: "min(1.2vmin, 0.7rem)" }}
          >
            laskowski.studio/residence-04
          </div>
        </div>

        {/* Page content — a mini rendering of the hero */}
        <div className="relative" style={{ height: "calc(100% - min(5vmin, 2.5rem))" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/mansion.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/50" />

          {/* Hotspot + label */}
          <div
            className="absolute flex items-center gap-2"
            style={{ left: "54.2%", top: "58.5%", transform: "translate(-50%,-50%)" }}
          >
            <span className="relative inline-flex">
              <span className="absolute inset-0 rounded-full bg-moss-glow opacity-60 animate-ping" />
              <span
                className="relative inline-flex rounded-full bg-moss-glow ring-2 ring-moss-glow/40"
                style={{ width: "min(1.5vmin, 0.9rem)", height: "min(1.5vmin, 0.9rem)" }}
              />
            </span>
            <span
              className="border border-concrete/40 bg-ink/60 backdrop-blur-sm px-2 py-1 uppercase tracking-brutal text-concrete whitespace-nowrap"
              style={{ fontSize: "min(1vmin, 0.6rem)" }}
            >
              Enter · Residence 04
            </span>
          </div>

          {/* Page header overlay */}
          <div
            className="absolute top-[4%] left-[4%] right-[4%] flex items-center justify-between uppercase tracking-brutal"
            style={{ mixBlendMode: "difference", color: "#fff", fontSize: "min(1.1vmin, 0.65rem)" }}
          >
            <span>Laskowski.studio — Interior Works</span>
            <span className="hidden md:inline">Works · Studio · Contact</span>
          </div>

          {/* Title block */}
          <div className="absolute left-[4%] right-[4%] bottom-[6%]">
            <div
              className="tracking-brutal uppercase text-moss-glow mb-[2%]"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)", fontSize: "min(1.1vmin, 0.65rem)" }}
            >
              Courtyard · 01 / 03
            </div>
            <div
              className="font-serif leading-[0.9] font-normal"
              style={{
                color: "#fff",
                mixBlendMode: "difference",
                fontSize: "min(9vmin, 5.5rem)",
              }}
            >
              Residence 04
            </div>
            <div
              className="font-serif italic mt-[2%] text-concrete"
              style={{
                textShadow: "0 2px 14px rgba(0,0,0,0.75)",
                fontSize: "min(1.4vmin, 0.8rem)",
              }}
            >
              A sunken planter, four walls, one opening.
            </div>
          </div>

          {/* Pager dots mimic */}
          <div
            className="absolute bottom-[4%] right-[4%] flex items-center gap-1.5 uppercase tracking-brutal"
            style={{ mixBlendMode: "difference", color: "#fff", fontSize: "min(1vmin, 0.6rem)" }}
          >
            <span>Prev</span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-[2px] w-4 ${i === 0 ? "bg-white" : "bg-white/25"}`}
              />
            ))}
            <span>Next</span>
          </div>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="flex items-end justify-between gap-6">
        <div
          className="font-serif italic text-concrete"
          style={{ fontSize: "min(2.4vmin, 1.4rem)" }}
        >
          Three residences,
          <br />
          one door each.
        </div>
        <div
          className="text-right uppercase tracking-brutal leading-relaxed text-concrete/70"
          style={{ fontSize: "min(1.3vmin, 0.75rem)" }}
        >
          Built by Szymon Laskowski
          <br />
          @_lasq_ · laskowski.studio
        </div>
      </div>
    </div>
  );
}
