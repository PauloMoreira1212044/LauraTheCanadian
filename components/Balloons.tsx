/**
 * A few softly floating balloons drifting in the background after the reveal,
 * to keep the scene feeling alive. Kept sparse and low-opacity so it stays
 * tasteful rather than busy. Purely decorative -> aria-hidden.
 */

function Balloon({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden>
      <ellipse cx="30" cy="32" rx="24" ry="30" fill={color} />
      {/* soft highlight */}
      <ellipse cx="22" cy="22" rx="6" ry="9" fill="#ffffff" opacity="0.35" />
      {/* knot */}
      <path d="M27 61 L33 61 L30 68 Z" fill={color} />
      {/* string */}
      <path
        d="M30 68 C 34 76, 26 82, 30 90"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.7"
      />
    </svg>
  );
}

export default function Balloons() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <Balloon
        color="#ff9ec4"
        className="animate-balloon-float absolute left-[8%] top-[14%] w-14 opacity-70 [animation-delay:0s]"
      />
      <Balloon
        color="#2ec4b6"
        className="animate-balloon-float absolute right-[10%] top-[22%] w-12 opacity-60 [animation-delay:1.2s]"
      />
      <Balloon
        color="#b8a4ff"
        className="animate-balloon-float absolute left-[16%] bottom-[10%] w-10 opacity-60 [animation-delay:2.4s]"
      />
      <Balloon
        color="#ffd166"
        className="animate-balloon-float absolute right-[14%] bottom-[14%] w-12 opacity-60 [animation-delay:0.6s]"
      />
    </div>
  );
}
