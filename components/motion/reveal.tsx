"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animate direct children as a stagger group instead of the wrapper as one block. */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className = "", stagger = false, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const targets = stagger ? Array.from(node.children) : node;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
