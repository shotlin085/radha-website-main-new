import type { Metadata } from "next";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
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
      <section className="bg-surface-muted pb-20 pt-36 tablet:pt-44">
        <Container maxWidth="max-w-3xl">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-600">
              About RADHA
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink tablet:text-6xl desktop:text-7xl">
              Product truth shouldn&rsquo;t be this hard to find
            </h1>
            <p className="mt-6 text-base text-ink-muted tablet:text-lg">
              RADHA started from a simple observation: the label, the retailer&rsquo;s
              system, and the owner&rsquo;s understanding of a product are almost
              always three different stories. We built one connected platform
              so they can finally be the same story.
            </p>
          </ScrollReveal>
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
                <div className="h-full rounded-2xl border border-ink/8 bg-surface-muted p-8">
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

      <section className="bg-brand-600 py-20 text-surface">
        <Container maxWidth="max-w-3xl" className="text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold tracking-tight tablet:text-3xl">
              Want to talk to the team behind RADHA?
            </h2>
            <div className="mt-6 flex justify-center">
              <Button href="/contact" variant="secondary" className="bg-surface text-brand-700 hover:bg-white">
                Get in touch
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
