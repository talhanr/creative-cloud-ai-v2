"use client";

/* eslint-disable @next/next/no-img-element -- client-side data URL preview */
import { Check, Upload } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { NamedColour } from "@/lib/colour";
import { brandingCopy } from "@/lib/content/concept";
import type { Logo } from "../store";
import { PillButton } from "./pill-button";
import { samplePalette } from "./sample-palette";
import { Swatches } from "./swatches";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/png", "image/svg+xml", "image/jpeg"];

type Props = {
  logo: Logo | null;
  colours: NamedColour[];
  onUploaded: (logo: Logo, colours: NamedColour[]) => void;
  onConfirm: () => void;
  onChange: () => void;
};

// Figma "Logo upload success" (q7-logo-upload). Upload is client-side only (Phase 1).
export function LogoCard({ logo, colours, onUploaded, onConfirm, onChange }: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    if (!TYPES.includes(file.type)) return setError(brandingCopy.uploadWrongType);
    if (file.size > MAX_BYTES) return setError(brandingCopy.uploadTooBig);
    setBusy(true);
    try {
      const dataUrl = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = () => rej(r.error);
        r.readAsDataURL(file);
      });
      const picked = await samplePalette(dataUrl).catch(() => []);
      onUploaded({ dataUrl, name: file.name }, picked);
    } catch {
      setError(brandingCopy.uploadWrongType);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[18px] rounded-bubble border border-flow-line bg-ink-3 p-5">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg"
        className="sr-only"
        onChange={(e) => {
          void onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {logo ? (
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-[72px] w-[140px] items-center justify-center bg-white/5 p-3">
            <img src={logo.dataUrl} alt="Your logo" className="max-h-full max-w-full object-contain" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2 text-link leading-normal tracking-normal">
            <p className="truncate text-flow-text">{logo.name}</p>
            <p className="flex items-center gap-1 text-[13px] text-success">
              <Check className="size-3.5" aria-hidden />
              {brandingCopy.uploaded.replace("✓ ", "")}
            </p>
            <p className="text-caption text-flow-muted">{brandingCopy.uploadHint}</p>
          </div>
          <PillButton onClick={() => inputRef.current?.click()}>{brandingCopy.replace}</PillButton>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <PillButton
            variant="primary"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="gap-2"
          >
            <Upload className="size-4" aria-hidden />
            {brandingCopy.uploadLabel}
          </PillButton>
          <p className="text-caption text-flow-muted">{brandingCopy.uploadHint}</p>
        </div>
      )}

      {error && (
        <p role="alert" className="text-link tracking-normal text-destructive">
          {error}
        </p>
      )}

      {logo && colours.length > 0 && (
        <>
          <Swatches colours={colours} />
          <div className="flex gap-3">
            <PillButton variant="primary" onClick={onConfirm}>
              {brandingCopy.yes}
            </PillButton>
            <PillButton variant="choice" onClick={onChange} className="min-w-[131px] md:h-14">
              {brandingCopy.change}
            </PillButton>
          </div>
        </>
      )}
    </div>
  );
}
