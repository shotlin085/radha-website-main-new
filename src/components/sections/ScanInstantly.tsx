"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScanResultCard } from "@/components/ui/ScanResultCard";
import { CinematicFrame } from "@/components/ui/CinematicFrame";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

// Chapter 2 of 8 — first of the "quick proof" duo (paired tightly with
// chapter 3, reduced vertical rhythm between them vs. the other chapter
// transitions). Motion: scan-beam sweep across the photo + the card
// sliding in from the right, with a snappy scale-bounce "pop" on the price
// value — the mockup's literal "haptic pop" annotation, simulated visually.
export function ScanInstantly() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="scan-instantly" aria-labelledby="scan-instantly-heading" className="bg-surface pt-20 pb-10 tablet:pt-28">
      <Container className="grid items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
        <div className="order-2 tablet:order-1">
          <SectionHeading
            id="scan-instantly-heading"
            eyebrow="Scan Instantly"
            title="Scan any product. Any barcode. Instantly."
            description="Offline first, lightning fast, works with any camera."
          />
        </div>

        <div className="order-1 tablet:order-2">
          <CinematicFrame
              src="/assets/radha/cinematic-v2/webp/02-scan-instantly.webp"
              alt="A hand holding a phone, scanning a product barcode"
              focalX={0.58}
              priority
              className="aspect-[4/5]"
              overlay={
                <>
            {!prefersReducedMotion ? (
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-brand-500/40 to-transparent"
                initial={{ top: "-20%" }}
                whileInView={{ top: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
              />
            ) : null}
            <motion.div
              initial={{ x: 32, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="absolute bottom-4 right-4 left-4 tablet:left-auto tablet:w-64"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.06, 1] }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
              >
                <ScanResultCard />
              </motion.div>
            </motion.div>
                </>
              }
          />
        </div>
      </Container>
    </section>
  );
}
