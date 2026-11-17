import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Chip-style link (Figma "Back to homepage" / choice pill).
export function PillLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-panel-lg border border-chip-line bg-chip px-4 text-link font-medium tracking-normal text-flow-text hover:border-brand-soft",
        className,
      )}
    >
      {children}
    </Link>
  );
}
