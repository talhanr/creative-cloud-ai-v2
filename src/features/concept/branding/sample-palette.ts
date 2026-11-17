"use client";

import { nearestName, type NamedColour } from "@/lib/colour";

// Small canvas sampler: two most common distinct, non-white/non-black colours of an image.

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();

export async function samplePalette(dataUrl: string, max = 2): Promise<NamedColour[]> {
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  const buckets = new Map<string, { n: number; r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 128) continue;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum > 245 || lum < 8) continue; // skip background white / pure black
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
    const e = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    buckets.set(key, { n: e.n + 1, r: e.r + r, g: e.g + g, b: e.b + b });
  }

  const ranked = [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .map((e) => [Math.round(e.r / e.n), Math.round(e.g / e.n), Math.round(e.b / e.n)] as const);

  const picked: (readonly [number, number, number])[] = [];
  for (const c of ranked) {
    const distinct = picked.every(
      (p) => Math.abs(p[0] - c[0]) + Math.abs(p[1] - c[1]) + Math.abs(p[2] - c[2]) > 90,
    );
    if (distinct) picked.push(c);
    if (picked.length === max) break;
  }
  return picked.map(([r, g, b]) => {
    const hex = toHex(r, g, b);
    return { name: nearestName(hex), hex };
  });
}
