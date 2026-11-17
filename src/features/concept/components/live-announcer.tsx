// Polite live region for screen readers: announces new AI messages / loading updates.
export function LiveAnnouncer({ text }: { text: string }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {text}
    </div>
  );
}
