import { builtCopy } from "@/lib/content/concept";
import type { CallbackWhen } from "@/lib/uk-time";

// Figma "Get this built / today · after 5pm · weekend confirmation" (59015:20995 / 21033 / 21071).
// Figma uses one text for all three; the call line follows the handoff UK rules.
export function BuiltStage({ when }: { when: CallbackWhen }) {
  return (
    <div className="flex flex-col gap-2 motion-safe:animate-fade-in">
      <p className="text-caption text-flow-subtle">{builtCopy.eyebrow}</p>
      <div role="status" className="flex flex-col gap-2 rounded-card bg-ink-3 p-5">
        <h1 className="text-lead leading-normal font-medium text-flow-text md:text-[26px]">{builtCopy.title}</h1>
        <p className="text-body leading-normal font-medium text-flow-text">{builtCopy.callLine[when]}</p>
        <p className="text-caption leading-normal text-flow-subtle md:text-[13px]">{builtCopy.body}</p>
      </div>
    </div>
  );
}
