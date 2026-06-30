"use client";

import dynamic from "next/dynamic";

export const TerminalClient = dynamic(
  () => import("./terminal").then((mod) => mod.Terminal),
  {
    ssr: false,
    loading: () => <div className="min-h-[260px] rounded-[1.5rem] border border-white/10 bg-white/5" aria-hidden="true" />,
  },
);
