import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageCinematicHero } from "@/components/ui/PageCinematicHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the RADHA platform.",
});

const PROMISES = [
  { icon: FileCheck2, title: "Clear usage terms", body: "RADHA is built for retail audit, product verification, expiry, GRN, tasks, and reporting workflows." },
  { icon: ClipboardCheck, title: "Accuracy depends on source data", body: "Scan verification works best when registered product and supplier data stays current." },
  { icon: ShieldCheck, title: "Accountable operations", body: "Actions, roles, and audit activity are designed to remain traceable for store teams." },
];

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageCinematicHero
        eyebrow="Terms"
        title="A clear operating agreement for trusted retail workflows."
        description="RADHA helps store teams scan, verify, assign, and report with confidence. These terms describe the core expectations around use, accuracy, and account responsibilities."
        imageSrc="/assets/radha/cinematic-v2/webp/13-trust-privacy.webp"
        imageAlt="A secure RADHA retail operations scene with audit controls and Mor, the RADHA peacock mascot."
        primaryCta={{ href: "/contact", label: "Ask a terms question" }}
        proofPoints={["Retail audit use", "Verified workflows", "Traceable actions"]}
        priority
      />

      <section className="bg-surface py-24 tablet:py-32">
        <Container maxWidth="max-w-5xl">
          <StaggerGroup className="grid gap-4 tablet:grid-cols-3">
            {PROMISES.map((item) => (
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
              <h2 className="text-2xl font-bold tracking-tight text-ink">Terms of Service</h2>
              <p className="mt-2 text-sm text-ink-muted">Last updated: July 4, 2026</p>

              <div className="mt-10 grid gap-8 text-ink-muted tablet:grid-cols-2">
                <section>
                  <h3 className="text-lg font-semibold text-ink">Using the platform</h3>
                  <p className="mt-2 text-sm leading-6">
                    RADHA is provided for retail audit, product verification, expiry tracking, GRN, task management, and operational reporting.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-ink">Data accuracy</h3>
                  <p className="mt-2 text-sm leading-6">
                    RADHA verifies scan results against product and store data available to the platform. Account owners are responsible for keeping submitted business and catalog information accurate.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-ink">Changes to these terms</h3>
                  <p className="mt-2 text-sm leading-6">
                    Updates will be posted here and, where required, shared with account holders before changes take effect.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold text-ink">Contact</h3>
                  <p className="mt-2 text-sm leading-6">
                    Questions about these terms can be sent through our{" "}
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
