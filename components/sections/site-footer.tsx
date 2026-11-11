"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Magnetic } from "@/components/motion/magnetic";
import { siteConfig, socialLinks } from "@/lib/portfolio-data";

const iconFor = { github: GitHubIcon, linkedin: LinkedInIcon };

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 px-5 py-20 sm:px-8 md:px-12">
      <Reveal className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
        <div>
          <p className="label-meta">Contact</p>
          <SplitHeading className="mt-4 font-serif-display text-4xl italic leading-none sm:text-6xl">
            let&apos;s collaborate
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[var(--accent)] align-middle" />
          </SplitHeading>
        </div>

        <div className="text-left lg:text-right">
          <div className="flex gap-3 lg:justify-end">
            {socialLinks.map((link) => {
              const Icon = iconFor[link.icon];
              return (
                <Magnetic key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              );
            })}
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 block text-sm font-medium underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
          <p className="mt-6 text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {siteConfig.name}.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
