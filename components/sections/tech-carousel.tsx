"use client";

import { useState } from "react";
import { techStackCategories } from "@/lib/portfolio-data";

export function TechCarousel() {
  const [index, setIndex] = useState(0);
  const current = techStackCategories[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + techStackCategories.length) % techStackCategories.length);
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="label-meta">Tech Stack</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous category"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] transition hover:bg-[var(--surface-2)]"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next category"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] transition hover:bg-[var(--surface-2)]"
          >
            →
          </button>
        </div>
      </div>

      <div key={current.category} className="tech-carousel-content mt-6 min-h-[7rem]">
        <h3 className="font-serif-display text-2xl italic">{current.category}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {current.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
