import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Brain,
  Camera,
  Check,
  Cloud,
  Code2,
  FileText,
  LockKeyhole,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Rocket,
  ScanLine,
  Search,
  ShieldCheck,
  Smartphone,
  Workflow,
  AtSign,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ContactForm } from "@/components/forms/ContactForm";
import { CinematicHero } from "@/components/radha-ai/CinematicHero";
import { ProductWorlds } from "@/components/radha-ai/ProductWorlds";
import { FounderPause } from "@/components/radha-ai/FounderPause";

const PRINCIPLES = [
  ["01", "Solve a real problem", "Start with lived experience, not technology looking for a use."],
  ["02", "Respect human values", "Protect attention, dignity, privacy, and the right to choose."],
  ["03", "Create lasting impact", "Build carefully enough to remain useful long after launch."],
];

const APPROACH = [
  [Search, "Research", "Study the people, place, and pressure behind the problem."],
  [MessageCircle, "Understand", "Listen for the real need beneath the first request."],
  [FileText, "Design", "Turn complexity into a calm, direct experience."],
  [ShieldCheck, "Build", "Make responsible AI part of the architecture."],
  [Rocket, "Launch", "Release carefully with clear expectations."],
  [BarChart3, "Learn", "Measure what changed in the real world."],
  [RefreshCw, "Improve", "Keep refining the product and its safeguards."],
] as const;

const TECHNOLOGIES: Array<{
  icon: LucideIcon;
  title: string;
  detail: string;
}> = [
  { icon: Brain, title: "Artificial Intelligence", detail: "Reasoning systems shaped around specific human and operational needs." },
  { icon: Brain, title: "Machine Learning", detail: "Models that improve useful decisions without hiding how outcomes are reached." },
  { icon: Camera, title: "Computer Vision", detail: "Visual understanding for products, labels, shelves, and real-world environments." },
  { icon: ScanLine, title: "OCR", detail: "Reliable text and label extraction across everyday documents and packaging." },
  { icon: Cloud, title: "Cloud Computing", detail: "Elastic, observable systems designed to serve users across India." },
  { icon: BarChart3, title: "Analytics", detail: "Clear signals that help people understand what changed and where attention is needed." },
  { icon: Workflow, title: "Automation", detail: "Focused workflows that reduce repetitive work while keeping people in control." },
  { icon: LockKeyhole, title: "Enterprise Security", detail: "Privacy, access control, and auditability designed in from the first release." },
  { icon: Smartphone, title: "Cross-platform Apps", detail: "Fast, accessible experiences across mobile and web." },
];

const ROADMAP = [
  { year: "2026", product: "RADHA ISHA", description: "Retail Intelligence Platform", status: "Launching" },
  { year: "2027", product: "RADHA VANI", description: "AI Companion Platform", status: "Coming" },
  { year: "2027", product: "RADHA YUGA", description: "Interactive Learning Platform", status: "Coming" },
  { year: "Future", product: "One meaningful idea", description: "A focused answer to a real human problem", status: "Continuing" },
];

const FAQS = [
  {
    question: "What is RADHA AI?",
    answer:
      "RADHA AI is an Indian artificial intelligence company creating focused products for work, human connection, and learning. Each product is built around a specific real-world need.",
  },
  {
    question: "What products are currently available?",
    answer:
      "RADHA ISHA is planned for 2026. RADHA VANI and RADHA YUGA are planned for 2027. Beta access will open in stages as each product reaches its testing milestone.",
  },
  {
    question: "How is RADHA different?",
    answer:
      "We choose depth over volume. Our goal is one meaningful AI solution each year, developed with clear human value, responsible safeguards, and a long product horizon.",
  },
  {
    question: "When will RADHA ISHA launch?",
    answer:
      "RADHA ISHA is scheduled to launch in 2026. Retail businesses can join the beta list now to receive testing and rollout updates.",
  },
  {
    question: "How can I join the beta?",
    answer:
      "Use the contact form below and mention the product you want to test. We will share the right beta path when that cohort opens.",
  },
  {
    question: "How can businesses collaborate?",
    answer:
      "We welcome practical pilots, product feedback, research partnerships, and responsible technology collaborations. Tell us about the problem you want to solve in the contact form.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security and user control are designed into every product from the beginning. Each product will document what it collects, why it is needed, how it is protected, and how users can manage it.",
  },
];

function SectionTitle({
  id,
  title,
  copy,
}: {
  id?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-4xl">
      <h2
        id={id}
        className="text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-ink tablet:text-6xl desktop:text-[5.25rem]"
      >
        {title}
      </h2>
      {copy ? <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-ink-muted">{copy}</p> : null}
    </div>
  );
}

export function RadhaAiHome() {
  return (
    <main id="main-content">
      <section
        id="home"
        aria-labelledby="home-heading"
        className="relative flex min-h-[100svh] scroll-mt-24 flex-col overflow-hidden bg-[#090908] pt-20 text-white"
      >
        <CinematicHero />
        <Container className="relative z-10 flex flex-1 items-center py-10 tablet:py-28 desktop:py-32">
          <div className="max-w-[78rem]">
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-[#e8ba5a] tablet:mb-8">
              <span className="h-px w-10 bg-[#e8ba5a]" aria-hidden="true" />
              RADHA AI · INDIA
            </p>
            <h1
              id="home-heading"
              className="max-w-[18ch] text-balance text-[2.75rem] font-semibold leading-[0.98] tracking-normal text-white tablet:text-[4rem] desktop:text-[5.5rem] wide:text-[6rem]"
            >
              <span className="sr-only">RADHA AI: </span>
              AI That Understands Work.
              <span className="mt-2 block text-[#e8b952]">AI That Understands People.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-white/74 tablet:mt-9 tablet:text-xl tablet:leading-9">
              Retail intelligence. A thoughtful companion. An interactive learning world.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 tablet:mt-10 tablet:gap-3">
              <Button href="/#contact" className="bg-[#e4ad42] text-[#171510] hover:bg-[#f0c76f] active:bg-[#cd9630]">
                Get early access <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="/#products" variant="secondary" className="border-white/32 text-white hover:bg-white/12">
                Explore products <ArrowDown size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>

        <div className="relative z-10 border-t border-white/12 bg-black/42 backdrop-blur-sm">
          <Container className="flex min-h-24 items-center justify-between gap-6 py-5">
            <p className="text-sm font-medium text-white/70 tablet:text-base">
              Trusted by future-ready businesses and individuals.
            </p>
            <div className="hidden items-center gap-4 text-xs font-semibold text-white/46 tablet:flex" aria-hidden="true">
              <span>ISHA</span>
              <span className="h-1 w-1 rounded-full bg-[#e8ba5a]" />
              <span>VANI</span>
              <span className="h-1 w-1 rounded-full bg-[#e8ba5a]" />
              <span>YUGA</span>
            </div>
          </Container>
        </div>
      </section>

      <ProductWorlds />

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-white py-24 tablet:py-36">
        <Container>
          <ScrollReveal>
            <div className="grid gap-12 desktop:grid-cols-[0.85fr_1.15fr] desktop:gap-24">
              <SectionTitle id="about-heading" title="Building AI With Purpose." />
              <div className="max-w-2xl text-pretty text-lg leading-8 text-ink-muted">
                <p>
                  RADHA AI is an Indian artificial intelligence company focused on solving real-world
                  problems through thoughtful, human-centered technology.
                </p>
                <p className="mt-6">
                  We believe in creating one meaningful AI solution every year: a focused product designed
                  to improve everyday experiences and create long-term value.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggerGroup className="mt-20 grid border-y border-black/12 desktop:grid-cols-3">
            {PRINCIPLES.map(([number, title, description], index) => (
              <StaggerItem
                key={number}
                className={`py-8 desktop:px-8 desktop:py-10 ${
                  index > 0 ? "border-t border-black/12 desktop:border-l desktop:border-t-0" : ""
                }`}
              >
                <p className="text-sm font-semibold text-[#9a6818]">{number}</p>
                <h3 className="mt-7 text-2xl font-semibold tracking-normal text-ink">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-ink-muted">{description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section id="vision" aria-labelledby="vision-heading" className="scroll-mt-24 bg-[#11110f] py-24 text-white tablet:py-36">
        <Container>
          <ScrollReveal>
            <div className="grid gap-14 desktop:grid-cols-[0.82fr_1.18fr] desktop:gap-24">
              <h2
                id="vision-heading"
                className="text-balance text-4xl font-semibold leading-[1.04] tracking-normal tablet:text-6xl desktop:text-[5.25rem]"
              >
                Why we exist.
              </h2>
              <div className="max-w-3xl">
                <p className="text-balance text-2xl font-semibold leading-tight text-[#ddb259] tablet:text-4xl">
                  Building AI that helps businesses, supports people, and preserves knowledge.
                </p>
                <p className="mb-4 text-lg font-medium text-white/58">
                  Technology should never replace humanity.
                </p>
                <p className="text-balance text-3xl font-semibold leading-tight tracking-normal text-[#ddb259] tablet:text-5xl">
                  Technology should empower humanity.
                </p>
                <div className="mt-12 grid gap-0 border-y border-white/14">
                  {[
                    "Businesses deserve intelligent systems that reduce manual work.",
                    "People deserve someone who listens.",
                    "Knowledge deserves to be preserved for future generations.",
                  ].map((statement) => (
                    <p key={statement} className="border-b border-white/14 py-6 text-lg leading-8 text-white/70 last:border-b-0">
                      {statement}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="mt-20 tablet:mt-28">
            <figure className="relative overflow-hidden rounded-lg border border-white/12 bg-black">
              <div className="relative aspect-[4/3] tablet:aspect-[16/7]">
                <Image
                  src="/assets/radha-ai/generated/wisdom-humanity-core.webp"
                  alt="A luminous brass seed connecting humane intelligence with timeless wisdom"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1179px) calc(100vw - 64px), 1312px"
                  className="object-cover object-[64%_center] tablet:object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,8,0.72)_0%,transparent_46%),linear-gradient(180deg,transparent_55%,rgba(9,9,8,0.58)_100%)]" aria-hidden="true" />
              </div>
              <figcaption className="absolute bottom-6 left-6 max-w-xs text-sm font-medium leading-6 text-white/76 tablet:bottom-9 tablet:left-9 tablet:text-base">
                Intelligence guided by responsibility.
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="mt-20 border-t border-white/14 pt-16 tablet:mt-28 tablet:pt-24">
            <div className="grid gap-14 desktop:grid-cols-[1.1fr_0.9fr] desktop:items-end desktop:gap-24">
              <div>
                <p className="text-sm font-semibold text-[#ddb259]">Our philosophy</p>
                <h3 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-normal tablet:text-6xl">
                  Inspired by timeless wisdom. Built for tomorrow.
                </h3>
              </div>
              <div>
                <p className="text-pretty text-lg leading-8 text-white/66">
                  Wisdom, compassion, truth, growth, and responsibility guide how we choose problems,
                  design technology, and measure impact. The result should improve lives, not only automate
                  tasks.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Wisdom", "Compassion", "Truth", "Growth", "Responsibility"].map((value) => (
                    <span key={value} className="rounded-full border border-white/16 px-4 py-2 text-sm text-white/72">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section aria-labelledby="approach-heading" className="bg-[#f7f7f5] py-24 tablet:py-36">
        <Container>
          <ScrollReveal>
            <SectionTitle
              id="approach-heading"
              title="Our Approach"
              copy="A careful product rhythm keeps human needs, responsible AI, and real-world learning in the same loop."
            />
          </ScrollReveal>

          <div className="relative mt-20">
            <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-black/12 desktop:left-0 desktop:right-0 desktop:top-5 desktop:h-px desktop:w-auto" aria-hidden="true" />
            <span className="radha-approach-beam pointer-events-none absolute left-0 top-5 hidden h-px w-[17%] bg-[linear-gradient(90deg,transparent,rgba(203,145,36,0.95),transparent)] shadow-[0_0_14px_rgba(203,145,36,0.65)] desktop:block" aria-hidden="true" />
            <StaggerGroup className="grid gap-10 desktop:grid-cols-7 desktop:gap-5">
              {APPROACH.map(([ApproachIcon, title, description], index) => (
                <StaggerItem key={title} className="group relative grid grid-cols-[2.5rem_1fr] gap-5 desktop:block">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#171510] text-[#e0b158] transition-[transform,box-shadow] duration-500 group-hover:scale-110 group-hover:shadow-[0_0_0_7px_rgba(224,177,88,0.16)]">
                    <ApproachIcon size={17} aria-hidden="true" />
                  </div>
                  <div className="desktop:mt-8">
                    <p className="text-xs font-semibold text-[#8a6019]">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section id="technology" aria-labelledby="technology-heading" className="scroll-mt-24 bg-white py-24 tablet:py-36">
        <Container>
          <div className="grid gap-16 desktop:grid-cols-[0.78fr_1.22fr] desktop:gap-24">
            <ScrollReveal>
              <div className="desktop:sticky desktop:top-32">
                <SectionTitle
                  id="technology-heading"
                  title="Built Using Modern AI"
                  copy="The technology changes by product. The standard does not: useful, explainable, secure, and built for the real environment where it will be used."
                />
                <figure className="relative mt-12 overflow-hidden rounded-lg border border-black/10 bg-[#d8cfbd]">
                  <div className="relative aspect-[3/5] overflow-hidden">
                    <Image
                      src="/assets/radha-ai/generated/responsible-ai-core.webp"
                      alt="A transparent intelligence core representing secure, explainable, and connected AI systems"
                      fill
                      sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1179px) calc(100vw - 64px), 430px"
                      className="object-cover"
                    />
                    <span
                      className="radha-ai-scanline absolute inset-x-0 top-0 h-px bg-[#e8b34f]/75 shadow-[0_0_14px_rgba(232,179,79,0.55)]"
                      style={{ animation: "radha-ai-scanline 7.5s ease-in-out infinite" }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgba(20,18,14,0.58)_100%)]" aria-hidden="true" />
                  </div>
                  <figcaption className="absolute inset-x-5 bottom-5 text-xs font-semibold leading-5 text-white/82 tablet:inset-x-7 tablet:bottom-7">
                    One controlled intelligence path. Multiple focused capabilities.
                  </figcaption>
                </figure>
              </div>
            </ScrollReveal>

            <StaggerGroup className="border-t border-black/12">
              {TECHNOLOGIES.map((technology, index) => (
                <StaggerItem
                  key={technology.title}
                  className="grid gap-4 border-b border-black/12 py-7 tablet:grid-cols-[3rem_0.85fr_1.15fr] tablet:items-start tablet:gap-6 tablet:py-9"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ece6d8] text-[#7a5515]">
                    <Icon icon={technology.icon} size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-black/55">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-normal text-ink">{technology.title}</h3>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-ink-muted">{technology.detail}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <section aria-labelledby="privacy-heading" className="bg-[#d1c5a7] py-24 tablet:py-36">
        <Container className="grid gap-14 desktop:grid-cols-[1.05fr_0.95fr] desktop:items-center desktop:gap-24">
          <ScrollReveal>
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#171510] text-[#e1b55b]">
                <ShieldCheck size={30} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h2 id="privacy-heading" className="mt-10 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-[#171510] tablet:text-6xl desktop:text-[5.25rem]">
                Privacy Comes First.
              </h2>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-black/65">
                Your trust is more valuable than your data. Users remain in control of their information,
                memories, and preferences, with security designed into every product from the beginning.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl bg-[#171510] p-6 text-white tablet:p-10">
              <p className="text-sm font-semibold text-[#ddb259]">A simple promise</p>
              <div className="mt-8 divide-y divide-white/12 border-y border-white/12">
                {[
                  "Collect only what the product needs.",
                  "Explain why information is used.",
                  "Keep meaningful controls within reach.",
                  "Build security and auditability into the system.",
                ].map((promise) => (
                  <div key={promise} className="flex items-center gap-4 py-5 text-sm leading-6 text-white/74">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ddb259] text-[#171510]">
                      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {promise}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section aria-labelledby="roadmap-heading" className="bg-[#f7f7f5] py-24 tablet:py-36">
        <Container>
          <ScrollReveal>
            <SectionTitle
              id="roadmap-heading"
              title="One Meaningful Innovation Every Year"
              copy="A public direction, kept intentionally focused. We would rather understand one important problem deeply than release a catalogue of shallow ideas."
            />
          </ScrollReveal>

          <div className="relative mt-20 overflow-hidden">
            <span className="radha-roadmap-beam pointer-events-none absolute left-0 top-0 z-10 hidden h-px w-[22%] bg-[linear-gradient(90deg,transparent,rgba(203,145,36,0.98),transparent)] shadow-[0_0_16px_rgba(203,145,36,0.7)] desktop:block" aria-hidden="true" />
            <StaggerGroup className="grid border-y border-black/12 desktop:grid-cols-4">
              {ROADMAP.map((milestone, index) => (
                <StaggerItem
                  key={`${milestone.year}-${milestone.product}`}
                  className={`group relative py-8 transition-colors duration-500 hover:bg-white/72 desktop:min-h-72 desktop:px-8 desktop:py-10 ${
                    index > 0 ? "border-t border-black/12 desktop:border-l desktop:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-semibold tracking-normal text-[#9a6818]">{milestone.year}</p>
                    <span className="rounded-full bg-[#e8e1d1] px-3 py-1 text-xs font-semibold text-[#6e4b11] transition-colors duration-300 group-hover:bg-[#171510] group-hover:text-[#e8c36c]">
                      {milestone.status}
                    </span>
                  </div>
                  <h3 className="mt-12 text-xl font-semibold text-ink">{milestone.product}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">{milestone.description}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      <FounderPause />

      <section id="faq" aria-labelledby="faq-heading" className="bg-[#f7f7f5] py-24 tablet:py-36">
        <Container className="grid gap-14 desktop:grid-cols-[0.72fr_1.28fr] desktop:gap-24">
          <ScrollReveal>
            <div className="desktop:sticky desktop:top-32">
              <SectionTitle id="faq-heading" title="Questions, answered clearly." />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="border-t border-black/12">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group border-b border-black/12">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink marker:content-none tablet:py-8 tablet:text-xl">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8e1d1] text-[#6e4b11] transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 text-base leading-7 text-ink-muted tablet:pb-8">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 bg-[#d1c5a7] py-24 tablet:py-36">
        <Container className="grid gap-16 desktop:grid-cols-[0.88fr_1.12fr] desktop:items-start desktop:gap-24">
          <ScrollReveal>
            <div>
              <h2 id="contact-heading" className="max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-[#171510] tablet:text-6xl desktop:text-[5.25rem]">
                Let&apos;s Build the Future Together.
              </h2>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-black/64">
                Join a beta, explore a business pilot, or tell us about a meaningful problem worth solving.
              </p>

              <div className="mt-12 border-y border-black/14 py-5">
                <a href="mailto:hello@radha.app" className="flex items-center justify-between gap-5 py-4 text-sm font-semibold text-[#171510] hover:text-[#7a5515]">
                  <span className="flex items-center gap-3"><Mail size={18} aria-hidden="true" /> Email</span>
                  <span>hello@radha.app</span>
                </a>
                <a href="tel:+18001237890" className="flex items-center justify-between gap-5 py-4 text-sm font-semibold text-[#171510] hover:text-[#7a5515]">
                  <span className="flex items-center gap-3"><Phone size={18} aria-hidden="true" /> Phone</span>
                  <span>1800 123 7890</span>
                </a>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold text-black/65">Social channels</p>
                <div className="mt-4 flex flex-wrap gap-2 text-black/60" aria-label="RADHA AI social channels coming soon">
                  {[AtSign, Camera, Video, Code2].map((SocialIcon, index) => (
                    <span key={index} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/16" aria-hidden="true">
                      <SocialIcon size={17} />
                    </span>
                  ))}
                  <span className="ml-2 self-center text-xs font-medium">Official profiles will be published at launch.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl bg-white p-6 tablet:p-10">
              <p className="text-sm font-semibold text-[#8a6019]">Start a conversation</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-normal text-ink tablet:text-3xl">
                Tell us what you want to explore.
              </h3>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-[#11110f] py-24 text-white tablet:py-36">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-30 [background-image:linear-gradient(120deg,transparent_0%,transparent_48%,rgba(211,154,44,0.4)_49%,transparent_50%)] [background-size:44px_44px]" aria-hidden="true" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl">
              <h2 id="final-cta-heading" className="text-balance text-4xl font-semibold leading-[1.04] tracking-normal tablet:text-6xl desktop:text-[5.25rem]">
                The Future Begins With Intelligent Ideas.
              </h2>
              <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-white/66">
                Join us as we build AI products that simplify work, strengthen relationships, and preserve
                timeless knowledge for future generations.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/#contact" className="bg-[#d39a2c] text-[#171510] hover:bg-[#e1b255] active:bg-[#c48b22]">
                  Join beta <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Link href="mailto:hello@radha.app" className="inline-flex items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#171510]">
                  Contact us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
