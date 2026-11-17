import Image from "next/image";

// Figma Ellipse 448 (orange-red, left) + Ellipse 446 (amber, right), blurred, drifting on 18s loop.
// Positioned on the 1920 frame and centred so smaller screens crop evenly.
export function HeroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 h-full w-[1920px] -translate-x-1/2"
    >
      <div className="absolute top-[-144px] left-[-743px] h-[1427px] w-[1622px] animate-drift-a">
        <Image src="/landing/ellipse448.svg" alt="" width={1622} height={1427} priority />
      </div>
      <div className="absolute top-[-144px] left-[1081px] h-[1463px] w-[1544px] animate-drift-b">
        <Image src="/landing/ellipse446.svg" alt="" width={1544} height={1463} priority />
      </div>
    </div>
  );
}
