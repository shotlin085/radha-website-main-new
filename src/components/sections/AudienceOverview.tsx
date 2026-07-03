import { Building2, Store, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const AUDIENCES = [
  {
    icon: Building2,
    title: "Brands",
    description: "Verify what's on the label matches what's in the product, everywhere it ships.",
  },
  {
    icon: Store,
    title: "Retailers",
    description: "Sync inventory, compliance, and recall status across every location in real time.",
  },
  {
    icon: ShoppingBag,
    title: "Owners & Shoppers",
    description: "Compare health signals, save products, and build shopping lists — all from one scan.",
  },
];

export function AudienceOverview() {
  return (
    <section
      id="audience-overview"
      aria-labelledby="audience-overview-heading"
      className="bg-surface-muted py-24 tablet:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            id="audience-overview-heading"
            eyebrow="Built For"
            title="Three audiences, one platform"
            align="center"
          />
        </ScrollReveal>

        <StaggerGroup className="mx-auto mt-14 flex max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto pb-4 tablet:grid tablet:grid-cols-3 tablet:gap-6 tablet:overflow-visible tablet:pb-0">
          {AUDIENCES.map((audience) => (
            <StaggerItem
              key={audience.title}
              className="w-[75%] flex-shrink-0 snap-center tablet:w-auto tablet:flex-shrink"
            >
              <Card className="h-full text-center">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-brand-100 p-3 text-brand-700">
                  <Icon icon={audience.icon} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-ink">{audience.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{audience.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
