import { fill } from "@/lib/ai/fill";
import { splitList } from "@/lib/ai/generate-content";
import type { NamedColour } from "@/lib/colour";
import { brandingCopy, gettingStartedCopy } from "@/lib/content/concept";
import { PillButton } from "./pill-button";
import { Swatches } from "./swatches";

type Props = {
  feeling: string | undefined;
  name: string | undefined;
  colours: NamedColour[];
  onChange: () => void;
  onConfirm: () => void;
};

// Figma "Suggested brand direction" (q7-nothing-yet): title from Q6 ("Bold. Modern. Welcoming."),
// rationale, default navy + gold swatches, full-width "Change colours" / "Use this direction".
export function DirectionCard({ feeling, name, colours, onChange, onConfirm }: Props) {
  const words = splitList(feeling, 3);
  const title = words.length ? words.map((w) => `${w}.`).join(" ") : null;
  return (
    <div className="flex w-full flex-col gap-4 rounded-bubble bg-ink-3 p-5">
      {title && <p className="text-lead leading-normal text-flow-text">{title}</p>}
      <p className="text-body leading-[1.6] text-flow-subtle">
        {fill(brandingCopy.noneBody, { name: name ?? gettingStartedCopy.placeholderName })}
      </p>
      <Swatches colours={colours} />
      <PillButton variant="primary" onClick={onChange} className="w-full">
        {brandingCopy.changeColours}
      </PillButton>
      <PillButton variant="primary" onClick={onConfirm} className="w-full">
        {brandingCopy.useDirection}
      </PillButton>
    </div>
  );
}
