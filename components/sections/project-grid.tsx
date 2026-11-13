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
  "lg:col-span-6 lg:row-span-1",
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
        className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:auto-rows-[minmax(160px,auto)]"
        stagger
        y={36}
      >
        {projects.map((project, i) => (
          <TiltCard key={project.slug} className={`group relative ${spans[i] ?? "lg:col-span-6"}`}>
            <Link
              href={`/project/${project.slug}`}
              onClick={() => sessionStorage.setItem("portfolio-hero-reentry", "1")}
              className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 transition-colors hover:border-[var(--line-strong)] hover:shadow-[var(--shadow)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif-display text-2xl italic">{project.name}</h3>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {project.techStack.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="label-meta whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">{project.summary}</p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                View Case Study
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </TiltCard>
        ))}
      </Reveal>
    </section>
  );
}
