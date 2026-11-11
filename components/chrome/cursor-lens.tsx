"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export function CursorLens() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reducedMotion) return;

    document.body.style.cursor = "none";
    document.documentElement.classList.add("custom-cursor-active");
    const { gsap } = getGsap();
    const xTo = gsap.quickTo(wrapperRef.current, "x", { duration: 0.22, ease: "power3.out" });
    const yTo = gsap.quickTo(wrapperRef.current, "y", { duration: 0.22, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      xTo(e.clientX);
      yTo(e.clientY);
      wrapper.style.opacity = "1";
      const target = e.target as HTMLElement | null;
      const isActive = !!target?.closest("a, button");
      gsap.to([glowRef.current, lensRef.current], { scale: isActive ? 1.25 : 1, duration: 0.22, ease: "power3.out", overwrite: true });
    };

    const handleLeave = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      wrapper.style.opacity = "0";
    };

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.body.style.cursor = "";
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] opacity-0 transition-opacity duration-200 ease-out"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 opacity-80 transition-none"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={lensRef}
        className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-none"
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
