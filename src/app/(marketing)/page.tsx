import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutSection } from "@/features/landing/about-section";
import { CreateCta } from "@/features/landing/create-cta";
import { HeroSection } from "@/features/landing/hero-section";
import { MarqueeBands } from "@/features/landing/marquee-bands";
import { ProjectsSection } from "@/features/landing/projects-section";
import { ServicesSection } from "@/features/landing/services-section";
import { Showcase } from "@/features/landing/showcase";
import { TestimonialsSection } from "@/features/landing/testimonials-section";

// Landing "Home new" (Figma 58698:3757, 1920 frame). Section gaps follow Figma offsets.
export default function HomePage() {
  return (
    <div data-fluid-root className="relative flex min-h-screen flex-col overflow-x-clip bg-ink">
      <SiteHeader current="/" />
      <main id="main" className="relative z-10 flex flex-col">
        <HeroSection />
        <div className="flex flex-col gap-24 pt-12 lg:gap-[18.75rem] lg:pt-16">
          <Showcase />
          <ServicesSection />
          <ProjectsSection />
          <AboutSection />
          <TestimonialsSection />
        </div>
        <div className="mt-16 lg:mt-[12.5rem]">
          <MarqueeBands />
        </div>
        <div className="mt-8 lg:mt-16">
          <CreateCta />
        </div>
      </main>
      {/* Figma "bg": warm glow behind the CTA + footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[67.5rem] w-[120rem] -translate-x-1/2"
      >
        <Image src="/landing/bg.svg" alt="" fill className="object-cover" />
      </div>
      <div className="relative z-10 mt-16 lg:mt-[13.75rem]">
        <SiteFooter />
      </div>
    </div>
  );
}
