"use client";

import { useEffect, useState } from "react";

type Options = {
  examples: readonly string[];
  typeMs: number;
  holdMs: number;
  deleteMs: number;
  /** When false the loop stops and the text clears (e.g. input focused or has a value). */
  active: boolean;
};

/** Types each example letter by letter, holds, deletes, then moves to the next one. */
export function useTypewriter({ examples, typeMs, holdMs, deleteMs, active }: Options) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (!active) return;
    const full = examples[index] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < full.length) {
        timer = setTimeout(() => setText(full.slice(0, text.length + 1)), typeMs);
      } else {
        timer = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), holdMs);
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(full.slice(0, text.length - 1)), deleteMs);
    } else {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % examples.length);
        setPhase("typing");
      }, deleteMs);
    }
    return () => clearTimeout(timer);
  }, [active, text, phase, index, examples, typeMs, holdMs, deleteMs]);

  // Stopping clears the example; resuming starts the current example from scratch.
  useEffect(() => {
    if (active) return;
    const t = setTimeout(() => {
      setText("");
      setPhase("typing");
    }, 0);
    return () => clearTimeout(t);
  }, [active]);

  return active ? text : "";
}
