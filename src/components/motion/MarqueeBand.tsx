const PHRASES = ["One scan", "One truth", "No exceptions", "Scan", "Verify", "Trust"];

// A slow, film-credit-style text band. Pure CSS animation (no JS, no
// scroll listener); the global reduced-motion rule freezes it on the
// first frame. The moving track is decorative — one sr-only sentence
// carries the meaning for assistive tech.
export function MarqueeBand() {
  const group = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {PHRASES.map((phrase, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-ink-muted">
            {phrase}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-hairline bg-surface-muted py-5">
      <span className="sr-only">One scan. One truth. No exceptions.</span>
      <div aria-hidden="true" className="animate-marquee flex w-max">
        {group}
        {group}
      </div>
    </div>
  );
}
