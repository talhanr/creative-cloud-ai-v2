"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactCopy } from "@/lib/content/concept";
import { contactSchema, type Contact, type ContactInput } from "@/lib/validation/lead";
import { useLead } from "../api";
import { useConceptStore } from "../store";
import { FormField } from "./form-field";

// Figma "Inline contact form" (contact-default 59015:20183 / contact-errors 59015:20325).
// Inline in chat, never a popup. Generation starts only after a valid submit.
export function ContactForm({ onSubmitted }: { onSubmitted: () => void }) {
  const lead = useLead();
  const setContact = useConceptStore((s) => s.setContact);
  const saved = useConceptStore((s) => s.contact);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<ContactInput, unknown, Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: saved ?? { name: "", email: "", phone: "", marketingOptIn: false },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = (data: Contact) => {
    const { answers } = useConceptStore.getState();
    lead.mutate(
      { ...data, answers },
      {
        onSuccess: () => {
          setContact(data);
          onSubmitted();
        },
      },
    );
  };

  const showSummary = isSubmitted && !isValid;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid)}
      aria-labelledby="contact-title"
      className="flex w-full flex-col gap-5 rounded-[20px] border border-flow-line bg-form p-5 md:p-7"
    >
      <div className="flex flex-col gap-2">
        <h2 id="contact-title" className="text-lead leading-normal font-semibold text-flow-text">
          {contactCopy.title}
        </h2>
        <p className="text-link leading-normal tracking-normal text-flow-subtle">{contactCopy.required}</p>
      </div>

      <FormField
        label={contactCopy.name.label}
        placeholder={contactCopy.name.placeholder}
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <div className="flex flex-col gap-5 md:flex-row md:gap-4">
        <FormField
          label={contactCopy.email.label}
          placeholder={contactCopy.email.placeholder}
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label={contactCopy.phone.label}
          placeholder={contactCopy.phone.placeholder}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-body leading-normal text-flow-subtle">
        <input
          type="checkbox"
          {...register("marketingOptIn")}
          className="size-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-flow-subtle bg-transparent checked:border-brand-soft checked:bg-brand-soft checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22><path%20d=%22M3.5%208.5l3%203%206-7%22%20fill=%22none%22%20stroke=%22%23111%22%20stroke-width=%222%22/></svg>')] checked:bg-center checked:bg-no-repeat"
        />
        {contactCopy.optIn}
      </label>

      <a
        href={contactCopy.privacyHref}
        className="self-start text-link leading-normal tracking-normal text-flow-subtle underline underline-offset-2 hover:text-flow-text"
      >
        {contactCopy.privacy}
      </a>

      {showSummary && (
        <p role="alert" className="text-link leading-normal tracking-normal text-danger">
          {contactCopy.summary}
        </p>
      )}
      {lead.isError && (
        <p role="alert" className="text-link leading-normal tracking-normal text-danger">
          {contactCopy.serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={lead.isPending}
        className="flex h-14 w-full items-center justify-center rounded-panel-lg border border-chip-line bg-chip text-body font-semibold text-flow-text transition-colors hover:border-brand-soft disabled:opacity-60"
      >
        {lead.isPending ? contactCopy.submitting : contactCopy.submit}
      </button>
    </form>
  );
}
