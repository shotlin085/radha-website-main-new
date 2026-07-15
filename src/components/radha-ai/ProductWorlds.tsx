"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  MessageCircle,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

function CapabilityList({ items, inverted = false }: { items: string[]; inverted?: boolean }) {
  return (
    <ul className="mt-8 grid gap-3 text-sm tablet:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-center gap-2 ${inverted ? "text-white/72" : "text-ink-muted"}`}
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              inverted ? "bg-[#d39a2c] text-[#15130f]" : "bg-brand-100 text-brand-800"
            }`}
          >
            <Check size={12} strokeWidth={2.5} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function IshaVisual() {
  return (
    <motion.div
      initial={{ clipPath: "inset(8% 8% 8% 8%)", scale: 0.96 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[31rem] overflow-hidden rounded-2xl bg-[#1a1714] tablet:min-h-[42rem]"
    >
      <Image
        src="/assets/radha/cinematic-v2/webp/08-final-ecosystem.webp"
        alt="RADHA ISHA retail intelligence across an Indian store, laptop, and mobile devices"
        fill
        sizes="(max-width: 767px) 100vw, 58vw"
        className="object-cover object-[82%_center] tablet:object-[65%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(17,15,12,0.88)_100%)]" />
      <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2 tablet:inset-x-8 tablet:bottom-8 tablet:gap-3">
        {[
          [ScanLine, "Scan"],
          [Brain, "Verify"],
          [Check, "Act"],
        ].map(([VisualIcon, label]) => {
          const Visual = VisualIcon as typeof ScanLine;
          return (
            <div
              key={label as string}
              className="flex min-w-0 items-center justify-center gap-2 rounded-lg bg-black/58 px-2 py-3 text-xs font-semibold text-white backdrop-blur-md tablet:px-4 tablet:text-sm"
            >
              <Visual size={16} className="shrink-0 text-[#e5b14c]" aria-hidden="true" />
              <span className="truncate">{label as string}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function VaniVisual() {
  const bars = [34, 58, 42, 76, 51, 88, 62, 100, 72, 91, 56, 78, 46, 64, 38];

  return (
    <div
      data-product-visual="vani"
      className="relative min-h-[31rem] overflow-hidden rounded-2xl bg-[#11110f] text-white tablet:min-h-[42rem]"
    >
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(211,154,44,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(211,154,44,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-x-0 top-[18%] flex justify-center">
        <div className="w-[84%] max-w-xl border-y border-white/10 py-10">
          <div className="flex h-36 items-center justify-center gap-2 tablet:gap-3">
            {bars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                data-vani-bar
                className="radha-vani-wave-bar block w-1.5 rounded-full bg-[#d39a2c] tablet:w-2"
                style={{
                  height: `${height}%`,
                  animationDuration: `${1.65 + (index % 5) * 0.18}s`,
                  animationDelay: `${-index * 0.11}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-white/58">
            <MessageCircle size={17} aria-hidden="true" />
            Listening with context
          </div>
        </div>
      </div>

      <div
        className="radha-vani-float absolute left-[7%] top-[9%] rounded-full border border-[#d39a2c]/35 bg-[#181713] px-4 py-2 text-xs text-white/72"
        style={{
          "--radha-drift-x": "14px",
          "--radha-drift-y": "-7px",
          animationDuration: "7s",
          animationDelay: "-1.8s",
        } as CSSProperties}
      >
        Remembers context
      </div>
      <div
        className="radha-vani-float absolute right-[6%] top-[15%] rounded-full border border-white/12 bg-[#181713] px-4 py-2 text-xs text-white/72"
        style={{
          "--radha-drift-x": "-10px",
          "--radha-drift-y": "9px",
          animationDuration: "8s",
          animationDelay: "-3.1s",
        } as CSSProperties}
      >
        Responds with care
      </div>
      <div
        className="radha-vani-float absolute bottom-[11%] right-[12%] rounded-full border border-white/12 bg-[#181713] px-4 py-2 text-xs text-white/72"
        style={{
          "--radha-drift-x": "8px",
          "--radha-drift-y": "8px",
          animationDuration: "6.5s",
          animationDelay: "-4.2s",
        } as CSSProperties}
      >
        Guided reflection
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-xl bg-[#e8dfcc] p-5 text-[#171510] tablet:inset-x-8 tablet:bottom-8 tablet:p-7">
        <p className="text-xs font-semibold text-[#79520f]">A conversation that continues</p>
        <p className="mt-2 max-w-lg text-lg font-semibold tablet:text-2xl">
          Personal support that listens before it answers.
        </p>
      </div>
    </div>
  );
}

function YugaVisual() {
  const nodes = ["Story", "Quest", "Reflection", "Wisdom"];

  return (
    <div
      data-product-visual="yuga"
      className="relative min-h-[31rem] overflow-hidden rounded-2xl bg-[#d8cfb7] text-[#16140f] tablet:min-h-[42rem]"
    >
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(39,33,22,0.08)_1px,transparent_1px)] [background-size:100%_56px]" />
      <div className="absolute inset-x-6 top-10 flex justify-between text-xs font-medium text-black/65 tablet:inset-x-10">
        <span>AN INTERACTIVE JOURNEY</span>
        <span>COMING 2027</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {[310, 236, 164].map((size, index) => (
          <div
            key={size}
            data-yuga-orbit
            className="radha-yuga-orbit absolute rounded-full border border-[#7b5a1b]/25"
            style={{
              width: size,
              height: size,
              animationDuration: `${34 + index * 9}s`,
              animationDirection: index % 2 === 0 ? "normal" : "reverse",
              animationDelay: `${-index * 7}s`,
            }}
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9b6a12]" />
          </div>
        ))}

        <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-[#171510] text-[#e2b65c] shadow-[0_8px_0_rgba(79,58,24,0.16)]">
          <BookOpen size={44} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-6 grid grid-cols-4 gap-2 tablet:inset-x-8 tablet:bottom-8 tablet:gap-3">
        {nodes.map((node, index) => (
          <div
            key={node}
            data-yuga-node
            className="radha-yuga-node rounded-lg border border-black/10 bg-[#f2ede2]/86 px-2 py-3 text-center text-[11px] font-semibold backdrop-blur-sm tablet:px-4 tablet:text-sm"
            style={{
              animationDuration: `${5.4 + index * 0.35}s`,
              animationDelay: `${-index * 0.8}s`,
            }}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

function EcosystemPanorama() {
  const chapters = ["Work", "Conversation", "Knowledge"];

  return (
    <figure className="mt-16 overflow-hidden rounded-lg border border-black/10 bg-[#e9e2d3] tablet:mt-24">
      <div className="relative aspect-[16/9] overflow-hidden tablet:aspect-[2.12/1]">
        <Image
          src="/assets/radha-ai/generated/ecosystem-three-worlds.webp"
          alt="Three connected RADHA AI worlds for retail intelligence, meaningful conversation, and interactive knowledge"
          fill
          loading="eager"
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1179px) calc(100vw - 64px), 1312px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(23,21,16,0.18)_100%)]" aria-hidden="true" />
      </div>
      <figcaption className="grid grid-cols-3 border-t border-black/10 bg-[#f3eee4]">
        {chapters.map((chapter, index) => (
          <div
            key={chapter}
            className={`flex min-w-0 items-center gap-2 px-3 py-4 text-[10px] font-semibold text-black/62 tablet:px-6 tablet:text-xs ${
              index > 0 ? "border-l border-black/10" : ""
            }`}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#a9731b]" aria-hidden="true" />
            <span className="truncate">{chapter}</span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}

export function ProductWorlds() {
  return (
    <section id="products" aria-labelledby="products-heading" className="scroll-mt-24 bg-[#f7f7f5]">
      <Container className="py-24 tablet:py-36">
        <ScrollReveal>
          <div className="grid gap-8 desktop:grid-cols-[0.88fr_1.12fr] desktop:items-end">
            <h2
              id="products-heading"
              className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-normal text-ink tablet:text-6xl desktop:text-[5.25rem]"
            >
              One vision. Three intelligent products.
            </h2>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-ink-muted desktop:justify-self-end">
              Each RADHA AI product begins with a real human need. Together they connect practical work,
              meaningful conversation, and timeless knowledge.
            </p>
          </div>
        </ScrollReveal>
        <EcosystemPanorama />
      </Container>

      <article className="bg-[#e9e2d3] py-10 tablet:py-16">
        <Container className="grid gap-10 desktop:grid-cols-[0.78fr_1.22fr] desktop:items-center desktop:gap-16">
          <ScrollReveal>
            <div className="max-w-xl py-6">
              <div className="flex items-center gap-3 text-sm font-semibold text-brand-800">
                <Icon icon={ScanLine} size={18} />
                Launching 2026
              </div>
              <p className="mt-10 text-sm font-semibold text-ink-muted">RADHA ISHA</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-ink tablet:text-6xl">
                AI retail intelligence.
              </h3>
              <p className="mt-7 text-pretty text-lg leading-8 text-ink-muted">
                Modern retail operations through barcode intelligence, OCR, expiry management, audits,
                analytics, GRN, and focused automation.
              </p>
              <CapabilityList items={["Inventory and expiry", "Barcode and OCR", "Audits and analytics", "Operational automation"]} />
              <Button href="/platform" className="mt-10">
                Explore RADHA ISHA <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </ScrollReveal>
          <IshaVisual />
        </Container>
      </article>

      <article className="bg-[#11110f] py-10 text-white tablet:py-16">
        <Container className="grid gap-10 desktop:grid-cols-[1.2fr_0.8fr] desktop:items-center desktop:gap-16">
          <div className="desktop:order-1">
            <VaniVisual />
          </div>
          <ScrollReveal className="desktop:order-2">
            <div className="max-w-xl py-6 desktop:ml-auto">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#dfb75d]">
                <Icon icon={MessageCircle} size={18} />
                Launching 2026
              </div>
              <p className="mt-10 text-sm font-semibold text-white/55">RADHA VANI</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-white tablet:text-6xl">
                An AI companion that remembers.
              </h3>
              <p className="mt-7 text-pretty text-lg leading-8 text-white/68">
                A personal companion designed for thoughtful conversations, emotional support, growth,
                and spiritual guidance inspired by enduring wisdom.
              </p>
              <CapabilityList inverted items={["Listens with context", "Meaningful conversation", "Personal reflection", "Privacy by design"]} />
              <Button href="/#contact" className="mt-10 bg-[#d39a2c] text-[#171510] hover:bg-[#e1b255] active:bg-[#c48b22]">
                Join the VANI beta <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </article>

      <article className="bg-[#cfc5aa] py-10 tablet:py-16">
        <Container className="grid gap-10 desktop:grid-cols-[0.78fr_1.22fr] desktop:items-center desktop:gap-16">
          <ScrollReveal>
            <div className="max-w-xl py-6">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#68470f]">
                <Icon icon={Sparkles} size={18} />
                Coming 2027
              </div>
              <p className="mt-10 text-sm font-semibold text-black/65">RADHA YUGA</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-[#171510] tablet:text-6xl">
                Wisdom you can explore.
              </h3>
              <p className="mt-7 text-pretty text-lg leading-8 text-black/64">
                An immersive learning platform for discovering the Bhagavad Gita and Sanatan wisdom
                through stories, challenges, quests, and reflective gameplay.
              </p>
              <CapabilityList items={["Interactive stories", "Guided quests", "Learning challenges", "Reflective practice"]} />
              <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-black/18 px-6 py-3 text-sm font-semibold text-black/65">
                <BookOpen size={16} aria-hidden="true" />
                Coming soon
              </span>
            </div>
          </ScrollReveal>
          <YugaVisual />
        </Container>
      </article>
    </section>
  );
}
