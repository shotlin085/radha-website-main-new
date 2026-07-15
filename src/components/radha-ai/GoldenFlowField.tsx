"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface FlowPoint {
  offset: number;
  speed: number;
  lane: number;
  radius: number;
}

const FLOW_POINTS: FlowPoint[] = Array.from({ length: 34 }, (_, index) => ({
  offset: (index * 0.071) % 1,
  speed: 0.000018 + (index % 5) * 0.000002,
  lane: index % 9,
  radius: 0.8 + (index % 4) * 0.35,
}));

export function GoldenFlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const pointOnLane = (lane: number, progress: number, time: number) => {
      const x = width * (0.04 + progress * 0.98);
      const baseline = height * (0.23 + lane * 0.074);
      const primaryWave = Math.sin(progress * Math.PI * 2.1 + lane * 0.58 + time * 0.00012);
      const secondaryWave = Math.sin(progress * Math.PI * 5.2 - lane * 0.31 + time * 0.00007);
      const amplitude = height * (0.034 + lane * 0.0018);

      return {
        x,
        y: baseline + primaryWave * amplitude + secondaryWave * amplitude * 0.28,
      };
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      for (let lane = 0; lane < 9; lane += 1) {
        context.beginPath();
        for (let step = 0; step <= 72; step += 1) {
          const progress = step / 72;
          const point = pointOnLane(lane, progress, time);
          if (step === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }

        const opacity = 0.09 + (lane % 3) * 0.035;
        context.strokeStyle = `rgba(176, 119, 24, ${opacity})`;
        context.lineWidth = lane % 4 === 0 ? 1.35 : 0.8;
        context.stroke();
      }

      FLOW_POINTS.forEach((particle) => {
        const progress = (particle.offset + time * particle.speed) % 1;
        const point = pointOnLane(particle.lane, progress, time);
        const pulse = 0.55 + Math.sin(time * 0.0014 + particle.offset * 12) * 0.25;

        context.beginPath();
        context.arc(point.x, point.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(211, 154, 44, ${pulse})`;
        context.fill();
      });

      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    draw(0);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
