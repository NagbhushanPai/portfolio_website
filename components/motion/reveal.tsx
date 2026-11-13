"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { getGsap, isLowPowerDevice, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animate direct children as a stagger group instead of the wrapper as one block. */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className = "", stagger = false, delay = 0, y = 20 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const targets = stagger ? Array.from(node.children) : node;
    const blur = !isLowPowerDevice();

    const ctx = gsap.context(() => {
      if (stagger) gsap.set(node, { opacity: 1 });
      gsap.set(targets, { opacity: 0, y, ...(blur && { filter: "blur(8px)" }) });
      gsap.to(
        targets,
        {
          opacity: 1,
          y: 0,
          ...(blur && { filter: "blur(0px)" }),
          duration: 0.7,
          delay: Math.min(delay, 0.1),
          ease: "expo.out",
          stagger: stagger ? 0.06 : 0,
          scrollTrigger: {
            trigger: node,
            // Start as soon as the element peeks into view, not once it is 15% up the screen.
            start: "top 98%",
            once: true,
          },
        },
      );
    }, node);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === node) trigger.kill();
      });
    };
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={`motion-reveal ${className}`}>
      {children}
    </div>
  );
}
