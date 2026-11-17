"use client";

import Image from "next/image";

export function BackToTop({ label }: { label: string }) {
  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-2.5">
      <span className="flex size-16 items-center justify-center rounded-panel-lg bg-warm-gradient shadow-glow">
        <Image src="/landing/arrow-up.svg" alt="" width={24} height={24} />
      </span>
      <span className="text-link leading-normal font-semibold tracking-normal text-white">
        {label}
      </span>
    </button>
  );
}
