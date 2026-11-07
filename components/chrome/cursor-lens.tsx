"use client";

import { useEffect, useRef } from "react";

export function CursorLens() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reducedMotion) return;

    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      wrapper.style.opacity = "1";
      const target = e.target as HTMLElement | null;
      const isActive = !!target?.closest("a, button");
      glowRef.current?.classList.toggle("scale-125", isActive);
      lensRef.current?.classList.toggle("scale-125", isActive);
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
        className="absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-2xl transition-transform duration-300 ease-out"
      />
      <div
        ref={lensRef}
        className="absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-150 ease-out"
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
