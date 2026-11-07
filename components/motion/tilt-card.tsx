"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    const { gsap } = getGsap();
    const rotateX = gsap.quickTo(node, "rotateX", { duration: 0.5, ease: "power3.out" });
    const rotateY = gsap.quickTo(node, "rotateY", { duration: 0.5, ease: "power3.out" });
    const lift = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });

    gsap.set(node, { transformPerspective: 800, transformStyle: "preserve-3d" });

    const move = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX(py * -6);
      rotateY(px * 6);
      lift(-4);
    };

    const reset = () => {
      rotateX(0);
      rotateY(0);
      lift(0);
    };

    node.addEventListener("mousemove", move);
    node.addEventListener("mouseleave", reset);

    return () => {
      node.removeEventListener("mousemove", move);
      node.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
