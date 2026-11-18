"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useConceptStore } from "@/features/concept/store";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { heroPrompt } from "@/lib/content/concept";
import { cn } from "@/lib/utils";
import { PromptBorder } from "./prompt-border";
import { useTypewriter } from "./use-typewriter";

type Props = {
  /** "rotate" = typing examples (hero). "static" = fixed placeholder (Create with Royal). */
  mode?: "rotate" | "static";
  placeholder?: string;
  className?: string;
};

// Landing prompt. Desktop: Figma hero ChatInput (58698:4177). Mobile + focus/typed state:
// "Homepage / focused typed input — Mobile" (59016:23839).
export function PromptBox({ mode = "rotate", placeholder, className }: Props) {
  const router = useRouter();
  const setPendingPrompt = useConceptStore((s) => s.setPendingPrompt);
  const reduceMotion = usePrefersReducedMotion();
  const inputId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const rotating = mode === "rotate" && !reduceMotion;
  const example = useTypewriter({
    examples: heroPrompt.examples,
    typeMs: heroPrompt.typeMs,
    holdMs: heroPrompt.holdMs,
    deleteMs: heroPrompt.deleteMs,
    active: rotating && !focused && value.length === 0,
  });
  const fallback = placeholder ?? heroPrompt.staticPlaceholder;
  const showExample = !focused && value.length === 0;
  const hasText = value.trim().length > 0;

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const text = value.trim();
    if (!text) {
      textareaRef.current?.focus();
      return;
    }
    setPendingPrompt(text.slice(0, heroPrompt.maxLength));
    router.push("/concept");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "relative flex w-full items-center gap-2 rounded-bubble border-2 bg-ink-3 p-2 transition-colors",
        "lg:h-[7.75rem] lg:items-stretch lg:rounded-card lg:border-0 lg:bg-ink-2 lg:p-4",
        focused || hasText ? "border-brand-soft lg:ring-2 lg:ring-brand-soft" : "border-flow-line",
        className,
      )}
    >
      {/* Animated gradient outline (desktop idle only, as in Figma) */}
      {!focused && !hasText && <PromptBorder animate={!reduceMotion} />}

      <label htmlFor={inputId} className="sr-only">
        {heroPrompt.label}
      </label>
      <div className="relative min-w-0 flex-1 rounded-card border border-flow-line p-4 lg:border-0 lg:p-0 lg:pr-12">
        <textarea
          id={inputId}
          ref={textareaRef}
          value={value}
          maxLength={heroPrompt.maxLength}
          rows={2}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          className="block h-12 w-full resize-none bg-transparent text-base leading-6 text-flow-text outline-none lg:font-medium"
          aria-describedby={`${inputId}-hint`}
        />
        {showExample && (
          <p
            aria-hidden
            className="pointer-events-none absolute inset-4 text-base leading-6 text-gray-300 lg:inset-0 lg:font-medium"
          >
            {rotating ? example : fallback}
            {rotating && (
              <span className="ml-px inline-block h-5 w-px translate-y-1 animate-caret bg-gray-300" />
            )}
          </p>
        )}
        <span id={`${inputId}-hint`} className="sr-only">
          Press Enter to send. Maximum {heroPrompt.maxLength} characters.
        </span>
      </div>

      <button
        type="submit"
        aria-label={heroPrompt.submitLabel}
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-control",
          hasText ? "bg-brand-gradient" : "bg-send",
          "lg:absolute lg:right-2 lg:bottom-2 lg:size-11 lg:rounded-pill lg:bg-none",
        )}
      >
        <Image
          src="/brand/arrow-right.svg"
          alt=""
          width={24}
          height={24}
          className={cn("-scale-x-100 lg:hidden", hasText && "brightness-0 invert")}
        />
        <span className="hidden size-8 items-center justify-center rounded-pill bg-brand lg:flex">
          <Image src="/landing/icon1.svg" alt="" width={20} height={20} />
        </span>
      </button>
    </form>
  );
}
