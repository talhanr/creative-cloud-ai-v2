import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** "primary" = Figma "Primary action" (56px, bold). "choice" = 48px medium. "dashed" = add colour. */
  variant?: "primary" | "choice" | "dashed";
};

// Figma choice / primary-action pills in the Q7 cards (#131313, 1px #333, 32px radius).
export function PillButton({ variant = "choice", className, type = "button", ...rest }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "flex shrink-0 items-center justify-center px-5 tracking-normal text-flow-text transition-colors disabled:opacity-50",
        variant === "dashed"
          ? "h-14 rounded-card border border-dashed border-[#737373] bg-[#121212] text-body"
          : "rounded-panel-lg border border-chip-line bg-chip hover:border-brand-soft",
        variant === "primary" && "h-14 min-w-[140px] text-body font-semibold",
        variant === "choice" && "h-12 min-w-12 text-link font-medium md:h-14",
        className,
      )}
      {...rest}
    />
  );
}
