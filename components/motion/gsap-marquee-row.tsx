"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function GsapMarqueeRow({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const doubled = [...items, ...items];

  useLayoutEffect(() => {
    const node = trackRef.current;
    if (!node || prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const baseDuration = 34;

    const tween = gsap.fromTo(
      node,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: baseDuration, ease: "none", repeat: -1 },
    );

    const proxy = { boost: 1 };
    const quickBoost = gsap.quickTo(proxy, "boost", {
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => tween.timeScale(proxy.boost),
    });

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        quickBoost(1 + Math.min(velocity / 1800, 1));
      },
    });

    return () => {
      tween.kill();
      trigger.kill();
    };
  }, [reverse]);

  return (
    <div className="marquee-mask overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-3">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-1.5 shrink-0 rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm text-[var(--muted)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
