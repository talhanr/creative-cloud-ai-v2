import Link from "next/link";
import { services } from "@/lib/content/landing";
import { SectionIntro } from "./section-intro";

// Figma "Services" 58698:3943 — intro + five large service rows (Stack Sans Headline 80px).
export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="mx-auto flex w-full max-w-[1682px] flex-col gap-12 px-4 md:px-8 lg:gap-20 xl:px-0"
    >
      <SectionIntro
        id="services-title"
        eyebrow={services.eyebrow}
        title={services.title}
        intro={services.intro}
        titleStyle="h1"
      />
      <ul className="flex flex-col">
        {services.items.map((item) => (
          <li
            key={item.label}
            className="border-t border-b border-gray-4 py-6 font-display text-display-m font-semibold md:text-[64px] md:leading-[1.3] lg:py-10 xl:text-display"
          >
            {/* Colour kept out of the size classes: cn() treats custom text-* tokens as colours. */}
            <Link
              href={item.href}
              className={
                "highlighted" in item && item.highlighted
                  ? "text-brand-gradient"
                  : "text-white hover:text-brand-gradient"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
