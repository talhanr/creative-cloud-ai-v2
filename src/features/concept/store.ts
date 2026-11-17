"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Concept session state (persisted to localStorage). Extended in tasks 1.6–1.12.
type ConceptState = {
  /** Text typed in a landing prompt, consumed by /concept on first load. */
  pendingPrompt: string | null;
  setPendingPrompt: (text: string) => void;
  takePendingPrompt: () => string | null;
};

export const useConceptStore = create<ConceptState>()(
  persist(
    (set, get) => ({
      pendingPrompt: null,
      setPendingPrompt: (text) => set({ pendingPrompt: text }),
      takePendingPrompt: () => {
        const text = get().pendingPrompt;
        set({ pendingPrompt: null });
        return text;
      },
    }),
    { name: "rc-concept", version: 1 },
  ),
);
