import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead";
import { normaliseUkPhone } from "@/lib/validation/phone";
import type { ApiResult } from "@/lib/validation/concept";

type LeadResult = { received: true };

// Phase 1: validate + log only. Phase 3 adds storage, email, CRM and dedupe.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json<ApiResult<LeadResult>>({ ok: false, error }, { status: 400 });
  }
  const { name, email, phone, marketingOptIn, answers } = parsed.data;
  console.info("[concept/lead]", {
    name,
    email,
    phone: normaliseUkPhone(phone),
    marketingOptIn,
    business: answers.name ?? "(no name yet)",
    at: new Date().toISOString(),
  });
  return NextResponse.json<ApiResult<LeadResult>>({ ok: true, data: { received: true } });
}
