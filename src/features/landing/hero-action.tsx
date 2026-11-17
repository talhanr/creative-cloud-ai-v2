"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { hasFinishedConcept, useConceptStore } from "@/features/concept/store";
import { returningCopy } from "@/lib/content/concept";
import { PromptBox } from "./prompt-box";

const subscribe = (cb: () => void) => useConceptStore.subscribe(cb);
const finished = () => hasFinishedConcept(useConceptStore.getState());

// Figma "Homepage / returning visitor" (59015:19397): browsers that already have a concept
// see an underlined link card instead of the prompt. Server / first visit: the prompt.
export function HeroAction() {
  const returning = useSyncExternalStore(subscribe, finished, () => false);
  if (!returning) {
    return (
      <div className="lg:mx-auto lg:w-[740px]">
        <PromptBox mode="rotate" />
      </div>
    );
  }
  return (
    <Link
      href="/concept"
      className="flex min-h-11 w-full items-center rounded-bubble border border-flow-line bg-ink-3 px-6 py-6 text-left text-body text-flow-text underline underline-offset-4 hover:border-brand-soft lg:text-lead"
    >
      {returningCopy.homeLink}
    </Link>
  );
}
