"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { projects } from "@/lib/content/landing";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";
import { SectionIntro } from "./section-intro";

const STEP_MS = 6000; // Figma cycles 3 cards in an 18s loop

// Figma "Projects" 58698:3960 — desktop shows one card at a time; the track slides up and the
// next card scales in from 0.72. Mobile / reduced motion: cards simply stack.
export function ProjectsSection() {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const animated = !reduceMotion;

  useEffect(() => {
    if (!animated || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % projects.items.length), STEP_MS);
    return () => clearInterval(t);
  }, [animated, paused]);

  return (
    <section
      aria-labelledby="projects-title"
      className="mx-auto flex w-full max-w-[94rem] flex-col gap-12 px-4 md:px-8 lg:gap-[7.5rem]"
    >
      <SectionIntro
        id="projects-title"
        eyebrow={projects.eyebrow}
        title={projects.title}
        intro={projects.intro}
      />
      <div
        className={cn(animated && "lg:h-[48.4375rem] lg:overflow-hidden")}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className={cn(
            "flex flex-col gap-6 lg:gap-20",
            animated &&
              "lg:translate-y-(--slide) lg:transition-transform lg:duration-700 lg:ease-in-out",
          )}
          style={{ "--slide": `calc(${index} * -53.4375rem)` } as React.CSSProperties}
        >
          {projects.items.map((p, i) => (
            <div
              key={p.name}
              className={cn(
                animated && "lg:transition-transform lg:duration-700 lg:ease-in-out",
                animated && i !== index && "lg:scale-[0.72]",
              )}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
