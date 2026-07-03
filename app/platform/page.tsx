import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, PackageCheck, Clock, ShieldCheck, Boxes, ListChecks, LineChart, Bell, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { LabelIntelligence } from "@/components/sections/LabelIntelligence";
import { AudienceOverview } from "@/components/sections/AudienceOverview";
import { CapabilityMatrix } from "@/components/sections/CapabilityMatrix";
import { buildMetadata } from "@/lib/seo";
import { SEQUENCES } from "@/lib/sequences";

export const metadata: Metadata = buildMetadata({
  title: "Features",
  description:
    "Everything you need to run a healthier store — Store Health, GRN, Expiry Intelligence, EAN Verification, Inventory, Tasks, Reports and more.",
});

// Mirrors the header mega-menu's own Core/Operations/Visibility taxonomy
// (src/components/layout/NavPanels.tsx) — this page is where each of those
// links actually lands, with real detail instead of a one-line teaser.
const CAPABILITIES = [
  { id: "store-health", title: "Store Health", description: "Track your store score and improve every day.", icon: Activity },
  { id: "grn", title: "GRN", description: "Record goods received and match with confidence.", icon: PackageCheck },
  { id: "expiry-intelligence", title: "Expiry Intelligence", description: "Find and fix expiry risks before they hurt.", icon: Clock },
  { id: "ean-verification", title: "EAN Verification", description: "Verify every product, instantly.", icon: ShieldCheck },
  { id: "inventory", title: "Inventory", description: "Lightweight inventory, easy to trust.", icon: Boxes },
  { id: "tasks", title: "Tasks", description: "Assign work and get things done.", icon: ListChecks },
  { id: "reports", title: "Reports", description: "See what matters, decide faster.", icon: LineChart },
  { id: "alerts", title: "Alerts", description: "Stay on top of risk, in real time.", icon: Bell },
  { id: "audit-ready", title: "Audit Ready", description: "Be inspection ready, every day.", icon: ClipboardCheck },
];

export default function PlatformPage() {
  return (
    <main id="main-content">
      <section className="relative flex h-[70vh] min-h-[520px] items-end overflow-hidden bg-surface-inverted">
        <Image
          src={SEQUENCES["03-retail-operations"].posterFinal}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
        />
        <Container className="relative z-10 pb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            Everything You Need
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white tablet:text-6xl desktop:text-7xl">
            Everything you need to run a healthier store
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 tablet:text-lg">
            RADHA helps you audit smarter, reduce losses, and keep shelves
            perfect. The full storyboard lives on the homepage — this page is
            the reference.
          </p>
        </Container>
      </section>

      <section aria-labelledby="capabilities-heading" className="bg-surface py-24 tablet:py-32">
        <Container>
          <ScrollReveal>
            <SectionHeading
              id="capabilities-heading"
              eyebrow="Capabilities"
              title="Nine capabilities, one connected system"
            />
          </ScrollReveal>

          <StaggerGroup className="mt-14 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <StaggerItem key={capability.id}>
                <Link
                  href={`/showcase`}
                  id={capability.id}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-ink/8 bg-surface-muted p-8 transition-colors hover:bg-brand-50"
                >
                  <div>
                    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon icon={capability.icon} size={20} />
                    </span>
                    <h2 className="text-lg font-semibold text-ink">{capability.title}</h2>
                    <p className="mt-2 text-sm text-ink-muted">{capability.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    See it in motion
                    <Icon
                      icon={ArrowRight}
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <LabelIntelligence />
      <AudienceOverview />
      <CapabilityMatrix />
    </main>
  );
}
