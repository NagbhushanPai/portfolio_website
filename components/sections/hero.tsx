"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/lib/portfolio-data";

const REENTRY_KEY = "portfolio-hero-reentry";
const bustSrc = "/hero_bust-removebg-preview-Sw9E7wuY.png";

const statements = [
  ["Crafting Immersive", "Digital Experiences"],
  ["Where Deep Tech", "Meets High-End Design"],
  ["Welcome to my", "Realm."],
] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const bustRef = useRef<HTMLDivElement | null>(null);
  const stateRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isReentry = typeof window !== "undefined" && sessionStorage.getItem(REENTRY_KEY) === "1";
    sessionStorage.removeItem(REENTRY_KEY);

    const states = stateRefs.current.filter(Boolean) as HTMLDivElement[];
    const stateLines = states.map((node) => Array.from(node.querySelectorAll<HTMLElement>("[data-hero-line]")));
    const bust = bustRef.current;
    const eyebrow = eyebrowRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const cue = cueRef.current;
    const panel = panelRef.current;

    if (prefersReducedMotion()) {
      if (bust) {
        bust.style.opacity = "1";
        bust.style.filter = "none";
        bust.style.transform = "translate3d(0, 0, 0) scale(1)";
      }

      states.forEach((node, index) => {
        node.style.opacity = index === states.length - 1 ? "1" : "0";
        node.style.filter = "none";
        node.style.transform = "none";
      });

      [eyebrow, body, cta, cue].forEach((node) => {
        if (!node) return;
        node.style.opacity = "1";
        node.style.transform = "none";
      });

      return;
    }

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      gsap.set(panel, { opacity: 1, y: 0 });
      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.set(body, { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(cta, { opacity: 0, y: 16 });
      gsap.set(cue, { opacity: 0, y: 10 });

      if (bust) {
        gsap.set(bust, { opacity: 0, x: 40, y: 18, scale: 0.92, filter: "blur(16px)" });
      }

      states.forEach((node, index) => {
        const lines = stateLines[index] ?? [];
        const isFirst = index === 0;

        gsap.set(node, {
          opacity: isFirst ? 0.7 : 0,
          y: isFirst ? 10 : 18,
          filter: isFirst ? "blur(8px)" : "blur(14px)",
        });

        gsap.set(lines, {
          opacity: isFirst ? 0.8 : 0,
          y: isFirst ? 14 : 24,
          filter: isFirst ? "blur(6px)" : "blur(12px)",
        });
      });

      if (isReentry) {
        if (bust) {
          gsap.to(bust, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" });
        }

        states.forEach((node, index) => {
          const lines = stateLines[index] ?? [];
          if (index === states.length - 1) {
            gsap.to(node, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" });
            gsap.to(lines, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "power3.out" });
          } else {
            gsap.set(node, { opacity: 0, y: 0, filter: "blur(0px)" });
            gsap.set(lines, { opacity: 0, y: 0, filter: "blur(0px)" });
          }
        });

        const reentryCopy = [eyebrow, body, cta, cue].filter(Boolean);
        gsap.to(reentryCopy, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.05,
        });

        if (panel) {
          gsap.to(panel, {
            opacity: 0.9,
            y: -32,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom 70%",
              scrub: 0.75,
            },
          });
        }

        return;
      }

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

      entrance
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.45 }, 0.05)
        .to(bust, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5 }, 0)
        .to(states[0], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, 0.1)
        .to(stateLines[0], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.08 }, 0.1)
        .to(body, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, 0.75)
        .to(cta, { opacity: 1, y: 0, duration: 0.55 }, 0.95)
        .to(cue, { opacity: 1, y: 0, duration: 0.45 }, 1.05)
        .to(states[0], { opacity: 0, y: -10, filter: "blur(10px)", duration: 0.75 }, 1.12)
        .to(stateLines[0], { opacity: 0, y: -10, filter: "blur(10px)", duration: 0.75, stagger: 0.08 }, 1.12)
        .to(states[1], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95 }, 1.26)
        .to(stateLines[1], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95, stagger: 0.08 }, 1.26)
        .to(bust, { x: -14, y: 0, duration: 0.9 }, 1.44)
        .to(states[1], { opacity: 0, y: -10, filter: "blur(10px)", duration: 0.8 }, 2.26)
        .to(stateLines[1], { opacity: 0, y: -10, filter: "blur(10px)", duration: 0.8, stagger: 0.08 }, 2.26)
        .to(states[2], { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, 2.42)
        .to(stateLines[2], { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.08 }, 2.42)
        .to(bust, { x: -34, opacity: 0.28, scale: 0.98, filter: "blur(4px)", duration: 1.05, ease: "power2.inOut" }, 2.62)
        .to(body, { opacity: 1, y: 0, duration: 0.4 }, 2.74)
        .to(cue, { opacity: 0.82, y: 0, duration: 0.4 }, 2.88);

      if (panel) {
        gsap.to(panel, {
          opacity: 0.88,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom 70%",
            scrub: 0.75,
          },
        });
      }
    }, hero);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === hero) trigger.kill();
      });
    };
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative min-h-[135vh] px-5 sm:px-8 md:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(232,183,59,0.12),transparent_28%),radial-gradient(circle_at_35%_55%,rgba(0,0,0,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_24%)]"
      />

      <div ref={panelRef} className="sticky top-0 flex min-h-[100svh] items-center py-24">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
          <div
            ref={bustRef}
            className="absolute left-1/2 top-[52%] z-0 w-[min(80vw,34rem)] -translate-x-[58%] -translate-y-[50%] drop-shadow-[0_34px_52px_rgba(0,0,0,0.22)] sm:w-[min(70vw,39rem)] lg:w-[min(52vw,43rem)]"
          >
            <div className="relative aspect-[1/1.08]">
              <Image
                src={bustSrc}
                alt="Monochrome Roman bust"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 48vw"
                className="object-contain grayscale"
              />
            </div>
          </div>

          <div className="relative z-10 w-full max-w-5xl text-center">
            <p
              ref={eyebrowRef}
              className="label-meta mx-auto max-w-max rounded-full border border-black/10 bg-white/45 px-4 py-2 backdrop-blur-sm"
            >
              <span className="sm:hidden">{siteConfig.role} · systems + AI</span>
              <span className="hidden sm:inline">{siteConfig.role} · systems, APIs + AI</span>
            </p>

            <div className="relative mt-8 min-h-[clamp(10rem,22vw,15rem)] sm:min-h-[clamp(12rem,24vw,18rem)]">
              {statements.map((lines, index) => (
                <div
                  key={lines.join("-")}
                  ref={(node) => {
                    stateRefs.current[index] = node;
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-2 text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-[var(--foreground)]"
                >
                  {lines.map((line, lineIndex) => (
                    <span key={line} data-hero-line="true" className={`${lineIndex === 1 ? "italic" : ""} block`}>
                      {line}
                    </span>
                  ))}

                  {index === statements.length - 1 ? (
                    <svg
                      viewBox="0 0 200 20"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className="mt-2 h-4 w-56 text-[var(--accent)] sm:w-72"
                    >
                      <path
                        d="M2 14 C 50 4, 150 4, 198 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>

            <p ref={bodyRef} className="relative z-20 mx-auto mt-8 max-w-2xl rounded-2xl bg-[rgba(246,243,236,0.82)] px-4 py-2 text-balance text-base leading-8 text-[var(--muted)] backdrop-blur-sm sm:text-lg">
              I&apos;m {siteConfig.name}, a {siteConfig.role.toLowerCase()} building systems that hold up under real
              traffic, APIs, and computer vision products that ship past the demo stage. The opening sequence introduces
              the work, then settles into a readable portfolio.
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                View selected work
                <span aria-hidden="true">↘</span>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-5 py-3 text-sm font-medium text-[var(--foreground)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                Enter the document
                <span aria-hidden="true">↘</span>
              </a>
            </div>

            <div ref={cueRef} className="mt-8 text-center text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Scroll to unfold the archive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
