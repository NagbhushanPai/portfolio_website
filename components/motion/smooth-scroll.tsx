"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap, isLowPowerDevice, prefersReducedMotion } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    // Native scrolling is smoother than JS-driven scrolling on touch devices.
    if (prefersReducedMotion() || isLowPowerDevice()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return null;
}
