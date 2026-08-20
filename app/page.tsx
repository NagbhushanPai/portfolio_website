import { FadeIn, StaggerList } from "@/components/motion";
import { ChevronRightIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import {
  currentlyBuilding,
  contactLinks,
  experience,
  heroHighlights,
  projects,
  siteConfig,
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
    <main id="top" className="min-h-screen overflow-x-clip bg-[#f7f4ee] text-neutral-950 dark:bg-[#0d0d0d] dark:text-neutral-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-20 pt-6 sm:px-6 md:px-10 lg:px-12">
        <SiteHeader />

        <section className="grid gap-8 pb-16 pt-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-10 lg:pb-20">
          <FadeIn className="min-w-0 max-w-3xl">
            <p className="inline-flex border-l-2 border-neutral-950 pl-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-neutral-600 dark:border-neutral-50 dark:text-neutral-300">
              Software engineer
            </p>
            <h1 className="mt-6 max-w-full break-words text-[clamp(2.7rem,8vw,5rem)] font-semibold tracking-[-0.06em] text-neutral-950 leading-[0.92] dark:text-neutral-50">
              I build backend systems that are useful, reliable, and easy to reason about.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-400">
              I like working on the parts of software that hold everything together: APIs, data flow, infrastructure, and the operational details that make systems feel stable in real life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-neutral-900 bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
              >
                Resume
              </a>
              <a
                href="#projects"
                className="rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/20 dark:hover:text-white"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-black/20 hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/20 dark:hover:text-white"
              >
                Contact
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <div key={item} className="border-t border-black/10 pt-3 text-sm text-neutral-600 dark:border-white/15 dark:text-neutral-300">
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/5">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Recent focus
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />GraphQL services and API design</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />Workflow orchestration and observability</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />Redis-backed rate limiting</li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />LLM evaluation and benchmarking</li>
            </ul>
          </FadeIn>
        </section>

        <section id="about" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="About"
            title="I care about software that is easy to reason about."
            description="I like clear interfaces, visible failure modes, and enough operational detail that the next person can debug quickly without having to reverse-engineer the system."
          />
        </section>

        <section id="currently-building" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Currently building"
            title="What I’m working on right now."
            description=""
          />
          <StaggerList className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-3">
            {currentlyBuilding.map((item) => (
              <div key={item} className="border-t border-neutral-900 pt-4 text-sm leading-6 text-neutral-700 dark:border-neutral-50 dark:text-neutral-300">
                {item}
              </div>
            ))}
          </StaggerList>
        </section>

        <section id="experience" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Experience"
            title="Work experience"
            description=""
          />
          <div className="mt-10 grid gap-6">
            {experience.map((item) => (
              <FadeIn key={`${item.company}-${item.role}`}>
                <article className="border-t border-black/10 py-6 dark:border-white/10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">{item.company}</h3>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{item.role}</p>
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      <div>{item.duration}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
                    {item.achievements.map((achievement) => (
                      <div key={achievement} className="border-l border-neutral-300 pl-4 text-sm leading-6 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                        {achievement}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {item.impact.map((impact) => (
                      <div key={impact} className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                        {impact}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="rounded-full border border-black/10 bg-white/50 px-3 py-1 text-[0.72rem] uppercase tracking-[0.08em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
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
                        View demo
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
            title="A few projects I’ve built over the years."
            description=""
          />
          <StaggerList className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.slug} className="border-t border-neutral-900 pt-5 dark:border-neutral-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">{project.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{project.summary}</p>
                  </div>
                  <a
                    href={`/projects/${project.slug}`}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/15 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/5"
                    aria-label={`Open ${project.name} details`}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-neutral-950 dark:text-neutral-100">Built: </span>
                    <span className="text-neutral-600 dark:text-neutral-400">{project.solution}</span>
                  </div>
                </div>
                <p className="mt-5 border-l border-neutral-300 pl-4 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                  {project.metrics[0]}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full border border-black/10 bg-white/50 px-3 py-1 text-[0.7rem] uppercase tracking-[0.08em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
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
                  ) : null}
                  <a
                    href={`/projects/${project.slug}`}
                    className="font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-100"
                  >
                    Case study
                  </a>
                </div>
              </article>
            ))}
          </StaggerList>
        </section>

        <section id="contact" className="border-t border-black/5 py-16 dark:border-white/10">
          <SectionHeading
            eyebrow="Contact"
            title="Looking for a team with hard backend problems."
            description="Email is best. GitHub has the code, and LinkedIn has the work history."
          />
          <div className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noreferrer noopener"}
                className="border-t border-black/10 py-4 transition hover:border-black dark:border-white/10 dark:hover:border-white"
              >
                <div className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">{link.label}</div>
                <div className="mt-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">{link.value}</div>
              </a>
            ))}
          </div>
        </section>

        <footer className="border-t border-black/5 pt-8 text-sm text-neutral-500 dark:border-white/10">
          Nagbhushan Pai · India
        </footer>
      </div>
    </main>
  );
}
