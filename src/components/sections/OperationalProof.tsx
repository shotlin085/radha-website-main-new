"use client";

import { Barcode, Boxes, ClipboardCheck, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const PROOF_POINTS = [
  {
    icon: Barcode,
    label: "Every scan becomes evidence",
    value: "EAN + pack truth",
  },
  {
    icon: ShieldCheck,
    label: "Every risk has an owner",
    value: "Expiry + safety",
  },
  {
    icon: Boxes,
    label: "Every delivery is matched",
    value: "GRN + stock",
  },
  {
    icon: ClipboardCheck,
    label: "Every task closes the loop",
    value: "Team + reports",
  },
];

export function OperationalProof() {
  return (
    <section
      aria-labelledby="operational-proof-heading"
      className="relative overflow-hidden bg-surface py-16 tablet:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-600/35 to-transparent"
      />
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand-700">
            Built for store operations
          </p>
          <h2
            id="operational-proof-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-ink tablet:text-5xl"
          >
            RADHA is not POS, ERP, or accounting. It is the operating layer that keeps shelves honest.
          </h2>
          <p className="mt-5 text-base leading-7 text-ink-muted tablet:text-lg">
            The website now needs to sell the same promise as the product: fast scanning,
            clear accountability, and practical control for Indian retail teams.
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
          className="mt-10 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4"
        >
          {PROOF_POINTS.map((point) => (
            <motion.div
              key={point.label}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="rounded-2xl border border-hairline bg-surface-raised p-5 shadow-warm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon icon={point.icon} size={19} />
              </span>
              <p className="mt-5 text-sm text-ink-muted">{point.label}</p>
              <p className="mt-2 text-lg font-semibold text-ink">{point.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
