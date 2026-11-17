import { z } from "zod";
import { contactCopy } from "@/lib/content/concept";
import { answersSchema } from "./concept";
import { isDisposableEmail } from "./disposable-domains";
import { normaliseUkPhone } from "./phone";

// Contact form (inline in chat). Shared by React Hook Form and /api/concept/lead.
export const contactSchema = z.object({
  name: z.string().trim().min(1, contactCopy.name.error).max(120, contactCopy.name.error),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, contactCopy.email.error)
    .pipe(z.email(contactCopy.email.error))
    .refine((v) => !isDisposableEmail(v), contactCopy.email.disposable),
  phone: z
    .string()
    .trim()
    .min(1, contactCopy.phone.error)
    .refine((v) => normaliseUkPhone(v) !== null, contactCopy.phone.error),
  marketingOptIn: z.boolean(),
});
export type ContactInput = z.input<typeof contactSchema>;
export type Contact = z.output<typeof contactSchema>;

export const leadSchema = contactSchema.extend({ answers: answersSchema });
export type LeadInput = z.input<typeof leadSchema>;
