"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ProjectSlug } from "@/lib/portfolio-data";

type VisualProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

const railColor = "text-neutral-900 dark:text-neutral-50";
const dimColor = "text-neutral-400 dark:text-neutral-600";

/** Rate Limiter: request pulses approach a gate; excess queue and fade. A capacity ring fills then drains. */
function RateLimiterVisual({ progress, reducedMotion }: VisualProps) {
  const cycle = useTransform(progress, (p) => (p * 2.4) % 1);
  const pulseX = useTransform(cycle, [0, 1], [4, 118]);
  const pulseOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  const ringFill = useTransform(progress, [0, 0.55, 1], [0, 0.78, 0.32]);
  const ringOffset = useTransform(ringFill, (v) => 2 * Math.PI * 18 * (1 - v));

  const gateGlow = useTransform(progress, (p) => (Math.sin(p * 26) > 0.3 ? 1 : 0.35));

  return (
    <svg viewBox="0 0 200 60" className="h-16 w-full max-w-sm overflow-visible" aria-hidden="true">
      <line x1="4" y1="30" x2="118" y2="30" strokeWidth="1" className={`${dimColor} stroke-current`} strokeDasharray="2 3" />
      <motion.line
        x1="122"
        y1="8"
        x2="122"
        y2="52"
        strokeWidth="2"
        className={`${railColor} stroke-current`}
        style={{ opacity: reducedMotion ? 1 : gateGlow }}
      />
      {!reducedMotion && (
        <motion.circle cx={pulseX} cy="30" r="3.5" className={`${railColor} fill-current`} style={{ opacity: pulseOpacity }} />
      )}
      <g transform="translate(160, 30)">
        <circle r="18" strokeWidth="2" fill="none" className={`${dimColor} stroke-current`} />
        <motion.circle
          r="18"
          strokeWidth="2"
          fill="none"
          className={`${railColor} stroke-current`}
          strokeDasharray={2 * Math.PI * 18}
          style={{ strokeDashoffset: ringOffset }}
          transform="rotate(-90)"
        />
      </g>
    </svg>
  );
}

/** Mini Kafka: three partition rails collect message blocks at different rates; a log strip retains what's passed. */
function MiniKafkaVisual({ progress, reducedMotion }: VisualProps) {
  const rails = [0, 22, 44];
  const speeds = [1, 0.7, 1.25];

  return (
    <svg viewBox="0 0 200 70" className="h-16 w-full max-w-sm overflow-visible" aria-hidden="true">
      {rails.map((y, railIndex) => (
        <g key={y}>
          <line x1="4" y1={10 + y} x2="180" y2={10 + y} strokeWidth="1" className={`${dimColor} stroke-current`} strokeDasharray="2 3" />
          {[0, 1, 2, 3, 4].map((i) => {
            const threshold = (i / 5) * speeds[railIndex];
            return <PartitionBlock key={i} progress={progress} threshold={Math.min(threshold, 0.95)} x={14 + i * 34} y={10 + y} />;
          })}
        </g>
      ))}
      <LogStrip progress={progress} reducedMotion={reducedMotion} />
    </svg>
  );
}

function PartitionBlock({ progress, threshold, x, y }: { progress: MotionValue<number>; threshold: number; x: number; y: number }) {
  const opacity = useTransform(progress, [threshold, threshold + 0.06], [0, 1]);
  return <motion.rect x={x} y={y - 4} width="8" height="8" rx="1.5" className="fill-current text-neutral-900 dark:text-neutral-50" style={{ opacity }} />;
}

function LogStrip({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean }) {
  const width = useTransform(progress, [0, 1], [0, 176]);
  return (
    <g transform="translate(4, 62)">
      <line x1="0" y1="0" x2="176" y2="0" strokeWidth="1" className={`${dimColor} stroke-current`} />
      <motion.line x1="0" y1="0" x2={reducedMotion ? 176 : width} y2="0" strokeWidth="3" className={`${railColor} stroke-current`} />
    </g>
  );
}

/** RAG Evaluation: a query fans into candidates; weak ones fade, strong ones converge. Score bars settle at the end. */
function RagVisual({ progress }: VisualProps) {
  const candidates = [
    { dx: 100, dy: -22, surviving: true },
    { dx: 110, dy: -6, surviving: true },
    { dx: 108, dy: 12, surviving: true },
    { dx: 96, dy: -32, surviving: false },
    { dx: 92, dy: 26, surviving: false },
  ];

  const fanOut = useTransform(progress, [0, 0.4], [0, 1]);
  const converge = useTransform(progress, [0.55, 0.85], [0, 1]);

  const baselineWidth = useTransform(progress, [0.75, 1], [0, 34]);
  const ragWidth = useTransform(progress, [0.8, 1], [0, 62]);

  return (
    <svg viewBox="0 0 200 90" className="h-20 w-full max-w-sm overflow-visible" aria-hidden="true">
      <circle cx="14" cy="0" r="4" transform="translate(0,32)" className="fill-current text-neutral-900 dark:text-neutral-50" />
      {candidates.map((c, i) => (
        <CandidateLine key={i} fanOut={fanOut} converge={converge} dx={c.dx} dy={c.dy} surviving={c.surviving} />
      ))}
      <g transform="translate(4, 68)">
        <text x="0" y="-4" fontSize="6" className="fill-current text-neutral-500 dark:text-neutral-400">baseline</text>
        <motion.rect x="0" y="0" height="5" rx="1" className="fill-current text-neutral-400 dark:text-neutral-600" style={{ width: baselineWidth }} />
        <text x="0" y="16" fontSize="6" className="fill-current text-neutral-500 dark:text-neutral-400">retrieval-augmented</text>
        <motion.rect x="0" y="20" height="5" rx="1" className="fill-current text-neutral-900 dark:text-neutral-50" style={{ width: ragWidth }} />
      </g>
    </svg>
  );
}

function CandidateLine({
  fanOut,
  converge,
  dx,
  dy,
  surviving,
}: {
  fanOut: MotionValue<number>;
  converge: MotionValue<number>;
  dx: number;
  dy: number;
  surviving: boolean;
}) {
  const fadeOpacity = useTransform(converge, [0, 1], [1, 0]);
  const convergeX = useTransform(converge, [0, 1], [14 + dx, 150]);
  const convergeY = useTransform(converge, [0, 1], [32 + dy, 32]);
  const staticX = useTransform(fanOut, [0, 1], [14, 14 + dx]);
  const staticY = useTransform(fanOut, [0, 1], [32, 32 + dy]);
  const lineOpacity = useTransform(fanOut, [0, 0.3], [0, 1]);

  const cx = surviving ? convergeX : staticX;
  const cy = surviving ? convergeY : staticY;
  const dotOpacity = surviving ? lineOpacity : fadeOpacity;

  return (
    <>
      <motion.line x1="14" y1="32" x2={cx} y2={cy} strokeWidth="1" className="stroke-current text-neutral-400 dark:text-neutral-600" style={{ opacity: lineOpacity }} />
      <motion.circle cx={cx} cy={cy} r="3" className="fill-current text-neutral-900 dark:text-neutral-50" style={{ opacity: dotOpacity }} />
    </>
  );
}

/** Deepfake Detection: audio and video channels fuse at a classifier node and resolve to a confidence readout. */
function DeepfakeVisual({ progress, reducedMotion }: VisualProps) {
  const fuse = useTransform(progress, [0, 0.7], [0, 1]);
  const audioY = useTransform(fuse, [0, 1], reducedMotion ? [30, 30] : [10, 30]);
  const videoY = useTransform(fuse, [0, 1], reducedMotion ? [30, 30] : [50, 30]);
  const confidence = useTransform(progress, [0.75, 1], reducedMotion ? [92, 92] : [0, 92]);
  const confidenceDisplay = useTransform(confidence, (v) => `${Math.round(v)}%`);
  const resultOpacity = useTransform(progress, [0.75, 0.9], reducedMotion ? [1, 1] : [0, 1]);

  return (
    <svg viewBox="0 0 200 70" className="h-16 w-full max-w-sm overflow-visible" aria-hidden="true">
      <text x="4" y="8" fontSize="6" className="fill-current text-neutral-500 dark:text-neutral-400">audio</text>
      <motion.line x1="4" y1="14" x2="110" y2={audioY} strokeWidth="1.5" className={`${railColor} stroke-current`} />
      <text x="4" y="58" fontSize="6" className="fill-current text-neutral-500 dark:text-neutral-400">video</text>
      <motion.line x1="4" y1="50" x2="110" y2={videoY} strokeWidth="1.5" className={`${dimColor} stroke-current`} />
      <circle cx="120" cy="30" r="6" className={`${railColor} stroke-current`} fill="none" strokeWidth="1.5" />
      <motion.g style={{ opacity: resultOpacity }}>
        <line x1="128" y1="30" x2="150" y2="30" strokeWidth="1.5" className={`${railColor} stroke-current`} />
        <motion.text x="154" y="34" fontSize="12" fontWeight="600" className="fill-current text-neutral-950 dark:text-neutral-50">
          {confidenceDisplay}
        </motion.text>
      </motion.g>
    </svg>
  );
}

const VISUALS: Record<ProjectSlug, (props: VisualProps) => React.ReactElement> = {
  "distributed-rate-limiter": RateLimiterVisual,
  "mini-kafka": MiniKafkaVisual,
  "rag-evaluation-system": RagVisual,
  "deepfake-detection-system": DeepfakeVisual,
};

export function ProjectVisual({ slug, progress, reducedMotion }: { slug: ProjectSlug } & VisualProps) {
  const Visual = VISUALS[slug];
  return <Visual progress={progress} reducedMotion={reducedMotion} />;
}
