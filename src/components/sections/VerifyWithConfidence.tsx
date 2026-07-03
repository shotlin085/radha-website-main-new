"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerificationCard } from "@/components/ui/VerificationCard";
import { frameSrc, SEQUENCES } from "@/lib/sequences";

const SEQUENCE = SEQUENCES["02-scan-product-truth"];

// Chapter 3 of 8 — second half of the "quick proof" duo with chapter 2
// (tight top padding keeps them reading as one fast beat). Motion: card
// scale-in; the green success pulse itself lives inside VerificationCard
// so the same visual language is reusable anywhere that card appears
// (e.g. /platform).
//
// Folds in the old PersonalisedProductSafety section's allergen/recall
// messaging here rather than as a separate scroll beat — it's a natural
// elaboration of "verify," not a distinct story moment.
export function VerifyWithConfidence() {
  return (
    <section id="verify-confidence" aria-labelledby="verify-confidence-heading" className="bg-surface pt-10 pb-20 tablet:pb-28">
      <Container className="grid items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline">
            <Image
              src={frameSrc("02-scan-product-truth", 220)}
              alt="A verified product result shown on a phone screen"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
              style={{ objectPosition: `${SEQUENCE.focalX * 100}% 50%` }}
            />
          </div>
        </div>

        <div>
          <SectionHeading
            id="verify-confidence-heading"
            eyebrow="Verify With Confidence"
            title="Know the truth behind every product."
            description="EAN verification, product master data, and duplicate detection — plus allergen flags and recall alerts, so safety warmth never feels alarming."
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <VerificationCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
