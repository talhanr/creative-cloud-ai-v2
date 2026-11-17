// UK phone validation + normalisation to +44 (E.164).

/** Returns "+447700900123" style, or null when it isn't a plausible UK number. */
export function normaliseUkPhone(input: string): string | null {
  const raw = input.trim();
  if (!/^[+\d\s().-]+$/.test(raw)) return null;
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    if (!digits.startsWith("+44")) return null;
    digits = digits.slice(3);
  } else if (digits.startsWith("0044")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("44") && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  } else {
    return null;
  }
  digits = digits.replace(/^0/, ""); // "+44 (0)7700…"
  // UK national significant numbers are 9–10 digits and start 1, 2, 3, 5, 7, 8 or 9.
  if (!/^[1235789]\d{8,9}$/.test(digits)) return null;
  // Mobiles (07…) must be 10 digits after the leading 0.
  if (digits.startsWith("7") && digits.length !== 10) return null;
  return `+44${digits}`;
}
