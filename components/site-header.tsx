"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { navLinks, siteConfig } from "@/lib/portfolio-data";

const railThreshold = 120;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [isRail, setIsRail] = useState(false);
  const width = useTransform(scrollY, [0, railThreshold], [1, 1]);
  const x = useTransform(scrollY, [0, railThreshold], [0, 0]);
  const y = useTransform(scrollY, [0, railThreshold], [0, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsRail(latest > railThreshold);
  });

  return (
    <>
      <motion.header
        style={{ width, x, y }}
        className={`fixed z-40 transition-all duration-300 ${isRail ? "left-4 top-24 w-80 rounded-[2rem] p-3" : "left-1/2 top-4 w-[min(100%-1.5rem,72rem)] -translate-x-1/2 rounded-full px-5 py-3"}`}
      >
        <div className="border border-black/5 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-black/45">
          <div className={`flex ${isRail ? "flex-col items-start gap-4 rounded-[1.5rem] p-3" : "items-center justify-between gap-4 rounded-full px-0 py-0"}`}>
            <div className={isRail ? "text-center" : ""}>
              <p className={isRail ? "text-sm font-semibold" : "text-sm font-semibold"}>{siteConfig.name}</p>
              {!isRail && <p className="text-xs text-neutral-500">{siteConfig.tagline}</p>}
            </div>

            <nav aria-label="Primary" className={`${isRail ? "flex w-full flex-col items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300" : "hidden items-center gap-5 text-sm text-neutral-600 md:flex dark:text-neutral-300"}`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition hover:text-neutral-950 dark:hover:text-white ${isRail ? "w-full whitespace-nowrap rounded-full px-2 py-1 text-left" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className={`flex ${isRail ? "w-full flex-col items-start gap-2" : "items-center gap-2"}`}>
              <ThemeToggle />
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={`${isRail ? "hidden" : "hidden md:inline-flex"} rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5`}
              >
                Resume
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="h-24 md:h-28" aria-hidden="true" />
    </>
  );
}
