import Link from "next/link";
import { SectionLabel } from "./section-label";
import { TechCarousel } from "./tech-carousel";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { heroStats, projects, siteConfig } from "@/lib/portfolio-data";

export function Intro() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <section id="about" className="border-t border-black/10 px-5 py-24 sm:px-8 md:px-12 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-[minmax(240px,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionLabel index="01" label="Profile" />
          </Reveal>

          <SplitHeading as="h2" className="max-w-sm font-serif-display text-4xl italic leading-tight sm:text-5xl">
            Systems designed to <span className="not-italic font-medium">survive contact with reality.</span>
          </SplitHeading>

          <p className="max-w-sm text-base leading-7 text-[var(--muted)] sm:text-lg">
            Backend services, distributed systems, and computer-vision work built with attention to the details that
            make software observable, testable, and useful.
          </p>

          <div className="space-y-4 rounded-3xl border border-black/10 bg-white/55 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <p className="label-meta">Role</p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{siteConfig.role}</p>
              </div>
              <div className="text-right">
                <p className="label-meta">Location</p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{siteConfig.location}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                <p className="label-meta">Focus</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Backend systems, APIs, and computer vision.</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
                <p className="label-meta">Mode</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Ship it, measure it, improve it.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Reveal className="max-w-3xl space-y-5 text-base leading-8 text-[var(--muted)] sm:text-lg" delay={0.05}>
            <p>
              I work mostly on the parts of a system that hold everything else together —{" "}
              <em className="italic text-[var(--foreground)]">APIs, data flow, infrastructure</em>, and the
              operational detail that lets the next engineer debug quickly instead of reverse-engineering the whole
              thing.
            </p>
            <p>
              Outside of backend work, I spend time on <em className="italic text-[var(--foreground)]">AI evaluation
              pipelines</em> — retrieval, benchmarking, and the less glamorous work of measuring whether a model is
              actually good.
            </p>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2" stagger delay={0.1} y={24}>
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-black/10 bg-white/60 p-5">
                <p className="font-serif-display text-3xl italic tracking-tight text-[var(--foreground)]">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="grid gap-4 lg:grid-cols-2" stagger delay={0.15} y={28}>
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/project/${project.slug}`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.5))] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.08)]"
              >
                <div>
                  <p className="label-meta">Featured project</p>
                  <h3 className="mt-4 font-serif-display text-2xl italic tracking-tight">{project.name}</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">{project.summary}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs uppercase tracking-[0.1em] text-[var(--muted)]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </Reveal>

          <Reveal className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]" delay={0.2}>
            <div className="rounded-3xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.48))] p-6 lg:col-span-2">
              <p className="label-meta">How I work</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[var(--muted)]">
                <p>
                  I care about clear boundaries, useful logs, and interfaces that make the next change safer.
                </p>
                <p>
                  The projects below cover rate limiting, messaging, retrieval evaluation, and multimodal detection.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {siteConfig.tagline.split(", ").map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs uppercase tracking-[0.1em] text-[var(--muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="max-w-xl" delay={0.1}>
            <TechCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
