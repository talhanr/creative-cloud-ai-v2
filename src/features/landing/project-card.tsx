import Image from "next/image";
import type { projects } from "@/lib/content/landing";

type Project = (typeof projects.items)[number];

// Figma project card (58698:3978): 1682×775, #141414, 24px radius, 591px copy panel + image.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-panel bg-ink-3 lg:h-[36rem] lg:flex-row lg:items-stretch">
      <div className="flex flex-col justify-between gap-8 p-6 lg:w-[30rem] lg:shrink-0 lg:p-8">
        <div className="flex flex-col gap-6 lg:gap-10">
          <h3 className="text-[2rem] leading-normal tracking-[-1.5px] text-white lg:text-h2 lg:leading-normal">
            {project.name}
          </h3>
          <p className="text-body leading-normal text-white lg:max-w-[26rem]">{project.body}</p>
        </div>
        <ul className="flex flex-wrap gap-3 lg:flex-col lg:items-start lg:gap-4">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="flex h-[1.875rem] items-center gap-3 rounded-pill border border-white-10 bg-white-10 px-4 py-1"
            >
              <span aria-hidden className="size-[0.4375rem] rounded-pill bg-chardon opacity-[0.077]" />
              <span className="text-link text-white-80">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative aspect-[4/3] min-w-0 flex-1 overflow-hidden lg:aspect-auto">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 1091px, 100vw"
          className="object-cover"
        />
        {"screen" in project && project.screen && (
          <div className="absolute top-[6%] left-[19.4%] h-[56%] w-[61.2%]">
            <Image
              src={project.screen.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 668px, 60vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </article>
  );
}
