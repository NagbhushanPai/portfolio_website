"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function Counter({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.textContent = to.toLocaleString();
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = Math.round(counter.value).toLocaleString();
        },
        scrollTrigger: {
          trigger: node,
          start: "top 90%",
          once: true,
        },
      });
    }, node);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === node) trigger.kill();
      });
    };
  }, [to, duration]);

  return <span ref={ref}>0</span>;
}
