"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type FlowPulseProps = {
  progress: MotionValue<number>;
  /** progress range, as [0,1] fractions of this scene, during which the pulse is visible/moving */
  range?: [number, number];
  className?: string;
};

/** A single dot traveling down a FlowRail, used to seed motion at the top of a scene. */
export function FlowPulse({ progress, range = [0, 1], className = "" }: FlowPulseProps) {
  const [start, end] = range;
  const y = useTransform(progress, [start, end], ["0%", "100%"]);
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className={`absolute -left-[4.5px] overflow-visible ${className}`}
      style={{ top: y, opacity }}
    >
      <circle cx="5" cy="5" r="4" className="fill-neutral-900 dark:fill-neutral-50" />
    </motion.svg>
  );
}
