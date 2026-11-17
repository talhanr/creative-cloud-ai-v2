// Visual QA helper: node scripts/shot.mjs <url> <out.png> [width] [height] [fullPage]
// Scrolls the page first so lazy images load.
import { chromium } from "@playwright/test";
const [url, out, w = "1440", h = "900", full = "1"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chromium" });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto(url, { waitUntil: "networkidle" });
if (full === "1") {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
}
await page.waitForTimeout(500);
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
