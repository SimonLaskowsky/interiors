"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Phase } from "./LandingExperience";
import type { House } from "./houses";
import SplitText from "./SplitText";

type Props = {
  house: House;
  phase: Phase;
  index: number;
  total: number;
  onEnter: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function HeroImage({
  house,
  phase,
  index,
  total,
  onEnter,
  onPrev,
  onNext,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const doorBtnRef = useRef<HTMLButtonElement>(null);

  const DOOR = house.door;

  // Mouse parallax on the scene container — image + hotspot move as one.
  useEffect(() => {
    if (phase !== "exterior") return;
    const scene = sceneRef.current;
    if (!scene) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.x = (e.clientX - cx) / cx;
      target.y = (e.clientY - cy) / cy;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      scene.style.transform = `scale(1.06) translate3d(${
        current.x * -22
      }px, ${current.y * -16}px, 0) rotateX(${current.y * -1.2}deg) rotateY(${
        current.x * 1.4
      }deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  // Magnetic door hotspot — nudges toward the cursor when it's within range.
  useEffect(() => {
    if (phase !== "exterior") return;
    const btn = doorBtnRef.current;
    if (!btn) return;

    let raf = 0;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const RADIUS = 160; // px of influence
    const STRENGTH = 0.35;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS) {
        const falloff = 1 - dist / RADIUS;
        target.x = dx * STRENGTH * falloff;
        target.y = dy * STRENGTH * falloff;
      } else {
        target.x = 0;
        target.y = 0;
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      btn.style.transform = `translate(-50%, -50%) translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [phase]);

  // Small zoom during "entering" — sells the camera push before the
  // clip-path wipe takes over.
  useEffect(() => {
    if (phase !== "entering") return;
    const scene = sceneRef.current;
    const ui = uiRef.current;
    if (!scene || !ui) return;

    scene.style.transformOrigin = `${DOOR.x * 100}% ${DOOR.y * 100}%`;

    const tl = gsap.timeline();
    tl.to(ui, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0)
      .to(scene, { scale: 2.1, duration: 1.1, ease: "power2.in" }, 0);

    return () => {
      tl.kill();
    };
  }, [phase, DOOR.x, DOOR.y]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden bg-ink"
    >
      <div
        className="absolute inset-0"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={sceneRef}
          className="absolute inset-0 will-change-transform hero-fadein"
          style={{
            transform: "scale(1.06)",
            transformOrigin: `${DOOR.x * 100}% ${DOOR.y * 100}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={house.photo}
            alt={`${house.name} — ${house.subtitle}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: house.objectPosition ?? "50% 50%" }}
            draggable={false}
          />

          {phase === "exterior" && (
            <button
              ref={doorBtnRef}
              onClick={onEnter}
              aria-label={`Enter ${house.name}`}
              data-cursor="hover"
              className="group absolute flex items-center gap-3 will-change-transform"
              style={{
                left: `${DOOR.x * 100}%`,
                top: `${DOOR.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="hotspot-pulse relative inline-flex h-4 w-4 rounded-full bg-moss-glow ring-2 ring-moss-glow/40" />
              <span className="whitespace-nowrap border border-concrete/30 group-hover:border-moss-glow bg-ink/60 backdrop-blur-sm px-3 py-2 text-[10px] uppercase tracking-brutal text-concrete transition-colors">
                Enter · {house.name}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Atmosphere */}
      <div className="vignette-pulse pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,13,10,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/80" />

      {/* UI */}
      <div
        ref={uiRef}
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 pointer-events-none"
      >
        <header
          className="flex items-center justify-between pointer-events-auto"
          style={{ mixBlendMode: "difference", color: "#ffffff" }}
        >
          <div className="tracking-brutal text-xs md:text-sm uppercase">
            Laskowski.studio — Interior Works
          </div>
          <nav className="hidden md:flex gap-6 text-xs uppercase tracking-brutal">
            <a href="#works" className="hover:opacity-70">
              Works
            </a>
            <a href="#studio" className="hover:opacity-70">
              Studio
            </a>
            <a href="#contact" className="hover:opacity-70">
              Contact
            </a>
          </nav>
        </header>

        <div className="max-w-3xl">
          <div
            key={`sub-${house.id}`}
            className="tracking-brutal text-xs uppercase text-moss-glow mb-4 fade-in"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
          >
            {house.subtitle} · {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </div>
          <h1
            className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.95] font-normal overflow-hidden"
            style={{ color: "#ffffff", mixBlendMode: "difference" }}
          >
            <SplitText
              key={`name-${house.id}`}
              text={house.name}
              trigger={house.id}
              delay={0.05}
            />
          </h1>
          <p
            key={`tag-${house.id}`}
            className="fade-in mt-6 max-w-md text-concrete text-sm md:text-base italic font-serif"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
          >
            {house.tagline}
          </p>
        </div>

        <footer
          className="flex items-end justify-between gap-4 text-[10px] uppercase tracking-brutal"
          style={{ mixBlendMode: "difference", color: "#ffffff" }}
        >
          <div>© Laskowski.studio / Est. 2019</div>

          <div className="pointer-events-auto flex items-center gap-5">
            <button
              onClick={onPrev}
              aria-label="Previous house"
              className="hover:opacity-60 transition-opacity"
            >
              ← Prev
            </button>
            <div className="flex gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] w-6 transition-colors ${
                    i === index ? "bg-white" : "bg-white/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={onNext}
              aria-label="Next house"
              className="hover:opacity-60 transition-opacity"
            >
              Next →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
