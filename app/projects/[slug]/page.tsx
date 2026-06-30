import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "@/components/icons";
import { projects } from "@/lib/portfolio-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} | Nagbhushan Pai`,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
    },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-black/5 bg-neutral-50 p-5 dark:border-white/10 dark:bg-black/20">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,_#ffffff,_#f7f7f5)] text-neutral-950 dark:bg-[linear-gradient(to_bottom,_#0a0a0a,_#111111)] dark:text-neutral-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-8 sm:px-10">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-white">
          <ChevronRightIcon className="h-4 w-4 rotate-180" />
          Back to projects
        </Link>

        <article className="mt-10 rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">Case Study</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-400">{project.summary}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Section title="Architecture">
              <div className="space-y-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                {project.architecture.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </Section>
            <Section title="Screenshots">
              {project.screenshots?.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((shot) => (
                    <figure key={shot.label} className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-black/10 bg-neutral-100 text-sm text-neutral-500 dark:border-white/10 dark:bg-white/5">
                        Screenshot placeholder
                      </div>
                      <figcaption className="mt-3">
                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{shot.label}</div>
                        <div className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{shot.caption}</div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  Screenshots will be added here when available. The layout is ready for optional images without breaking the page.
                </p>
              )}
            </Section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Section title="Challenges">
              <ul className="space-y-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                {project.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
            <Section title="Benchmarks">
              <div className="grid gap-3 sm:grid-cols-3">
                {project.benchmarks.map((item) => (
                  <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm dark:bg-white/5 dark:text-neutral-300">
                    {item}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="mt-6">
            <Section title="Lessons Learned">
              <ul className="space-y-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                {project.lessonsLearned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          </div>

          <section className="mt-6 rounded-[1.5rem] border border-black/5 bg-neutral-50 p-5 dark:border-white/10 dark:bg-black/20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Tech Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[1.5rem] border border-black/5 bg-neutral-50 p-5 dark:border-white/10 dark:bg-black/20">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Key Results</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded-2xl bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm dark:bg-white/5 dark:text-neutral-300">
                  {metric}
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-neutral-950"
            >
              GitHub Link
            </a>
            <a
              href={project.liveUrl || "#"}
              target={project.liveUrl ? "_blank" : undefined}
              rel={project.liveUrl ? "noreferrer noopener" : undefined}
              aria-disabled={!project.liveUrl}
              className={`rounded-full border px-5 py-3 text-sm font-medium ${project.liveUrl ? "border-black/10 text-neutral-700 hover:bg-black/5 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5" : "pointer-events-none border-black/5 text-neutral-400 dark:border-white/10 dark:text-neutral-500"}`}
            >
              Live Demo Link
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
