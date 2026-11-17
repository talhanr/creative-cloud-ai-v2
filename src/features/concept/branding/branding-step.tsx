"use client";

import { useState } from "react";
import { fill } from "@/lib/ai/fill";
import { describeColours, type NamedColour } from "@/lib/colour";
import { brandingCopy } from "@/lib/content/concept";
import type { Branding } from "@/lib/validation/concept";
import { ChoiceChips } from "../components/choice-chips";
import { useConceptStore } from "../store";
import { ColoursCard } from "./colours-card";
import { DirectionCard } from "./direction-card";
import { LogoCard } from "./logo-card";

const DEFAULT_COLOURS: NamedColour[] = [
  { name: "Navy", hex: "#17324D" },
  { name: "Gold", hex: "#D8A84E" },
];

type Mode = Branding["mode"];

// Q7 branding: chooser → logo upload / colours / nothing yet → confirm → contact form.
export function BrandingStep({ onConfirm, disabled }: { onConfirm: (text: string) => void; disabled?: boolean }) {
  const { addUserMessage, addAiMessage, setAnswers, setLogo, logo, answers } = useConceptStore();
  const [mode, setMode] = useState<Mode | null>(null);
  const [colours, setColours] = useState<NamedColour[]>([]);
  const [editingLogoColours, setEditingLogoColours] = useState(false);

  const choose = (option: string) => {
    const picked = (Object.entries(brandingCopy.options).find(([, v]) => v === option)?.[0] ?? "none") as Mode;
    addUserMessage(option);
    if (picked === "logo") {
      addAiMessage(brandingCopy.logoReply);
    } else if (picked === "colours") {
      addAiMessage(brandingCopy.coloursAsk);
    } else {
      addAiMessage(brandingCopy.noneReply);
      setColours(DEFAULT_COLOURS);
    }
    setMode(picked);
  };

  const confirm = (finalMode: Mode, text: string) => {
    setAnswers({
      q7: {
        mode: finalMode,
        palette: colours.map((c) => c.hex),
        logoName: finalMode === "logo" ? logo?.name : undefined,
      },
    });
    onConfirm(text);
  };

  const confirmColours = (m: Mode) =>
    confirm(m, fill(brandingCopy.confirmed, { colours: describeColours(colours) }));

  if (!mode) {
    return (
      <ChoiceChips
        label={brandingCopy.options.logo}
        options={Object.values(brandingCopy.options)}
        onPick={choose}
        disabled={disabled}
        stretch
      />
    );
  }

  if (mode === "logo" && !editingLogoColours) {
    return (
      <LogoCard
        logo={logo}
        colours={colours}
        onUploaded={(l, picked) => {
          setLogo(l);
          setColours(picked);
          // No usable colours in the logo (e.g. black on white) → let them set colours.
          if (picked.length === 0) setEditingLogoColours(true);
        }}
        onConfirm={() => confirmColours("logo")}
        onChange={() => setEditingLogoColours(true)}
      />
    );
  }

  if (mode === "none") {
    return (
      <DirectionCard
        feeling={answers.q6}
        name={answers.name}
        colours={colours}
        onChange={() => setMode("colours")}
        onConfirm={() => confirm("none", brandingCopy.confirmedDirection)}
      />
    );
  }

  return (
    <ColoursCard
      colours={colours}
      onColours={setColours}
      onConfirm={() => confirmColours(mode)}
      startOpen={editingLogoColours}
      showField={!editingLogoColours}
    />
  );
}
