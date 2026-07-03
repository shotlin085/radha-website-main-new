import { Tags, Languages, BadgeCheck, AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

// Placeholder feature cards — approved product UI screens for this section
// have not been delivered yet (see docs/ASSET_AUDIT.md).
const FEATURES = [
  {
    icon: Tags,
    title: "Ingredient parsing",
    description: "Every label is parsed into structured, searchable data — no manual entry.",
  },
  {
    icon: AlertTriangle,
    title: "Allergen detection",
    description: "Cross-referenced against known allergen databases at scan time.",
  },
  {
    icon: Languages,
    title: "Multi-language labels",
    description: "One product record, translated consistently across every market.",
  },
  {
    icon: BadgeCheck,
    title: "Certification tracking",
    description: "Organic, fair-trade, and safety certifications verified and kept current.",
  },
];

export function LabelIntelligence() {
  return (
    <section
      id="label-intelligence"
      aria-labelledby="label-intelligence-heading"
      className="bg-surface-muted py-24 tablet:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            id="label-intelligence-heading"
            eyebrow="Label Intelligence"
            title="What's on the label, made machine-readable"
            description="RADHA turns static labels into structured data brands and retailers can actually query."
          />
        </ScrollReveal>

        {/* Below tablet: horizontal snap-scroll carousel, not a stacked
            column — feels designed for a thumb, not shrunk from desktop. */}
        <StaggerGroup className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 tablet:grid tablet:grid-cols-2 tablet:gap-6 tablet:overflow-visible tablet:pb-0 desktop:grid-cols-4">
          {FEATURES.map((feature) => (
            <StaggerItem
              key={feature.title}
              className="w-[80%] flex-shrink-0 snap-center tablet:w-auto tablet:flex-shrink"
            >
              <Card className="h-full">
                <div className="mb-4 inline-flex rounded-full bg-brand-100 p-3 text-brand-700">
                  <AnimatedIcon>
                    <feature.icon size={22} aria-hidden="true" />
                  </AnimatedIcon>
                </div>
                <h3 className="text-base font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{feature.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
