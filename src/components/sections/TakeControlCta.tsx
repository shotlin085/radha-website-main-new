"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
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

  return (
    <ScrollSequenceCanvas
      sequenceId="05-complete-ecosystem"
      id="take-control"
      ariaLabelledBy="take-control-heading"
      onSectionComplete={() => rail?.markComplete(8)}
      chapter={8}
      totalChapters={8}
      endFrame={180}
      scrollDistance="+=120%"
    >
      <Container className="flex flex-col items-start gap-10 desktop:flex-row desktop:items-end desktop:justify-between">
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
    </ScrollSequenceCanvas>
  );
}
