export interface SequenceDef {
  id: string;
  frameCount: number;
  safeStartFrame: number;
  safeEndFrame: number;
  iaSection: number;
  posterInitial: string;
  posterFinal: string;
  /**
   * Horizontal crop anchor (0 = left, 0.5 = center, 1 = right) used when a
   * `cover` fit has to crop this sequence's 16:9 photography down to a
   * narrow portrait viewport. Most sequences compose their subject near
   * center and don't need this. Default 0.5.
   */
  focalX: number;
}

function defineSequence(
  id: string,
  frameCount: number,
  iaSection: number,
  focalX = 0.5
): SequenceDef {
  return {
    id,
    frameCount,
    safeStartFrame: 1,
    safeEndFrame: frameCount,
    iaSection,
    posterInitial: `/assets/radha/posters/${id}-initial.jpg`,
    posterFinal: `/assets/radha/posters/${id}-final.jpg`,
    focalX,
  };
}

export const SEQUENCES = {
  "01-radha-reveal": defineSequence("01-radha-reveal", 300, 3),
  // Early-to-mid frames stage the phone left-of-center with the product
  // pack well to the right — a dead-center crop on narrow viewports lands
  // in the empty gap between them. Bias left so the phone (the sequence's
  // consistent subject) survives the crop.
  "02-scan-product-truth": defineSequence("02-scan-product-truth", 300, 5, 0.38),
  "03-retail-operations": defineSequence("03-retail-operations", 300, 8),
  // Composition spans phone (left) — safe/vault — dashboard (right) across
  // the full 16:9 frame with wide gaps between them; a center crop on a
  // narrow viewport lands entirely in empty background. Bias toward the
  // phone, the one subject present throughout the sequence.
  "04-private-owner-dashboard": defineSequence(
    "04-private-owner-dashboard",
    300,
    10,
    0.15
  ),
  "05-complete-ecosystem": defineSequence("05-complete-ecosystem", 255, 11),
} as const satisfies Record<string, SequenceDef>;

export type SequenceId = keyof typeof SEQUENCES;

export function frameSrc(id: SequenceId, frame: number): string {
  return `/assets/radha/sequences/${id}/${String(frame).padStart(3, "0")}.jpg`;
}
