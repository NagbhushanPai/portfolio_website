"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactElement } from "react";
import { cloneElement } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

type MagneticProps = {
  children: ReactElement<{ className?: string }>;
  strength?: number;
};

export function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    const { gsap } = getGsap();
    const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const reset = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("mousemove", move);
    node.addEventListener("mouseleave", reset);

    return () => {
      node.removeEventListener("mousemove", move);
      node.removeEventListener("mouseleave", reset);
    };
  }, [strength]);

  // eslint-disable-next-line react-hooks/refs -- ref is only assigned in a commit-phase callback, never read during render
  return cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      ref.current = node;
    },
  } as never);
}
