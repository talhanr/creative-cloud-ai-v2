import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Line = { text: string; done: boolean };

// Figma build status list: ✓ for completed lines (muted), empty circle for the current one.
export function StatusList({ lines }: { lines: Line[] }) {
  return (
    <ul className="flex flex-col gap-4 md:gap-3">
      {lines.map((l, i) => (
        <li key={i} className="flex items-start gap-3 motion-safe:animate-fade-in">
          {l.done ? (
            <Check className="mt-0.5 size-4 shrink-0 text-flow-subtle" aria-label="Done" />
          ) : (
            <span className="mt-0.5 size-4 shrink-0 rounded-full border border-flow-line" aria-label="In progress" />
          )}
          <span
            className={cn(
              "text-link leading-[1.5] tracking-normal md:text-[13px]",
              l.done ? "text-flow-subtle" : "text-flow-text",
            )}
          >
            {l.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
