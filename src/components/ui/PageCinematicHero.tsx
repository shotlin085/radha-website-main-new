import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface PageCinematicHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  proofPoints?: string[];
  reverse?: boolean;
  priority?: boolean;
}

export function PageCinematicHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
  proofPoints = [],
  reverse = false,
  priority = false,
}: PageCinematicHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface-muted pb-16 pt-32 tablet:pb-24 tablet:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-50/80 to-transparent"
      />
      <Container
        className={`relative grid items-center gap-10 desktop:grid-cols-[0.88fr_1.12fr] ${
          reverse ? "desktop:grid-cols-[1.12fr_0.88fr]" : ""
        }`}
      >
        <ScrollReveal className={reverse ? "desktop:order-2" : ""}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-700">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink tablet:text-6xl desktop:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink-muted tablet:text-lg">
            {description}
          </p>
          {(primaryCta || secondaryCta) ? (
            <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
              {primaryCta ? <Button href={primaryCta.href}>{primaryCta.label}</Button> : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
          {proofPoints.length ? (
            <div className="mt-8 grid gap-3 min-[560px]:grid-cols-3">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-ink/8 bg-surface/80 px-4 py-3 text-sm font-medium text-ink shadow-warm backdrop-blur"
                >
                  {point}
                </div>
              ))}
            </div>
          ) : null}
        </ScrollReveal>

        <ScrollReveal delay={0.08} className={reverse ? "desktop:order-1" : ""}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-surface shadow-float">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1672}
              height={941}
              priority={priority}
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="aspect-[16/9] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5"
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
