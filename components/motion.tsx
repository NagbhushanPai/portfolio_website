"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function useInView(delay = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
}

export function FadeIn({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, isVisible } = useInView(delay);

  return (
    <div
      ref={ref}
      className={`${className} motion-reveal ${isVisible ? "motion-reveal-visible" : ""}`}
    >
      {children}
    </div>
  );
}

export function StaggerList({ children, className = "" }: RevealProps) {
  const { ref, isVisible } = useInView();

  return (
    <div ref={ref} className={`${className} motion-stagger ${isVisible ? "motion-stagger-visible" : ""}`}>
      {children}
    </div>
  );
}
