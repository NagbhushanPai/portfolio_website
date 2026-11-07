"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/lib/portfolio-data";

const LOADED_KEY = "portfolio-loaded";

function monogram(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PageLoader() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const alreadyLoaded = typeof window !== "undefined" && sessionStorage.getItem(LOADED_KEY) === "1";
    if (alreadyLoaded || prefersReducedMotion()) {
      overlay.style.display = "none";
      sessionStorage.setItem(LOADED_KEY, "1");
      return;
    }

    sessionStorage.setItem(LOADED_KEY, "1");
    document.documentElement.style.overflow = "hidden";

    const { gsap } = getGsap();
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        overlay.style.display = "none";
      },
    });

    tl.fromTo(markRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.15")
      .to(markRef.current, { opacity: 0, y: -16, duration: 0.4, ease: "power2.in" }, "+=0.1")
      .to(overlay, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1");

    return () => {
      document.documentElement.style.overflow = "";
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[var(--background)]"
      aria-hidden="true"
    >
      <div ref={markRef} className="font-serif-display text-2xl italic tracking-tight text-[var(--foreground)]">
        {monogram(siteConfig.name)}
      </div>
      <div className="h-px w-40 origin-left overflow-hidden bg-black/10">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-[var(--foreground)]" />
      </div>
    </div>
  );
}
