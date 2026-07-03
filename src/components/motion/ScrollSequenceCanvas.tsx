"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SEQUENCES, type SequenceId } from "@/lib/sequences";
import { ensureFrameLoaded, getLoadedFrame, releaseSequence } from "./frameCache";
import { useReducedMotion } from "./useReducedMotion";

const PREFETCH_AHEAD = 12;
// Flip on locally to debug ScrollTrigger bounds; never true in production.
const DEBUG_MARKERS = false;

interface ScrollSequenceCanvasProps {
  sequenceId: SequenceId;
  id?: string;
  ariaLabelledBy?: string;
  pinDesktop?: boolean;
  scrollDistance?: string;
  className?: string;
  children?: React.ReactNode;
  /** Gradient scrim behind overlay copy, for legibility over photographic frames. */
  scrim?: boolean;
  /** Fires once the scrub (desktop) or play-once (mobile) tween reaches the final frame. */
  onSectionComplete?: () => void;
  /** Chapter number (1-based) — renders a small editorial "01 / 05" marker. */
  chapter?: number;
  totalChapters?: number;
  /**
   * Caps the scrub at a partial frame instead of the sequence's full
   * `safeEndFrame` — used by the homepage's bookend chapters (hero open,
   * final CTA), which want one short, punchy dolly through part of a
   * sequence rather than the full 300-frame traverse `/showcase` uses.
   */
  endFrame?: number;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  focalX: number
) {
  const canvasRatio = width / height;
  const imageRatio = img.naturalWidth / img.naturalHeight;
  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imageRatio;
    offsetX = (width - drawWidth) * focalX;
  } else {
    drawWidth = width;
    drawHeight = width / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

export function ScrollSequenceCanvas({
  sequenceId,
  id,
  ariaLabelledBy,
  pinDesktop = true,
  scrollDistance = "+=200%",
  className = "",
  children,
  scrim = true,
  onSectionComplete,
  chapter,
  totalChapters = 5,
  endFrame,
}: ScrollSequenceCanvasProps) {
  const sequence = SEQUENCES[sequenceId];
  const targetEndFrame = Math.min(endFrame ?? sequence.safeEndFrame, sequence.safeEndFrame);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(sequence.safeStartFrame);
  const prefersReducedMotion = useReducedMotion();
  const drawFrameRef = useRef<(frame: number) => void>(() => {});

  const drawFrame = useCallback(
    (frame: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      currentFrameRef.current = frame;

      let img = getLoadedFrame(sequenceId, frame);
      if (!img) {
        ensureFrameLoaded(sequenceId, frame, () => {
          if (currentFrameRef.current === frame) drawFrameRef.current(frame);
        });
        // Show the nearest already-loaded earlier frame while this one
        // streams in, so scrubbing never flashes a blank canvas.
        for (let back = frame - 1; back >= sequence.safeStartFrame; back -= 1) {
          const fallback = getLoadedFrame(sequenceId, back);
          if (fallback) {
            img = fallback;
            break;
          }
        }
      }

      const prefetchEnd = Math.min(frame + PREFETCH_AHEAD, sequence.safeEndFrame);
      for (let f = frame + 1; f <= prefetchEnd; f += 1) {
        ensureFrameLoaded(sequenceId, f);
      }

      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const targetWidth = Math.round(width * dpr);
      const targetHeight = Math.round(height * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawCover(ctx, img, width, height, sequence.focalX);
    },
    [sequenceId, sequence.safeEndFrame, sequence.safeStartFrame, sequence.focalX]
  );

  useEffect(() => {
    drawFrameRef.current = drawFrame;
  }, [drawFrame]);

  // First paint, before hydration settles: draw the start frame once we
  // can, and clean up this sequence's memory when the section unmounts.
  useEffect(() => {
    drawFrame(sequence.safeStartFrame);
    return () => releaseSequence(sequenceId, sequence.frameCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceId]);

  // Canvas backing store must track container size changes, but resizing
  // is layout-driven, never scroll-driven — keeps the scroll path pure.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => drawFrame(currentFrameRef.current));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [drawFrame]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        drawFrame(targetEndFrame);
        onSectionComplete?.();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1180px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const state = { frame: sequence.safeStartFrame };

          if (isDesktop) {
            gsap.to(state, {
              frame: targetEndFrame,
              ease: "none",
              snap: "frame",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: scrollDistance,
                scrub: true,
                pin: pinDesktop,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: DEBUG_MARKERS,
              },
              onUpdate: () => drawFrame(Math.round(state.frame)),
              onComplete: () => onSectionComplete?.(),
            });
          } else {
            // Mobile/tablet-narrow: never pin, play through once, settle
            // on the final frame — must not trap scroll (Motion Architecture).
            gsap.to(state, {
              frame: targetEndFrame,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true,
              },
              onUpdate: () => drawFrame(Math.round(state.frame)),
              onComplete: () => {
                drawFrame(targetEndFrame);
                onSectionComplete?.();
              },
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [sequenceId, prefersReducedMotion, targetEndFrame] }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative h-screen min-h-[36rem] w-full overflow-hidden bg-surface-inverted tablet:rounded-[2rem] ${className}`}
    >
      <Image
        src={sequence.posterInitial}
        alt=""
        aria-hidden="true"
        fill
        priority={sequenceId === "01-radha-reveal"}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: `${sequence.focalX * 100}% 50%` }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {scrim ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
        />
      ) : null}
      {chapter ? (
        <span
          aria-hidden="true"
          className="absolute right-6 top-24 z-10 font-mono text-xs uppercase tracking-[0.35em] text-white mix-blend-difference tablet:right-10"
        >
          {String(chapter).padStart(2, "0")} / {String(totalChapters).padStart(2, "0")}
        </span>
      ) : null}
      {children ? (
        <div className="relative z-10 flex h-full w-full flex-col justify-end pb-20 tablet:pb-24">
          {children}
        </div>
      ) : null}
    </section>
  );
}
