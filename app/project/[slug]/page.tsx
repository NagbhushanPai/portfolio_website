import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/portfolio-data";
import { CaseStudyBackLink } from "@/components/sections/case-study-back-link";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} | Case Study`,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary, type: "article" },
    twitter: { card: "summary_large_image", title: project.name, description: project.summary },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="lg:flex">
        {/* LEFT: fixed panel */}
        <div className="border-b border-black/10 px-5 py-10 pt-28 sm:px-8 md:px-12 lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <CaseStudyBackLink />

          <p className="label-meta mt-10">Case Study</p>
          <h1 className="mt-4 font-serif-display text-4xl italic leading-[1.05] sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[var(--muted)]">{project.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition hover:opacity-85"
              >
                Live Link
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm font-medium transition hover:bg-black/5"
            >
              Repository
            </a>
          </div>

          <div className="mt-12">
            <p className="label-meta">The Development</p>
            <div className="mt-4 space-y-5 text-sm leading-7 text-[var(--muted)]">
              <p>
                <span className="font-medium text-[var(--foreground)]">Problem — </span>
                {project.problem}
              </p>
              <p>
                <span className="font-medium text-[var(--foreground)]">Solution — </span>
                {project.solution}
              </p>
              {project.challenges.length ? (
                <div>
                  <p className="font-medium text-[var(--foreground)]">Challenges</p>
                  <ul className="mt-2 space-y-2">
                    {project.challenges.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.lessonsLearned.length ? (
                <div>
                  <p className="font-medium text-[var(--foreground)]">Lessons Learned</p>
                  <ul className="mt-2 space-y-2">
                    {project.lessonsLearned.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric} className="rounded-xl border border-black/10 bg-white/60 px-3 py-3 text-xs leading-5 text-[var(--muted)]">
                {metric}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: independently scrolling screenshots */}
        <div className="flex-1 px-5 py-10 sm:px-8 md:px-12 lg:py-16">
          <div className="space-y-8">
            {project.screenshots?.length ? (
              project.screenshots.map((shot) => (
                <figure key={shot.label} className="overflow-hidden rounded-2xl border border-black/10 bg-white/50">
                  <div className="flex aspect-[16/10] items-center justify-center border-b border-black/10 bg-neutral-100 text-sm text-neutral-400">
                    {shot.alt}
                  </div>
                  <figcaption className="p-5">
                    <p className="text-sm font-medium">{shot.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{shot.caption}</p>
                  </figcaption>
                </figure>
              ))
            ) : (
              <p className="text-sm text-[var(--muted)]">Screenshots coming soon.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
