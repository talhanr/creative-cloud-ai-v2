"use client";

import Image from "next/image";
import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { chatCopy } from "@/lib/content/concept";
import { MAX_MESSAGE } from "@/lib/validation/concept";
import { cn } from "@/lib/utils";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

// Figma "Chat input dock" (Q1 59015:19670): prompt box #141414 18px radius, inner field 16px radius,
// 48px send square (#32231c idle → brand gradient when typed), guidance row 12px #8d8987.
export function Composer({ onSend, disabled, placeholder = chatCopy.placeholder }: Props) {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const hasText = value.trim().length > 0;

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text.slice(0, MAX_MESSAGE));
    setValue("");
    ref.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <form onSubmit={send} className="flex w-full flex-col gap-2">
      <div
        className={cn(
          "flex items-center gap-2 rounded-bubble border bg-ink-3 p-2 transition-colors",
          focused || hasText ? "border-2 border-brand-soft p-[7px]" : "border-flow-line",
        )}
      >
        <label htmlFor={id} className="sr-only">
          {chatCopy.inputLabel}
        </label>
        <textarea
          id={id}
          ref={ref}
          value={value}
          rows={1}
          maxLength={MAX_MESSAGE}
          disabled={disabled}
          placeholder={placeholder}
          aria-describedby={`${id}-hint ${id}-count`}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="field-sizing-content max-h-40 min-h-14 min-w-0 flex-1 resize-none rounded-card border border-flow-line bg-ink-3 p-4 text-body leading-normal text-flow-text outline-none placeholder:text-flow-muted disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled || !hasText}
          aria-label={chatCopy.sendLabel}
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-control transition-colors",
            hasText ? "bg-brand-gradient" : "bg-send",
          )}
        >
          <Image
            src="/brand/arrow-right.svg"
            alt=""
            width={24}
            height={24}
            className={cn("-scale-x-100", hasText && "brightness-0 invert")}
          />
        </button>
      </div>
      <div className="flex justify-between text-caption text-flow-muted">
        <p id={`${id}-hint`}>{chatCopy.enterHint}</p>
        <p id={`${id}-count`}>
          <span className="sr-only">Characters used: </span>
          {value.length}/{MAX_MESSAGE}
        </p>
      </div>
    </form>
  );
}
