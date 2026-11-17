import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  primary: string;
  accent: string;
  /** ms since generation started — drives the nav → hero → sections build. */
  elapsed: number;
  muted?: boolean;
  animate: boolean;
};

// Figma "Homepage taking shape" browser mock (loading-building): palette background,
// builds navigation (~1s) → hero (~4s) → service cards (~7s).
export function BrowserMock({ name, primary, accent, elapsed, muted, animate }: Props) {
  const shown = (atMs: number) => !animate || muted || elapsed >= atMs;
  const style = { "--m-primary": primary, "--m-accent": accent } as CSSProperties;
  const piece = (atMs: number) =>
    cn("transition-opacity duration-500", shown(atMs) ? "opacity-100" : "opacity-0");
  const fillAccent = muted ? "bg-(--m-accent)/60" : "bg-(--m-accent)";
  const fillLight = muted ? "bg-white/15" : "bg-white";

  return (
    <div
      style={style}
      aria-hidden
      className="w-full overflow-hidden rounded-card border border-flow-line bg-ink-3 shadow-lift"
    >
      <div className="flex items-center gap-3 border-b border-flow-line px-3 py-2.5 text-caption text-flow-text">
        <span className="tracking-[0.15em] text-flow-subtle">● ● ●</span>
        <span className="truncate">{name}</span>
      </div>
      <div className="flex flex-col gap-5 bg-(--m-primary) p-4 md:p-5">
        <div className={cn("flex items-center justify-between", piece(1000))}>
          <span className={cn("h-2.5 w-[18%] md:h-3.5", fillAccent)} />
          <span className={cn("h-1.5 w-[12%]", fillLight)} />
        </div>
        <div className={cn("flex flex-col gap-2.5", piece(4000))}>
          <span className={cn("h-4 w-full md:h-6", fillAccent)} />
          <span className={cn("h-4 w-1/2 md:h-6", fillAccent)} />
          <span className={cn("mt-1 h-1.5 w-full", fillLight)} />
          <span className={cn("h-1.5 w-2/5", fillLight)} />
          <span className={cn("mt-1 h-7 w-1/4 md:h-10", fillAccent)} />
        </div>
        <div className={cn("grid grid-cols-3 gap-2 md:gap-2.5", piece(7000))}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("h-12 md:h-24", muted ? "bg-white/10" : "bg-white")} />
          ))}
        </div>
      </div>
    </div>
  );
}
