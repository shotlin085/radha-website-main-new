import type { Metadata } from "next";
import Link from "next/link";
import { Database, LockKeyhole, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageCinematicHero } from "@/components/ui/PageCinematicHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How RADHA collects, uses, and protects data.",
});

const PRINCIPLES = [
  { icon: LockKeyhole, title: "Encrypted by default", body: "Sensitive owner and store data is protected in transit and at rest." },
  { icon: Database, title: "Purpose-limited use", body: "Scan and audit data is used to operate RADHA, improve accuracy, and support the owner workflow." },
  { icon: ShieldCheck, title: "Controlled access", body: "Access is limited to systems and people required to serve the account." },
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageCinematicHero
        eyebrow="Privacy"
        title="Your store data deserves serious protection."
        description="RADHA is designed around operational trust: verified scans, accountable audit trails, and careful handling of owner and store information."
        imageSrc="/assets/radha/cinematic-v2/webp/13-trust-privacy.webp"
        imageAlt="A secure RADHA data workflow scene with a store owner, privacy controls, and Mor the RADHA peacock mascot."
        primaryCta={{ href: "/contact", label: "Ask a privacy question" }}
        proofPoints={["Encrypted data", "Role-aware access", "Audit-ready records"]}
        priority
      />

      <section className="bg-surface py-24 tablet:py-32">
        <Container maxWidth="max-w-5xl">
          <StaggerGroup className="grid gap-4 tablet:grid-cols-3">
            {PRINCIPLES.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-ink/8 bg-surface-muted p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <Icon icon={item.icon} size={20} />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <ScrollReveal>
            <article className="mt-14 rounded-[2rem] border border-ink/8 bg-surface-muted p-6 shadow-warm tablet:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-ink">Privacy Policy</h2>
              <p className="mt-2 text-sm text-ink-muted">Last updated: July 4, 2026</p>

              <div className="mt-10 grid gap-8 text-ink-muted tablet:grid-cols-2">
                <section>
                  <h3 className="text-lg font-semibold text-ink">Data we collect</h3>
                  <p className="mt-2 text-sm leading-6">
                    RADHA collects account details, store details, scan events, expiry records, GRN activity, staff task activity, and owner-provided preferences required to operate the platform.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-ink">How we use it</h3>
                  <p className="mt-2 text-sm leading-6">
                    Scan and audit data helps resolve product truth, detect operational risk, support reporting, and keep store teams aligned.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-ink">Data protection</h3>
                  <p className="mt-2 text-sm leading-6">
                    Data is protected with encryption, access controls, and operational logging. Access is limited to the systems required to serve the account.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-ink">Contact</h3>
                  <p className="mt-2 text-sm leading-6">
                    Questions about this policy can be sent through our{" "}
                    <Link href="/contact" className="text-brand-700 underline underline-offset-2">
                      contact page
                    </Link>
                    .
                  </p>
                </section>
              </div>
            </article>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
