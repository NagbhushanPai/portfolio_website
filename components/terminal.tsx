"use client";

import { useState } from "react";
import { projects, siteConfig, skills } from "@/lib/portfolio-data";

type Line = {
  id: number;
  prompt: string;
  output: string[];
};

const commands: Record<string, string[]> = {
  help: ["Available commands: help, about, projects, skills, experience, resume, contact"],
  about: ["Nagbhushan Pai", "Software Engineer focused on backend systems and AI applications."],
  projects: projects.map((project) => `${project.name} - /projects/${project.slug}`),
  skills: [...skills],
  experience: ["Data Axle - Backend Intern", "ONJI Softwares - Software Engineer Intern"],
  resume: [`Resume: ${siteConfig.resumeUrl}`],
  contact: [`Email: ${siteConfig.email}`, `GitHub: ${siteConfig.github}`, `LinkedIn: ${siteConfig.linkedin}`],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { id: 1, prompt: "$ help", output: [...commands.help] },
  ]);
  const [value, setValue] = useState("");
  const [commandCount, setCommandCount] = useState(0);

  const runCommand = () => {
    const command = value.trim().toLowerCase();
    const output =
      command in commands
        ? [...commands[command as keyof typeof commands]]
        : [`Unknown command: ${value}`, "Type help to see the available commands."];

    const nextCount = commandCount + 1;
    if (nextCount >= 3) {
      setLines([
        { id: Date.now(), prompt: "$ cleared", output: ["Terminal cleared after 3 commands.", "Type help to continue."] },
      ]);
      setCommandCount(0);
    } else {
      setLines((current) => [...current, { id: current.length + 1, prompt: `$ ${value || "help"}`, output }]);
      setCommandCount(nextCount);
    }
    setValue("");
  };

  return (
    <div aria-label="Interactive terminal" className="text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="mt-1 text-sm text-white/75">Try: help, about, projects, skills, experience, resume, contact</p>
        </div>
      </div>
      <div className="mt-4 space-y-4 text-sm leading-7 text-white/85">
        {lines.map((line) => (
          <div key={line.id}>
            <div className="font-medium text-white">{line.prompt}</div>
            <div className="mt-1 space-y-1 text-white/78">
              {line.output.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <form
        className="mt-5 flex gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          runCommand();
        }}
      >
        <label className="sr-only" htmlFor="terminal-command">
          Terminal command
        </label>
        <input
          id="terminal-command"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type a command"
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25 focus:ring-2 focus:ring-white/15"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-4 py-3 text-sm font-medium text-neutral-950 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/25"
        >
          Run
        </button>
      </form>
    </div>
  );
}
