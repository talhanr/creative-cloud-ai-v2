import Image from "next/image";
import Link from "next/link";
import { previewCopy } from "@/lib/content/concept";
import { cn } from "@/lib/utils";

type Props = { onBook: () => void; onBuild: () => void; active?: "book" | "build" | null };

// Figma result chrome (preview / built / booking / welcome back): crown left,
// "Book a call" (secondary) + "Get this built" (primary, bold) right.
export function ResultHeader({ onBook, onBuild, active }: Props) {
  const pill =
    "flex h-11 items-center justify-center rounded-panel-lg border border-chip-line bg-chip px-4 text-link tracking-normal text-flow-text transition-colors hover:border-brand-soft md:px-5";
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-flow-line bg-ink px-5 py-3.5 md:px-16">
      <Link href="/" aria-label="Royal Creative home" className="shrink-0 rounded-control">
        <Image src="/brand/symbol.svg" alt="" width={52} height={41} priority className="h-8 w-auto md:h-[41px]" />
      </Link>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBook}
          aria-pressed={active === "book"}
          className={cn(pill, "font-medium")}
        >
          {previewCopy.bookCall}
        </button>
        <button
          type="button"
          onClick={onBuild}
          aria-pressed={active === "build"}
          className={cn(pill, "font-semibold")}
        >
          {previewCopy.getBuilt}
        </button>
      </div>
    </header>
  );
}
