import { createCta } from "@/lib/content/landing";
import { PromptBox } from "./prompt-box";

// Figma CTA block (58782:3553) above the footer — same prompt as the hero, static placeholder.
export function CreateCta() {
  return (
    <section
      aria-labelledby="create-title"
      className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-6 px-4 py-8 md:px-8 lg:px-[15.625rem]"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[1.1875rem] leading-7 text-white">{createCta.eyebrow}</p>
        <h2
          id="create-title"
          className="text-h1-m font-bold text-white md:text-[3.25rem] md:leading-[1.1] xl:text-h1"
        >
          {createCta.title}
        </h2>
        <p className="max-w-[58.75rem] text-lead leading-7 text-gray-2">{createCta.body}</p>
      </div>
      <div className="w-full lg:w-[46.25rem]">
        <PromptBox mode="static" placeholder={createCta.placeholder} />
      </div>
    </section>
  );
}
