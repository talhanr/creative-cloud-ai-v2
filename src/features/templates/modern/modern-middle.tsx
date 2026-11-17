import type { SiteContent } from "@/lib/ai/types";
import { Body, CtaButton, Eyebrow, Section, SectionTitle } from "./modern-ui";

// Services cards, precision feature, experience.
export function ModernMiddle({ content }: { content: SiteContent }) {
  const { services, feature, experience } = content;
  return (
    <>
      <Section label={services.eyebrow} className="flex flex-col gap-10">
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <SectionTitle>{services.title}</SectionTitle>
        <ul className="flex flex-col gap-4 @3xl:flex-row @3xl:items-start">
          {services.items.map((item) => (
            <li key={item.title} className="flex min-w-0 flex-1 flex-col gap-6 bg-tpl-mist p-7">
              <p aria-hidden className="text-[48px] leading-normal @3xl:text-[60px]">
                {item.word}
              </p>
              <div className="flex flex-col gap-3">
                <h3 className="text-[26px] leading-[1.1] font-semibold">{item.title}</h3>
                <Body>{item.body}</Body>
                <p className="text-link tracking-normal underline">{content.cta} ↗</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        label={feature.eyebrow}
        className="flex flex-col gap-10 bg-tpl-mist @5xl:flex-row @5xl:items-center @5xl:gap-14"
      >
        <div className="flex min-h-[260px] flex-1 flex-col items-center justify-center gap-5 bg-(--t-primary) p-8 @5xl:min-h-[340px]">
          <p className="w-full text-center text-[56px] leading-[1.05] text-(--t-accent) @3xl:text-[80px]">
            {feature.statement.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </p>
          <span aria-hidden className="h-px w-full bg-(--t-accent)" />
        </div>
        <div className="flex flex-1 flex-col items-start gap-6">
          <Eyebrow>{feature.eyebrow}</Eyebrow>
          <SectionTitle>{feature.title}</SectionTitle>
          <Body>{feature.body}</Body>
          <CtaButton label={content.cta} />
        </div>
      </Section>

      <Section label={experience.eyebrow} className="flex flex-col gap-8">
        <Eyebrow>{experience.eyebrow}</Eyebrow>
        <SectionTitle>{experience.title}</SectionTitle>
        <div className="flex flex-col gap-8 @3xl:flex-row @3xl:gap-12">
          <Body className="flex-1">{experience.body}</Body>
          <ul className="flex flex-1 flex-col gap-4 text-[26px] leading-normal @3xl:text-h3">
            {experience.values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
