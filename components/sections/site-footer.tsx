"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { siteConfig, socialLinks } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="flex min-h-[60vh] flex-col justify-end px-5 pb-32 pt-16 sm:px-8 md:px-12 md:pt-24">
      <div className="border-t border-[var(--foreground)] pt-12">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--foreground)] opacity-40">08 / Contact</span>

        <Reveal className="mt-8 flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SplitHeading className="font-serif-display text-6xl lowercase italic leading-none text-[var(--foreground)] md:text-[80px] lg:text-[100px]">
              let&apos;s collaborate<span className="not-italic text-[var(--accent)]">.</span>
            </SplitHeading>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <div className="flex flex-col items-start gap-2 md:items-end">
              <span className="text-[10px] uppercase tracking-widest opacity-40">Socials</span>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-base text-[var(--foreground)] transition-opacity hover:opacity-50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 md:items-end">
              <span className="text-[10px] uppercase tracking-widest opacity-40">Say Hello</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-xl text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-8 transition-all hover:decoration-[var(--foreground)] sm:text-2xl"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 sm:flex-row sm:text-left md:mt-32">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>{siteConfig.role}</span>
      </div>
    </footer>
  );
}
