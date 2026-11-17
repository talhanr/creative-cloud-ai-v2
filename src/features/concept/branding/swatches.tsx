import type { NamedColour } from "@/lib/colour";
import { brandingCopy } from "@/lib/content/concept";
import { fill } from "@/lib/ai/fill";
import { cn } from "@/lib/utils";

type Props = {
  colours: NamedColour[];
  /** When set, swatches are buttons that open the picker for that colour. */
  onEdit?: (index: number) => void;
  active?: number | null;
};

// Figma "Selected palette": equal columns, 52px swatch (8px radius, 1px white/20%), "Navy · #17324D".
export function Swatches({ colours, onEdit, active }: Props) {
  return (
    <ul className="grid w-full grid-cols-2 gap-4 sm:flex">
      {colours.map((c, i) => (
        <li key={`${c.hex}-${i}`} className="flex min-w-0 flex-1 flex-col gap-1.5">
          {onEdit ? (
            <button
              type="button"
              onClick={() => onEdit(i)}
              aria-label={fill(brandingCopy.editColour, { colour: c.name.toLowerCase() })}
              aria-pressed={active === i}
              className={cn(
                "h-[52px] w-full rounded-chip border border-white/20",
                active === i && "ring-2 ring-brand-soft ring-offset-2 ring-offset-ink-3",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ) : (
            <span aria-hidden className="h-[52px] w-full rounded-chip border border-white/20" style={{ backgroundColor: c.hex }} />
          )}
          <span className="text-[13px] leading-normal text-flow-text">
            {c.name} · {c.hex}
          </span>
        </li>
      ))}
    </ul>
  );
}
