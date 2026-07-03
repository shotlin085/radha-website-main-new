# Motion Architecture

## Global Scheduler
- A single `requestAnimationFrame` scheduler drives all scroll-linked animations.
- Scroll events are passive and only mutate state. Layout thrashing is avoided.

## Adaptive Rendering
- Tested implementations include Canvas sequence (frame drawing) and Video seeking (MP4/WebM). Canvas frame sequence is preferred for desktop scrubbing.
- Progress is strictly mapped from scroll bounds to the deterministic frame range [safeStartFrame, safeEndFrame].

## Mobile Behavior
- Motion components do not pin or trap scroll on mobile.
- Sequences play exactly once when in view, ending on their respective poster frames.
