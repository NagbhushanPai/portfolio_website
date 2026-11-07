"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { journey } from "@/lib/portfolio-data";

function AccordionPanel({ open, children }: { open: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      node.style.height = open ? "auto" : "0px";
      node.style.opacity = open ? "1" : "0";
      return;
    }

    const { gsap } = getGsap();
    gsap.to(node, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [open]);

  return (
    <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
      {children}
    </div>
  );
}

export function Journey() {
  const [openId, setOpenId] = useState<string | undefined>(journey[0]?.id);

  return (
    <section id="journey" aria-labelledby="journey-heading" className="border-t border-black/10 px-5 py-20 sm:px-8 md:px-12">
      <Reveal>
        <SectionLabel index="04" label="Experience" />
      </Reveal>
      <SplitHeading id="journey-heading" className="mt-6 font-serif-display text-3xl italic leading-tight sm:text-4xl">
        Professional <span className="not-italic font-medium">journey.</span>
      </SplitHeading>

      <Reveal className="mt-10 divide-y divide-black/10 border-t border-black/10" stagger delay={0.05}>
        {journey.map((entry) => {
          const open = openId === entry.id;
          return (
            <div key={entry.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? undefined : entry.id)}
                aria-expanded={open}
                className="grid w-full grid-cols-1 gap-2 py-6 text-left transition hover:opacity-80 sm:grid-cols-[1fr_2fr] sm:items-center sm:gap-6"
              >
                <div>
                  <p className="text-sm font-medium">{entry.dateRange}</p>
                  <p className="label-meta mt-1">{entry.locationType}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif-display text-xl italic sm:text-2xl">{entry.role}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{entry.company}</p>
                  </div>
                  <span
                    className={`shrink-0 text-lg transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
              </button>

              <AccordionPanel open={open}>
                <div className="grid gap-6 pb-8 sm:grid-cols-[1fr_2fr] sm:gap-6">
                  <div />
                  <div>
                    <p className="font-serif-display text-lg italic leading-snug text-[var(--muted)]">
                      &ldquo;{entry.pullQuote}&rdquo;
                    </p>
                    <ul className="mt-5 space-y-2.5 text-sm leading-6 text-[var(--muted)]">
                      {entry.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs uppercase tracking-[0.08em] text-[var(--muted)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionPanel>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
