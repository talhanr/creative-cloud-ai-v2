import { hero } from "@/lib/content/landing";
import { ClientLogos } from "./client-logos";
import { HeroGlow } from "./hero-glow";
import { PromptBox } from "./prompt-box";

// Figma "Hero Section" 58698:4171 — 1080 tall on desktop, logo band pinned to the bottom.
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex flex-col overflow-hidden bg-ink lg:h-[1080px]"
    >
      <HeroGlow />
      <div className="relative z-10 mx-auto flex w-full max-w-[874px] flex-1 flex-col items-center justify-center gap-7 px-5 pt-[180px] pb-[100px] lg:gap-9 lg:px-0 lg:pt-[140px] lg:pb-0">
        <div className="flex flex-col items-center gap-7 text-center lg:gap-5">
          <h1
            id="hero-title"
            className="text-[44px] leading-[1.08] font-semibold text-flow-text md:text-[56px] lg:text-h1 lg:font-bold lg:whitespace-nowrap lg:text-white"
          >
            {hero.title}
          </h1>
          <p className="text-[17px] leading-[1.65] text-flow-subtle lg:text-lead lg:leading-7 lg:text-gray-2">
            {hero.subtitle}
          </p>
        </div>
        <div className="w-full pt-5 lg:w-[740px] lg:pt-0">
          <PromptBox mode="rotate" />
        </div>
      </div>
      <ClientLogos />
    </section>
  );
}
