import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  body: string;
  href: string;
  highlighted: boolean;
  image: { src: string; alt: string };
  linkLabel: string;
  open: boolean;
  panelId: string;
  onToggle: () => void;
};

// Collapsible height via grid-rows 0fr → 1fr (no JS measuring). Reduced motion: instant.
const collapse = (open: boolean) =>
  cn(
    "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
  );

// One service row (Figma "Services" hover state): title, then body + arrow + laptop image.
export function ServiceRow(p: Props) {
  return (
    // Desktop: image is absolute on the right so collapsed titles keep the full row width.
    <div className="relative flex flex-col gap-4 py-4 lg:py-6">
      {/* When open, leave room for the image (gap 1.5rem) so text never runs under it. */}
      <div className={cn("flex flex-col", p.open && "lg:pr-[calc(36%+1.5rem)] xl:pr-[31.5rem]")}>
        <h3 className="font-display text-display-m font-semibold md:text-[3rem] md:leading-[1.2] xl:text-[3.5rem]">
          {/* Colour kept out of the size classes: cn() treats custom text-* tokens as colours. */}
          <button
            type="button"
            aria-expanded={p.open}
            aria-controls={p.panelId}
            onClick={p.onToggle}
            className={cn(
              "cursor-pointer text-left",
              p.highlighted ? "text-brand-gradient" : "text-white",
            )}
          >
            {p.label}
          </button>
        </h3>
        <div id={p.panelId} className={collapse(p.open)} inert={!p.open}>
          <div className="overflow-hidden">
            <div className="flex flex-col gap-6 pt-4 lg:min-h-[17rem] lg:pt-6">
              <p className="max-w-[36rem] pl-1 text-[1.125rem] leading-[1.5] text-white md:text-[1.375rem] md:leading-[1.5]">
                {p.body}
              </p>
              <Link
                href={p.href}
                aria-label={p.linkLabel}
                className="mt-auto inline-flex size-11 items-center justify-center rounded-full text-white transition-transform hover:translate-x-1 motion-reduce:transition-none"
              >
                <ArrowRight aria-hidden className="size-9" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(collapse(p.open), "lg:absolute lg:top-6 lg:right-0 lg:w-[36%] xl:w-[30rem]")}
        inert={!p.open}
      >
        <div className="overflow-hidden">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            width={688}
            height={480}
            sizes="(min-width: 1024px) 688px, 100vw"
            className="aspect-[688/480] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
