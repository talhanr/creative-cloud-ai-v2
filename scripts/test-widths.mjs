// QA: no horizontal overflow at in-between widths. node scripts/test-widths.mjs [baseUrl]
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3457";
const b = await chromium.launch({ channel: "chromium" });
for (const w of [390, 768, 1024, 1280, 1440, 1920]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(base + "/", { waitUntil: "networkidle" });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  await p.goto(base + "/dev/template", { waitUntil: "networkidle" });
  const tw = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log(`${w}px  landing scrollWidth=${sw} ${sw > w ? "OVERFLOW" : "ok"}  template=${tw} ${tw > w ? "OVERFLOW" : "ok"}`);
  await p.close();
}
await b.close();
