import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const CAPABILITIES = [
  { name: "Label intelligence & parsing", brands: true, retailers: true, owners: true },
  { name: "Real-time inventory sync", brands: false, retailers: true, owners: false },
  { name: "Personalised safety alerts", brands: false, retailers: false, owners: true },
  { name: "Recall & compliance tracking", brands: true, retailers: true, owners: true },
  { name: "Private owner dashboard", brands: false, retailers: false, owners: true },
  { name: "Business analytics & pulse", brands: true, retailers: true, owners: false },
];

function CapabilityCell({ included, columnLabel }: { included: boolean; columnLabel: string }) {
  return (
    <td className="px-4 py-4 text-center">
      {included ? (
        <span className="inline-flex items-center gap-1.5 text-brand-700">
          <AnimatedIcon>
            <Check size={18} aria-hidden="true" />
          </AnimatedIcon>
          <span className="sr-only">Included for {columnLabel}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-ink-muted">
          <Minus size={18} aria-hidden="true" />
          <span className="sr-only">Not included for {columnLabel}</span>
        </span>
      )}
    </td>
  );
}

export function CapabilityMatrix() {
  return (
    <section
      id="capability-matrix"
      aria-labelledby="capability-matrix-heading"
      className="bg-surface py-24 tablet:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            id="capability-matrix-heading"
            eyebrow="Capability Matrix"
            title="What each audience gets"
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-ink/8">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <caption className="sr-only">
                RADHA capabilities available to brands, retailers, and owners
              </caption>
              <thead>
                <tr className="border-b border-ink/8 bg-surface-muted">
                  <th scope="col" className="px-4 py-4 text-left font-semibold text-ink">
                    Capability
                  </th>
                  <th scope="col" className="px-4 py-4 text-center font-semibold text-ink">
                    Brands
                  </th>
                  <th scope="col" className="px-4 py-4 text-center font-semibold text-ink">
                    Retailers
                  </th>
                  <th scope="col" className="px-4 py-4 text-center font-semibold text-ink">
                    Owners
                  </th>
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((row) => (
                  <tr key={row.name} className="border-b border-ink/8 last:border-0">
                    <th scope="row" className="px-4 py-4 text-left font-normal text-ink">
                      {row.name}
                    </th>
                    <CapabilityCell included={row.brands} columnLabel="brands" />
                    <CapabilityCell included={row.retailers} columnLabel="retailers" />
                    <CapabilityCell included={row.owners} columnLabel="owners" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
