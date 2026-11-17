import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

// Figma contact field: 14px label, 16px input (#141414, 16px radius, 16px padding),
// error = #ffa5a5 border + message under the field (aria-invalid + aria-describedby).
export const FormField = forwardRef<HTMLInputElement, Props>(function FormField(
  { label, error, className, ...input },
  ref,
) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-link leading-normal tracking-normal text-flow-text">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "w-full rounded-card border bg-ink-3 p-4 text-body leading-normal text-flow-text outline-none placeholder:text-flow-muted focus:border-brand-soft",
          error ? "border-danger" : "border-flow-line",
        )}
        {...input}
      />
      {error && (
        <p id={errorId} className="text-link leading-normal tracking-normal text-danger">
          {error}
        </p>
      )}
    </div>
  );
});
