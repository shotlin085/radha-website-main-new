"use client";

import Image from "next/image";
import { useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TextReveal } from "@/components/motion/TextReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { StoreHealthGauge } from "@/components/ui/StoreHealthGauge";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

const CHECKLIST = ["Reports & exports", "Team performance", "Better decisions"];

// Chapter 8 of 8 — the homepage's second bookend, mirroring chapter 1's
// pinned-scrub treatment so the story visually "closes the loop" (same
// engine, same register, different sequence). The floating dashboard
// preview reuses existing components (StoreHealthGauge + stat rows) rather
// than a fabricated laptop/phone screenshot asset.
export function TakeControlCta() {
  const rail = useProgressRail();

  useEffect(() => {
    rail?.markComplete(8);
  }, [rail]);

  return (
    <section
      id="take-control"
      aria-labelledby="take-control-heading"
      className="relative min-h-[42rem] overflow-hidden bg-surface-inverted py-24 text-white tablet:rounded-[2rem] tablet:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/assets/radha/cinematic-v2/webp/08-final-ecosystem.webp"
          alt=""
          fill
          quality={92}
          sizes="(max-width: 767px) 220vw, 100vw"
          loading="eager"
          className="object-cover"
          style={{ objectPosition: "66% 50%" }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,25,23,0.88)_0%,rgba(28,25,23,0.58)_34%,rgba(28,25,23,0.1)_80%)]"
      />
      <span
        aria-hidden="true"
        className="absolute right-6 top-10 z-10 font-mono text-xs uppercase tracking-[0.35em] text-white/80 tablet:right-10"
      >
        08 / 08
      </span>

      <Container className="relative z-10 flex flex-col items-start gap-10 desktop:flex-row desktop:items-end desktop:justify-between">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            Take control. Grow with RADHA.
          </p>
          <TextReveal
            as="h2"
            id="take-control-heading"
            className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white tablet:text-6xl"
          >
            Insights to action. Control to growth.
          </TextReveal>
          <ul className="mt-6 flex flex-col gap-2">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/85">
                <Icon icon={CircleCheck} size={16} className="text-white/70" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact">Start with RADHA</Button>
            <Button href="/contact" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
              Book a demo
            </Button>
            <Image
              src="/assets/mor/hero-win.webp"
              alt="Mor, the RADHA peacock, celebrating a win"
              width={1254}
              height={1254}
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>

        <TiltCard className="w-full max-w-xs flex-shrink-0 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink-muted">
            Sharma General Store
          </p>
          <div className="mt-4 flex items-center gap-4">
            <StoreHealthGauge score={82} size={72} />
            <dl className="flex flex-col gap-2">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.06em] text-ink-muted">Expiry at risk</dt>
                <dd className="font-mono text-lg font-semibold text-ink">12</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.06em] text-ink-muted">Today&apos;s sales</dt>
                <dd className="font-mono text-lg font-semibold text-ink">₹12,430</dd>
              </div>
            </dl>
          </div>
        </TiltCard>
      </Container>
    </section>
  );
}
