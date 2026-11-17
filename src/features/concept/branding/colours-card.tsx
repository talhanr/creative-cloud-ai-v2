"use client";

import { useId, useState } from "react";
import { nearestName, parseColours, type NamedColour } from "@/lib/colour";
import { brandingCopy } from "@/lib/content/concept";
import { ColourPicker } from "./colour-picker";
import { PillButton } from "./pill-button";
import { Swatches } from "./swatches";

type Props = {
  colours: NamedColour[];
  onColours: (colours: NamedColour[]) => void;
  onConfirm: () => void;
  /** Start with the picker open on the first colour (from "Change"). */
  startOpen?: boolean;
  /** Show the "Your colours" text field (hidden when editing logo colours). */
  showField?: boolean;
};

const MAX = 4;

// Figma q7-colours + q7-picker-open: "Your colours" field → swatches → picker / add / use.
export function ColoursCard({ colours, onColours, onConfirm, startOpen, showField = true }: Props) {
  const fieldId = useId();
  const [text, setText] = useState("");
  const [editing, setEditing] = useState<number | null>(startOpen && colours.length ? 0 : null);

  const fromText = (value: string) => {
    setText(value);
    const parsed = parseColours(value);
    if (parsed.length) onColours(parsed);
  };

  const add = () => {
    if (colours.length >= MAX) return;
    const hex = "#888888";
    onColours([...colours, { name: nearestName(hex), hex }]);
    setEditing(colours.length);
  };

  const setHex = (i: number, hex: string) =>
    onColours(colours.map((c, j) => (j === i ? { name: nearestName(hex), hex } : c)));

  return (
    <div className="flex w-full flex-col gap-4">
      {showField && (
        <div className="flex flex-col gap-1">
          <label htmlFor={fieldId} className="text-link leading-normal tracking-normal text-flow-text">
            {brandingCopy.coloursLabel}
          </label>
          <input
            id={fieldId}
            value={text}
            maxLength={120}
            placeholder={brandingCopy.coloursPlaceholder}
            onChange={(e) => fromText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && colours.length) {
                e.preventDefault();
                onConfirm();
              }
            }}
            className="rounded-card border border-flow-line bg-ink-3 p-4 text-body leading-normal text-flow-text outline-none placeholder:text-flow-muted focus:border-brand-soft"
          />
        </div>
      )}

      {editing !== null && colours[editing] && (
        <ColourPicker
          key={editing}
          colour={colours[editing]}
          onChange={(hex) => setHex(editing, hex)}
          onClose={() => setEditing(null)}
        />
      )}

      {colours.length > 0 && <Swatches colours={colours} onEdit={setEditing} active={editing} />}

      <div className="flex flex-wrap gap-3">
        {colours.length > 0 && editing === null && (
          <PillButton onClick={() => setEditing(0)} className="md:min-w-[171px]">
            {brandingCopy.openPicker}
          </PillButton>
        )}
        {colours.length < MAX && (
          <PillButton onClick={add}>{brandingCopy.addColour}</PillButton>
        )}
        <PillButton variant="primary" onClick={onConfirm} disabled={colours.length === 0} className="md:min-w-[180px]">
          {brandingCopy.useColours}
        </PillButton>
      </div>
    </div>
  );
}
