"use client";

import type { ReactNode } from "react";
import { usePrefersReducedMotion, useSceneProgress } from "@/components/scroll/hooks";
import { FlowRail } from "@/components/scroll/flow-rail";
import { FlowPulse } from "@/components/scroll/flow-pulse";

type FlowSceneProps = {
  children: ReactNode;
  /** 1 = slow/contemplative pacing, 2 = faster/punchier pacing (two pulses in quick succession) */
  pulseCount?: 1 | 2;
  className?: string;
};

/**
 * Generic flowline scene wrapper reused across Scenes 1-5: a rail with one or
 * two traveling pulses beside the content, scrubbed to that section's own
 * scroll progress. Scenes 6 and 7 use bespoke visuals instead of this.
 */
export function FlowScene({ children, pulseCount = 1, className = "" }: FlowSceneProps) {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-2 hidden h-[calc(100%-1rem)] lg:block"
      >
        <FlowRail progress={progress} reducedMotion={reducedMotion} />
        {!reducedMotion && pulseCount === 1 && <FlowPulse progress={progress} range={[0.1, 0.9]} />}
        {!reducedMotion && pulseCount === 2 && (
          <>
            <FlowPulse progress={progress} range={[0.05, 0.5]} />
            <FlowPulse progress={progress} range={[0.3, 0.85]} />
          </>
        )}
      </div>
      {children}
    </div>
  );
}
