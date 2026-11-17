import { cn } from "@/lib/utils";

type Props = {
  options: readonly string[];
  onPick: (option: string) => void;
  disabled?: boolean;
  /** Equal-width row (Q7 chooser) instead of hugging chips (Q5, no-name). */
  stretch?: boolean;
  label: string;
};

// Figma "Choice": #131313, 1px #333 border, 48px tall, fully rounded, 14px medium #f8f6f3.
export function ChoiceChips({ options, onPick, disabled, stretch, label }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex gap-2", stretch ? "flex-col md:flex-row" : "flex-wrap")}
    >
      {options.map((o) => (
        <button
          key={o}
          type="button"
          disabled={disabled}
          onClick={() => onPick(o)}
          className={cn(
            "flex h-12 min-w-12 items-center justify-center rounded-panel-lg border border-chip-line bg-chip px-3 text-link leading-normal font-medium tracking-normal text-flow-text transition-colors hover:border-brand-soft disabled:opacity-50",
            stretch && "w-full md:flex-1",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function ChoiceButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 shrink-0 items-center justify-center rounded-panel-lg border border-chip-line bg-chip px-3 text-link leading-normal font-medium tracking-normal text-flow-text hover:border-brand-soft disabled:opacity-50"
    >
      {label}
    </button>
  );
}
