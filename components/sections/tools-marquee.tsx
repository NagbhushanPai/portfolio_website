import { SectionLabel } from "./section-label";
import { Reveal } from "@/components/motion/reveal";
import { GsapMarqueeRow } from "@/components/motion/gsap-marquee-row";
import { toolsMarqueeRows } from "@/lib/portfolio-data";

export function ToolsMarquee() {
  return (
    <section className="border-t border-black/10 py-20">
      <Reveal className="px-5 sm:px-8 md:px-12">
        <SectionLabel index="07" label="Tools of the Trade" />
      </Reveal>
      <div className="mt-10 space-y-4">
        <GsapMarqueeRow items={toolsMarqueeRows[0]} />
        <GsapMarqueeRow items={toolsMarqueeRows[1]} reverse />
      </div>
    </section>
  );
}
