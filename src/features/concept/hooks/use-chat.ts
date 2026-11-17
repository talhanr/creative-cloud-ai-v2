"use client";

import { useCallback, useRef } from "react";
import type { TurnRequest } from "@/lib/validation/concept";
import { useTurn } from "../api";
import { useConceptStore } from "../store";

/** Sends one visitor message (typed or tapped) through the mock AI and stores the reply. */
export function useChat() {
  const turn = useTurn();
  const lastRequest = useRef<TurnRequest | null>(null);
  const addUserMessage = useConceptStore((s) => s.addUserMessage);
  const applyTurn = useConceptStore((s) => s.applyTurn);

  const run = useCallback(
    (req: TurnRequest) => {
      lastRequest.current = req;
      turn.mutate(req, { onSuccess: (result) => applyTurn(result) });
    },
    [turn, applyTurn],
  );

  const send = useCallback(
    (text: string) => {
      if (turn.isPending) return;
      const { step, answers, attempt, messageCount } = useConceptStore.getState();
      addUserMessage(text);
      run({ step, text, answers, attempt, messageCount });
    },
    [turn.isPending, addUserMessage, run],
  );

  /** Resend the last message after an error (the visitor's bubble is already shown). */
  const retry = useCallback(() => {
    if (lastRequest.current) run(lastRequest.current);
  }, [run]);

  return { send, retry, pending: turn.isPending, failed: turn.isError };
}
