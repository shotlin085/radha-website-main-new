import type { Metadata } from "next";
import { Barcode, Eye, MapPinned, ShieldCheck, Store, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { PageCinematicHero } from "@/components/ui/PageCinematicHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Why RADHA exists and the principles behind the platform.",
});

const VALUES = [
  {
    icon: Target,
    title: "One source of truth",
    description:
      "Brands, retailers, and owners should never see conflicting versions of the same product.",
  },
  {
    icon: Eye,
    title: "Transparency by default",
    description: "If a scan can't be verified, the system says so instead of guessing.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy as architecture",
    description: "Owner data is encrypted and siloed from day one, not bolted on after launch.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageCinematicHero
        eyebrow="About RADHA"
        title="Product truth should not be this hard to find."
        description="RADHA exists for the everyday store owner who needs shelves, staff, expiry, GRN, and product verification to tell one clear story."
        imageSrc="/assets/radha/cinematic-v2/webp/12-about-mission.webp"
        imageAlt="The RADHA team and store owners reviewing verified product and audit data with Mor, the RADHA mascot."
        primaryCta={{ href: "/platform", label: "Explore the platform" }}
        secondaryCta={{ href: "/contact", label: "Talk to us" }}
        proofPoints={["Built for India", "Audit-first", "Owner-safe data"]}
        priority
      />

      <section className="bg-surface py-24 tablet:py-32">
        <Container className="grid gap-10 desktop:grid-cols-[0.85fr_1.15fr] desktop:items-center">
          <ScrollReveal>
            <SectionHeading
              id="mission-heading"
              eyebrow="Why It Matters"
              title="The shelf is where trust is either protected or lost."
              description="Indian stores move fast. Products arrive, expire, shift shelves, get scanned, get counted, and get delegated to staff. RADHA turns those daily moments into verified, trackable operations."
            />
          </ScrollReveal>

          <StaggerGroup className="grid gap-4 tablet:grid-cols-3">
            {[
              { icon: Store, value: "Daily", label: "store health signals" },
              { icon: Barcode, value: "Instant", label: "scan verification" },
              { icon: MapPinned, value: "Local", label: "Indian retail workflows" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="h-full rounded-2xl border border-ink/8 bg-surface-muted p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Icon icon={item.icon} size={20} />
                  </span>
                  <p className="mt-5 text-3xl font-bold tracking-tight text-ink">{item.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{item.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="bg-surface py-24 tablet:py-32">
        <Container>
          <ScrollReveal>
            <SectionHeading id="values-heading" eyebrow="What We Believe" title="Principles that shape every decision" />
          </ScrollReveal>

          <StaggerGroup className="mt-14 grid gap-6 tablet:grid-cols-3">
            {VALUES.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-2xl border border-ink/8 bg-surface-muted p-8 shadow-warm">
                  <div className="mb-4 inline-flex rounded-full bg-brand-100 p-3 text-brand-600">
                    <Icon icon={value.icon} size={24} />
                  </div>
                  <h2 className="text-lg font-semibold text-ink">{value.title}</h2>
                  <p className="mt-2 text-sm text-ink-muted">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-brand-700 py-20 text-surface">
        <Container className="grid gap-8 tablet:grid-cols-[1fr_auto] tablet:items-center">
          <ScrollReveal>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight tablet:text-3xl">
              Want to talk to the team behind RADHA?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Share the categories you sell, the audit problems you face, and the store flow you want to improve.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <Button href="/contact" variant="secondary" className="bg-surface text-brand-700 hover:bg-white">
              Get in touch
            </Button>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
