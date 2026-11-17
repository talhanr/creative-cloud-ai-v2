"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { headerCta, mainNav, marketingNav } from "@/lib/content/site";

// Mobile header menu. No mobile landing header in Figma — clean full-height sheet in brand tokens.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const links = mainNav.filter((l) => l.label !== "Marketing");
  const close = () => setOpen(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-pill bg-ink-1 text-white lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col gap-8 overflow-y-auto bg-ink-3 p-6 transition-transform data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <div className="flex items-center justify-between">
            <DialogPrimitive.Title className="text-lead font-semibold text-white">
              Menu
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-pill bg-ink-1 text-white"
            >
              <X className="size-5" aria-hidden />
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-card px-4 py-3 text-lead text-white hover:bg-ink-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 px-4 text-caption tracking-wide text-gray-3 uppercase">Marketing</p>
            <ul className="mt-2 flex flex-col gap-1">
              {marketingNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-card px-4 py-3 text-body-lg text-gray-300 hover:bg-ink-2 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={headerCta.href}
            onClick={close}
            className="mt-auto flex min-h-11 items-center justify-center rounded-panel-lg bg-brand-gradient-v px-6 py-4 font-semibold text-white"
          >
            {headerCta.label}
          </Link>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
