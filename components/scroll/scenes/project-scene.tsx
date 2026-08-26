"use client";

import type { ReactNode } from "react";
import { usePrefersReducedMotion, useSceneProgress } from "@/components/scroll/hooks";
import { FlowRail } from "@/components/scroll/flow-rail";
import { ProjectVisual } from "@/components/scroll/scenes/project-visuals";
import type { ProjectSlug } from "@/lib/portfolio-data";

/**
 * Scene 6, one beat per project. The flowline continues as a rail, and a
 * bespoke mechanism panel above the card makes that project's underlying
 * transformation legible (gate/ring, partitions/log, fan-in/scores, fusion).
 */
export function ProjectScene({ slug, children }: { slug: ProjectSlug; children: ReactNode }) {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-2 hidden h-[calc(100%-1rem)] lg:block"
      >
        <FlowRail progress={progress} reducedMotion={reducedMotion} />
      </div>
      <div className="mb-5 rounded-xl border border-black/10 bg-white/50 px-3 py-3 dark:border-white/10 dark:bg-white/5">
        <ProjectVisual slug={slug} progress={progress} reducedMotion={reducedMotion} />
      </div>
      {children}
    </div>
  );
}
