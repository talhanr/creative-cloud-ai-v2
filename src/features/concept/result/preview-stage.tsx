"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { fill } from "@/lib/ai/fill";
import type { SiteContent } from "@/lib/ai/types";
import { previewCopy } from "@/lib/content/concept";
import { cn } from "@/lib/utils";
import { ModernTemplate } from "@/features/templates/modern/modern-template";

const devices = {
  desktop: "max-w-full",
  tablet: "max-w-[820px]",
  mobile: "max-w-[390px]",
} as const;
type Device = keyof typeof devices;

// Figma "Preview / complete homepage reveal" (59015:20684): device toggle, concept label,
// email notice, browser frame with the generated homepage, "Want changes?" card. 0.5s fade-in.
export function PreviewStage({
  content,
  email,
  onBook,
}: {
  content: SiteContent;
  email: string | null;
  onBook: () => void;
}) {
  const [device, setDevice] = useState<Device>("desktop");

  return (
    <div className="flex flex-col gap-4 motion-safe:animate-fade-in">
      <div role="group" aria-label={previewCopy.deviceGroup} className="hidden justify-center gap-2 md:flex">
        {(Object.keys(devices) as Device[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDevice(d)}
            aria-pressed={device === d}
            className={cn(
              "h-11 rounded-panel-lg border px-5 text-link tracking-normal transition-colors",
              device === d ? "border-brand-soft bg-chip text-flow-text" : "border-chip-line bg-chip text-flow-subtle",
            )}
          >
            {previewCopy.devices[d]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 text-caption text-flow-subtle">
        <p>{previewCopy.conceptLabel}</p>
        {email && (
          <p className="flex items-center gap-2">
            <Mail className="size-3.5 shrink-0" aria-hidden />
            {fill(previewCopy.emailNotice, { email })}
          </p>
        )}
      </div>

      <div className={cn("mx-auto w-full overflow-hidden rounded-card border border-flow-line bg-ink-3 transition-[max-width] duration-300", devices[device])}>
        <div className="flex items-center gap-3 border-b border-flow-line px-3 py-2.5 text-caption text-flow-subtle">
          <span aria-hidden className="tracking-[0.15em]">● ● ●</span>
          <span className="truncate">{fill(previewCopy.browserTitle, { name: content.businessName })}</span>
        </div>
        <ModernTemplate content={content} />
      </div>

      <section
        aria-labelledby="changes-title"
        className="flex flex-col items-start gap-4 rounded-card border border-flow-line bg-ink-3 p-6 md:flex-row md:items-center md:justify-between md:p-8"
      >
        <div className="flex flex-col gap-2">
          <h2 id="changes-title" className="text-lead leading-normal font-semibold text-flow-text">
            {previewCopy.changesTitle}
          </h2>
          <p className="text-link leading-normal tracking-normal text-flow-subtle">{previewCopy.changesBody}</p>
        </div>
        <button
          type="button"
          onClick={onBook}
          className="flex h-12 items-center justify-center rounded-panel-lg border border-chip-line bg-chip px-5 text-link font-semibold tracking-normal text-flow-text hover:border-brand-soft"
        >
          {previewCopy.bookCall}
        </button>
      </section>
    </div>
  );
}
