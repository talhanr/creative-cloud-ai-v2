import {
  clarifyCopy,
  gettingStartedCopy as gs,
  mainActions,
  questions,
  reactions,
} from "@/lib/content/concept";
import type { Answers, QuestionStep } from "@/lib/validation/concept";
import { extractEssentials } from "./extract";
import { fill, stripEnd } from "./fill";
import { buildSiteContent } from "./generate-content";
import type { ConceptAI, SiteContent } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const TYPING_MS = 1000; // handoff: AI typing ≈ 1s

const isDone = (step: QuestionStep, a: Answers): boolean => {
  if (a.deferred?.includes(step)) return true;
  switch (step) {
    case "name":
      return Boolean(a.name || a.noName);
    case "q4":
      return Boolean(a.q4 || a.q4Skipped);
    case "q7":
      return Boolean(a.q7);
    default:
      return Boolean(a[step]);
  }
};

const order: QuestionStep[] = ["name", "services", "location", "q1", "q2", "q3", "q4", "q5", "q6", "q7"];

export function findNextStep(answers: Answers): QuestionStep | null {
  return order.find((s) => !isDone(s, answers)) ?? null;
}

/** Text for the question at `step`, worded with what we already know. */
export function askFor(step: QuestionStep, a: Answers): string {
  if (step === "name") {
    if (!a.services) return gs.askNameNoContext;
    const where = a.location ? ` in ${a.location}` : "";
    return fill(`{Services}${where}, love it! What's your business called?`, { services: stripEnd(a.services) });
  }
  if (step === "services") {
    if (a.noName && !a.location) return gs.askServicesAndLocation;
    return a.name ? fill(gs.askServices, { name: a.name }) : gs.askServicesNoName;
  }
  if (step === "location") return gs.askLocation;
  return questions[step];
}

function actionFor(answer: string | undefined) {
  return mainActions.find((m) => m.answer === answer || m.label === answer);
}

export const mockConceptAI: ConceptAI = {
  async extract(text, answers) {
    return extractEssentials(text, answers);
  },

  nextStep: findNextStep,

  async react(step, a) {
    await sleep(TYPING_MS);
    const vars = { name: a.name ?? gs.placeholderName };
    switch (step) {
      case "q1":
        return fill(reactions.q1, vars);
      case "q2":
        return fill(reactions.q2, { answer: stripEnd(a.q2 ?? "") });
      case "q3":
        return fill(reactions.q3, { answer: stripEnd(a.q3 ?? "") });
      case "q4":
        return a.q4Skipped ? reactions.q4Skipped : reactions.q4;
      case "q5": {
        const act = actionFor(a.q5);
        return fill(reactions.q5, { action: act?.action ?? stripEnd(a.q5 ?? "").toLowerCase() });
      }
      case "q6":
        return fill(reactions.q6, { answer: stripEnd(a.q6 ?? "") });
      case "q7":
        return reactions.q7;
      default: {
        // Getting started complete → "{name}, {services} in {location}, lovely!"
        const where = a.location ? ` in ${a.location}` : "";
        const what = stripEnd(a.services ?? "");
        return a.name ? `${a.name}, ${what}${where}, lovely!` : fill(`{What}${where}, lovely!`, { what });
      }
    }
  },

  clarify(step, attempt) {
    if (attempt >= 2) return null;
    if (step === "name" || step === "services" || step === "location") return gs.unclear;
    return attempt === 0
      ? clarifyCopy.first
      : fill(clarifyCopy.second, { question: questions[step].split("?")[0].toLowerCase() + "?" });
  },

  async generate(answers): Promise<SiteContent> {
    // Handoff: normally 10–20s.
    await sleep(10_000 + Math.random() * 10_000);
    return buildSiteContent(answers);
  },
};
