"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { paletteFrom } from "@/lib/ai/generate-content";
import { gettingStartedCopy, loadingCopy } from "@/lib/content/concept";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useGenerate } from "../api";
import { BrowserMock } from "../generation/browser-mock";
import { LINE_EVERY_MS, SLOW_AFTER_MS, statusLines, TICK_AFTER_MS } from "../generation/status-lines";
import { StatusList } from "../generation/status-list";
import { useConceptStore } from "../store";
import { ChatHeader } from "./chat-header";
import { LiveAnnouncer } from "./live-announcer";
import { PillLink } from "./pill-link";

// Figma Loading / building browser · over 20 seconds · generation failure · reduced motion
// (59015:20517 / 20567 / 20617 / 20653). Starts generation once, after a valid contact submit.
export function GeneratingView({ devFail }: { devFail: boolean }) {
  const { answers, stage, setStage, setContent, logo } = useConceptStore();
  const reduce = usePrefersReducedMotion();
  const generate = useGenerate();
  const startedAt = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const failed = stage === "failed";
  const lines = useMemo(() => statusLines(answers), [answers]);
  const name = answers.name ?? gettingStartedCopy.placeholderName;
  const palette = paletteFrom(answers.q7?.palette);

  useEffect(() => {
    if (startedAt.current !== null || failed) return;
    startedAt.current = Date.now();
    generate.mutate(
      { answers, fail: devFail },
      {
        onSuccess: (content) => {
          setFinished(true);
          // Brief pause so the last tick is seen, then the 0.5s reveal.
          setTimeout(() => setContent({ ...content, logoDataUrl: logo?.dataUrl ?? null }), 700);
        },
        onError: () => setStage("failed"),
      },
    );
  }, [answers, devFail, failed, generate, logo, setContent, setStage]);

  useEffect(() => {
    if (failed) return;
    const t = setInterval(() => setElapsed(Date.now() - (startedAt.current ?? Date.now())), 250);
    return () => clearInterval(t);
  }, [failed]);

  const visible = finished ? lines.length : Math.min(lines.length, Math.floor(elapsed / LINE_EVERY_MS) + 1);
  const slow = !finished && elapsed > SLOW_AFTER_MS;
  const shown = lines.slice(0, visible).map((text, i) => {
    const last = i === lines.length - 1;
    const done = finished || (!last && elapsed >= i * LINE_EVERY_MS + TICK_AFTER_MS);
    return { text: last && slow ? loadingCopy.slow : text, done };
  });
  const current = shown.at(-1)?.text ?? "";

  return (
    <div className="flex min-h-dvh flex-col bg-flow">
      <ChatHeader question={null} label={loadingCopy.title} />
      <main className="mx-auto flex w-full max-w-[1340px] flex-1 flex-col justify-center gap-6 px-5 py-5 md:flex-row md:items-center md:gap-16 md:px-[50px]">
        {!reduce && (
          <div className="w-full md:w-[640px] md:shrink-0">
            <BrowserMock
              name={name}
              primary={palette.primary}
              accent={palette.accent}
              elapsed={elapsed}
              muted={failed}
              animate={!reduce}
            />
          </div>
        )}
        <section aria-labelledby="gen-title" className="flex max-w-[600px] flex-col gap-5 md:gap-4">
          {failed ? (
            <>
              <h1 id="gen-title" className="text-h5 leading-tight font-semibold text-flow-text md:text-[36px]">
                {loadingCopy.failure.title}
              </h1>
              <p className="text-link leading-[1.6] tracking-normal text-flow-text md:text-[15px]">
                {loadingCopy.failure.body}
              </p>
              <p className="text-link leading-normal tracking-normal text-flow-subtle">{loadingCopy.failure.note}</p>
              <PillLink href="/" className="w-full md:w-auto md:self-start">
                {loadingCopy.failure.back}
              </PillLink>
            </>
          ) : (
            <>
              <h1 id="gen-title" className="text-h5 leading-tight font-semibold text-flow-text md:text-[36px]">
                {loadingCopy.subtitle}
              </h1>
              <StatusList lines={shown} />
            </>
          )}
        </section>
      </main>
      <LiveAnnouncer text={failed ? loadingCopy.failure.title : current} />
    </div>
  );
}
