import { NextResponse } from "next/server";
import { getConceptAI } from "@/lib/ai";
import { runTurn } from "@/lib/ai/turn";
import { turnRequestSchema, type ApiResult, type TurnResult } from "@/lib/validation/concept";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = turnRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiResult<TurnResult>>({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  try {
    const data = await runTurn(parsed.data, getConceptAI());
    return NextResponse.json<ApiResult<TurnResult>>({ ok: true, data });
  } catch (err) {
    console.error("[concept/turn]", err);
    return NextResponse.json<ApiResult<TurnResult>>({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
