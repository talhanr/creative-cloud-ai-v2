import { hero } from "@/lib/content/landing";
import { ClientLogos } from "./client-logos";
import { HeroGlow } from "./hero-glow";
import { HeroAction } from "./hero-action";

// Figma "Hero Section" 58698:4171 — desktop hero fills the first screen (like the 1080 frame); logo band follows below the fold.
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col overflow-hidden bg-ink"
    >
      <HeroGlow />
      <div className="relative z-10 mx-auto flex w-full max-w-[54.625rem] flex-1 flex-col items-center justify-center gap-7 px-5 pt-[11.25rem] pb-[6.25rem] lg:min-h-svh lg:gap-9 lg:px-0 lg:pt-[6rem] lg:pb-0">
        <div className="flex flex-col items-center gap-7 text-center lg:gap-5">
          <h1
            id="hero-title"
            className="text-[2.75rem] leading-[1.08] font-semibold text-flow-text md:text-[2.75rem] lg:text-h1 lg:font-bold lg:whitespace-nowrap lg:text-white"
          >
            {hero.title}
          </h1>
          <p className="text-[1.0625rem] leading-[1.65] text-flow-subtle lg:text-lead lg:leading-7 lg:text-gray-2">
            {hero.subtitle}
          </p>
        </div>
        <div className="w-full pt-5 lg:w-[55rem] lg:pt-0">
          <HeroAction />
        </div>
      </div>
      <ClientLogos />
    </section>
  );
}
