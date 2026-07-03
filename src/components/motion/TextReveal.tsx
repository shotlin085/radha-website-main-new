"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "span";
  id?: string;
  className?: string;
}

// Word-level whileInView reveal — cheaper and less gimmicky than
// character-splitting real sentences. Renders as plain text under reduced
// motion so there's no risk to screen-reader reading order.
export function TextReveal({ children, as = "span", id, className }: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const words = children.split(" ");

  return (
    <Tag id={id} className={className}>
      {words.map((word, index) => (
        <span key={index}>
          <span className="inline-block overflow-hidden align-top pb-[0.1em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
