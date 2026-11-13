import type { CSSProperties } from "react";
import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { toolsMarqueeRows } from "@/lib/portfolio-data";

function MarqueeRow({ items, reverse = false, duration }: { items: readonly string[]; reverse?: boolean; duration: string }) {
  const copies = 4;

  return (
    <div
      className="marquee-group flex gap-[var(--gap)] overflow-hidden p-2"
      style={{ "--gap": "1rem", "--duration": duration } as CSSProperties}
    >
      {Array.from({ length: copies }, (_, copy) => (
        <div
          key={copy}
          aria-hidden={copy > 0 ? true : undefined}
          className="animate-marquee flex shrink-0 justify-around gap-[var(--gap)]"
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {items.map((item) => (
            <div key={item} className="mx-8 flex items-center justify-center">
              <span className="select-none font-serif-display text-5xl tracking-tighter text-[var(--foreground)] opacity-70 transition-all duration-300 hover:italic hover:opacity-100 md:text-6xl lg:text-7xl">
                {item}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ToolsMarquee() {
  return (
    <section className="flex flex-col border-t border-[var(--line)] pb-8 pt-16 lg:pb-12 lg:pt-32">
      <Reveal className="px-5 sm:px-8 md:px-12">
        <SectionLabel index="07" label="Tools of the Trade" />
      </Reveal>
      <div className="relative mt-10 flex flex-col gap-4 overflow-hidden py-4">
        <MarqueeRow items={toolsMarqueeRows[0]} duration="30s" />
        <MarqueeRow items={toolsMarqueeRows[1]} duration="35s" reverse />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[var(--background)] to-transparent md:w-1/4" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[var(--background)] to-transparent md:w-1/4" />
      </div>
    </section>
  );
}
