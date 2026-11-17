import type { CSSProperties } from "react";
import { fill } from "@/lib/ai/fill";
import type { SiteContent } from "@/lib/ai/types";
import { previewCopy } from "@/lib/content/concept";

// Figma "saved concept" mini homepage (built / booking / welcome back frames).
// Clicking it reopens the full preview.
export function SavedConcept({ content, onOpen }: { content: SiteContent; onOpen: () => void }) {
  const style = { "--t-primary": content.palette.primary, "--t-accent": content.palette.accent } as CSSProperties;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-caption text-flow-subtle">{fill(previewCopy.savedLabel, { name: content.businessName })}</p>
      <button
        type="button"
        onClick={onOpen}
        style={style}
        aria-label={`${fill(previewCopy.savedLabel, { name: content.businessName })} — open full preview`}
        className="flex w-full flex-col items-start gap-5 rounded-card bg-(--t-primary) p-6 text-left transition-transform hover:-translate-y-0.5 md:p-[52px]"
      >
        <span className="text-body text-(--t-accent) md:text-lead">{content.businessName}</span>
        <span className="text-[36px] leading-[1.1] text-tpl-cream md:text-[56px]">
          {content.hero.headline.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </span>
        <span className="max-w-[820px] text-link leading-normal tracking-normal text-tpl-cream">
          {content.hero.body}
        </span>
        <span className="rounded-[2px] bg-(--t-accent) px-[18px] py-3 text-link font-semibold tracking-normal text-tpl-ink">
          {content.cta} ↗
        </span>
        <span className="text-caption text-tpl-cream">{content.nav.join(" · ")}</span>
      </button>
    </div>
  );
}
