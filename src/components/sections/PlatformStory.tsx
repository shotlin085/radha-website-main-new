"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const STORY_STEPS = [
  {
    title: "Scan the product in front of you",
    description: "Barcode, pack, or shelf check. RADHA starts with the thing your staff is already holding.",
    image: "/assets/radha/cinematic-v2/webp/02-scan-instantly.webp",
    alt: "A phone scanning an Indian retail product barcode on a store shelf.",
  },
  {
    title: "Verify what the shelf is really saying",
    description: "EAN, product master, expiry window, and duplicate risk stay connected to one verified result.",
    image: "/assets/radha/cinematic-v2/webp/03-verify-confidence.webp",
    alt: "RADHA verifying a product on a phone in front of retail shelves.",
  },
  {
    title: "Turn risk into staff action",
    description: "Expiry, GRN mismatch, and task follow-up move into the same operating rhythm.",
    image: "/assets/radha/cinematic-v2/webp/06-tasks-done.webp",
    alt: "A store owner assigning RADHA tasks while staff work in the aisle.",
  },
  {
    title: "Measure the health of the whole store",
    description: "Owners see the score, trend, and next action without opening a spreadsheet.",
    image: "/assets/radha/cinematic-v2/webp/07-store-health.webp",
    alt: "A RADHA store-health score glowing inside an Indian retail store.",
  },
];

export function PlatformStory() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [24, -24]);

  return (
    <section ref={ref} aria-labelledby="platform-story-heading" className="bg-surface-muted py-24 tablet:py-32">
      <Container>
        <div className="grid gap-10 desktop:grid-cols-[0.85fr_1.15fr] desktop:items-start">
          <div className="desktop:sticky desktop:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-700">
              Product Flow
            </p>
            <h2 id="platform-story-heading" className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-ink tablet:text-5xl">
              Every feature is part of one operating loop.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink-muted tablet:text-lg">
              RADHA is not a pile of modules. It is a chain from scan to verification to task to health score, built for the way Indian stores actually work.
            </p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-ink/8">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full origin-left rounded-full bg-brand-700"
              />
            </div>
          </div>

          <motion.div style={{ y }} className="grid gap-5">
            {STORY_STEPS.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.62, delay: prefersReducedMotion ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="grid overflow-hidden rounded-2xl border border-ink/8 bg-surface shadow-warm tablet:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="relative min-h-56 tablet:min-h-64">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 tablet:p-8">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-mono text-sm font-semibold text-brand-700">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink tablet:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted tablet:text-base">
                    {step.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    See the workflow
                    <Icon icon={ArrowRight} size={16} />
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
