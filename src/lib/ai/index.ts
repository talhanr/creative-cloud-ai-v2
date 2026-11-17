import "server-only";
import { mockConceptAI } from "./mock";
import type { ConceptAI } from "./types";

/** The AI used by the API routes. Phase 2 swaps the real implementation in here only. */
export function getConceptAI(): ConceptAI {
  return mockConceptAI;
}
