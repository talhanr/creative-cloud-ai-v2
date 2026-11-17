import { NextResponse } from "next/server";
import { getConceptAI } from "@/lib/ai";
import { isOffensive } from "@/lib/ai/moderation";
import type { SiteContent } from "@/lib/ai/types";
import { generateRequestSchema, type ApiResult } from "@/lib/validation/concept";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = generateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiResult<SiteContent>>({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const { answers, fail } = parsed.data;

  // Never generate around offensive content.
  const texts = [answers.name, answers.services, answers.location, answers.q1, answers.q2, answers.q3, answers.q4, answers.q5, answers.q6];
  if (texts.some((t) => t && isOffensive(t))) {
    return NextResponse.json<ApiResult<SiteContent>>({ ok: false, error: "Not allowed" }, { status: 422 });
  }

  try {
    if (fail && process.env.NODE_ENV !== "production") {
      // Dev toggle (`/concept?fail=1`): wait a little, then fail like a real outage.
      await new Promise((r) => setTimeout(r, 4000));
      throw new Error("Simulated generation failure");
    }
    const data = await getConceptAI().generate(answers);
    return NextResponse.json<ApiResult<SiteContent>>({ ok: true, data });
  } catch (err) {
    console.error("[concept/generate]", err);
    return NextResponse.json<ApiResult<SiteContent>>({ ok: false, error: "Generation failed" }, { status: 500 });
  }
}
