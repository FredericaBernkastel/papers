"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import Link from "next/link";
import { useState } from "react";

import { Menu, navIcon, X } from "@/components/icons";
import { nav } from "@/content/site";

/**
 * Below `nav` the icon bar collapses into a sheet. Controlled rather than using
 * base-ui's `render` composition, so following a link can also close it.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-rule bg-plate px-3 py-2 font-mono text-[11px] leading-none font-medium tracking-[0.1em] text-ink-mid uppercase transition-colors hover:border-accent-soft hover:text-accent nav:hidden">
        <Menu size={15} aria-hidden="true" />
        Menu
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-[2px]" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(300px,86vw)] flex-col gap-1.5 border-l border-rule bg-paper p-4">
          <div className="mb-1.5 flex items-center justify-between border-b border-rule pb-3 font-mono text-[11px] leading-none tracking-[0.14em] text-ink-soft uppercase">
            <Dialog.Title>Sections</Dialog.Title>
            <Dialog.Close
              className="inline-flex cursor-pointer rounded-sm p-1.5 text-ink-mid transition-colors hover:bg-paper-2 hover:text-accent"
              aria-label="Close navigation"
            >
              <X size={16} aria-hidden="true" />
            </Dialog.Close>
          </div>

          {nav.map((item) => {
            const Icon = navIcon[item.icon];
            return (
              <Link
                key={item.label}
                href={{ pathname: item.pathname, hash: item.hash }}
                onClick={() => {
                  setOpen(false);
                }}
                className="flex items-center gap-3 rounded-sm px-2.5 py-3 font-mono text-[13px] leading-none tracking-[0.08em] text-ink-mid uppercase no-underline transition-colors hover:bg-paper-2 hover:text-accent [&>svg]:text-accent"
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
