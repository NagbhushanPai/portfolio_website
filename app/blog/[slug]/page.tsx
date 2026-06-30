import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/portfolio-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Nagbhushan Pai`,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,_#ffffff,_#f7f7f5)] text-neutral-950 dark:bg-[linear-gradient(to_bottom,_#0a0a0a,_#111111)] dark:text-neutral-50">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-8 sm:px-10">
        <Link href="/blog" className="text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-white">
          Back to blog
        </Link>

        <article className="mt-10 rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
            <span>{post.publishedOn}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-400">{post.summary}</p>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="rounded-[1.5rem] border border-black/5 bg-neutral-50 p-5 dark:border-white/10 dark:bg-black/20">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">{section.heading}</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
