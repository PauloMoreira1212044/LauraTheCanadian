import confetti from "canvas-confetti";

// Confetti-palette colours, matching the page theme.
const COLORS = ["#ff7a8a", "#ffd166", "#2ec4b6", "#b8a4ff", "#ff9ec4"];

/**
 * The main celebratory burst, fired once the photo + hat are in place.
 * Two overlapping bursts give it a fuller, "popping out of the box" feel.
 * `disableForReducedMotion` makes canvas-confetti a no-op for users who ask
 * for reduced motion — we skip the big motion for them on purpose.
 */
export function fireConfettiBurst() {
  const base = {
    colors: COLORS,
    disableForReducedMotion: true,
    origin: { x: 0.5, y: 0.62 }, // roughly where the box sits
  };

  confetti({
    ...base,
    particleCount: 90,
    spread: 75,
    startVelocity: 46,
  });

  confetti({
    ...base,
    particleCount: 55,
    spread: 110,
    startVelocity: 30,
    scalar: 0.9,
    origin: { x: 0.5, y: 0.66 },
  });
}

/**
 * A gentle, low-volume drift used to keep the scene feeling alive after the
 * reveal. Sprinkles a few slow particles from the top edge.
 */
export function driftConfetti() {
  confetti({
    colors: COLORS,
    disableForReducedMotion: true,
    particleCount: 6,
    startVelocity: 0,
    ticks: 320,
    gravity: 0.5,
    scalar: 0.8,
    spread: 90,
    origin: { x: Math.random(), y: -0.05 },
  });
}
