// Colour helpers for Q7 branding (names ↔ hex, parsing "navy and gold", HSV for the picker).

export type NamedColour = { name: string; hex: string };

// Brand-friendly shades. Navy/gold match the Figma demo palette exactly.
const named: Record<string, string> = {
  navy: "#17324D", gold: "#D8A84E", black: "#111111", white: "#FFFFFF", grey: "#7A7A7A",
  gray: "#7A7A7A", charcoal: "#36393F", silver: "#BFC3C8", red: "#C8322F", burgundy: "#6E1E2E",
  maroon: "#6B1F1F", pink: "#E46A9B", coral: "#F2735B", orange: "#EE7A22", yellow: "#F2C230",
  mustard: "#D6A32C", cream: "#F3EDE2", beige: "#D9C7A7", brown: "#6B4A2F", tan: "#C19A6B",
  green: "#2E7D4F", olive: "#6B7A3A", sage: "#9CAF88", mint: "#9ED9C3", teal: "#1F7A7A",
  turquoise: "#2FB5B0", blue: "#2B5DAA", "sky blue": "#6CB4E4", "royal blue": "#2546A8",
  purple: "#6B3FA0", lilac: "#B9A2D8", lavender: "#C9B8E8", magenta: "#C2187A", copper: "#B8733B",
  bronze: "#8C6A3A", "forest green": "#22543D", "dark green": "#1E4D2B", "light blue": "#9CC8EC",
  "dark blue": "#16294D", peach: "#F6B99A", rose: "#D9778B", plum: "#5E2B4F", ivory: "#F8F4E8",
};

export const isHex = (v: string) => /^#[0-9a-f]{6}$/i.test(v);
const cap = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/** "navy and gold, #ff0000" → [{Navy,#17324D},{Gold,#D8A84E},{Red,#FF0000}] (max 4). */
export function parseColours(text: string): NamedColour[] {
  const out: NamedColour[] = [];
  const lower = text.toLowerCase();
  const keys = Object.keys(named).sort((a, b) => b.length - a.length);
  let rest = lower;
  for (const k of keys) {
    const re = new RegExp(`\\b${k}\\b`);
    const m = rest.match(re);
    if (m && m.index !== undefined) {
      out.push({ name: cap(k), hex: named[k], at: m.index } as NamedColour & { at: number });
      rest = rest.slice(0, m.index) + " ".repeat(k.length) + rest.slice(m.index + k.length);
    }
  }
  for (const m of text.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
    const hex = expandHex(m[0]);
    out.push({ name: nearestName(hex), hex, at: m.index ?? 0 } as NamedColour & { at: number });
  }
  return (out as (NamedColour & { at: number })[])
    .sort((a, b) => a.at - b.at)
    .map(({ name, hex }) => ({ name, hex: hex.toUpperCase() }))
    .filter((c, i, arr) => arr.findIndex((x) => x.hex === c.hex) === i)
    .slice(0, 4);
}

export function expandHex(v: string): string {
  const h = v.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  return `#${full.toUpperCase()}`;
}

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};

export function nearestName(hex: string): string {
  const [r, g, b] = rgb(hex);
  let best = "Colour";
  let bestD = Infinity;
  for (const [k, v] of Object.entries(named)) {
    const [r2, g2, b2] = rgb(v);
    const d = (r - r2) ** 2 * 0.3 + (g - g2) ** 2 * 0.59 + (b - b2) ** 2 * 0.11;
    if (d < bestD) {
      bestD = d;
      best = cap(k);
    }
  }
  return best;
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const [r, g, b] = rgb(hex).map((c) => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return `#${[r, g, b]
    .map((n) => Math.round((n + m) * 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

/** "Navy and Gold" for bubbles: "Yes, use navy and gold". */
export function describeColours(colours: NamedColour[]): string {
  const names = colours.map((c) => c.name.toLowerCase());
  return names.length <= 1 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}
