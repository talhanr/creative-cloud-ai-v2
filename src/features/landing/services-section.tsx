import { services } from "@/lib/content/landing";
import { SectionIntro } from "./section-intro";
import { ServicesList } from "./services-list";

// Figma "Services" 58698:3943 — intro + five service rows that expand on hover (prototype).
export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="mx-auto flex w-full max-w-[109.125rem] flex-col gap-12 px-4 md:px-8 lg:gap-20"
    >
      <SectionIntro
        id="services-title"
        eyebrow={services.eyebrow}
        title={services.title}
        intro={services.intro}
        titleStyle="h1"
      />
      <ServicesList />
    </section>
  );
}
