import { z } from "zod";

// Shared (client + API) schemas for the concept flow.

export const MAX_MESSAGE = 300;

export const steps = [
  "name",
  "services",
  "location",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "contact",
  "generating",
  "preview",
] as const;
export const stepSchema = z.enum(steps);
export type Step = z.infer<typeof stepSchema>;

/** Steps the visitor answers by chat, in order. */
export const questionSteps = [
  "name",
  "services",
  "location",
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
] as const satisfies readonly Step[];
export type QuestionStep = (typeof questionSteps)[number];

export const gettingStartedSteps = ["name", "services", "location"] as const;

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

export const brandingSchema = z.object({
  mode: z.enum(["logo", "colours", "none"]),
  palette: z.array(hex).max(4).optional(),
  logoName: z.string().max(120).optional(),
});
export type Branding = z.infer<typeof brandingSchema>;

const answerText = z.string().trim().max(MAX_MESSAGE);

export const answersSchema = z.object({
  name: answerText.optional(),
  noName: z.boolean().optional(),
  /** What the business does (Getting started). */
  services: answerText.optional(),
  location: answerText.optional(),
  q1: answerText.optional(),
  q2: answerText.optional(),
  q3: answerText.optional(),
  /** Optional — `q4Skipped` set when the visitor taps Skip. */
  q4: answerText.optional(),
  q4Skipped: z.boolean().optional(),
  q5: answerText.optional(),
  q6: answerText.optional(),
  q7: brandingSchema.optional(),
  /** Steps closed after 2 failed clarifications ("we can go through that on a call"). */
  deferred: z.array(stepSchema).optional(),
});
export type Answers = z.infer<typeof answersSchema>;

export const turnRequestSchema = z.object({
  step: stepSchema,
  text: z.string().trim().min(1).max(MAX_MESSAGE),
  answers: answersSchema,
  /** Clarification attempts already used on this step. */
  attempt: z.number().int().min(0).max(5),
  /** Visitor messages sent so far (session limit). */
  messageCount: z.number().int().min(0).max(200),
});
export type TurnRequest = z.infer<typeof turnRequestSchema>;

export const turnResultSchema = z.object({
  answers: answersSchema,
  step: stepSchema,
  /** AI bubbles to show, in order. */
  messages: z.array(z.string()),
  /** Next clarification attempt count for `step` (0 when moving on). */
  attempt: z.number().int(),
  outcome: z.enum(["advanced", "clarify", "deferred", "offensive", "limit"]),
});
export type TurnResult = z.infer<typeof turnResultSchema>;

export const generateRequestSchema = z.object({
  answers: answersSchema,
  /** Dev-only failure toggle (`?fail=1`). Ignored in production. */
  fail: z.boolean().optional(),
});

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
