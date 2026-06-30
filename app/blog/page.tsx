import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Blog | Nagbhushan Pai",
  description: "Short engineering notes on distributed systems, APIs, and AI projects.",
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,_#ffffff,_#f7f7f5)] text-neutral-950 dark:bg-[linear-gradient(to_bottom,_#0a0a0a,_#111111)] dark:text-neutral-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-8 sm:px-10">
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Engineering notes</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
          Short, high-signal posts that highlight the thinking behind the systems and projects in this portfolio.
        </p>

        <div className="mt-10 grid gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span>{post.publishedOn}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">{post.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-300">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-medium text-neutral-950 underline-offset-4 hover:underline dark:text-neutral-100">
                Read post
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
