import { fill } from "@/lib/ai/fill";
import { bookingCopy } from "@/lib/content/concept";
import type { Booking } from "../store";

// Figma "Booking / phone confirmation" + "Booking / video confirmation" (59015:21282 / 21322).
export function BookedStage({ booking, email }: { booking: Booking; email: string }) {
  const copy = booking.type === "phone" ? bookingCopy.confirmedPhone : bookingCopy.confirmedVideo;
  return (
    <div role="status" className="flex flex-col gap-2 rounded-card bg-ink-3 p-5 motion-safe:animate-fade-in">
      <h1 className="text-lead leading-normal font-medium text-flow-text md:text-[22px]">{copy.title}</h1>
      <p className="text-link leading-normal tracking-normal text-flow-text">
        {fill(copy.when, { date: booking.date, time: booking.time })}
      </p>
      <p className="text-[10px] leading-normal text-flow-subtle">{copy.note}</p>
      <p className="text-link leading-normal tracking-normal text-flow-subtle">{fill(copy.body, { email })}</p>
    </div>
  );
}
