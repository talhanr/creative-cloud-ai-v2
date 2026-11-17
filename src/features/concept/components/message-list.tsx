"use client";

import { useState } from "react";
import { chatCopy } from "@/lib/content/concept";
import type { ChatMessage } from "../store";
import { MessageBubble } from "./message-bubble";
import { NoNameCard } from "./no-name-card";
import { RevealText } from "./reveal-text";

// Full history is kept; by default only the latest exchange (last visitor message onwards)
// is shown, with "↑ View earlier messages" to reveal the rest (Figma Q2+ frames).
export function MessageList({ messages }: { messages: ChatMessage[] }) {
  const [showAll, setShowAll] = useState(false);
  const lastUser = messages.findLastIndex((m) => m.from === "user");
  const cut = showAll || lastUser <= 0 ? 0 : lastUser;
  const visible = messages.slice(cut);

  return (
    <>
      {cut > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="-my-2 self-start py-2 text-caption leading-normal text-flow-muted hover:text-flow-text"
        >
          {chatCopy.earlier}
        </button>
      )}
      {visible.map((m) => (
        <div key={m.id} className="flex w-full flex-col gap-6 motion-safe:animate-rise-in">
          <MessageBubble from={m.from}>
            {m.from === "ai" ? <RevealText text={m.text} animate={Boolean(m.fresh)} /> : m.text}
          </MessageBubble>
          {m.attachment === "noNameCard" && <NoNameCard />}
        </div>
      ))}
    </>
  );
}
