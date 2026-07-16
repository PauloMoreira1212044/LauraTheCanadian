/**
 * A colourful striped cone party hat with a fluffy pom-pom on top.
 * Pure inline SVG — no external asset. Sizing is controlled by the parent.
 */
export default function PartyHat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 124"
      className={className}
      role="img"
      aria-label="party hat"
    >
      <defs>
        {/* Multi-colour diagonal stripes for the cone body. */}
        <pattern
          id="hat-stripes"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="36" height="36" fill="#ffd166" />
          <rect width="12" height="36" fill="#ff7a8a" />
          <rect x="24" width="12" height="36" fill="#2ec4b6" />
        </pattern>
      </defs>

      {/* Cone */}
      <path
        d="M50 8 L84 112 L16 112 Z"
        fill="url(#hat-stripes)"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Little scalloped brim highlight */}
      <path
        d="M16 112 Q50 100 84 112"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Pom-pom */}
      <g fill="#b8a4ff">
        <circle cx="50" cy="9" r="9" />
        <circle cx="42" cy="8" r="5" />
        <circle cx="58" cy="8" r="5" />
        <circle cx="50" cy="2" r="5" />
        <circle cx="50" cy="15" r="5" />
      </g>
    </svg>
  );
}
