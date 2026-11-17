import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared bits of the modern template. Links are inert (it's a concept preview).

export function CtaButton({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-[52px] items-center justify-center rounded-chip bg-(--t-accent) px-[22px] py-4 text-[15px] font-semibold whitespace-nowrap text-tpl-ink">
      {label} ↗
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-caption uppercase", className)}>{children}</p>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[34px] leading-[1.1] font-semibold md:text-[48px]">{children}</h2>;
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-base leading-[1.7]", className)}>{children}</p>;
}

/** 64px side padding / 96px vertical on desktop, compact on mobile. */
export function Section({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section aria-label={label} className={cn("w-full px-5 py-14 md:px-16 md:py-24", className)}>
      {children}
    </section>
  );
}
