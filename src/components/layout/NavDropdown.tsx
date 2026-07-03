"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

interface NavDropdownProps {
  label: string;
  panel: ReactNode;
  /** Wider mega-menu panels (Product) need more room than a simple link list. */
  panelClassName?: string;
}

// Hover-or-focus dropdown trigger shared by every top-level nav item that
// owns a panel (Product's full mega-menu, Resources/Company's simple link
// lists). One mechanism, three different panel bodies — see SiteHeader.
export function NavDropdown({ label, panel, panelClassName = "" }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") setOpen(false);
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        onClick={() => setOpen((current) => !current)}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <Icon icon={ChevronDown} size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-full left-1/2 z-40 mt-3 -translate-x-1/2 rounded-2xl border border-hairline bg-surface-raised p-6 shadow-warm ${panelClassName}`}
          >
            {panel}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
