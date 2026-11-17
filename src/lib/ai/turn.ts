import {
  clarifyCopy,
  gettingStartedCopy as gs,
  mainActions,
  reactions,
  skipLabel,
} from "@/lib/content/concept";
import type { Answers, QuestionStep, TurnRequest, TurnResult } from "@/lib/validation/concept";
import { isFiller, isOffensive, isUnclear } from "./moderation";
import { askFor } from "./mock";
import type { ConceptAI } from "./types";

const SESSION_LIMIT = 20; // handoff: ~20 messages, then contact form
const essentials = ["name", "services", "location"] as const;
const isEssential = (s: string): s is (typeof essentials)[number] =>
  (essentials as readonly string[]).includes(s);

const defer = (a: Answers, step: QuestionStep): Answers => ({
  ...a,
  deferred: [...new Set([...(a.deferred ?? []), step])],
});

/** One visitor message → updated answers + the AI bubbles to show next. */
export async function runTurn(req: TurnRequest, ai: ConceptAI): Promise<TurnResult> {
  const { text, step } = req;
  let answers: Answers = { ...req.answers };

  if (isOffensive(text)) {
    return { answers, step, attempt: req.attempt, messages: [clarifyCopy.offensive], outcome: "offensive" };
  }
  if (req.messageCount >= SESSION_LIMIT && step !== "q7") {
    return { answers, step: "contact", attempt: 0, messages: [clarifyCopy.sessionLimit], outcome: "limit" };
  }

  const messages: string[] = [];
  const wasBeforeQ1 = !answers.q1 && ai.nextStep(answers) !== null && isEssential(ai.nextStep(answers) ?? "");

  if (isEssential(step)) {
    if (step === "name" && text === gs.noNameOption) {
      answers = { ...answers, noName: true, name: undefined };
      messages.push(gs.noNameReply);
    } else {
      const found = isFiller(text) ? {} : await ai.extract(text, answers);
      // Nothing recognised → the whole message answers the question being asked.
      if (Object.keys(found).length === 0 && !isUnclear(text) && !isFiller(text) && text.length <= 80) {
        if (step === "name") found.name = text.trim();
        if (step === "services") found.services = text.trim();
        if (step === "location") found.location = text.trim();
      }
      if (Object.keys(found).length === 0) {
        const nextAttempt = req.attempt + 1;
        const ask = ai.clarify(step, req.attempt);
        if (ask) return { answers, step, attempt: nextAttempt, messages: [ask], outcome: "clarify" };
        answers = step === "name" ? { ...answers, noName: true } : defer(answers, step);
        messages.push(clarifyCopy.giveUp);
      } else {
        answers = { ...answers, ...found };
      }
    }
  } else if (step === "q4" && text === skipLabel) {
    answers = { ...answers, q4Skipped: true };
  } else if (step === "q5") {
    const opt = mainActions.find((m) => m.label === text || m.answer === text);
    answers = { ...answers, q5: opt?.answer ?? text };
  } else if (step === "q7") {
    // Branding is chosen in the UI and already in `answers.q7`; the text is the confirmation bubble.
    if (!answers.q7) answers = { ...answers, q7: { mode: "none" } };
  } else if (step !== "contact" && step !== "generating" && step !== "preview") {
    if (step !== "q4" && isUnclear(text)) {
      const ask = ai.clarify(step, req.attempt);
      if (ask) return { answers, step, attempt: req.attempt + 1, messages: [ask], outcome: "clarify" };
      answers = defer(answers, step);
      messages.push(clarifyCopy.giveUp);
    } else {
      answers = { ...answers, [step]: text.trim() };
    }
  }

  const next = ai.nextStep(answers);
  const deferredNow = messages.includes(clarifyCopy.giveUp);

  // Still collecting essentials.
  if (next && isEssential(next)) {
    messages.push(askFor(next, answers));
    return { answers, step: next, attempt: 0, messages, outcome: deferredNow ? "deferred" : "advanced" };
  }

  // Essentials just completed → intro + "{name}, … lovely!" + Q1.
  if (next === "q1" && wasBeforeQ1) {
    const reaction = await ai.react("name", answers);
    messages.push(gs.intro, `${reaction} ${askFor("q1", answers)}`);
    return { answers, step: "q1", attempt: 0, messages, outcome: "advanced" };
  }

  const reaction = deferredNow ? null : await ai.react(step as QuestionStep, answers);
  if (!next) {
    messages.push(reaction ?? reactions.q7);
    return { answers, step: "contact", attempt: 0, messages, outcome: deferredNow ? "deferred" : "advanced" };
  }
  const question = askFor(next, answers);
  messages.push(reaction ? `${reaction}\n\n${question}` : question);
  return { answers, step: next, attempt: 0, messages, outcome: deferredNow ? "deferred" : "advanced" };
}
