import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the RADHA platform.",
});

export default function TermsPage() {
  return (
    <main id="main-content">
      <section className="py-24 pt-36 tablet:pt-44">
        <Container maxWidth="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink tablet:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-ink-muted">Last updated: placeholder — pending legal review.</p>

          <div className="mt-10 flex flex-col gap-8 text-ink-muted">
            <div>
              <h2 className="text-lg font-semibold text-ink">Using the platform</h2>
              <p className="mt-2 text-sm">
                Access to RADHA is provided under a commercial agreement with
                brands and retailers. Owners use the private dashboard subject
                to the consumer terms accepted at account creation.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Data accuracy</h2>
              <p className="mt-2 text-sm">
                RADHA verifies scan results against registered label and
                sourcing data. Brands are responsible for keeping that
                underlying data current.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Changes to these terms</h2>
              <p className="mt-2 text-sm">
                We&rsquo;ll post updates here and, where required, notify
                account holders directly before changes take effect.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Contact</h2>
              <p className="mt-2 text-sm">
                Questions about these terms can be sent through our{" "}
                <a href="/contact" className="text-brand-600 underline underline-offset-2">
                  contact page
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
