"use client";

import { Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { fill } from "@/lib/ai/fill";
import { bookingCopy } from "@/lib/content/concept";
import { formatUkDate } from "@/lib/uk-time";
import { cn } from "@/lib/utils";
import type { Booking } from "../store";
import { Calendar } from "./calendar";
import { availableDays, SLOT_TIMES } from "./mock-slots";

type Props = { name: string; email: string; onConfirm: (b: Booking) => void };

const chip = (on: boolean) =>
  cn(
    "flex h-11 items-center justify-center rounded-panel-lg border px-4 text-link tracking-normal transition-colors md:h-9",
    on ? "border-brand-soft bg-selected text-flow-text" : "border-chip-line bg-chip text-flow-text hover:border-brand-soft",
  );

// Figma "Book a call / calendar and call type" (59015:21109). Mock availability only.
export function BookingStage({ name, email, onConfirm }: Props) {
  const available = useMemo(() => availableDays(), []);
  const [day, setDay] = useState<{ key: string; date: Date } | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [type, setType] = useState<Booking["type"]>("phone");

  const confirm = () => {
    if (!day || !time) return;
    onConfirm({ date: formatUkDate(day.date), time, type });
  };

  return (
    <section
      aria-labelledby="booking-title"
      className="flex flex-col gap-5 rounded-card border border-flow-line bg-ink-3 p-5 motion-safe:animate-fade-in md:p-6"
    >
      <div className="flex flex-col gap-2">
        <h1 id="booking-title" className="text-lead leading-normal font-semibold text-flow-text">
          {fill(bookingCopy.title, { name })}
        </h1>
        <p className="text-link leading-normal tracking-normal text-flow-subtle">{bookingCopy.body}</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:gap-6">
        <Calendar
          available={available}
          selected={day?.key ?? null}
          onSelect={(key, date) => {
            setDay({ key, date });
            setTime(null);
          }}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {day ? (
            <>
              <p className="text-body font-medium text-flow-text">{formatUkDate(day.date)}</p>
              <div role="group" aria-label="Times" className="flex flex-wrap gap-2">
                {SLOT_TIMES.map((t) => (
                  <button key={t} type="button" onClick={() => setTime(t)} aria-pressed={time === t} className={chip(time === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-link tracking-normal text-flow-subtle">{bookingCopy.pickDay}</p>
          )}

          <p id="call-type" className="text-link tracking-normal text-flow-subtle">
            {bookingCopy.callTypeLabel}
          </p>
          <div role="group" aria-labelledby="call-type" className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setType("phone")} aria-pressed={type === "phone"} className={chip(type === "phone")}>
              {bookingCopy.phone}
            </button>
            <button type="button" onClick={() => setType("video")} aria-pressed={type === "video"} className={chip(type === "video")}>
              {bookingCopy.video}
            </button>
          </div>
          <ul className="flex flex-col gap-2 text-link tracking-normal text-flow-subtle">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden />
              {bookingCopy.phoneInfo}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden />
              {fill(bookingCopy.videoInfo, { email })}
            </li>
          </ul>
          <button
            type="button"
            onClick={confirm}
            disabled={!day || !time}
            className="flex h-12 w-full items-center justify-center rounded-panel-lg border border-chip-line bg-chip text-link font-semibold tracking-normal text-flow-text hover:border-brand-soft disabled:opacity-50"
          >
            {type === "phone" ? bookingCopy.confirmPhone : bookingCopy.confirmVideo}
          </button>
        </div>
      </div>
    </section>
  );
}
