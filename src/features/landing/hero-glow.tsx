import Image from "next/image";

// Figma Ellipse 448 (orange-red, left) + Ellipse 446 (amber, right), blurred, drifting on 18s loop.
// Positioned on the 1920 frame and centred so smaller screens crop evenly.
export function HeroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 h-full w-[120rem] -translate-x-1/2"
    >
      <div className="absolute top-[-9rem] left-[-46.4375rem] h-[89.1875rem] w-[101.375rem] animate-drift-a">
        <Image src="/landing/ellipse448.svg" alt="" width={1622} height={1427} priority />
      </div>
      <div className="absolute top-[-9rem] left-[67.5625rem] h-[91.4375rem] w-[96.5rem] animate-drift-b">
        <Image src="/landing/ellipse446.svg" alt="" width={1544} height={1463} priority />
      </div>
    </div>
  );
}
