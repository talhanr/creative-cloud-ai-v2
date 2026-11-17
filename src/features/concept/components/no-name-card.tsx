import { gettingStartedCopy as gs } from "@/lib/content/concept";

// Figma "Placeholder name" card (no-name-selected 59015:19590).
export function NoNameCard() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-card border border-flow-line p-[18px]">
      <p className="text-lead leading-normal font-semibold text-flow-text">{gs.placeholderName}</p>
      <p className="text-link leading-[1.6] tracking-normal text-flow-subtle">{gs.placeholderHint}</p>
    </div>
  );
}
