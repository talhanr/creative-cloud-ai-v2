import { cn } from "@/lib/utils";

// Figma: four 2px gradient outlines (line, line_rot_90/180/270) that cross-fade on an 18s loop.
// Built in CSS: the exported rotated SVGs have a 32×32 viewBox that clips the path as <img>.
const layers = [
  { dir: "gradient-ring-180", anim: "animate-border-0", base: "opacity-100" },
  { dir: "gradient-ring-90", anim: "animate-border-90", base: "opacity-0" },
  { dir: "gradient-ring-0", anim: "animate-border-180", base: "opacity-0" },
  { dir: "gradient-ring-270", anim: "animate-border-270", base: "opacity-0" },
] as const;

export function PromptBorder({ animate }: { animate: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {layers.map((l) => (
        <span
          key={l.dir}
          className={cn("absolute inset-0 rounded-card", l.dir, animate ? l.anim : l.base)}
        />
      ))}
    </div>
  );
}
