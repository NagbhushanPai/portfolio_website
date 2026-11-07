"use client";

import { useEffect, useState } from "react";
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
  const [data, setData] = useState<ContributionsResponse | null>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ error: "Failed to load" }));
  }, []);

  return (
    <section className="border-t border-black/10 px-5 py-20 sm:px-8 md:px-12">
      <Reveal>
        <SectionLabel index="02" label="Activity" />
      </Reveal>
      <SplitHeading className="mt-6 font-serif-display text-3xl italic leading-tight sm:text-4xl">
        Building in <span className="not-italic font-medium">public,</span> most days.
      </SplitHeading>

      <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-black/10 bg-white/50 p-6" delay={0.1}>
        {!data ? (
          <div className="h-[110px] animate-pulse rounded-lg bg-black/5" aria-hidden="true" />
        ) : "error" in data ? (
          <p className="text-sm text-[var(--muted)]">Live contribution data is unavailable right now.</p>
        ) : (
          <>
            <p className="text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">
                <Counter to={data.total} />
              </span>{" "}
              contributions in the last year
            </p>
            <div className="mt-4 flex w-max gap-1">
              {data.weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
                      className="heatmap-cell"
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      style={{ background: levelFor(day.contributionCount) }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
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
