import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How RADHA collects, uses, and protects data.",
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <section className="py-24 pt-36 tablet:pt-44">
        <Container maxWidth="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink tablet:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-ink-muted">Last updated: placeholder — pending legal review.</p>

          <div className="mt-10 flex flex-col gap-8 text-ink-muted">
            <div>
              <h2 className="text-lg font-semibold text-ink">Data we collect</h2>
              <p className="mt-2 text-sm">
                RADHA collects scan events, owner-provided safety preferences,
                and account details necessary to operate the platform. Owner
                safety profiles are only collected with explicit opt-in.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">How we use it</h2>
              <p className="mt-2 text-sm">
                Scan data resolves label and safety truth at the moment of
                scan. Owner preference data is used solely to flag risk to
                that owner — it is never shared with brands or retailers
                without consent.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Data protection</h2>
              <p className="mt-2 text-sm">
                Owner data is encrypted at rest and in transit. Access is
                limited to the systems required to serve that owner&rsquo;s
                own requests.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Contact</h2>
              <p className="mt-2 text-sm">
                Questions about this policy can be sent through our{" "}
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
