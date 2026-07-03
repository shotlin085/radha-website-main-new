import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Request a RADHA demo or get in touch with the team.",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="bg-surface-muted py-24 pt-36 tablet:pt-44 tablet:pb-32">
        <Container maxWidth="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-600">
            Contact
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-ink tablet:text-6xl">
            Request a demo
          </h1>
          <p className="mt-4 text-base text-ink-muted tablet:text-lg">
            Bring a handful of SKUs and we&rsquo;ll show you what verified
            product truth looks like on your own catalog.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
