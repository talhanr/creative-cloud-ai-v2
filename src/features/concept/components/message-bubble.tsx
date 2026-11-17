import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AiAvatar } from "./ai-avatar";

type Props = {
  from: "ai" | "user";
  children: ReactNode;
  /** Extra content under the bubble text (options, forms…). */
  className?: string;
};

// Figma bubbles (Q1 59015:19641): AI #141414 650px, tail bottom-left; customer #24211f 570px,
// right-aligned, tail bottom-right. 20px padding, 16px/1.6 text #f8f6f3, 1px white/13% border.
export function MessageBubble({ from, children, className }: Props) {
  if (from === "user") {
    return (
      <div className="flex w-full justify-end">
        <div
          className={cn(
            "max-w-[min(570px,88%)] rounded-tl-bubble rounded-tr-bubble rounded-br-bubble-tail rounded-bl-bubble border border-flow-line bg-bubble-user p-4 text-body break-words text-flow-text md:p-5",
            className,
          )}
        >
          <span className="sr-only">You said: </span>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full items-center gap-2.5">
      <AiAvatar />
      <div
        className={cn(
          "max-w-[min(650px,calc(100%-44px))] rounded-tl-bubble rounded-tr-bubble rounded-br-bubble rounded-bl-bubble-tail border border-flow-line bg-bubble-ai p-4 text-body break-words text-flow-text md:p-5",
          className,
        )}
      >
        <span className="sr-only">Royal Creative AI: </span>
        {children}
      </div>
    </div>
  );
}
