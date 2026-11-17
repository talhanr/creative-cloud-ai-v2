import type { Metadata } from "next";
import { Suspense } from "react";
import { ConceptApp } from "@/features/concept/components/concept-app";

export const metadata: Metadata = {
  title: "Your website concept — Royal Creative",
  robots: { index: false },
};

export default function ConceptPage() {
  return (
    <Suspense fallback={<div className="h-dvh bg-flow" />}>
      <ConceptApp />
    </Suspense>
  );
}
