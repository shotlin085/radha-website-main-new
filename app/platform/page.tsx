import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bell,
  Boxes,
  ClipboardCheck,
  Clock,
  LineChart,
  ListChecks,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { PageCinematicHero } from "@/components/ui/PageCinematicHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { LabelIntelligence } from "@/components/sections/LabelIntelligence";
import { AudienceOverview } from "@/components/sections/AudienceOverview";
import { CapabilityMatrix } from "@/components/sections/CapabilityMatrix";
import { PlatformStory } from "@/components/sections/PlatformStory";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Features",
  description:
    "Everything you need to run a healthier store: Store Health, GRN, Expiry Intelligence, EAN Verification, Inventory, Tasks, Reports and more.",
});

const CAPABILITIES = [
  { id: "store-health", group: "Core", title: "Store Health", description: "Track your store score and improve every day.", icon: Activity },
  { id: "grn", group: "Operations", title: "GRN", description: "Record goods received and match with confidence.", icon: PackageCheck },
  { id: "expiry-intelligence", group: "Core", title: "Expiry Intelligence", description: "Find and fix expiry risks before they hurt.", icon: Clock },
  { id: "ean-verification", group: "Core", title: "EAN Verification", description: "Verify every product, instantly.", icon: ShieldCheck },
  { id: "inventory", group: "Operations", title: "Inventory", description: "Lightweight inventory, easy to trust.", icon: Boxes },
  { id: "tasks", group: "Operations", title: "Tasks", description: "Assign work and get things done.", icon: ListChecks },
  { id: "reports", group: "Visibility", title: "Reports", description: "See what matters, decide faster.", icon: LineChart },
  { id: "alerts", group: "Visibility", title: "Alerts", description: "Stay on top of risk, in real time.", icon: Bell },
  { id: "audit-ready", group: "Visibility", title: "Audit Ready", description: "Be inspection ready, every day.", icon: ClipboardCheck },
];

export default function PlatformPage() {
  return (
    <main id="main-content">
      <PageCinematicHero
        eyebrow="Features"
        title="Features that move a store from scan to control."
        description="RADHA connects product verification, expiry risk, GRN, inventory, staff tasks, alerts, reports, and store health into one operating loop."
        imageSrc="/assets/radha/cinematic-v2/webp/08-final-ecosystem.webp"
        imageAlt="RADHA dashboard, mobile screens, and Mor the peacock mascot inside an Indian retail store."
        primaryCta={{ href: "#capabilities-heading", label: "Explore features" }}
        secondaryCta={{ href: "/showcase", label: "Watch the story" }}
        proofPoints={["Scan", "Verify", "Act"]}
        priority
      />

      <PlatformStory />

      <section aria-labelledby="capabilities-heading" className="bg-surface py-24 tablet:py-32">
        <Container>
          <ScrollReveal>
            <SectionHeading
              id="capabilities-heading"
              eyebrow="Capability System"
              title="Nine capabilities, grouped around daily store control."
              description="Each feature is useful alone, but the value compounds when scan results, staff work, and owner reports stay connected."
            />
          </ScrollReveal>

          <StaggerGroup className="mt-14 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <StaggerItem key={capability.id}>
                <Link
                  href="/showcase"
                  id={capability.id}
                  className="group flex h-full min-h-56 flex-col justify-between rounded-2xl border border-ink/8 bg-surface-muted p-6 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                        <Icon icon={capability.icon} size={21} />
                      </span>
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
                        {capability.group}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-ink">{capability.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">{capability.description}</p>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
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
