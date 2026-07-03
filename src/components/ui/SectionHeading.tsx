import { type ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  level?: "h1" | "h2";
  /** For sections on a dark/inverted background. */
  invert?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
  invert = false,
}: SectionHeadingProps) {
  const Heading = level;
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = invert ? "text-surface" : "text-ink";
  const descriptionColor = invert ? "text-white/70" : "text-ink-muted";
  // brand-700 (accent-deep), not the vivid brand-600 — small uppercase
  // eyebrow text against the cream surface needs 4.5:1; brand-600 only
  // reaches ~3.5:1 there. Matches the real brand doc's own eyebrow spec
  // ("ink-soft or accent-deep").
  const eyebrowColor = invert ? "text-brand-300" : "text-brand-700";
  const ruleColor = invert ? "bg-brand-300/60" : "bg-brand-700/50";
  // Weight scale from the real brand system: w800 page titles, w700
  // section headers.
  const titleClassName =
    level === "h1"
      ? `text-4xl font-extrabold tracking-tight ${titleColor} tablet:text-6xl desktop:text-7xl`
      : `text-3xl font-bold tracking-tight ${titleColor} tablet:text-5xl`;

  return (
    <div className={`max-w-3xl ${alignClasses}`}>
      {eyebrow ? (
        <p
          className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] ${eyebrowColor} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span aria-hidden="true" className={`h-px w-6 ${ruleColor}`} />
          {eyebrow}
          {align === "center" ? (
            <span aria-hidden="true" className={`h-px w-6 ${ruleColor}`} />
          ) : null}
        </p>
      ) : null}
      {typeof title === "string" ? (
        <TextReveal as={level} id={id} className={titleClassName}>
          {title}
        </TextReveal>
      ) : (
        <Heading id={id} className={titleClassName}>
          {title}
        </Heading>
      )}
      {description ? (
        <p className={`mt-4 text-base ${descriptionColor} tablet:text-lg`}>{description}</p>
      ) : null}
    </div>
  );
}
