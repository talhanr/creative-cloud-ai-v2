import Image from "next/image";
import Link from "next/link";
import { chatCopy } from "@/lib/content/concept";

type Props = {
  /** 1–7 once questions start; null during Getting started. */
  question: number | null;
  label?: string | null;
};

// Figma "Royal Creative header" in the flow: #010101, bottom border, crown symbol,
// 7 progress dots (#ff8658) under it, optional right label ("Getting started" / "One last step").
export function ChatHeader({ question, label }: Props) {
  return (
    <header className="shrink-0 border-b border-flow-line bg-ink px-5 py-[18px] md:px-16">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Royal Creative home" className="rounded-control">
          <Image src="/brand/symbol.svg" alt="" width={52} height={41} priority />
        </Link>
        {label && <p className="text-link leading-normal tracking-normal text-flow-text">{label}</p>}
      </div>
      {question !== null && (
        <p className="mt-4 text-caption leading-normal tracking-[0.1em] text-brand-soft">
          <span aria-hidden>{"●".repeat(question) + "○".repeat(7 - question)}</span>
          <span className="sr-only">{chatCopy.progress(question)}</span>
        </p>
      )}
    </header>
  );
}
