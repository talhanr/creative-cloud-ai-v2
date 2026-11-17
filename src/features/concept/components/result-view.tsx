"use client";

import { useEffect, useState } from "react";
import { fill } from "@/lib/ai/fill";
import { previewCopy, returningCopy } from "@/lib/content/concept";
import { callbackWhen, type CallbackWhen } from "@/lib/uk-time";
import { BookedStage } from "../result/booked-stage";
import { BookingStage } from "../result/booking-stage";
import { BuiltStage } from "../result/built-stage";
import { PreviewStage } from "../result/preview-stage";
import { ResultHeader } from "../result/result-header";
import { SavedConcept } from "../result/saved-concept";
import { useConceptStore } from "../store";
import { LiveAnnouncer } from "./live-announcer";

// After generation: preview → "Get this built" / "Book a call" → confirmations.
// Returning visitors land on "Welcome back" with their original concept (never re-asked).
export function ResultView({ returning }: { returning: boolean }) {
  const { content, contact, stage, booking, setStage, markBuilt, setBooking } = useConceptStore();
  const [welcome, setWelcome] = useState(returning);
  const [when, setWhen] = useState<CallbackWhen>("today");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage, welcome]);

  if (!content) return null;
  const email = contact?.email ?? "";

  const go = (next: "preview" | "build" | "book") => {
    setWelcome(false);
    if (next === "build") {
      setWhen(callbackWhen());
      markBuilt();
    } else if (next === "book") setStage("booking");
    else setStage("preview");
  };
  const saved = <SavedConcept content={content} onOpen={() => go("preview")} />;

  let body: React.ReactNode;
  let announce = "";
  if (welcome) {
    announce = fill(returningCopy.welcomeBack, { name: content.businessName });
    body = (
      <>
        <p className="text-caption text-flow-subtle">{previewCopy.conceptLabel}</p>
        <h1 className="text-lead leading-normal font-medium text-flow-text md:text-[22px]">{announce}</h1>
        {saved}
      </>
    );
  } else if (stage === "built") {
    body = (
      <>
        <BuiltStage when={when} />
        {saved}
      </>
    );
  } else if (stage === "booking") {
    body = (
      <>
        <p className="text-caption text-flow-subtle">{previewCopy.conceptLabel}</p>
        <BookingStage name={content.businessName} email={email} onConfirm={setBooking} />
        {saved}
      </>
    );
  } else if (stage === "booked" && booking) {
    body = (
      <>
        <p className="text-caption text-flow-subtle">{previewCopy.conceptLabel}</p>
        <BookedStage booking={booking} email={email} />
        {saved}
      </>
    );
  } else {
    announce = previewCopy.revealed;
    body = <PreviewStage content={content} email={contact?.email ?? null} onBook={() => go("book")} />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-flow">
      <ResultHeader
        onBook={() => go("book")}
        onBuild={() => go("build")}
        active={stage === "booking" || stage === "booked" ? "book" : stage === "built" ? "build" : null}
      />
      <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-4 px-5 py-6 md:px-8 md:py-8">
        {body}
      </main>
      <LiveAnnouncer text={announce} />
    </div>
  );
}
