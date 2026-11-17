import Image from "next/image";

// Figma "AI avatar": 34px, #25100c, 12px radius, crown symbol 24px.
export function AiAvatar() {
  return (
    <span
      aria-hidden
      className="flex size-[34px] shrink-0 items-center justify-center rounded-control bg-avatar"
    >
      <Image src="/brand/symbol-small.svg" alt="" width={24} height={19} />
    </span>
  );
}
