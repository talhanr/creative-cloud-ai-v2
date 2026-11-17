// Europe/London business-time helpers (handoff "UK callback & booking logic").
// Bank holidays: not handled yet — ASK BILAL (Phase 3).

export type CallbackWhen = "today" | "tomorrow" | "monday";

function londonParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  return { weekday, hour };
}

/** Working day before 5pm → today; after 5pm Mon–Thu → tomorrow; Fri evening / weekend → Monday. */
export function callbackWhen(now = new Date()): CallbackWhen {
  const { weekday, hour } = londonParts(now);
  if (weekday === "Sat" || weekday === "Sun") return "monday";
  if (hour < 17) return "today";
  return weekday === "Fri" ? "monday" : "tomorrow";
}

/** "Monday 12 October 2026" (Figma format — no comma). */
export function formatUkDate(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(d);
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday")} ${get("day")} ${get("month")} ${get("year")}`;
}
