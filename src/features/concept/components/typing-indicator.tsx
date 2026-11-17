import { chatCopy } from "@/lib/content/concept";
import { AiAvatar } from "./ai-avatar";

// Figma "Chat / AI typing" 59015:20475: 80px AI bubble with "•••" (24px #b4b1af), pulsing 2s.
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2.5" role="status">
      <AiAvatar />
      <div className="flex w-20 items-center justify-center rounded-tl-bubble rounded-tr-bubble rounded-br-bubble rounded-bl-bubble-tail border border-flow-line bg-bubble-ai px-5 py-3.5">
        <span aria-hidden className="animate-typing text-h5 leading-normal text-flow-subtle">
          •••
        </span>
        <span className="sr-only">{chatCopy.typing}</span>
      </div>
    </div>
  );
}
