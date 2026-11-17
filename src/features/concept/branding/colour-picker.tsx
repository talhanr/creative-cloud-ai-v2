"use client";

import { X } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { fill } from "@/lib/ai/fill";
import { expandHex, hexToHsv, hsvToHex, isHex, type NamedColour } from "@/lib/colour";
import { brandingCopy } from "@/lib/content/concept";

type Props = {
  colour: NamedColour;
  onChange: (hex: string) => void;
  onClose: () => void;
};

// Figma "Open colour picker" (q7-picker-open): #1b1b1b card, saturation/brightness area,
// rainbow hue slider, HEX field. Keyboard: arrows move the shade marker; hue is a range input.
export function ColourPicker({ colour, onChange, onClose }: Props) {
  const hexId = useId();
  const areaRef = useRef<HTMLDivElement>(null);
  const [hsv, setHsv] = useState(() => hexToHsv(colour.hex));
  const [hexText, setHexText] = useState(colour.hex);

  const update = (next: { h: number; s: number; v: number }) => {
    setHsv(next);
    const hex = hsvToHex(next.h, next.s, next.v);
    setHexText(hex);
    onChange(hex);
  };

  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const box = areaRef.current?.getBoundingClientRect();
    if (!box) return;
    const s = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
    const v = 1 - Math.min(1, Math.max(0, (e.clientY - box.top) / box.height));
    update({ ...hsv, s, v });
  };

  const onAreaKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    update({
      ...hsv,
      s: Math.min(1, Math.max(0, hsv.s + m[0])),
      v: Math.min(1, Math.max(0, hsv.v + m[1])),
    });
  };

  const title = fill(brandingCopy.editColour, { colour: colour.name.toLowerCase() });

  return (
    <div className="flex w-full flex-col gap-4 rounded-card border border-flow-line bg-[#1b1b1b] p-5">
      <div className="flex items-start justify-between">
        <p className="text-body leading-normal text-flow-text">{title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={brandingCopy.closePicker}
          className="-m-3 flex size-11 items-center justify-center text-flow-subtle hover:text-flow-text"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      <div
        ref={areaRef}
        role="slider"
        tabIndex={0}
        aria-label={`${title}: shade`}
        aria-valuetext={hexText}
        aria-valuenow={Math.round(hsv.v * 100)}
        onKeyDown={onAreaKey}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => e.buttons === 1 && fromPointer(e)}
        className="relative h-40 w-full cursor-crosshair touch-none rounded-chip"
        style={{
          backgroundImage: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hsvToHex(hsv.h, 1, 1)})`,
        }}
      >
        <span
          aria-hidden
          className="absolute size-[18px] -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white shadow-soft"
          style={{ left: `${hsv.s * 100}%`, bottom: `${hsv.v * 100}%` }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={359}
        value={Math.round(hsv.h)}
        onChange={(e) => update({ ...hsv, h: Number(e.target.value) })}
        aria-label={`${title}: hue`}
        className="hue-slider h-[18px] w-full cursor-pointer appearance-none rounded-pill"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor={hexId} className="text-link leading-normal tracking-normal text-flow-subtle">
          {brandingCopy.hex}
        </label>
        <input
          id={hexId}
          value={hexText}
          maxLength={7}
          onChange={(e) => {
            const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
            setHexText(v.toUpperCase());
            if (isHex(v) || /^#[0-9a-f]{3}$/i.test(v)) {
              const hex = expandHex(v);
              setHsv(hexToHsv(hex));
              onChange(hex);
            }
          }}
          className="rounded-card border border-flow-line bg-ink-3 p-4 text-body leading-normal text-flow-text uppercase outline-none focus:border-brand-soft"
        />
      </div>
    </div>
  );
}
