import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Figma uses Stack Sans Headline 80px for Work/Testimonials, Inter Bold 66px for Services. */
  titleStyle?: "display" | "h1";
  id?: string;
};

// Shared two-column section header (eyebrow + title left, grey intro right).
export function SectionIntro({ eyebrow, title, intro, titleStyle = "display", id }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16">
      <div className="flex flex-col gap-6 text-white lg:w-[42rem] lg:shrink-0">
        <p className="text-[1.125rem] leading-6 font-medium text-brand uppercase md:text-eyebrow">
          {eyebrow}
        </p>
        <h2
          id={id}
          className={cn(
            titleStyle === "display"
              ? "font-display text-display-m font-normal md:text-[3.25rem] md:leading-[1.2] xl:text-display xl:leading-[4.75rem]"
              : "text-h1-m font-bold md:text-[3.25rem] md:leading-[1.1] xl:text-h1",
          )}
        >
          {title}
        </h2>
      </div>
      <p className="text-intro-m text-gray-3 md:text-[1.375rem] lg:pr-5 xl:text-intro">{intro}</p>
    </div>
  );
}
