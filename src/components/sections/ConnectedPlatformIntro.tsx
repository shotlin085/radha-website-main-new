import { ScanLine, Store, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Ambient3DAccent } from "@/components/three/Ambient3DAccent";

const PILLARS = [
  {
    icon: ScanLine,
    title: "Scan",
    description: "One scan verifies the label, the source, and the safety record.",
  },
  {
    icon: Store,
    title: "Operate",
    description: "Retail teams see live inventory, compliance, and recall status.",
  },
  {
    icon: UserCheck,
    title: "Own",
    description: "Owners get personal insight without exposing personal data.",
  },
];

export function ConnectedPlatformIntro() {
  return (
    <section
      id="connected-platform"
      aria-labelledby="connected-platform-heading"
      className="relative overflow-hidden bg-surface py-24 tablet:py-32"
    >
      <Ambient3DAccent className="absolute -right-24 -top-24 h-[420px] w-[420px] desktop:h-[520px] desktop:w-[520px]" />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            id="connected-platform-heading"
            eyebrow="Connected Platform"
            title="Three roles, one shared source of truth"
            description="RADHA links what a product is, where it goes, and who owns it — so brands, retailers, and owners are never working from different versions of the truth."
          />
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid gap-6 tablet:grid-cols-3">
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="rounded-2xl border border-ink/8 bg-surface-muted p-8">
                <div className="mb-4 inline-flex rounded-full bg-brand-100 p-3 text-brand-700">
                  <Icon icon={pillar.icon} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{pillar.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
