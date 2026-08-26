"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type FlowRailProps = {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  className?: string;
};

/**
 * The continuity spine: one vertical rule reused in every scene at the same
 * x-position as the site's existing left-accent bars. It is not a single DOM
 * node spanning the page (section heights vary) — continuity comes from
 * identical position/styling and matching start/end states across scenes.
 */
export function FlowRail({ progress, reducedMotion, className = "" }: FlowRailProps) {
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={`w-px bg-neutral-900 dark:bg-neutral-50 ${className}`}
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      width="2"
      height="100%"
      preserveAspectRatio="none"
      className={`overflow-visible ${className}`}
    >
      <motion.line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-900 dark:text-neutral-50"
        style={{ pathLength }}
      />
    </svg>
  );
}
