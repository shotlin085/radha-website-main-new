import { frameSrc, type SequenceId } from "@/lib/sequences";

// Module-level so the cache survives re-renders and is shared if a
// sequence is ever mounted more than once. Bounded release happens per
// ScrollSequenceCanvas instance via releaseSequence, not here.
const cache = new Map<string, HTMLImageElement>();

function key(sequenceId: SequenceId, frame: number) {
  return `${sequenceId}:${frame}`;
}

export function ensureFrameLoaded(
  sequenceId: SequenceId,
  frame: number,
  onLoad?: () => void
): HTMLImageElement {
  const k = key(sequenceId, frame);
  const existing = cache.get(k);
  if (existing) return existing;

  const img = new Image();
  img.decoding = "async";
  if (onLoad) img.addEventListener("load", onLoad, { once: true });
  img.src = frameSrc(sequenceId, frame);
  cache.set(k, img);
  return img;
}

export function getLoadedFrame(
  sequenceId: SequenceId,
  frame: number
): HTMLImageElement | undefined {
  const img = cache.get(key(sequenceId, frame));
  return img && img.complete && img.naturalWidth > 0 ? img : undefined;
}

// Frees decoded image memory for a sequence once its section has fully
// scrolled past, keeping only the active + adjacent sequences resident.
export function releaseSequence(sequenceId: SequenceId, frameCount: number) {
  for (let frame = 1; frame <= frameCount; frame += 1) {
    const k = key(sequenceId, frame);
    const img = cache.get(k);
    if (img) {
      img.removeAttribute("src");
      cache.delete(k);
    }
  }
}
