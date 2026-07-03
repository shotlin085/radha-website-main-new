"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PricingCard, type PricingTier } from "@/components/ui/PricingCard";
import { Badge } from "@/components/ui/Badge";

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    description: "For small stores getting started with audits.",
    monthlyPrice: 249,
    features: ["1 user", "Up to 1,000 scans/month", "Expiry & EAN verification", "Basic reports"],
  },
  {
    name: "Growth",
    description: "For growing stores that want more control.",
    monthlyPrice: 499,
    features: [
      "3 users",
      "Up to 5,000 scans/month",
      "All Starter features",
      "Tasks & staff management",
      "Advanced reports",
    ],
    highlighted: true,
  },
  {
    name: "Pro",
    description: "For large stores and advanced needs.",
    monthlyPrice: 999,
    features: ["10 users", "Up to 20,000 scans/month", "All Growth features", "Priority support", "Custom roles"],
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section aria-labelledby="pricing-heading" className="bg-surface py-24 tablet:py-32">
      <Container className="flex flex-col items-center text-center">
        <h1 id="pricing-heading" className="text-4xl font-extrabold tracking-tight text-ink tablet:text-6xl">
          Simple pricing. Built for every store.
        </h1>

        <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-muted p-1">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors ${
              !yearly ? "bg-surface-raised text-ink shadow-warm" : "text-ink-muted"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
              yearly ? "bg-surface-raised text-ink shadow-warm" : "text-ink-muted"
            }`}
          >
            Yearly
            <Badge tone="success">Save 20%</Badge>
          </button>
        </div>

        <div className="mt-14 grid w-full gap-6 tablet:grid-cols-3 tablet:items-center">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} yearly={yearly} />
          ))}
        </div>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-muted">
          <span>No credit card</span>
          <span>Cancel anytime</span>
          <span>7-day free trial</span>
        </p>
      </Container>
    </section>
  );
}
