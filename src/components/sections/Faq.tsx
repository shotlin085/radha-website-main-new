"use client";

import { useState, type SyntheticEvent } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const FAQS = [
  {
    question: "How does RADHA verify a product scan?",
    answer:
      "Each scan is matched against the manufacturer's registered label data, sourcing records, and any active safety or recall notices, returning a single verified result.",
  },
  {
    question: "Can retailers integrate RADHA with existing inventory systems?",
    answer:
      "Yes. The Retail Operations Engine exposes the same verified data your existing systems already expect, so integration doesn't require replacing your stack.",
  },
  {
    question: "What data does the owner dashboard actually store?",
    answer:
      "Only what the owner explicitly opts into — allergen preferences and scan history — encrypted at rest and never shared with brands or retailers without consent.",
  },
  {
    question: "How fast do recall notices reach affected owners?",
    answer:
      "Recall status propagates from the Retail Operations Engine to affected owner accounts as soon as it's published, targeted to the specific batch scanned.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(event.currentTarget.open);
  }

  return (
    <details
      onToggle={handleToggle}
      className="group rounded-2xl border border-ink/8 bg-surface-muted px-6 py-2 open:bg-surface"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium text-ink marker:content-none">
        {question}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-ink-muted"
        >
          <ChevronDown size={20} aria-hidden="true" />
        </motion.span>
      </summary>
      <p className="pb-4 text-sm text-ink-muted">{answer}</p>
    </details>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-surface py-24 tablet:py-32">
      <Container maxWidth="max-w-3xl">
        <ScrollReveal>
          <Image
            src="/assets/mor/search-think.webp"
            alt="Mor, the RADHA peacock, thinking with a magnifying glass"
            width={1254}
            height={1254}
            className="mx-auto mb-4 h-24 w-24 object-contain tablet:h-28 tablet:w-28"
          />
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Common questions" align="center" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
