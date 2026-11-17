"use client";

import { useState } from "react";
import { bookingCopy } from "@/lib/content/concept";
import { cn } from "@/lib/utils";
import { dayKey, monthGrid } from "./mock-slots";

type Props = {
  available: Set<string>;
  selected: string | null;
  onSelect: (key: string, date: Date) => void;
};

// Figma book-a-call calendar: ‹ Month › nav, M–S row, 7-col grid; available dates bright,
// others muted; selected = #ff8658 border on #402518.
export function Calendar({ available, selected, onSelect }: Props) {
  const first = [...available][0];
  const start = first ? new Date(`${first}T12:00:00`) : new Date();
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });
  const cells = monthGrid(view.y, view.m);
  const title = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(view.y, view.m, 1));
  const shift = (n: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + n, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  return (
    <div className="flex w-full flex-col gap-3 md:w-[300px] md:shrink-0">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} aria-label={bookingCopy.prevMonthLabel} className="flex size-11 items-center justify-center rounded-full border border-chip-line text-flow-text md:size-8">
          {bookingCopy.prevMonth}
        </button>
        <p className="text-link tracking-normal text-flow-text" aria-live="polite">
          {title}
        </p>
        <button type="button" onClick={() => shift(1)} aria-label={bookingCopy.nextMonthLabel} className="flex size-11 items-center justify-center rounded-full border border-chip-line text-flow-text md:size-8">
          {bookingCopy.nextMonth}
        </button>
      </div>
      <div role="group" aria-label={title} className="grid grid-cols-7 gap-1.5 text-center">
        {bookingCopy.weekdays.map((w, i) => (
          <span key={i} aria-hidden className="text-[10px] text-flow-muted">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={i} aria-hidden className="aspect-square rounded-chip bg-white/[0.02]" />;
          const key = dayKey(d);
          const open = available.has(key);
          const isSel = selected === key;
          return (
            <button
              key={i}
              type="button"
              disabled={!open}
              onClick={() => onSelect(key, d)}
              aria-pressed={isSel}
              aria-label={new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(d) + (open ? "" : ", unavailable")}
              className={cn(
                "flex aspect-square min-h-9 items-center justify-center rounded-chip border text-[11px]",
                isSel ? "border-brand-soft bg-selected text-flow-text" : "border-transparent",
                !isSel && (open ? "text-flow-text hover:border-chip-line" : "text-flow-muted"),
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
