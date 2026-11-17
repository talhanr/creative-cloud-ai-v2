import { createCta } from "@/lib/content/landing";
import { PromptBox } from "./prompt-box";

// Figma CTA block (58782:3553) above the footer — same prompt as the hero, static placeholder.
export function CreateCta() {
  return (
    <section
      aria-labelledby="create-title"
      className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-8 md:px-8 lg:px-[250px]"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[19px] leading-7 text-white">{createCta.eyebrow}</p>
        <h2
          id="create-title"
          className="text-h1-m font-bold text-white md:text-[52px] md:leading-[1.1] xl:text-h1"
        >
          {createCta.title}
        </h2>
        <p className="max-w-[940px] text-lead leading-7 text-gray-2">{createCta.body}</p>
      </div>
      <div className="w-full lg:w-[740px]">
        <PromptBox mode="static" placeholder={createCta.placeholder} />
      </div>
    </section>
  );
}
