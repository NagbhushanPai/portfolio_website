import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { milestones } from "@/lib/portfolio-data";

export function Milestones() {
  return (
    <section id="milestones" className="border-t border-[var(--line)] py-20 sm:px-8 md:px-12">
      <Reveal className="px-5 sm:px-0">
        <SectionLabel index="05" label="Achievements" />
      </Reveal>
      <SplitHeading className="mt-6 px-5 font-serif-display text-3xl italic leading-tight sm:px-0 sm:text-4xl">
        A few <span className="not-italic font-medium">milestones.</span>
      </SplitHeading>

      <Reveal
        className="scroll-snap-row mt-10 gap-4 px-5 pb-3 sm:px-8 md:px-12"
        stagger
        y={20}
      >
        {milestones.map((m) => (
          <article
            key={m.id}
            className="scroll-snap-item w-[280px] rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:w-[320px]"
          >
            <span className="text-[var(--accent)]" aria-hidden="true">
              ★
            </span>
            <p className="label-meta mt-3 inline-block rounded-full border border-[var(--line)] px-2.5 py-1">
              {m.badge}
            </p>
            <h3 className="mt-4 font-serif-display text-xl italic leading-snug">{m.title}</h3>
            <p className="mt-1 text-sm font-medium text-[var(--muted)]">{m.subtitle}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{m.description}</p>
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
