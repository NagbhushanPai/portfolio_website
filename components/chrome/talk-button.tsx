"use client";

import { Magnetic } from "@/components/motion/magnetic";
import { siteConfig } from "@/lib/portfolio-data";

export function TalkButton() {
  return (
    <Magnetic strength={0.3}>
      <a
        href={`mailto:${siteConfig.email}`}
        className="fixed bottom-5 right-5 z-40 hidden min-w-[7.2rem] items-center justify-center rounded-full border border-[#111111] bg-[#1a1a18] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#f5f1ea] shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:bottom-8 sm:right-8 sm:inline-flex"
      >
        Let&apos;s Talk
      </a>
    </Magnetic>
  );
}
