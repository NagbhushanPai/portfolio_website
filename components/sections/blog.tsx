import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { blogPosts } from "@/lib/portfolio-data";

export function Blog() {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="border-t border-[var(--line)] px-5 py-20 sm:px-8 md:px-12">
      <Reveal>
        <SectionLabel index="06" label="Field Notes" />
      </Reveal>
      <SplitHeading id="blog-heading" className="mt-6 font-serif-display text-3xl italic leading-tight sm:text-4xl">
        Occasional <span className="not-italic font-medium">writing.</span>
      </SplitHeading>

      <Reveal className="mt-10 grid gap-4 md:grid-cols-3" stagger y={24}>
        {blogPosts.map((post) => (
          <a
            key={post.slug}
            href={post.fullPostUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 transition hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow)]"
          >
            <div>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="label-meta rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-serif-display text-xl italic leading-snug">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{post.summary}</p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>{post.readingTime}</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                Read
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
