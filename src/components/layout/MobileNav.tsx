"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { RadhaWordmark } from "@/components/ui/RadhaWordmark";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ open, onClose, links, triggerRef }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Primary navigation"
      className="fixed inset-0 z-50 flex flex-col bg-[#f7f7f5] desktop:hidden"
    >
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
        <RadhaWordmark />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => {
            onClose();
            triggerRef.current?.focus();
          }}
          aria-label="Close menu"
          className="rounded-full p-3 hover:bg-black/5"
        >
          <Icon icon={X} size={24} />
        </button>
      </div>
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-3 py-3.5 text-lg font-medium text-ink hover:bg-black/5"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-6 flex flex-col gap-2 border-t border-black/10 px-3 pt-6">
          <Button href="/#contact" variant="secondary" className="w-full" onClick={onClose}>
            Get early access
          </Button>
          <Button href="/#contact" className="w-full" onClick={onClose}>
            Join beta
          </Button>
        </div>
      </nav>
    </div>
  );
}
