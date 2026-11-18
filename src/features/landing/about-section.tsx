import Image from "next/image";
import Link from "next/link";
import { about } from "@/lib/content/landing";

// Figma "About Royal Creative — client reference" 59181:1034.
export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="mx-auto flex w-full max-w-[108rem] flex-col gap-10 px-4 md:px-8"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[47.5rem] lg:shrink-0">
          <p className="text-lead leading-[1.45] font-medium text-brand uppercase">
            {about.eyebrow}
          </p>
          <h2
            id="about-title"
            className="font-display text-[2.5rem] leading-[1.1] tracking-[-0.66px] text-white md:text-[3rem] xl:text-[3.25rem]"
          >
            {about.titleLines[0]}
            <br />
            {about.titleLines[1]}
          </h2>
          <p className="text-[1.125rem] leading-[1.45] text-gray-2 md:text-h5 md:leading-[1.45]">
            {about.body}
          </p>
          <Link
            href={about.link.href}
            className="self-start text-lead leading-[1.45] font-medium text-brand uppercase hover:underline"
          >
            {about.link.label}
          </Link>
        </div>
        <div className="relative aspect-[842/570] w-full overflow-hidden rounded-[1.25rem] lg:w-[44rem]">
          <Image
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(min-width: 1024px) 842px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {about.areas.map((a) => (
          <li key={a.n} className="flex flex-col gap-2">
            <span className="text-body leading-[1.45] text-gray-2">{a.n}</span>
            <h3 className="font-display text-h4 leading-[1.45] text-white">{a.title}</h3>
            <p className="text-lead leading-[1.45] text-gray-2">{a.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
