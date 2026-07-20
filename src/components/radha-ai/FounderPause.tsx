"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Lightbulb, ScanLine, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const FOUNDER_STEPS = [
  { icon: ScanLine, title: "The problem was lived", detail: "Years inside retail operations revealed where manual work, missing information, and preventable loss meet." },
  { icon: Lightbulb, title: "RADHA ISHA came first", detail: "The first answer is focused: give every store a clearer way to scan, verify, and act." },
  { icon: Sparkles, title: "The vision grew carefully", detail: "RADHA AI now carries that same discipline into human support and timeless learning." },
];

export function FounderPause() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 78%", "end 42%"] });
  const lineScale = useTransform(scrollYProgress, [0.08, 0.86], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? 0 : 24, prefersReducedMotion ? 0 : -24]);

  return (
    <section ref={sectionRef} aria-labelledby="founder-heading" className="relative overflow-hidden bg-[#11110f] py-24 text-white tablet:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(221,178,89,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(221,178,89,0.055)_1px,transparent_1px)] [background-size:64px_64px]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-16 desktop:grid-cols-[0.72fr_1.28fr] desktop:gap-24">
          <div>
            <p className="text-sm font-semibold text-[#ddb259]">The founder&apos;s perspective</p>
            <h2 id="founder-heading" className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.04] tablet:text-6xl">Built from a problem experienced firsthand.</h2>
            <p className="mt-7 max-w-md text-base leading-7 text-white/58">The company began on the retail floor, not in a trend report.</p>
          </div>

          <motion.div style={{ y: quoteY }} className="desktop:pt-10">
            <blockquote className="max-w-4xl text-balance text-3xl font-semibold leading-tight text-white tablet:text-5xl">
              &ldquo;Build the product you once needed, then earn the right to imagine what comes next.&rdquo;
            </blockquote>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62">RADHA AI exists to improve business operations, strengthen human connection, and make knowledge easier to explore through artificial intelligence people can trust.</p>
          </motion.div>
        </div>

        <div className="relative mt-20 tablet:mt-28">
          <span className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-white/12 desktop:left-5 desktop:right-5 desktop:top-5 desktop:h-px desktop:w-auto" aria-hidden="true" />
          <motion.span className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-[#ddb259] shadow-[0_0_12px_rgba(221,178,89,0.48)] desktop:right-5 desktop:h-px desktop:w-auto desktop:origin-left" style={prefersReducedMotion ? { scaleX: 1, scaleY: 1 } : { scaleX: lineScale, scaleY: lineScale }} aria-hidden="true" />
          <div className="grid gap-12 desktop:grid-cols-3 desktop:gap-16">
            {FOUNDER_STEPS.map(({ icon: StepIcon, title, detail }, index) => (
              <motion.article key={title} initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }} className="relative grid grid-cols-[2.5rem_1fr] gap-5 desktop:block">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#ddb259] text-[#171510]"><StepIcon size={17} strokeWidth={1.8} aria-hidden="true" /></span>
                <div className="desktop:mt-9">
                  <p className="font-mono text-[10px] text-[#ddb259]/70">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/58">{detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
