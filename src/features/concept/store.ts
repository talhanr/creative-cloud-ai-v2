"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SiteContent } from "@/lib/ai/types";
import type { Answers, Step, TurnResult } from "@/lib/validation/concept";

export type ChatMessage = {
  id: string;
  from: "ai" | "user";
  text: string;
  /** Extra UI rendered under an AI message. */
  attachment?: "noNameCard";
  /** True for messages added after load (animate in). */
  fresh?: boolean;
};

export type Contact = { name: string; email: string; phone: string; marketingOptIn: boolean };
export type Booking = { date: string; time: string; type: "phone" | "video" };
export type Logo = { dataUrl: string; name: string };

/** Logos above this size aren't saved in localStorage (it's ~5MB per site). */
const MAX_PERSISTED_LOGO = 1_500_000;

export type Stage =
  | "chat" // questions + contact form
  | "generating"
  | "failed"
  | "preview"
  | "built" // "Get this built" confirmation
  | "booking" // calendar
  | "booked";

type ConceptState = {
  pendingPrompt: string | null;
  stage: Stage;
  step: Step;
  answers: Answers;
  attempt: number;
  messageCount: number;
  messages: ChatMessage[];
  contact: Contact | null;
  content: SiteContent | null;
  /** ISO time the preview was first shown (returning visitor marker). */
  completedAt: string | null;
  builtAt: string | null;
  booking: Booking | null;
  /** Uploaded logo (client-side only, never sent to the server). */
  logo: Logo | null;

  setPendingPrompt: (text: string) => void;
  takePendingPrompt: () => string | null;
  addUserMessage: (text: string) => void;
  addAiMessage: (text: string) => void;
  setLogo: (logo: Logo | null) => void;
  applyTurn: (result: TurnResult) => void;
  setAnswers: (patch: Partial<Answers>) => void;
  setContact: (contact: Contact) => void;
  setStage: (stage: Stage) => void;
  setContent: (content: SiteContent) => void;
  markBuilt: () => void;
  setBooking: (booking: Booking) => void;
  settleMessages: () => void;
  reset: () => void;
};

const id = () => Math.random().toString(36).slice(2, 10);

const initial = {
  stage: "chat" as Stage,
  step: "name" as Step,
  answers: {} as Answers,
  attempt: 0,
  messageCount: 0,
  messages: [] as ChatMessage[],
  contact: null,
  content: null,
  completedAt: null,
  builtAt: null,
  booking: null,
  logo: null,
};

export const useConceptStore = create<ConceptState>()(
  persist(
    (set, get) => ({
      pendingPrompt: null,
      ...initial,

      setPendingPrompt: (text) => set({ pendingPrompt: text }),
      takePendingPrompt: () => {
        const text = get().pendingPrompt;
        set({ pendingPrompt: null });
        return text;
      },
      addUserMessage: (text) =>
        set((s) => ({
          messages: [...s.messages, { id: id(), from: "user", text }],
          messageCount: s.messageCount + 1,
        })),
      addAiMessage: (text) =>
        set((s) => ({ messages: [...s.messages, { id: id(), from: "ai", text, fresh: true }] })),
      setLogo: (logo) => set({ logo }),
      applyTurn: (r) =>
        set((s) => ({
          answers: r.answers,
          step: r.step,
          attempt: r.attempt,
          messages: [
            ...s.messages,
            ...r.messages.map((text, i) => ({
              id: id(),
              from: "ai" as const,
              text,
              fresh: true,
              attachment:
                r.answers.noName && !s.answers.noName && i === r.messages.length - 1
                  ? ("noNameCard" as const)
                  : undefined,
            })),
          ],
        })),
      setAnswers: (patch) => set((s) => ({ answers: { ...s.answers, ...patch } })),
      setContact: (contact) => set({ contact }),
      setStage: (stage) => set({ stage }),
      setContent: (content) =>
        set((s) => ({ content, stage: "preview", completedAt: s.completedAt ?? new Date().toISOString() })),
      markBuilt: () => set({ stage: "built", builtAt: new Date().toISOString() }),
      setBooking: (booking) => set({ booking, stage: "booked" }),
      settleMessages: () => set((s) => ({ messages: s.messages.map((m) => ({ ...m, fresh: false })) })),
      reset: () => set({ ...initial, pendingPrompt: null }),
    }),
    {
      name: "rc-concept",
      version: 2,
      partialize: (s) => ({
        ...s,
        messages: s.messages.map((m) => ({ ...m, fresh: false })),
        logo: s.logo && s.logo.dataUrl.length <= MAX_PERSISTED_LOGO ? s.logo : null,
      }),
      migrate: () => ({ pendingPrompt: null, ...initial }) as unknown as ConceptState,
    },
  ),
);

/** Has this browser already got a finished concept? (returning visitor) */
export const hasFinishedConcept = (s: Pick<ConceptState, "content" | "completedAt">) =>
  Boolean(s.content && s.completedAt);
