// Phase 1 fake availability: weekdays from tomorrow for 4 weeks, three slots a day
// (Figma demo times). Phase 3 replaces this with the real calendar API.

export const SLOT_TIMES = ["09:30", "10:30", "14:00"] as const;
const DAYS_AHEAD = 28;

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function availableDays(today = new Date()): Set<string> {
  const out = new Set<string>();
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  for (let i = 1; i <= DAYS_AHEAD; i++) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) out.add(dayKey(d));
  }
  return out;
}

/** Month grid starting Monday; null = blank cell. */
export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  // Noon, so converting to Europe/London never shifts the day.
  for (let i = 1; i <= days; i++) cells.push(new Date(year, month, i, 12));
  while (cells.length % 7) cells.push(null);
  return cells;
}
