/**
 * Abstract academic geometry — a fixed, non-interactive backdrop rendered
 * behind all page content. Fine gold line-work: a grid, concentric contour
 * rings, and thin geometric shapes. Fully self-contained SVG. Tuned to be
 * clearly visible while staying behind text.
 */
export default function GeometricBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-da-bg)' }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fine grid */}
          <pattern id="da-grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path
              d="M52 0H0V52"
              fill="none"
              stroke="#c9a86c"
              strokeWidth="0.6"
              strokeOpacity="0.14"
            />
          </pattern>
          {/* Warm glow behind the top-right rings */}
          <radialGradient id="da-glow" cx="85%" cy="12%" r="45%">
            <stop offset="0%" stopColor="#c9a86c" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#c9a86c" stopOpacity="0" />
          </radialGradient>
          {/* Gentle vignette so geometry recedes toward the centre where text sits */}
          <radialGradient id="da-fade" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor="#0c0b10" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#0c0b10" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0c0b10" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Grid wash */}
        <rect width="100%" height="100%" fill="url(#da-grid)" />

        {/* Glow */}
        <rect width="100%" height="100%" fill="url(#da-glow)" />

        {/* Concentric contour rings — top-right */}
        <g stroke="#c9a86c" fill="none" strokeOpacity="0.22">
          <circle cx="86%" cy="10%" r="130" strokeWidth="1" />
          <circle cx="86%" cy="10%" r="210" strokeWidth="0.85" />
          <circle cx="86%" cy="10%" r="300" strokeWidth="0.7" />
          <circle cx="86%" cy="10%" r="400" strokeWidth="0.55" />
          <circle cx="86%" cy="10%" r="510" strokeWidth="0.45" />
        </g>

        {/* Concentric contour rings — bottom-left */}
        <g stroke="#c9a86c" fill="none" strokeOpacity="0.18">
          <circle cx="4%" cy="94%" r="100" strokeWidth="1" />
          <circle cx="4%" cy="94%" r="190" strokeWidth="0.8" />
          <circle cx="4%" cy="94%" r="290" strokeWidth="0.6" />
          <circle cx="4%" cy="94%" r="390" strokeWidth="0.5" />
        </g>

        {/* Thin geometric line-work + shapes */}
        <g stroke="#c9a86c" fill="none">
          <path d="M -60 300 L 620 40" strokeWidth="0.8" strokeOpacity="0.16" />
          <path d="M -60 380 L 760 90" strokeWidth="0.8" strokeOpacity="0.12" />
          <path d="M 40 -40 L 40 100%" strokeWidth="0.6" strokeOpacity="0.10" />
          <polygon points="70%,64% 82%,72% 75%,84%" strokeWidth="0.9" strokeOpacity="0.16" />
          <rect
            x="12%"
            y="26%"
            width="110"
            height="110"
            transform="rotate(18 12% 26%)"
            strokeWidth="0.8"
            strokeOpacity="0.13"
          />
          <circle cx="24%" cy="52%" r="4" fill="#c9a86c" fillOpacity="0.35" stroke="none" />
          <circle cx="66%" cy="30%" r="3" fill="#c9a86c" fillOpacity="0.3" stroke="none" />
          <circle cx="48%" cy="78%" r="3.5" fill="#c9a86c" fillOpacity="0.3" stroke="none" />
        </g>

        {/* Fade overlay — softens geometry behind the central reading column */}
        <rect width="100%" height="100%" fill="url(#da-fade)" />
      </svg>
    </div>
  )
}
