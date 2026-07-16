/**
 * A ribbon bow that sits on top of the gift-box lid.
 * Inline SVG so it can be animated (untied) with Framer Motion by the parent.
 */
export default function RibbonBow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 84"
      className={className}
      role="img"
      aria-label="ribbon bow"
    >
      {/* Tails hanging down from the knot */}
      <path
        d="M60 44 C 54 60, 44 74, 34 80 L 48 50 Z"
        fill="#e85d72"
      />
      <path
        d="M60 44 C 66 60, 76 74, 86 80 L 72 50 Z"
        fill="#e85d72"
      />

      {/* Left loop */}
      <path
        d="M60 42 C 30 8, 4 22, 14 42 C 4 60, 38 62, 60 42 Z"
        fill="#ff7a8a"
        stroke="#ffffff"
        strokeWidth="2"
      />
      {/* Right loop */}
      <path
        d="M60 42 C 90 8, 116 22, 106 42 C 116 60, 82 62, 60 42 Z"
        fill="#ff7a8a"
        stroke="#ffffff"
        strokeWidth="2"
      />

      {/* Centre knot */}
      <rect x="51" y="30" width="18" height="24" rx="7" fill="#e85d72" />
    </svg>
  );
}
