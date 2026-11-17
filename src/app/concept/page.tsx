import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your website concept — Royal Creative",
  robots: { index: false },
};

// Placeholder until task 1.7 builds the chat.
export default function ConceptPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-flow-bg text-flow-text">
      <p>Concept chat</p>
    </main>
  );
}
