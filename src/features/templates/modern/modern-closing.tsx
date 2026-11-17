import type { SiteContent } from "@/lib/ai/types";
import { Body, CtaButton, Eyebrow, Section, SectionTitle } from "./modern-ui";

// Booking steps, location, review placeholder, closing invitation, footer.
export function ModernClosing({ content }: { content: SiteContent }) {
  const { booking, place, review, closing, footer } = content;
  return (
    <>
      <Section label={booking.eyebrow} className="flex flex-col items-start gap-8 bg-tpl-mist">
        <Eyebrow>{booking.eyebrow}</Eyebrow>
        <SectionTitle>{booking.title}</SectionTitle>
        <Body>{booking.body}</Body>
        <ol className="flex w-full flex-col gap-6 @3xl:flex-row">
          {booking.steps.map((s, i) => (
            <li key={s.title} className="flex min-w-0 flex-1 flex-col gap-3 border-t border-(--t-primary)/25 pt-5">
              <span className="text-caption">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-h5 leading-[1.1] font-semibold">{s.title}</h3>
              <Body>{s.body}</Body>
            </li>
          ))}
        </ol>
        <CtaButton label={content.cta} />
      </Section>

      {place && (
        <Section label={place.eyebrow} className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-12">
          <div className="flex flex-1 flex-col items-start gap-6">
            <Eyebrow>{place.eyebrow}</Eyebrow>
            <SectionTitle>{place.title}</SectionTitle>
            <Body>{place.body}</Body>
            <CtaButton label={content.cta} />
          </div>
          <div className="flex min-h-[220px] flex-1 flex-col justify-center gap-6 bg-(--t-primary) p-8">
            <p className="text-[44px] leading-[1.1] text-(--t-accent) @3xl:text-[54px]">{place.cardTitle}</p>
            <p className="text-link leading-[1.6] tracking-normal text-tpl-cream">
              {place.cardLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
        </Section>
      )}

      <Section label={review.eyebrow} className="flex flex-col gap-5 bg-tpl-mist">
        <Eyebrow>{review.eyebrow}</Eyebrow>
        <p className="text-[34px] leading-[1.1] font-semibold @3xl:text-[44px]">{review.title}</p>
        <Body>{review.body}</Body>
      </Section>

      <Section label="Book" className="flex flex-col items-start gap-7 bg-tpl-paper">
        <SectionTitle>{closing.title}</SectionTitle>
        <Body>{closing.body}</Body>
        <CtaButton label={content.cta} />
      </Section>

      <footer className="flex flex-col gap-6 border-t border-(--t-primary)/20 px-5 py-8 @3xl:flex-row @3xl:px-16">
        <p className="text-[26px] leading-normal whitespace-nowrap">{content.businessName}</p>
        <p className="flex-1 text-[13px] leading-[1.7]">
          {footer.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
        <p className="text-[13px] leading-[1.7] whitespace-nowrap">
          {footer.links.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </p>
      </footer>
    </>
  );
}
