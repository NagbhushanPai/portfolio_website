"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { usePrefersReducedMotion, useSceneProgress } from "@/components/scroll/hooks";

/**
 * Scene 7 — Contact. The flowline's behavior changes, not just its speed:
 * pulses stop, traces from earlier scenes dim, and the rail collapses into a
 * calm static rule beside the closing statement. No scrubbed motion after
 * ~90% so nothing competes with the contact choice.
 */
export function ResolutionScene({ children }: { children: ReactNode }) {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  const railOpacity = useTransform(progress, [0, 0.3, 1], [0.35, 1, 1]);
  const railLength = useTransform(progress, [0, 0.35], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-2 hidden h-[calc(100%-1rem)] lg:block"
      >
        {reducedMotion ? (
          <div className="h-full w-px bg-neutral-900 dark:bg-neutral-50" />
        ) : (
          <motion.svg width="2" height="100%" preserveAspectRatio="none" className="overflow-visible" style={{ opacity: railOpacity }}>
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-neutral-900 dark:text-neutral-50"
              style={{ pathLength: railLength }}
            />
          </motion.svg>
        )}
      </div>
      {children}
    </div>
  );
}
