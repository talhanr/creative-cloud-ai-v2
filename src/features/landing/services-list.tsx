"use client";

import { useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { services } from "@/lib/content/landing";
import { ServiceRow } from "./service-row";

const isMouse = (e: PointerEvent) => e.pointerType === "mouse";

// Hover (mouse) or keyboard focus opens a row; tap/click on the title toggles it (touch).
export function ServicesList() {
  const [open, setOpen] = useState<number | null>(null);
  // Mouse clicks keep the hovered row open; touch/keyboard clicks toggle.
  const lastPointer = useRef<string>("");
  const toggle = (i: number) =>
    setOpen(lastPointer.current === "mouse" ? i : open === i ? null : i);
  // Only keyboard focus opens a row (mouse focus would fight the click toggle).
  const onFocus = (e: FocusEvent, i: number) => {
    if (e.target instanceof HTMLElement && e.target.matches(":focus-visible")) setOpen(i);
  };

  return (
    <ul
      className="flex flex-col"
      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
      onKeyDown={() => (lastPointer.current = "")}
      onPointerLeave={(e) => isMouse(e) && setOpen(null)}
    >
      {services.items.map((item, i) => (
        <li
          key={item.label}
          className="border-t border-b border-gray-4"
          onPointerEnter={(e) => isMouse(e) && setOpen(i)}
          onFocus={(e) => onFocus(e, i)}
        >
          <ServiceRow
            label={item.label}
            body={item.body}
            href={item.href}
            highlighted={"highlighted" in item && item.highlighted}
            image={services.image}
            linkLabel={services.linkLabel.replace("{service}", item.label)}
            open={open === i}
            panelId={`service-panel-${i}`}
            onToggle={() => toggle(i)}
          />
        </li>
      ))}
    </ul>
  );
}
