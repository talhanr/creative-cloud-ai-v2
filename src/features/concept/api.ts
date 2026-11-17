"use client";

import { useMutation } from "@tanstack/react-query";
import type { SiteContent } from "@/lib/ai/types";
import type { LeadInput } from "@/lib/validation/lead";
import type { Answers, ApiResult, TurnRequest, TurnResult } from "@/lib/validation/concept";

async function post<T>(url: string, body: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  const json = (await res.json().catch(() => null)) as ApiResult<T> | null;
  if (!json) throw new Error("Network error");
  if (!json.ok) throw new Error(json.error);
  return json.data;
}

export function useTurn() {
  return useMutation({
    mutationFn: (req: TurnRequest) => post<TurnResult>("/api/concept/turn", req),
  });
}

export function useGenerate() {
  return useMutation({
    mutationFn: (req: { answers: Answers; fail?: boolean }) =>
      post<SiteContent>("/api/concept/generate", req),
  });
}

export function useLead() {
  return useMutation({
    mutationFn: (req: LeadInput) => post<{ received: true }>("/api/concept/lead", req),
  });
}
