import type { Metadata } from "next";
import { CalendarCheck, MessageSquareText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { PageCinematicHero } from "@/components/ui/PageCinematicHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Request a RADHA demo or get in touch with the team.",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageCinematicHero
        eyebrow="Request a demo"
        title="See RADHA inside your store before you commit."
        description="Bring a handful of SKUs, expiry questions, or GRN pain points. We will walk through the exact flow your owner, manager, and staff would use."
        imageSrc="/assets/radha/cinematic-v2/webp/10-contact-demo.webp"
        imageAlt="A store owner and RADHA advisor reviewing a live demo beside Mor, the RADHA peacock mascot."
        primaryCta={{ href: "#demo-form", label: "Book a walkthrough" }}
        secondaryCta={{ href: "/showcase", label: "Watch the story" }}
        proofPoints={["Real store scenarios", "No credit card", "Built for Indian retail"]}
        priority
      />

      <section id="demo-form" aria-labelledby="demo-form-heading" className="bg-surface py-24 tablet:py-32">
        <Container className="grid gap-10 desktop:grid-cols-[0.9fr_1.1fr] desktop:items-start">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-700">
              What happens next
            </p>
            <h2 id="demo-form-heading" className="text-3xl font-bold tracking-tight text-ink tablet:text-5xl">
              A practical walkthrough, not a sales monologue.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted tablet:text-lg">
              We map RADHA to your current audit process, show where expiry and EAN checks become faster, and leave you with a clear rollout path.
            </p>

            <StaggerGroup className="mt-10 grid gap-4">
              {[
                {
                  icon: MessageSquareText,
                  title: "Tell us your current flow",
                  body: "Counter, back room, shelf audit, GRN, or multi-store owner dashboard.",
                },
                {
                  icon: ShieldCheck,
                  title: "Verify real examples",
                  body: "Use products from your category so the demo feels like your store.",
                },
                {
                  icon: CalendarCheck,
                  title: "Leave with a rollout plan",
                  body: "Users, scan volume, staff tasks, and the right plan for your stage.",
                },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex gap-4 rounded-2xl border border-ink/8 bg-surface-muted p-5">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon icon={item.icon} size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-muted">{item.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-[2rem] border border-ink/8 bg-surface-muted p-5 shadow-float tablet:p-8">
              <ContactForm />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
