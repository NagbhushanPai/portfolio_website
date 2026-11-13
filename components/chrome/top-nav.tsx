"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { ThemeToggle } from "@/components/chrome/theme-toggle";
import { siteConfig } from "@/lib/portfolio-data";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Notes", href: "#blog" },
];

function monogram(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = ["top", ...links.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <a
        href="#top"
        className="fixed left-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--glass)] font-serif-display text-sm font-semibold text-[var(--foreground)] shadow-[var(--shadow)] backdrop-blur-md sm:left-8 sm:top-8"
        aria-label={`${siteConfig.name} — home`}
      >
        {monogram(siteConfig.name)}
      </a>

      <nav
        aria-label="Primary"
        className="fixed right-5 top-5 z-40 hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--glass)] p-1.5 shadow-[var(--shadow)] backdrop-blur-md sm:right-8 sm:top-8 md:flex"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-200 hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] ${
              activeSection === link.href.slice(1) ? "bg-[var(--surface-2)] text-[var(--foreground)]" : "text-[var(--muted)]"
            }`}
          >
            {link.label}
          </a>
        ))}
        <ThemeToggle />
        <Magnetic strength={0.25}>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-w-[7.2rem] items-center justify-center rounded-full border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--background)] shadow-[var(--shadow)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Resume
          </a>
        </Magnetic>
      </nav>

      <div className="fixed right-[4.25rem] top-5 z-40 rounded-full border border-[var(--line)] bg-[var(--glass)] shadow-[var(--shadow)] backdrop-blur-md md:hidden">
        <ThemeToggle className="h-10 w-10" />
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="fixed right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--glass)] shadow-[var(--shadow)] backdrop-blur-md transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:hidden"
      >
        <span className="relative block h-4 w-4">
          <span
            className={`absolute left-0 top-[3px] h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[9px] h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute left-0 top-[15px] h-0.5 w-4 rounded-full bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className={`fixed right-5 top-[4.25rem] z-40 w-52 origin-top-right rounded-2xl border border-[var(--line)] bg-[var(--glass)] p-2 shadow-[var(--shadow)] backdrop-blur-md transition-all duration-200 md:hidden ${
          menuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
            className={`block rounded-xl px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition hover:bg-[var(--surface-2)] ${
              activeSection === link.href.slice(1) ? "bg-[var(--surface-2)] text-[var(--foreground)]" : "text-[var(--muted)]"
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
          className="mt-1 block rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--background)]"
        >
          Resume
        </a>
      </div>
    </>
  );
}
