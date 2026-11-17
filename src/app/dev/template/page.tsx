import { notFound } from "next/navigation";
import { demoAnswers } from "@/features/templates/demo-answers";
import { demoSiteContent } from "@/features/templates/demo-content";
import { ModernTemplate } from "@/features/templates/modern/modern-template";
import { buildSiteContent } from "@/lib/ai/generate-content";

// Dev-only visual QA page. 404 in production.
//   /dev/template              → Figma demo copy
//   /dev/template?source=mock  → mock generator output for the demo answers
export default async function DevTemplatePage({ searchParams }: PageProps<"/dev/template">) {
  if (process.env.NODE_ENV === "production") notFound();
  const { source } = await searchParams;
  const content = source === "mock" ? buildSiteContent(demoAnswers) : demoSiteContent;
  return <ModernTemplate content={content} />;
}
