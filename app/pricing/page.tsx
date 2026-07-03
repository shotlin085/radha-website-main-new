import type { Metadata } from "next";
import { LayoutDashboard, ScanLine, Clock, ListChecks } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppDownloadBlock } from "@/components/ui/AppDownloadBlock";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { StoreHealthGauge } from "@/components/ui/StoreHealthGauge";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PricingSection } from "@/components/sections/PricingSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Simple pricing, built for every Indian retail store — from a single counter to a multi-store chain.",
});

const MOBILE_SCREENS = [
  { label: "Dashboard", caption: "Your store at a glance.", icon: LayoutDashboard },
  { label: "Scan & Verify", caption: "Scan. Verify. Done.", icon: ScanLine },
  { label: "Expiry at risk", caption: "Find and fix expiry.", icon: Clock },
  { label: "Tasks", caption: "Assign. Track. Done.", icon: ListChecks },
];

export default function PricingPage() {
  return (
    <main id="main-content" className="pt-20">
      <PricingSection />

      <section aria-labelledby="pocket-heading" className="bg-surface-muted py-24 tablet:py-32">
        <Container className="grid items-center gap-12 tablet:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              id="pocket-heading"
              eyebrow="RADHA In Your Pocket"
              title="Everything you need, always with you."
            />
            <div className="mt-8">
              <AppDownloadBlock />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center gap-4">
              <DeviceFrame variant="phone" className="w-40">
                <StoreHealthGauge score={82} size={80} />
                <p className="mt-2 text-center text-xs text-ink-muted">₹12,430 today</p>
              </DeviceFrame>
              <DeviceFrame variant="phone" className="mt-8 w-40">
                <p className="text-xs font-medium text-ink">Scan &amp; Verify</p>
                <div className="mt-2 h-16 rounded-lg bg-brand-50" />
              </DeviceFrame>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section aria-labelledby="responsive-heading" className="bg-surface py-24 tablet:py-32">
        <Container className="flex flex-col items-center text-center">
          <ScrollReveal>
            <SectionHeading
              id="responsive-heading"
              eyebrow="Responsive Across Devices"
              title="Designed for the modern store."
              align="center"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-14 flex flex-wrap items-end justify-center gap-8">
              <DeviceFrame variant="laptop" className="w-full max-w-lg">
                <div className="flex items-center gap-4">
                  <StoreHealthGauge score={82} size={64} />
                  <div className="grid flex-1 grid-cols-3 gap-2">
                    <div className="rounded-lg bg-surface-raised p-2 text-center">
                      <p className="font-mono text-sm font-semibold text-ink">₹12,430</p>
                      <p className="text-[10px] text-ink-muted">Sales</p>
                    </div>
                    <div className="rounded-lg bg-surface-raised p-2 text-center">
                      <p className="font-mono text-sm font-semibold text-ink">37</p>
                      <p className="text-[10px] text-ink-muted">Rooms</p>
                    </div>
                    <div className="rounded-lg bg-surface-raised p-2 text-center">
                      <p className="font-mono text-sm font-semibold text-ink">28</p>
                      <p className="text-[10px] text-ink-muted">Tasks</p>
                    </div>
                  </div>
                </div>
              </DeviceFrame>
              <DeviceFrame variant="phone" className="w-28">
                <p className="text-[10px] font-medium text-ink">Tasks</p>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="h-2 rounded bg-surface-raised" />
                  <div className="h-2 rounded bg-surface-raised" />
                  <div className="h-2 rounded bg-surface-raised" />
                </div>
              </DeviceFrame>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-16 w-full">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Mobile experience
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-6 tablet:grid-cols-4">
                {MOBILE_SCREENS.map((screen) => (
                  <div key={screen.label} className="flex flex-col items-center">
                    <DeviceFrame variant="phone" className="w-full">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon icon={screen.icon} size={18} />
                      </span>
                      <div className="mt-3 flex flex-col gap-1">
                        <div className="h-2 w-3/4 rounded bg-surface-raised" />
                        <div className="h-2 w-1/2 rounded bg-surface-raised" />
                      </div>
                    </DeviceFrame>
                    <p className="mt-3 text-sm font-medium text-ink">{screen.label}</p>
                    <p className="text-xs text-ink-muted">{screen.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
