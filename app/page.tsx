import { FadeIn, StaggerList } from "@/components/motion";
import { ChevronRightIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { TerminalClient } from "@/components/terminal-client";
import {
  currentlyBuilding,
  contactLinks,
  blogPosts,
  experience,
  heroHighlights,
  heroStats,
  projects,
  siteConfig,
  skills,
  timeline,
} from "@/lib/portfolio-data";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.32em] text-neutral-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl dark:text-neutral-50">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: "https://nagbhushan.me",
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return (
    <main id="top" className="min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_34%),linear-gradient(to_bottom,_#ffffff,_#f7f7f5)] text-neutral-950 dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.07),_transparent_30%),linear-gradient(to_bottom,_#0a0a0a,_#111111)] dark:text-neutral-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-6 sm:px-6 md:px-10 lg:px-12">
        <SiteHeader />

        <section className="grid gap-10 pb-18 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-24">
          <FadeIn className="min-w-0 max-w-3xl">
            <p className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium tracking-[0.22em] text-neutral-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
              SOFTWARE ENGINEER
            </p>
            <h1 className="mt-6 max-w-full break-words text-[clamp(2.6rem,12vw,4.6rem)] font-semibold tracking-tight leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              Building scalable backend systems and AI-powered products with calm, production-minded engineering.
            </h1>
            <p className="mt-6 max-w-full text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 dark:text-neutral-400">
              I design reliable services, data-driven pipelines, and practical ML workflows for recruiters, users, and teams that value systems thinking over surface-level polish.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
              >
                Resume
              </a>
              <a
                href="#projects"
                className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/5"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/5"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <div key={item} className="rounded-2xl border border-black/5 bg-white/80 px-4 py-4 text-sm text-neutral-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="rounded-[2rem] border border-black/5 bg-white/85 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="rounded-[1.5rem] border border-black/5 bg-neutral-950 p-5 text-white dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Terminal</p>
              <TerminalClient />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-black/5 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="about" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="About"
            title="A portfolio built to read like an engineer, not a resume dump."
            description="The structure emphasizes outcomes, systems, and signals that matter to hiring teams: scope, reliability, technical depth, and evidence of execution."
          />
        </section>

        <section id="currently-building" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Currently Building"
            title="Active work and learning goals."
            description="A snapshot of what I&apos;m iterating on right now."
          />
          <StaggerList className="mt-8 grid gap-4 md:grid-cols-3">
            {currentlyBuilding.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-black/5 bg-white p-5 text-sm text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                {item}
              </div>
            ))}
          </StaggerList>
        </section>

        <section id="experience" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Experience"
            title="Engineering work with real systems pressure."
            description="The experience section leads with backend ownership, workflow reliability, and product impact."
          />
          <div className="mt-10 grid gap-6">
            {experience.map((item) => (
              <FadeIn key={`${item.company}-${item.role}`}>
                <article className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.company}</h3>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{item.role}</p>
                    </div>
                    <div className="text-sm text-neutral-500">
                      <div>{item.duration}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {item.achievements.map((achievement) => (
                      <div key={achievement} className="rounded-2xl bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-700 dark:bg-white/5 dark:text-neutral-300">
                        {achievement}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {item.impact.map((impact) => (
                      <div key={impact} className="rounded-2xl border border-black/5 px-4 py-3 text-sm leading-6 text-neutral-600 dark:border-white/10 dark:text-neutral-400">
                        {impact}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {"demoUrl" in item && item.demoUrl ? (
                    <div className="mt-5">
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5"
                      >
                        View Demo
                      </a>
                    </div>
                  ) : null}
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="projects" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Projects"
            title="Recruiter-focused case studies."
            description="Each project card shows the problem, solution, stack, results, and links."
          />
          <StaggerList className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.slug} className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{project.summary}</p>
                  </div>
                  <a
                    href={`/projects/${project.slug}`}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5"
                    aria-label={`Open ${project.name} details`}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-neutral-950 dark:text-neutral-100">Problem: </span>
                    <span className="text-neutral-600 dark:text-neutral-400">{project.problem}</span>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-950 dark:text-neutral-100">Solution: </span>
                    <span className="text-neutral-600 dark:text-neutral-400">{project.solution}</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <span key={metric} className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white dark:bg-white dark:text-neutral-950">
                      {metric}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-100"
                  >
                    GitHub
                  </a>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-100"
                    >
                      Live demo
                    </a>
                  ) : (
                    <span className="text-neutral-400">Live demo not available</span>
                  )}
                  <a
                    href={`/projects/${project.slug}`}
                    className="font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-100"
                  >
                    View case study
                  </a>
                </div>
              </article>
            ))}
          </StaggerList>
        </section>

        <section id="blog" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Blog"
            title="A few concise posts that show technical judgment."
            description="These posts stay short and tied to the projects in the portfolio."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{post.publishedOn}</p>
                <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{post.summary}</p>
                <a
                  href={post.fullPostUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex text-sm font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-100"
                >
                  Read the full post on Hashnode
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Timeline"
            title="A concise professional arc."
            description="Scan this quickly to understand growth across leadership, research, and shipping work."
          />
          <div className="mt-10 space-y-4">
            {timeline.map((item) => (
              <FadeIn key={item.title}>
                <article className="grid gap-4 rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-sm md:grid-cols-[110px_1fr] dark:border-white/10 dark:bg-white/5">
                  <div className="text-sm font-medium text-neutral-500">{item.year}</div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">{item.label}</p>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{item.description}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="skills" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Skills"
            title="Core capabilities"
            description="A compact view of the engineering areas this portfolio is built to communicate."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Contact"
            title="Open to backend, AI, and systems-focused opportunities."
            description="Keep the contact block short and action-oriented so recruiters can reach out quickly."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noreferrer noopener"}
                className="rounded-[1.5rem] border border-black/5 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/10 dark:bg-white/5"
              >
                <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">{link.label}</div>
                <div className="mt-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">{link.value}</div>
              </a>
            ))}
          </div>
        </section>

        <footer className="border-t border-black/5 pt-8 text-sm text-neutral-500 dark:border-white/10">
          Designed for clarity, credibility, and fast reading.
        </footer>
      </div>
    </main>
  );
}
