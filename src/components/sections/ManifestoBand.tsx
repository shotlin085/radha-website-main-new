import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";

// A single-line cinematic interstitial between the story chapters and the
// overview sections — pure typography, no imagery, the film's "title card"
// moment. A belief statement, not a product claim.
export function ManifestoBand() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="bg-surface py-28 tablet:py-40"
    >
      <Container maxWidth="max-w-4xl" className="text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-brand-700">
          Why RADHA exists
        </p>
        <TextReveal
          as="h2"
          id="manifesto-heading"
          className="text-4xl font-extrabold leading-tight tracking-tight text-ink tablet:text-6xl"
        >
          If it’s on a shelf, it should be provable.
        </TextReveal>
      </Container>
    </section>
  );
}
