"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/lib/portfolio-data";
import { toggleTheme } from "@/lib/theme";
import { HeroRain } from "@/components/motion/hero-rain";

const bustSrc = "/hero_bust-removebg-preview-Sw9E7wuY.png";

const statements = [
  ["Building Reliable", "Systems"],
  ["Turning Research", "Into Products"],
  ["One step", "at a time."],
] as const;

/** Scroll-progress windows [fadeInStart, fullyIn, fadeOutStart, gone] for each statement. */
const statementWindows = [
  [0.15, 0.25, 0.35, 0.45],
  [0.4, 0.5, 0.6, 0.7],
  [0.65, 0.75, 0.85, 0.95],
] as const;

const [firstName, ...rest] = siteConfig.name.split(" ");
const lastName = rest.join(" ");

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nameLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const nameLineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bustOuterRef = useRef<HTMLDivElement | null>(null);
  const bustInnerRef = useRef<HTMLDivElement | null>(null);
  const statementRefs = useRef<Array<HTMLDivElement | null>>([]);
  const arrowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ease = "expo.out";
    let removeLoaderListener = () => {};

    const ctx = gsap.context(() => {
      const nameLayers = nameLayerRefs.current.filter(Boolean);
      const nameLines = nameLineRefs.current.filter(Boolean);
      const copy = copyRefs.current.filter(Boolean);
      const statementsEls = statementRefs.current.filter(Boolean) as HTMLDivElement[];
      const arrows = arrowRefs.current.filter(Boolean);
      const bustOuter = bustOuterRef.current;
      const bustInner = bustInnerRef.current;

      /* ---------- Entrance (after the page loader) ---------- */
      gsap.set(nameLines, { opacity: 0, y: 50, filter: "blur(10px)" });
      gsap.set(bustInner, { opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" });
      gsap.set(copy, { opacity: 0, y: 20 });
      gsap.set(arrows, { opacity: 0, y: 20 });

      const entrance = gsap.timeline({ paused: true, defaults: { ease, duration: 0.8 } });
      entrance
        .to(nameLines[0], { opacity: 1, y: 0, filter: "blur(0px)" }, 0)
        .to(nameLines[1], { opacity: 1, y: 0, filter: "blur(0px)" }, 0.05)
        .to(bustInner, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.2 }, 0.1)
        .to(copy, { opacity: 1, y: 0, stagger: 0.08 }, 0.25)
        .to(arrows, { opacity: 1, y: 0, stagger: 0.1 }, 0.3);

      const startEntrance = () => entrance.play();
      window.addEventListener("portfolio-loader-complete", startEntrance);
      removeLoaderListener = () => window.removeEventListener("portfolio-loader-complete", startEntrance);
      if (document.documentElement.dataset.pageLoaderComplete === "true") startEntrance();

      /* ---------- Scroll timeline (progress 0 → 1 across the 400dvh section) ---------- */
      gsap.set(statementsEls, { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
      });

      // Name + intro copy fade, drift up and blur away.
      tl.to(nameLayers, { opacity: 0, filter: "blur(10px)", duration: 0.15 }, 0)
        .to(copy.map((el) => el?.parentElement), { autoAlpha: 0, filter: "blur(10px)", duration: 0.15 }, 0)
        .to(nameLayers, { y: -150, duration: 0.2 }, 0)
        .to(arrows.map((el) => el?.parentElement), { opacity: 0, duration: 0.05 }, 0);

      // Bust zooms toward the viewer, slides off to the left, then blurs out.
      tl.to(bustOuter, { scale: 2.2, duration: 0.8 }, 0)
        .to(bustOuter, { scale: 3.5, duration: 0.2 }, 0.8)
        .to(bustOuter, { y: 150, duration: 1 }, 0)
        .to(bustOuter, { x: "-40vw", duration: 0.3 }, 0.15)
        .to(bustOuter, { x: "-80vw", duration: 0.35 }, 0.45)
        .to(bustOuter, { filter: "blur(20px)", duration: 0.3 }, 0.6)
        .to(bustOuter, { opacity: 0, duration: 0.25 }, 0.7);

      // Statements cross-fade through their windows.
      statementsEls.forEach((el, i) => {
        const [a, b, c, d] = statementWindows[i];
        tl.to(el, { opacity: 1, filter: "blur(0px)", duration: b - a }, a)
          .to(el, { opacity: 0, filter: "blur(10px)", duration: d - c }, c)
          .to(el, { y: -50, scale: 1.1, duration: d - a }, a);
      });

      tl.set({}, {}, 1);
    }, section);

    return () => {
      ctx.revert();
      removeLoaderListener();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[400dvh] selection:bg-[var(--accent)] selection:text-black"
    >
      <h1 className="sr-only">
        {siteConfig.name} — {siteConfig.role}
      </h1>

      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <HeroRain />

        <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-[2vw]">
          {/* First name — bust — last name, stacked without overlap */}
          <div className="relative z-20 flex -translate-y-[3dvh] flex-col items-center gap-[2dvh]">
            {[firstName, lastName].map((part, i) => (
              <div
                key={part}
                ref={(n) => {
                  nameLayerRefs.current[i] = n;
                }}
                aria-hidden="true"
                className={`pointer-events-none font-serif-display text-[min(14vw,15dvh)] uppercase leading-[0.8] tracking-[-0.03em] text-[var(--foreground)] ${i === 0 ? "order-1" : "order-3"}`}
              >
                <div
                  ref={(n) => {
                    nameLineRefs.current[i] = n;
                  }}
                >
                  {part}
                </div>
              </div>
            ))}

            {/* Bust — click to toggle the theme */}
            <div
              ref={bustOuterRef}
              className="relative order-2 h-[30dvh] cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Toggle light and dark theme"
              onClick={(e) => toggleTheme(e.clientX, e.clientY)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
              }}
            >
              <div ref={bustInnerRef} className="relative aspect-[1/1.08] h-full">
                <Image
                  src={bustSrc}
                  alt="Monochrome Roman bust"
                  fill
                  priority
                  sizes="30vh"
                  className="hero-bust-img object-contain grayscale drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>
          </div>

          {/* Intro copy, fades with the name */}
          <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center px-5 sm:top-24">
            <div
              ref={(n) => {
                copyRefs.current[0] = n;
              }}
            >
              <p className="label-meta mx-auto max-w-max rounded-full border border-[var(--line)] bg-[var(--glass)] px-4 py-2 backdrop-blur-sm">
                <span className="sm:hidden">{siteConfig.role} · systems + AI</span>
                <span className="hidden sm:inline">{siteConfig.role} · systems, APIs + AI</span>
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-20 z-40 flex justify-center px-16 sm:bottom-14">
            <div
              ref={(n) => {
                copyRefs.current[1] = n;
              }}
              className="flex max-w-2xl flex-col items-center text-center"
            >
              <p className="hidden text-balance text-sm leading-7 text-[var(--muted)] sm:block sm:text-base">
                I&apos;m {siteConfig.name}, a {siteConfig.role.toLowerCase()} working on backend systems, APIs, and
                computer-vision products that need to work beyond the demo.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  View selected work
                  <span aria-hidden="true">↘</span>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--glass)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Read the work
                  <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>

          {/* Scroll statements */}
          {statements.map(([line1, line2], index) => (
            <div
              key={line1}
              ref={(n) => {
                statementRefs.current[index] = n;
              }}
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4 text-center font-serif-display text-[var(--foreground)] opacity-0"
            >
              <p className="text-4xl font-medium leading-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-8xl">
                {line1}
                <br />
                <span className="italic">
                  {line2}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Corner scroll arrows */}
        {(["left", "right"] as const).map((side, i) => (
          <div
            key={side}
            className={`absolute bottom-6 z-[45] opacity-60 md:bottom-12 ${side === "left" ? "left-6 md:left-12" : "right-6 md:right-12"}`}
          >
            <div
              ref={(n) => {
                arrowRefs.current[i] = n;
              }}
            >
              <ArrowDown className="h-6 w-6 text-[var(--foreground)] md:h-10 md:w-10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
