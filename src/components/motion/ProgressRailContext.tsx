"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ProgressRailContextValue {
  completed: Set<number>;
  markComplete: (index: number) => void;
}

const ProgressRailContext = createContext<ProgressRailContextValue | null>(null);

// Lets the 5 independent hero-section components report "chapter complete"
// up to a single VerifyProgressRail without prop-drilling through page.tsx.
export function ProgressRailProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  function markComplete(index: number) {
    setCompleted((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }

  return (
    <ProgressRailContext.Provider value={{ completed, markComplete }}>
      {children}
    </ProgressRailContext.Provider>
  );
}

// Returns null outside the provider so hero sections stay safe to reuse
// on pages that don't mount the rail (e.g. /platform).
export function useProgressRail() {
  return useContext(ProgressRailContext);
}
