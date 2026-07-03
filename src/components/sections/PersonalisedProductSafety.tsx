import { HeartPulse, ShieldAlert, Bell } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

// Placeholder feature list — approved product UI screens for this section
// have not been delivered yet (see docs/ASSET_AUDIT.md).
const SAFEGUARDS = [
  {
    icon: HeartPulse,
    title: "Personal profiles",
    description: "Owners set the allergens and sensitivities that matter to them, once.",
  },
  {
    icon: ShieldAlert,
    title: "Instant flags",
    description: "A scan against a personal profile flags risk before purchase, not after.",
  },
  {
    icon: Bell,
    title: "Recall alerts",
    description: "Recall and safety notices reach owners of the exact affected batch.",
  },
];

export function PersonalisedProductSafety() {
  return (
    <section
      id="personalised-safety"
      aria-labelledby="personalised-safety-heading"
      className="bg-surface py-24 tablet:py-32"
    >
      <Container className="grid gap-12 tablet:grid-cols-[1fr_1.2fr] tablet:items-center">
        <ScrollReveal>
          <SectionHeading
            id="personalised-safety-heading"
            eyebrow="Personalised Product Safety"
            title="Safety that knows the person, not just the product"
            description="The same label intelligence that powers retail compliance also protects the individual scanning it."
          />
        </ScrollReveal>

        <StaggerGroup className="grid gap-4">
          {SAFEGUARDS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex gap-4 rounded-2xl border border-ink/8 bg-surface-muted p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon icon={item.icon} size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
