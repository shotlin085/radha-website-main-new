"use client";

import { useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PricingCard, type PricingTier } from "@/components/ui/PricingCard";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

type BillingMode = "daily" | "monthly" | "yearly";

const TIERS: PricingTier[] = [
  {
    name: "Starter",
    description: "For small stores getting started with audits.",
    monthlyPrice: 249,
    dailyPrice: 3,
    dailyDescription: "Scan, health and expiry.",
    features: ["1 user", "Up to 1,000 scans/month", "Expiry and EAN verification", "Basic reports"],
    dailyFeatures: ["Inventory management", "Unlimited scans"],
  },
  {
    name: "Growth",
    description: "For growing stores that want more control.",
    monthlyPrice: 499,
    dailyPrice: 5,
    dailyDescription: "Inventory and tasks.",
    features: [
      "3 users",
      "Up to 5,000 scans/month",
      "All Starter features",
      "Tasks and staff management",
      "Advanced reports",
    ],
    dailyFeatures: ["Everything in Starter", "GRN inward", "Advanced reports", "Bulk scan"],
    highlighted: true,
  },
  {
    name: "Premium",
    description: "For large stores and advanced needs.",
    monthlyPrice: 999,
    dailyPrice: 9,
    dailyDescription: "Weekly digest and priority support.",
    features: ["10 users", "Up to 20,000 scans/month", "All Growth features", "Priority support", "Custom roles"],
    dailyFeatures: ["Everything in Growth", "Weekly store digest", "All future features"],
  },
];

const BILLING_MODES: { mode: BillingMode; label: string; icon: typeof CalendarDays }[] = [
  { mode: "daily", label: "1-Day Passes", icon: Clock3 },
  { mode: "monthly", label: "Monthly", icon: CalendarDays },
  { mode: "yearly", label: "Yearly", icon: CalendarDays },
];

export function PricingSection() {
  const [billingMode, setBillingMode] = useState<BillingMode>("monthly");

  return (
    <section aria-labelledby="pricing-heading" className="bg-surface py-24 tablet:py-32">
      <Container className="flex flex-col items-center text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-700">
          Plans
        </p>
        <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-ink tablet:text-5xl">
          Choose the control level your store needs.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted tablet:text-lg">
          Start with scan, expiry, and EAN verification. Add staff tasks, advanced reporting, and custom roles as your operations mature.
        </p>

        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-2 rounded-[1.25rem] border border-hairline bg-surface-muted p-1 min-[560px]:grid-cols-3">
          {BILLING_MODES.map((item) => {
            const selected = billingMode === item.mode;
            return (
              <button
                key={item.mode}
                type="button"
                onClick={() => setBillingMode(item.mode)}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium transition-colors ${
                  selected ? "bg-brand-700 text-surface shadow-warm" : "text-ink-muted hover:bg-surface"
                }`}
              >
                <Icon icon={item.icon} size={16} />
                {item.label}
                {item.mode === "yearly" ? <Badge tone={selected ? "neutral" : "success"}>Save 20%</Badge> : null}
              </button>
            );
          })}
        </div>

        <div className="mt-14 grid w-full gap-6 tablet:grid-cols-3 tablet:items-center">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} billingMode={billingMode} />
          ))}
        </div>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-muted">
          {billingMode === "daily" ? (
            <>
              <span>One-time payment</span>
              <span>Valid for 24 hours</span>
              <span>GST included</span>
            </>
          ) : (
            <>
              <span>No credit card</span>
              <span>Cancel anytime</span>
              <span>7-day free trial</span>
            </>
          )}
        </p>
      </Container>
    </section>
  );
}
