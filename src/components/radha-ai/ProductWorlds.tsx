"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  MessageCircle,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

type ProductWorld = "isha" | "vani" | "yuga";

type ChapterStep = {
  label: string;
  detail: string;
};

const WORLD_META: Record<ProductWorld, { name: string; purpose: string; color: string }> = {
  isha: { name: "RADHA ISHA", purpose: "I run a business", color: "#e39d2f" },
  vani: { name: "RADHA VANI", purpose: "I want a thoughtful companion", color: "#e0b65d" },
  yuga: { name: "RADHA YUGA", purpose: "I want to explore timeless wisdom", color: "#f0c86d" },
};

const ISHA_STEPS: ChapterStep[] = [
  { label: "Scan", detail: "Barcode captured" },
  { label: "Verify", detail: "EAN record matched" },
  { label: "Detect", detail: "Expiry risk found" },
  { label: "Act", detail: "Shelf task created" },
];

const VANI_STEPS: ChapterStep[] = [
  { label: "Listen", detail: "Voice received" },
  { label: "Understand", detail: "Emotion recognised" },
  { label: "Remember", detail: "Relevant context recalled" },
  { label: "Respond", detail: "Thoughtful support formed" },
];

const YUGA_STEPS: ChapterStep[] = [
  { label: "Enter", detail: "Story opens" },
  { label: "Choose", detail: "A path is selected" },
  { label: "Complete", detail: "Quest progress recorded" },
  { label: "Reflect", detail: "Wisdom becomes practice" },
];

function announceWorld(world: ProductWorld | "default") {
  window.dispatchEvent(new CustomEvent("radha:product-world", { detail: { world } }));
}

function useChapterProgress(
  articleRef: RefObject<HTMLElement | null>,
  world: ProductWorld,
  stepCount: number,
) {
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const updateStep = useCallback((step: number) => {
    const next = Math.max(0, Math.min(stepCount - 1, step));
    if (activeStepRef.current === next) return;
    activeStepRef.current = next;
    setActiveStep(next);
  }, [stepCount]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) announceWorld(world);
      },
      { rootMargin: "-24% 0px -24% 0px", threshold: 0 },
    );

    observer.observe(article);
    return () => observer.disconnect();
  }, [articleRef, world]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article || prefersReducedMotion) return;

    let frameId = 0;
    const syncMobileStep = () => {
      frameId = 0;
      if (window.matchMedia("(min-width: 1180px)").matches) return;

      const bounds = article.getBoundingClientRect();
      const start = window.innerHeight * 0.1;
      const end = window.innerHeight * 0.35;
      const distance = Math.max(bounds.height + start - end, 1);
      const progress = Math.max(0, Math.min(1, (start - bounds.top) / distance));

      updateStep(Math.round(progress * (stepCount - 1)));
    };
    const requestSync = () => {
      if (!frameId) frameId = window.requestAnimationFrame(syncMobileStep);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [articleRef, prefersReducedMotion, stepCount, updateStep]);

  useGSAP(() => {
    if (!articleRef.current || prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 1180px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: articleRef.current,
        start: "top 42%",
        end: "bottom 58%",
        onEnter: () => announceWorld(world),
        onEnterBack: () => announceWorld(world),
        onUpdate: (self) => updateStep(Math.round(self.progress * (stepCount - 1))),
      });

      return () => trigger.kill();
    });

    return () => media.revert();
  }, { scope: articleRef, dependencies: [prefersReducedMotion, stepCount, updateStep, world] });

  return { activeStep, setActiveStep: updateStep };
}

function ChapterSteps({
  steps,
  activeStep,
  onSelect,
  inverted = false,
}: {
  steps: ChapterStep[];
  activeStep: number;
  onSelect: (step: number) => void;
  inverted?: boolean;
}) {
  return (
    <div className={`mt-9 border-y ${inverted ? "border-white/14" : "border-black/12"}`}>
      {steps.map((step, index) => {
        const active = activeStep === index;
        const complete = activeStep > index;

        return (
          <button
            key={step.label}
            type="button"
            data-chapter-step={index}
            onClick={() => onSelect(index)}
            aria-pressed={active}
            className={`group grid min-h-16 w-full grid-cols-[2rem_0.72fr_1.28fr] items-center gap-3 border-b px-1 text-left transition-colors duration-300 last:border-b-0 ${
              inverted
                ? `border-white/10 ${active ? "bg-white/[0.07] text-white" : "text-white/56 hover:text-white/82"}`
                : `border-black/10 ${active ? "bg-white/60 text-[#171510]" : "text-black/48 hover:text-black/74"}`
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                active || complete
                  ? "bg-[#d39a2c] text-[#171510]"
                  : inverted
                    ? "border border-white/18"
                    : "border border-black/16"
              }`}
            >
              {complete ? <Check size={12} strokeWidth={2.6} aria-hidden="true" /> : index + 1}
            </span>
            <span className="text-sm font-semibold">{step.label}</span>
            <span className="text-xs leading-5 opacity-72">{step.detail}</span>
          </button>
        );
      })}
    </div>
  );
}

function CapabilityList({ items, inverted = false }: { items: string[]; inverted?: boolean }) {
  return (
    <ul className="mt-8 grid gap-3 text-sm tablet:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`flex items-center gap-2 ${inverted ? "text-white/72" : "text-ink-muted"}`}>
          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${inverted ? "bg-[#d39a2c] text-[#15130f]" : "bg-brand-100 text-brand-800"}`}>
            <Check size={12} strokeWidth={2.5} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function IshaVisual({ activeStep }: { activeStep: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { clipPath: "inset(7% 7% 7% 7%)", scale: 0.97 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`RADHA ISHA live product demonstration. Current step: ${ISHA_STEPS[activeStep].label}`}
      className="relative min-h-[32rem] overflow-hidden rounded-2xl bg-[#11110e] text-white tablet:min-h-[42rem]"
    >
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(236,187,81,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(236,187,81,0.055)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-[48%] h-px bg-[#f3c75f] shadow-[0_0_16px_rgba(243,199,95,0.88)]"
        animate={{ width: `${24 + activeStep * 25}%` }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      <motion.div
        animate={{ x: activeStep > 0 ? "-4%" : "0%", scale: activeStep > 0 ? 0.96 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[7%] top-[9%] w-[46%] overflow-hidden rounded-[1.35rem] bg-[#f7f4ee] p-3 text-[#171510] tablet:p-4"
      >
        <div className="flex items-center justify-between text-[9px] font-semibold text-black/55 tablet:text-[11px]">
          <span>RADHA ISHA</span>
          <span className="rounded-full bg-[#e8c36c]/42 px-2 py-1 text-[#5e4312]">LIVE SCAN</span>
        </div>
        <div className="relative mt-3 aspect-[1.16/0.78] overflow-hidden rounded-xl bg-[#1b1812]">
          <div className="absolute inset-x-[15%] top-1/2 h-[34%] -translate-y-1/2 rounded-sm opacity-90" style={{ backgroundImage: "repeating-linear-gradient(90deg, #f2e8c9 0 2px, transparent 2px 5px)" }} />
          <motion.span
            className="absolute inset-x-0 h-px bg-[#f3c75f] shadow-[0_0_12px_rgba(243,199,95,0.92)]"
            animate={prefersReducedMotion || activeStep > 0 ? { top: "78%", opacity: 0.35 } : { top: ["16%", "80%", "16%"], opacity: 1 }}
            transition={activeStep > 0 ? { duration: 0.3 } : { duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-3 text-[10px] font-semibold tablet:text-xs">Whole Wheat Atta, 5 kg</p>
        <p className="mt-1 font-mono text-[8px] text-black/55 tablet:text-[10px]">EAN 8901234567890</p>
        <motion.div
          animate={{ backgroundColor: activeStep >= 1 ? "#e1eee1" : "#ece8df", color: activeStep >= 1 ? "#17613a" : "#6d675e" }}
          className="mt-3 flex items-center justify-between rounded-lg px-2.5 py-2 text-[9px] font-semibold tablet:text-[11px]"
        >
          <span>{activeStep >= 1 ? "Product verified" : "Reading barcode"}</span>
          {activeStep >= 1 ? <Check size={14} strokeWidth={2.8} aria-hidden="true" /> : <ScanLine size={14} aria-hidden="true" />}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: activeStep >= 1 ? 1 : 0.38, x: activeStep >= 1 ? 0 : 22, y: activeStep >= 1 ? 0 : 10 }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[6%] top-[22%] w-[45%] rounded-2xl border border-white/14 bg-[#1b1915]/96 p-3 backdrop-blur-md tablet:p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] font-semibold text-white/58 tablet:text-[11px]">PRODUCT RECORD</p>
          <span className={`flex h-6 w-6 items-center justify-center rounded-full ${activeStep >= 1 ? "bg-[#d5a740] text-[#1b1710]" : "bg-white/10 text-white/48"}`}>
            <Check size={12} strokeWidth={2.8} aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 text-sm font-semibold tablet:text-lg">EAN match</p>
        <div className="mt-4 space-y-2 border-y border-white/10 py-3 text-[9px] text-white/58 tablet:text-[11px]">
          <div className="flex justify-between gap-2"><span>Record</span><span className="font-mono text-white/82">890123...</span></div>
          <div className="flex justify-between gap-2"><span>Expiry</span><span className={activeStep >= 2 ? "text-[#f1c96f]" : "text-white/82"}>{activeStep >= 2 ? "11 days" : "Checking"}</span></div>
          <div className="flex justify-between gap-2"><span>Action</span><span className="text-white/82">{activeStep >= 3 ? "Task created" : "Review shelf"}</span></div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 flex items-center gap-2 text-[9px] font-semibold text-[#e7c469] tablet:text-[11px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7c469]" aria-hidden="true" />
            {ISHA_STEPS[activeStep].detail}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-x-5 bottom-5 grid grid-cols-4 gap-1.5 tablet:inset-x-8 tablet:bottom-8 tablet:gap-3">
        {ISHA_STEPS.map((step, index) => (
          <div key={step.label} className={`min-w-0 rounded-lg px-2 py-3 transition-colors duration-300 tablet:px-4 ${index === activeStep ? "bg-[#d39a2c] text-[#171510]" : "bg-black/48 text-white/48"}`}>
            <p className="truncate text-[9px] font-semibold tablet:text-xs">{step.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function VaniVisual({ activeStep }: { activeStep: number }) {
  const prefersReducedMotion = useReducedMotion();
  const bars = [34, 58, 42, 76, 51, 88, 62, 100, 72, 91, 56, 78, 46, 64, 38];
  const messages = [
    "I am listening.",
    "You sound uncertain today.",
    "This connects with what you shared before.",
    "Would it help to slow this decision down?",
  ];

  return (
    <motion.div
      aria-label={`RADHA VANI live companion demonstration. Current step: ${VANI_STEPS[activeStep].label}`}
      className="relative min-h-[32rem] overflow-hidden rounded-2xl bg-[#0b0b0a] text-white tablet:min-h-[42rem]"
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(211,154,44,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(211,154,44,0.07)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
      <motion.span
        className="absolute left-0 top-1/2 h-px w-[88%] origin-left bg-[#e0b65d] shadow-[0_0_18px_rgba(224,182,93,0.82)]"
        animate={{ scaleX: 0.28 + activeStep * 0.22 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      <div className="absolute inset-x-[7%] top-[9%] bottom-[18%] flex flex-col rounded-2xl border border-white/12 bg-[#151410]/90 p-5 tablet:p-8">
        <div className="flex items-center justify-between text-[10px] font-semibold text-white/48 tablet:text-xs">
          <span>RADHA VANI</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#dfb75d]" />PRIVATE SESSION</span>
        </div>

        <div className="mt-8 flex h-28 items-center justify-center gap-1.5 tablet:h-36 tablet:gap-2.5">
          {bars.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="radha-vani-wave-bar block w-1.5 origin-center rounded-full bg-[#d39a2c] tablet:w-2"
              style={{
                height: `${height}%`,
                animationDuration: `${1.15 + (index % 4) * 0.15}s`,
                animationDelay: `${-index * 0.12}s`,
              }}
            />
          ))}
        </div>

        <div className="mt-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl bg-[#e8dfcc] p-4 text-[#171510] tablet:p-6"
            >
              <p className="text-[10px] font-semibold text-[#79520f] tablet:text-xs">{VANI_STEPS[activeStep].label}</p>
              <p className="mt-2 text-base font-semibold leading-snug tablet:text-xl">{messages[activeStep]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 grid grid-cols-4 gap-1.5 tablet:inset-x-8 tablet:bottom-8 tablet:gap-3">
        {VANI_STEPS.map((step, index) => (
          <div key={step.label} className={`min-w-0 rounded-lg px-2 py-3 transition-colors tablet:px-4 ${index === activeStep ? "bg-[#d39a2c] text-[#171510]" : "bg-black/52 text-white/48"}`}>
            <p className="truncate text-[9px] font-semibold tablet:text-xs">{step.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function YugaJourneyBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1440 1040" preserveAspectRatio="none" className="h-full w-full opacity-55">
        <path d="M-60 770 C170 620 196 850 390 690 C590 525 544 318 774 386 C970 444 1014 194 1228 234 C1334 254 1390 136 1510 40" fill="none" stroke="rgba(94,63,10,0.16)" strokeWidth="3" />
        <path
          d="M-60 770 C170 620 196 850 390 690 C590 525 544 318 774 386 C970 444 1014 194 1228 234 C1334 254 1390 136 1510 40"
          fill="none"
          stroke="#b67b1c"
          strokeWidth="4"
          strokeLinecap="round"
          className={prefersReducedMotion ? undefined : "radha-yuga-route"}
          style={{ filter: "drop-shadow(0 0 7px rgba(197,142,41,0.56))" }}
        />
      </svg>
      <span className="absolute left-[22%] top-[44%] h-3 w-3 rounded-full border-2 border-[#b67b1c]/65 bg-[#e4bd62]/70" />
      <span className="absolute right-[29%] top-[28%] h-3 w-3 rounded-full border-2 border-[#b67b1c]/65 bg-[#e4bd62]/70" />
      <span className="absolute right-[8%] top-[13%] h-3 w-3 rounded-full border-2 border-[#b67b1c]/65 bg-[#e4bd62]/70" />
    </div>
  );
}

function YugaVisual({ activeStep }: { activeStep: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-label={`RADHA YUGA interactive learning demonstration. Current step: ${YUGA_STEPS[activeStep].label}`}
      className="relative min-h-[32rem] overflow-hidden rounded-2xl bg-[#12100d] text-white tablet:min-h-[42rem]"
      initial={prefersReducedMotion ? false : { clipPath: "inset(7% 7% 7% 7%)", scale: 0.97 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 opacity-48 [background-image:linear-gradient(rgba(227,182,82,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(227,182,82,0.055)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden="true" />
      <div className="absolute inset-x-6 top-8 flex justify-between text-[10px] font-medium text-white/62 tablet:inset-x-10 tablet:text-xs">
        <span>AN INTERACTIVE JOURNEY</span><span>COMING 2027</span>
      </div>

      <div className="absolute inset-x-0 top-[18%] bottom-[22%] flex items-center justify-center" aria-hidden="true">
        {[292, 218, 144].map((size, index) => (
          <div
            key={size}
            className="radha-yuga-orbit absolute rounded-full border border-[#e3b652]/35"
            style={{
              width: size,
              height: size,
              animationDuration: `${30 + index * 9}s`,
              animationDirection: index % 2 === 0 ? "normal" : "reverse",
              animationDelay: `${-index * 6}s`,
            }}
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e3b652] shadow-[0_0_10px_rgba(227,182,82,0.85)]" />
          </div>
        ))}
        <motion.div
          animate={{ scale: activeStep === 3 ? 1.08 : 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#e3b652] text-[#171510] shadow-[0_0_0_10px_rgba(227,182,82,0.09)] tablet:h-28 tablet:w-28"
        >
          <BookOpen size={40} strokeWidth={1.55} aria-hidden="true" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute inset-x-5 bottom-5 rounded-xl bg-[#e8dfcc] p-4 text-[#171510] tablet:inset-x-8 tablet:bottom-8 tablet:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold text-[#79520f] tablet:text-xs">{YUGA_STEPS[activeStep].label}</p>
              <p className="mt-1 text-base font-semibold tablet:text-xl">{YUGA_STEPS[activeStep].detail}</p>
            </div>
            <span className="font-mono text-xs text-black/48">{activeStep + 1} / 4</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function EcosystemPanorama() {
  const sceneRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "7%", prefersReducedMotion ? "0%" : "-7%"]);
  const signalX = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "-55%", prefersReducedMotion ? "0%" : "165%"]);
  const chapters = [
    { product: "RADHA ISHA", label: "Retail intelligence", icon: ScanLine },
    { product: "RADHA VANI", label: "AI companion", icon: MessageCircle },
    { product: "RADHA YUGA", label: "Learning world", icon: BookOpen },
  ];

  return (
    <motion.figure ref={sceneRef} initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }} className="mt-16 overflow-hidden rounded-lg bg-[#e9e2d3] tablet:mt-24">
      <div className="relative aspect-[16/9] overflow-hidden tablet:aspect-[2.12/1]">
        <motion.div className="absolute -inset-y-[10%] -inset-x-[2%]" style={{ y: imageY }}>
          <Image src="/assets/radha-ai/generated/ecosystem-three-worlds.webp" alt="Three connected RADHA AI worlds for retail intelligence, meaningful conversation, and interactive knowledge" fill loading="eager" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1179px) calc(100vw - 64px), 1312px" className="scale-105 object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,21,16,0.03)_20%,rgba(23,21,16,0.38)_100%)]" aria-hidden="true" />
        <motion.span aria-hidden="true" className="pointer-events-none absolute top-[51%] h-px w-[34%] bg-[linear-gradient(90deg,transparent,rgba(247,203,105,0.98),transparent)] shadow-[0_0_20px_rgba(247,203,105,0.86)]" style={{ x: signalX }} />
      </div>
      <figcaption className="grid grid-cols-3 border-t border-black/10 bg-[#f3eee4]">
        {chapters.map(({ product, label, icon: VisualIcon }, index) => (
          <div key={product} className={`flex min-w-0 items-center gap-2 px-3 py-4 text-[10px] font-semibold text-black/62 tablet:px-6 tablet:text-xs ${index > 0 ? "border-l border-black/10" : ""}`}>
            <VisualIcon size={13} className="shrink-0 text-[#9a6818]" aria-hidden="true" />
            <span className="flex min-w-0 flex-col leading-tight"><span className="truncate text-[9px] text-[#795317] tablet:text-[10px]">{product}</span><span className="truncate text-[10px] text-black/58 tablet:text-xs">{label}</span></span>
          </div>
        ))}
      </figcaption>
    </motion.figure>
  );
}

function ChooseYourFuture() {
  const [active, setActive] = useState<ProductWorld>("isha");

  return (
    <section aria-labelledby="choose-future-heading" className="border-t border-black/10 bg-white">
      <Container className="grid gap-12 py-20 tablet:py-28 desktop:grid-cols-[0.82fr_1.18fr] desktop:gap-24">
        <div className="desktop:sticky desktop:top-32 desktop:self-start">
          <p className="text-sm font-semibold text-[#8a6019]">Choose your future</p>
          <h3 id="choose-future-heading" className="mt-4 max-w-xl text-balance text-4xl font-semibold leading-[1.05] text-[#171510] tablet:text-5xl">
            Start with the world that feels like yours.
          </h3>
          <AnimatePresence mode="wait">
            <motion.p key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-7 max-w-md text-base leading-7 text-black/58">
              {active === "isha" ? "See how a scan becomes a reliable store action." : active === "vani" ? "See how a conversation becomes thoughtful support." : "See how a timeless story becomes an active learning journey."}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="border-t border-black/14">
          {(Object.keys(WORLD_META) as ProductWorld[]).map((world, index) => {
            const meta = WORLD_META[world];
            const activeRow = active === world;
            return (
              <Link
                key={world}
                href={`#radha-${world}`}
                onMouseEnter={() => setActive(world)}
                onFocus={() => setActive(world)}
                onClick={() => setActive(world)}
                className="group relative grid min-h-28 grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-black/14 py-5"
              >
                <span className={`font-mono text-xs transition-colors ${activeRow ? "text-[#8a6019]" : "text-black/36"}`}>0{index + 1}</span>
                <span><span className="block text-xl font-semibold text-[#171510] tablet:text-2xl">{meta.purpose}</span><span className="mt-1 block text-sm text-black/48">{meta.name}</span></span>
                <motion.span animate={{ x: activeRow ? 4 : 0, backgroundColor: activeRow ? meta.color : "#ece8df" }} className="flex h-10 w-10 items-center justify-center rounded-full text-[#171510]">
                  <ArrowDown size={17} aria-hidden="true" />
                </motion.span>
                <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#c78a26]" animate={{ scaleX: activeRow ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function IntelligenceThread({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 55%", "end 45%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <aside aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 z-20 hidden w-8 desktop:block wide:left-8">
      <div className="sticky top-28 flex h-[calc(100vh-8rem)] justify-center">
        <span className="absolute inset-y-8 w-px bg-black/10" />
        <motion.span className="absolute inset-y-8 w-px origin-top bg-[#d39a2c] shadow-[0_0_10px_rgba(211,154,44,0.62)]" style={{ scaleY: prefersReducedMotion ? 1 : scaleY }} />
        <span className="absolute top-8 h-2 w-2 rounded-full bg-[#e7b64f] shadow-[0_0_0_6px_rgba(211,154,44,0.14)]" />
        <span className="absolute bottom-8 font-mono text-[9px] text-black/38 [writing-mode:vertical-rl]">INTELLIGENCE THREAD</span>
      </div>
    </aside>
  );
}

export function ProductWorlds() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const ishaRef = useRef<HTMLElement>(null);
  const vaniRef = useRef<HTMLElement>(null);
  const yugaRef = useRef<HTMLElement>(null);
  const isha = useChapterProgress(ishaRef, "isha", ISHA_STEPS.length);
  const vani = useChapterProgress(vaniRef, "vani", VANI_STEPS.length);
  const yuga = useChapterProgress(yugaRef, "yuga", YUGA_STEPS.length);

  useGSAP(() => {
    if (!journeyRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: journeyRef.current,
      start: "top top",
      end: "bottom top",
      onLeave: () => announceWorld("default"),
      onLeaveBack: () => announceWorld("default"),
    });

    return () => trigger.kill();
  }, { scope: journeyRef });

  return (
    <section id="products" aria-labelledby="products-heading" className="scroll-mt-24 bg-[#f7f7f5]">
      <Container className="py-24 tablet:py-36">
        <ScrollReveal>
          <div className="grid gap-8 desktop:grid-cols-[0.88fr_1.12fr] desktop:items-end">
            <h2 id="products-heading" className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-normal text-ink tablet:text-6xl desktop:text-[5.25rem]">One vision. Three intelligent products.</h2>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-ink-muted desktop:justify-self-end">Three clear jobs: run a store, support a person, and make timeless knowledge explorable.</p>
          </div>
        </ScrollReveal>
        <EcosystemPanorama />
      </Container>

      <ChooseYourFuture />

      <div ref={journeyRef} className="relative">
        <IntelligenceThread targetRef={journeyRef} />

        <article ref={ishaRef} id="radha-isha" className="scroll-mt-24 bg-[#e9e2d3] desktop:min-h-[155vh]">
          <Container className="product-chapter-layout py-16 desktop:sticky desktop:top-20 desktop:min-h-[calc(100vh-5rem)] desktop:py-12">
            <div className="product-chapter-intro max-w-xl py-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-brand-800"><Icon icon={ScanLine} size={18} />Launching 2026</div>
              <p className="mt-8 text-sm font-semibold text-ink-muted">RADHA ISHA</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] text-ink tablet:text-6xl">A scan becomes a store action.</h3>
              <p className="mt-6 text-pretty text-lg leading-8 text-ink-muted">Find the product, verify the truth, surface the risk, and give the team one clear next step.</p>
            </div>
            <div className="product-chapter-visual">
              <IshaVisual activeStep={isha.activeStep} />
            </div>
            <div className="product-chapter-details max-w-xl">
              <ChapterSteps steps={ISHA_STEPS} activeStep={isha.activeStep} onSelect={isha.setActiveStep} />
              <CapabilityList items={["Inventory and expiry", "Barcode and OCR", "Audits and analytics", "Operational automation"]} />
              <Button href="/platform" className="mt-9">Explore RADHA ISHA <ArrowRight size={16} aria-hidden="true" /></Button>
            </div>
          </Container>
        </article>

        <article ref={vaniRef} id="radha-vani" className="scroll-mt-24 bg-[#090908] text-white desktop:min-h-[155vh]">
          <Container className="product-chapter-layout product-chapter-layout-reverse py-16 desktop:sticky desktop:top-20 desktop:min-h-[calc(100vh-5rem)] desktop:py-12">
            <div className="product-chapter-intro max-w-xl py-4 desktop:ml-auto">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#dfb75d]"><Icon icon={MessageCircle} size={18} />Coming 2027</div>
              <p className="mt-8 text-sm font-semibold text-white/55">RADHA VANI</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] text-white tablet:text-6xl">A voice becomes thoughtful support.</h3>
              <p className="mt-6 text-pretty text-lg leading-8 text-white/68">A private companion that listens for meaning, remembers relevant context, and responds with care.</p>
            </div>
            <div className="product-chapter-visual">
              <VaniVisual activeStep={vani.activeStep} />
            </div>
            <div className="product-chapter-details max-w-xl desktop:ml-auto">
              <ChapterSteps inverted steps={VANI_STEPS} activeStep={vani.activeStep} onSelect={vani.setActiveStep} />
              <CapabilityList inverted items={["Listens with context", "Meaningful conversation", "Personal reflection", "Privacy by design"]} />
              <Button href="/#contact" className="mt-9 bg-[#d39a2c] text-[#171510] hover:bg-[#e1b255]">Get VANI early access <ArrowRight size={16} aria-hidden="true" /></Button>
            </div>
          </Container>
        </article>

        <article ref={yugaRef} id="radha-yuga" className="relative isolate scroll-mt-24 overflow-hidden bg-[#cfc5aa] desktop:min-h-[155vh]">
          <YugaJourneyBackdrop />
          <Container className="product-chapter-layout relative z-10 py-16 desktop:sticky desktop:top-20 desktop:min-h-[calc(100vh-5rem)] desktop:py-12">
            <div className="product-chapter-intro max-w-xl py-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#68470f]"><Icon icon={Sparkles} size={18} />Coming 2027</div>
              <p className="mt-8 text-sm font-semibold text-black/65">RADHA YUGA</p>
              <h3 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] text-[#171510] tablet:text-6xl">A story becomes lived wisdom.</h3>
              <p className="mt-6 text-pretty text-lg leading-8 text-black/64">Enter a story, make a choice, complete a quest, and carry the lesson into reflection.</p>
            </div>
            <div className="product-chapter-visual">
              <YugaVisual activeStep={yuga.activeStep} />
            </div>
            <div className="product-chapter-details max-w-xl">
              <ChapterSteps steps={YUGA_STEPS} activeStep={yuga.activeStep} onSelect={yuga.setActiveStep} />
              <CapabilityList items={["Interactive stories", "Guided quests", "Learning challenges", "Reflective practice"]} />
              <span className="mt-9 inline-flex items-center gap-2 rounded-full border border-black/18 px-6 py-3 text-sm font-semibold text-black/65"><BookOpen size={16} aria-hidden="true" />Coming soon</span>
            </div>
          </Container>
        </article>
      </div>
    </section>
  );
}
