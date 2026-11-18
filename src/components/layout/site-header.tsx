import Image from "next/image";
import Link from "next/link";
import { headerCta, mainNav } from "@/lib/content/site";
import { MarketingMenu } from "./marketing-menu";
import { MobileMenu } from "./mobile-menu";

// Figma "Floating Nav Bar" 58787:5163 — pill bar, 80px tall, 1682 wide inside a 1920 frame.
export function SiteHeader({ current = "/" }: { current?: string }) {
  return (
    <header className="absolute inset-x-0 top-4 z-40 px-4 md:px-8 lg:top-[3.0625rem] xl:px-[7.4375rem]">
      <div className="mx-auto flex h-16 max-w-[105.125rem] items-center justify-between rounded-pill bg-ink-2 py-3 pr-3 pl-5 shadow-lift lg:h-20 lg:pr-6 lg:pl-8">
        <Link href="/" aria-label="Royal Creative home" className="shrink-0 rounded-pill">
          <Image
            src="/brand/logo.svg"
            alt="Royal Creative"
            width={159}
            height={48}
            priority
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {mainNav.map((item) =>
              item.label === "Marketing" ? (
                <li key={item.label}>
                  <MarketingMenu label={item.label} />
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={item.href === current ? "page" : undefined}
                    className="block rounded-pill px-4 py-2 text-body-lg leading-normal text-gray-300 transition-colors hover:text-white aria-[current=page]:bg-ink-1 aria-[current=page]:text-brand-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={headerCta.href}
            aria-label={headerCta.ariaLabel}
            className="hidden rounded-panel-lg bg-brand-gradient-v px-6 py-4 text-base leading-6 font-semibold text-white sm:inline-flex"
          >
            {headerCta.label}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
