"use client";

import { useLayoutEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

type SplitHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
};

export function SplitHeading({ children, as: Tag = "h2", className = "", delay = 0, id }: SplitHeadingProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      return;
    }

    const { gsap, ScrollTrigger, SplitText } = getGsap();
    let split: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      split = SplitText.create(node, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
      });

      gsap.set(split.lines, { yPercent: 110 });
      gsap.to(split.lines, {
        yPercent: 0,
        duration: 0.9,
        delay,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: node,
          start: "top 88%",
          once: true,
        },
      });
    }, node);

    return () => {
      ctx.revert();
      split?.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === node) trigger.kill();
      });
    };
  }, [delay]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
