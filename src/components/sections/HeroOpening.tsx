"use client";

import { motion } from "motion/react";
import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

const PARTICLES = [
  { left: "12%", top: "22%", size: 3, delay: 0 },
  { left: "78%", top: "18%", size: 2, delay: 0.6 },
  { left: "34%", top: "68%", size: 2.5, delay: 1.1 },
  { left: "88%", top: "58%", size: 2, delay: 0.3 },
  { left: "58%", top: "12%", size: 2, delay: 1.6 },
];

// Chapter 1 of 8 — one of the homepage's two "bookend" chapters that keep
// the pinned/scrubbed cinematic treatment (see the plan's rationale: the
// six middle chapters trade that for snappier card reveals, but open and
// close keep the dolly-through motion the engine already does well).
// Retimed to a single confident dolly through roughly half the sequence
// (endFrame) over a shorter scroll distance than /showcase's full traverse
// — punchier, not a slow indulgent intro.
export function HeroOpening() {
  const rail = useProgressRail();

  return (
    <ScrollSequenceCanvas
      sequenceId="01-radha-reveal"
      id="hero-opening"
      ariaLabelledBy="hero-opening-heading"
      onSectionComplete={() => rail?.markComplete(1)}
      chapter={1}
      totalChapters={8}
      endFrame={150}
      scrollDistance="+=120%"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-white/50"
            style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: -40 }}
            transition={{
              duration: 4.5,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            Retail audits, expiry and store health
          </p>
          <TextReveal
            as="h1"
            id="hero-opening-heading"
            className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white tablet:text-7xl desktop:text-8xl"
          >
            From shelf chaos to store control
          </TextReveal>
          <p className="mt-6 max-w-xl text-base text-white/80 tablet:text-lg">
            Built for Indian retail operations. Scan. Verify. Act.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact">Start with RADHA</Button>
            <Button href="/contact" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
              Book a demo
            </Button>
          </div>
        </motion.div>
      </Container>
    </ScrollSequenceCanvas>
  );
}
