import type { CSSProperties } from "react";
import type { SiteContent } from "@/lib/ai/types";
import { ModernClosing } from "./modern-closing";
import { ModernHero } from "./modern-hero";
import { ModernMiddle } from "./modern-middle";

// Figma "Template / modern — Desktop" 59015:21625 (mobile 59015:21741).
// Colours: palette.primary (navy in demo) + palette.accent (gold) as CSS vars; neutrals are tokens.
export function ModernTemplate({ content }: { content: SiteContent }) {
  const style = {
    "--t-primary": content.palette.primary,
    "--t-accent": content.palette.accent,
  } as CSSProperties;

  return (
    <div style={style} className="bg-(--t-primary) font-sans text-(--t-primary)">
      <div className="flex flex-col bg-tpl-paper">
        <ModernHero content={content} />
        <ModernMiddle content={content} />
        <ModernClosing content={content} />
      </div>
    </div>
  );
}
