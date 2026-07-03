"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

// Page-level sticky CTA — appears once the visitor has scrolled past the
// hero chapter, not scoped to any single chapter's DOM subtree (that's why
// this lives outside the chapter components, rendered once in app/page.tsx).
export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 700;
    setVisible((current) => (current === next ? current : next));
  });

  return (
    <AnimatePresence>
      {visible ? (
        <>
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-20 z-30 hidden border-b border-hairline bg-surface-raised/95 backdrop-blur-sm desktop:block"
          >
            <div className="mx-auto flex max-w-[1600px] items-center justify-between px-12 py-3">
              <p className="text-sm font-medium text-ink">From shelf chaos to store control</p>
              <div className="flex items-center gap-3">
                <Button href="/contact" variant="secondary">
                  Book a demo
                </Button>
                <Button href="/contact">Start with RADHA</Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-surface-raised px-5 py-3 desktop:hidden"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          >
            <Button href="/contact" className="flex h-11 w-full items-center justify-center">
              Start with RADHA
            </Button>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
