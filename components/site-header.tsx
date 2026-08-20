"use client";

import { useEffect, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { navLinks, siteConfig } from "@/lib/portfolio-data";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed left-4 right-4 top-4 z-40 mx-auto w-[calc(100vw-2rem)] max-w-6xl sm:left-6 sm:right-6 sm:w-[calc(100vw-3rem)] lg:left-1/2 lg:right-auto lg:w-[min(100vw-3rem,72rem)] lg:-translate-x-1/2">
        <div className="border border-black/8 bg-white/80 shadow-[0_6px_18px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-black/55">
          <div className="flex items-center justify-between gap-3 rounded-[1rem] px-3 py-2.5 md:rounded-full md:px-5">
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">{siteConfig.name}</p>
              <p className="hidden text-[11px] text-neutral-500 md:block dark:text-neutral-400">{siteConfig.tagline}</p>
            </div>

            <nav aria-label="Primary" className="hidden items-center gap-5 text-sm text-neutral-600 dark:text-neutral-300 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-neutral-950 dark:hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5"
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

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              <span className="relative block h-4 w-4">
                <span
                  className={`absolute left-0 top-[3px] h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 top-[15px] h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>

          <div
            id="mobile-menu"
            className={`grid overflow-hidden transition-all duration-300 md:hidden ${mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="mt-3 border-t border-black/5 px-2 pb-2 pt-4 dark:border-white/10">
                <nav aria-label="Mobile primary" className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 transition hover:bg-black/5 hover:text-neutral-950 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/5"
                  >
                    Resume
                  </a>
                  <ThemeToggle />
                </div>

                <div className="mt-4 flex gap-3">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="GitHub profile"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn profile"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-20 md:h-28" aria-hidden="true" />
    </>
  );
}
