"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GrnReceiptCard } from "@/components/ui/GrnReceiptCard";
import { CinematicFrame } from "@/components/ui/CinematicFrame";

// Chapter 5 of 8 — first half of the second "quick proof" duo (with
// chapter 6). Motion: card drop-in with a small spring bounce, synced to
// the "matched" check landing.
export function GrnMatched() {
  return (
    <section id="grn-matched" aria-labelledby="grn-matched-heading" className="bg-surface pt-20 pb-10 tablet:pt-28">
      <Container className="grid items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
        <div className="order-2 tablet:order-1">
          <SectionHeading
            id="grn-matched-heading"
            eyebrow="GRN Matched"
            title="Goods in. Matched right."
            description="Record goods received and match with invoice, automatically."
          />
        </div>

        <div className="order-1 flex tablet:order-2 tablet:justify-end">
          {/* pb reserves room in normal flow for the card's negative
              -bottom offset below — otherwise the absolutely-positioned
              card would overlap chapter 6 instead of just the photo. */}
          <div className="relative w-full max-w-sm pb-16 tablet:pb-20">
            <CinematicFrame
              src="/assets/radha/cinematic-v2/webp/05-grn-matched.webp"
              alt="A store worker checking a delivery box against a receipt"
              focalX={0.55}
              priority
              className="aspect-[4/5]"
            />
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
              className="absolute -bottom-8 left-1/2 w-[90%] -translate-x-1/2 tablet:-bottom-10"
            >
              <GrnReceiptCard />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
