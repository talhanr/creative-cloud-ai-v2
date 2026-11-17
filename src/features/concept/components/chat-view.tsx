"use client";

import { useEffect, useRef } from "react";
import { brandingCopy, chatCopy, gettingStartedCopy as gs, mainActions, skipLabel } from "@/lib/content/concept";
import { BrandingStep } from "../branding/branding-step";
import { useChat } from "../hooks/use-chat";
import { useConceptStore } from "../store";
import { ChatHeader } from "./chat-header";
import { ChoiceButton, ChoiceChips } from "./choice-chips";
import { Composer } from "./composer";
import { ContactForm } from "./contact-form";
import { LiveAnnouncer } from "./live-announcer";
import { MessageList } from "./message-list";
import { TypingIndicator } from "./typing-indicator";

const questionNumber = (step: string) => (/^q[1-7]$/.test(step) ? Number(step[1]) : step === "contact" ? 7 : null);

// The questionnaire: Getting started → Q1–Q7 → contact form (Figma 59015:19427 … 59015:20325).
export function ChatView({ onContactDone }: { onContactDone: () => void }) {
  const { messages, step, answers } = useConceptStore();
  const { send, retry, pending, failed } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" });
  }, [messages.length, pending, step]);

  const isGettingStarted = step === "name" || step === "services" || step === "location";
  const lastAi = [...messages].reverse().find((m) => m.from === "ai");
  const showNoName = step === "name" && !answers.noName && Boolean(lastAi) && !pending;
  const canAct = !pending && !failed;
  // Figma: no input dock on the Q7 sub-steps (logo / colours / direction) or the contact form.
  const brandingReplies: string[] = [brandingCopy.logoReply, brandingCopy.coloursAsk, brandingCopy.noneReply];
  const inBrandingSubStep = step === "q7" && brandingReplies.includes(lastAi?.text ?? "");
  const showComposer = step !== "contact" && !inBrandingSubStep;

  return (
    <div className="flex h-dvh flex-col bg-flow">
      <ChatHeader
        question={isGettingStarted ? null : questionNumber(step)}
        label={isGettingStarted ? chatCopy.gettingStarted : step === "contact" ? chatCopy.oneLastStep : null}
      />

      <main className="flex-1 overflow-y-auto" aria-label="Conversation">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-6 px-5 pt-7 pb-8 md:px-5 md:pt-11">
          <MessageList messages={messages} />

          {pending && <TypingIndicator />}

          {failed && (
            <div role="alert" className="flex flex-wrap items-center gap-3 text-link tracking-normal text-danger">
              {chatCopy.turnError}
              <ChoiceButton label={chatCopy.retry} onClick={retry} />
            </div>
          )}

          {canAct && showNoName && (
            <ChoiceChips label={gs.noNameOption} options={[gs.noNameOption]} onPick={send} stretch />
          )}
          {canAct && step === "q5" && (
            <ChoiceChips label={chatCopy.q5Options} options={mainActions.map((m) => m.label)} onPick={send} />
          )}
          {canAct && step === "q7" && <BrandingStep onConfirm={send} />}
          {canAct && step === "contact" && <ContactForm onSubmitted={onContactDone} />}

          <div ref={endRef} />
        </div>
      </main>

      {showComposer && (
        <div className="shrink-0 border-t border-flow-line px-5 pt-4 pb-[max(16px,env(safe-area-inset-bottom))] md:py-6">
          <div className="mx-auto w-full max-w-[820px]">
            <Composer
              onSend={send}
              disabled={pending}
              extra={step === "q4" && canAct ? <ChoiceButton label={skipLabel} onClick={() => send(skipLabel)} /> : undefined}
            />
          </div>
        </div>
      )}

      <LiveAnnouncer text={pending ? chatCopy.typing : (lastAi?.text ?? "")} />
    </div>
  );
}
