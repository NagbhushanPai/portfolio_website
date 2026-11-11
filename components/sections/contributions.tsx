"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Counter } from "@/components/motion/counter";

type Day = { date: string; contributionCount: number; weekday: number };
type Week = { contributionDays: Day[] };
type ContributionsResponse = { total: number; weeks: Week[] } | { error: string };

const LEVELS = ["#ebe7dd", "#e2c98a", "#e8b73b", "#c98f1c", "#8a5f0c"];

function levelFor(count: number) {
  if (count === 0) return LEVELS[0];
  if (count <= 2) return LEVELS[1];
  if (count <= 5) return LEVELS[2];
  if (count <= 9) return LEVELS[3];
  return LEVELS[4];
}

export function Contributions() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [data, setData] = useState<ContributionsResponse | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ error: "Failed to load" }));
  }, [hasEntered]);

  if (data && "error" in data) return null;

  return (
    <section
      ref={sectionRef}
      id="contributions"
      className="border-t border-black/10 px-5 py-20 sm:px-8 md:px-12"
    >
      <Reveal>
        <SectionLabel index="02" label="Activity" />
      </Reveal>
      <SplitHeading className="mt-6 font-serif-display text-3xl italic leading-tight sm:text-4xl">
        Building in <span className="not-italic font-medium">public,</span> most days.
      </SplitHeading>

      <Reveal className="mt-10 rounded-2xl border border-black/10 bg-white/50 p-6" delay={0.1}>
        {!data ? (
          <div className="h-[110px] animate-pulse rounded-lg bg-black/5" aria-hidden="true" />
        ) : (
          <>
            <p className="text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">
                <Counter to={data.total} />
              </span>{" "}
              contributions in the last year
            </p>
            <div
              className="heatmap-grid mt-4 grid w-full gap-[clamp(2px,0.35vw,5px)]"
              style={{ gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))` }}
              aria-label="GitHub contributions for the last year"
            >
              {data.weeks.map((week, i) => (
                <div key={i} className="grid min-w-0 grid-rows-7 gap-[clamp(2px,0.35vw,5px)]">
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={day.date}
                      className={`heatmap-cell ${hasEntered ? "heatmap-cell-animated" : ""}`}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      style={{
                        background: levelFor(day.contributionCount),
                        animationDelay: `${(i * 7 + dayIndex) * 8}ms`,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="heatmap-legend mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span>Less</span>
              {LEVELS.map((color) => (
                <span key={color} className="heatmap-cell" style={{ background: color }} />
              ))}
              <span>More</span>
            </div>
          </>
        )}
      </Reveal>
    </section>
  );
}
