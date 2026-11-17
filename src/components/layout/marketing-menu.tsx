"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { marketingNav } from "@/lib/content/site";

// Dropdown for "Marketing". Not designed in Figma — styled with landing tokens.
export function MarketingMenu({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-pill px-4 py-2 text-body-lg leading-normal text-gray-300 transition-colors hover:text-white"
      >
        {label}
        <Image
          src="/landing/arrow-arrow1-down-icon.svg"
          alt=""
          width={24}
          height={24}
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>
      {open && (
        <ul
          id={menuId}
          className="absolute top-full left-0 z-50 mt-2 min-w-60 rounded-card border border-white-10 bg-ink-2 p-2 shadow-lift"
        >
          {marketingNav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-chip px-4 py-2.5 text-body text-gray-300 hover:bg-ink-1 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
