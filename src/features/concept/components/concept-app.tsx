"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useChat } from "../hooks/use-chat";
import { hasFinishedConcept, useConceptStore } from "../store";
import { ChatView } from "./chat-view";
import { GeneratingView } from "./generating-view";
import { ResultView } from "./result-view";

const subscribeHydration = (cb: () => void) => useConceptStore.persist.onFinishHydration(cb);
const isHydrated = () => useConceptStore.persist.hasHydrated();

/** Waits for the persisted store so server and client render the same thing. */
function useHydrated() {
  return useSyncExternalStore(subscribeHydration, isHydrated, () => false);
}

// Whole AI flow on one route (/concept): chat → generating → preview → CTAs / booking.
export function ConceptApp() {
  const hydrated = useHydrated();
  const router = useRouter();
  const params = useSearchParams();
  const devFail = params.get("fail") === "1";
  const stage = useConceptStore((s) => s.stage);
  const { send } = useChat();
  const started = useRef(false);
  const [returning, setReturning] = useState<boolean | null>(null);

  // First load: returning visitor / start from the landing prompt / nothing to show → home.
  useEffect(() => {
    if (!hydrated || started.current) return;
    started.current = true;
    const s = useConceptStore.getState();
    const prompt = s.takePendingPrompt();
    const finished = hasFinishedConcept(s);
    queueMicrotask(() => setReturning(finished));
    if (finished) return; // never re-ask questions or regenerate
    if (prompt) {
      if (s.messages.length) s.reset();
      send(prompt);
      return;
    }
    if (s.messages.length === 0) router.replace("/");
  }, [hydrated, router, send]);

  if (!hydrated || returning === null) return <div className="h-dvh bg-flow" aria-busy="true" />;

  if (stage === "generating" || stage === "failed") return <GeneratingView devFail={devFail} />;
  if (stage === "chat") {
    return <ChatView onContactDone={() => useConceptStore.getState().setStage("generating")} />;
  }
  return <ResultView returning={returning} />;
}
