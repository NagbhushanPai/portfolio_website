"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

type Day = { date: string; contributionCount: number; weekday: number };
type Week = { contributionDays: Day[] };
type ContributionsResponse = { total: number; weeks: Week[] } | { error: string };

// Calendar geometry, matching the GitHub-calendar look of the reference site.
const BLOCK = 12;
const GAP = 4;
const FONT = 14;
const LABEL_H = FONT + GAP * 2;
const LEVEL_VARS = ["var(--cal-0)", "var(--cal-1)", "var(--cal-2)", "var(--cal-3)", "var(--cal-4)"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function levelFor(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function monthLabels(weeks: Week[]) {
  const labels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const first = week.contributionDays[0];
    if (!first) return;
    const month = new Date(first.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      labels.push({ x: i, label: MONTHS[month] });
      lastMonth = month;
    }
  });
  // Drop a label that would collide with the next one (fewer than 3 weeks apart).
  return labels.filter((l, i) => !labels[i + 1] || labels[i + 1].x - l.x >= 3);
}

function Calendar({ data }: { data: { total: number; weeks: Week[] } }) {
  const width = data.weeks.length * (BLOCK + GAP) - GAP;
  const height = LABEL_H + 7 * (BLOCK + GAP) - GAP;
  const labels = useMemo(() => monthLabels(data.weeks), [data.weeks]);

  return (
    <div className="inline-flex flex-col gap-2 text-[var(--foreground)]" style={{ fontSize: FONT }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block overflow-visible" role="img" aria-label={`${data.total} GitHub contributions in the last year`}>
        <g fill="currentColor">
          {labels.map((l) => (
            <text key={`${l.label}-${l.x}`} x={l.x * (BLOCK + GAP)} y={FONT} dominantBaseline="auto">
              {l.label}
            </text>
          ))}
        </g>
        {data.weeks.map((week, wi) =>
          week.contributionDays.map((day) => (
            <rect
              key={day.date}
              x={wi * (BLOCK + GAP)}
              y={LABEL_H + day.weekday * (BLOCK + GAP)}
              width={BLOCK}
              height={BLOCK}
              rx={2}
              ry={2}
              fill={LEVEL_VARS[levelFor(day.contributionCount)]}
              style={{ transition: "fill 0.5s ease" }}
            >
              <title>{`${day.contributionCount} contributions on ${day.date}`}</title>
            </rect>
          )),
        )}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1" style={{ width }}>
        <span>{data.total.toLocaleString()} contributions in the last year</span>
        <span className="flex items-center gap-[3px]">
          <span className="mr-1.5">Less</span>
          {LEVEL_VARS.map((color) => (
            <svg key={color} width={BLOCK} height={BLOCK} aria-hidden="true">
              <rect width={BLOCK} height={BLOCK} rx={2} fill={color} />
            </svg>
          ))}
          <span className="ml-1.5">More</span>
        </span>
      </div>
    </div>
  );
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
      { rootMargin: "200px 0px", threshold: 0 },
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
      className="flex flex-col gap-16 border-t border-[var(--line)] px-5 py-16 sm:px-8 md:px-12 lg:py-32"
    >
      <div>
        <Reveal>
          <SectionLabel index="02" label="Activity" />
        </Reveal>
        <SplitHeading className="mt-6 font-serif-display text-3xl italic leading-tight sm:text-4xl">
          Building in <span className="not-italic font-medium">public,</span> most days.
        </SplitHeading>
      </div>

      <Reveal
        className="flex w-full justify-start overflow-x-auto border-y border-[var(--line)] py-12 transition-colors duration-500 lg:justify-center"
        delay={0.1}
      >
        <div className="min-w-max px-4">
          {!data ? (
            <div
              className="animate-pulse rounded-sm bg-[var(--cal-0)]"
              style={{ width: 53 * (BLOCK + GAP) - GAP, height: LABEL_H + 7 * (BLOCK + GAP) + 24 }}
              aria-hidden="true"
            />
          ) : (
            <Calendar data={data} />
          )}
        </div>
      </Reveal>
    </section>
  );
}
