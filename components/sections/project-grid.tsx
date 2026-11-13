"use client";

import Link from "next/link";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { projects } from "@/lib/portfolio-data";

const spans = [
  "lg:col-span-4 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-6 lg:row-span-1",
  "sm:col-span-2 lg:col-span-6 lg:row-span-1",
];

export function ProjectGrid() {
  return (
    <section id="work" className="border-t border-[var(--line)] px-5 py-20 sm:px-8 md:px-12">
      <Reveal>
        <SectionLabel index="03" label="Creating with Code" />
      </Reveal>
      <SplitHeading className="mt-6 font-serif-display text-3xl italic leading-tight sm:text-4xl">
        Projects worth a <span className="not-italic font-medium">closer look.</span>
      </SplitHeading>

      <Reveal
        className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6 lg:auto-rows-[minmax(160px,auto)]"
        stagger
        y={36}
      >
        {projects.map((project, i) => (
          <TiltCard key={project.slug} className={`group relative ${spans[i] ?? "lg:col-span-6"}`}>
            <Link
              href={`/project/${project.slug}`}
              onClick={() => sessionStorage.setItem("portfolio-hero-reentry", "1")}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] transition-colors hover:border-[var(--line-strong)] hover:shadow-[var(--shadow)]"
            >
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                {/* Index + key result: the same scan line on every card */}
                <div className="flex items-center justify-between gap-3">
                  <span className="label-meta shrink-0 whitespace-nowrap">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  {project.metrics[0] && (
                    <span className="min-w-0 truncate rounded-full border border-[var(--line)] px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.02em] text-[var(--foreground)]">
                      {project.metrics[0]}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-serif-display text-2xl italic leading-tight sm:text-[1.7rem]">{project.name}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">{project.summary}</p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.08em] text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-3.5 text-sm font-medium sm:px-6">
                View case study
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </TiltCard>
        ))}
      </Reveal>
    </section>
  );
}
