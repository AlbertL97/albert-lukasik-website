/**
 * Abstract academic geometry — a fixed, non-interactive backdrop rendered
 * behind all page content. Fine gold line-work: a faint grid, concentric
 * contour rings, and thin geometric shapes. Fully self-contained SVG,
 * very low opacity so it never competes with text.
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
          <pattern id="da-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="#c9a86c"
              strokeWidth="0.5"
              strokeOpacity="0.06"
            />
          </pattern>
          {/* Soft vignette so the geometry fades toward the edges */}
          <radialGradient id="da-fade" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#0c0b10" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* Grid wash */}
        <rect width="100%" height="100%" fill="url(#da-grid)" />

        {/* Concentric contour rings — top-right */}
        <g stroke="#c9a86c" fill="none" strokeOpacity="0.07">
          <circle cx="88%" cy="12%" r="120" strokeWidth="0.75" />
          <circle cx="88%" cy="12%" r="200" strokeWidth="0.6" />
          <circle cx="88%" cy="12%" r="300" strokeWidth="0.5" />
          <circle cx="88%" cy="12%" r="420" strokeWidth="0.4" />
        </g>

        {/* Concentric contour rings — bottom-left */}
        <g stroke="#c9a86c" fill="none" strokeOpacity="0.06">
          <circle cx="6%" cy="92%" r="90" strokeWidth="0.75" />
          <circle cx="6%" cy="92%" r="170" strokeWidth="0.6" />
          <circle cx="6%" cy="92%" r="260" strokeWidth="0.5" />
        </g>

        {/* Thin geometric line-work */}
        <g stroke="#c9a86c" strokeOpacity="0.08" strokeWidth="0.75" fill="none">
          <path d="M -50 260 L 520 40" />
          <path d="M -50 320 L 640 70" />
          <polygon points="72%,68% 84%,74% 78%,86%" strokeOpacity="0.06" />
          <rect x="14%" y="20%" width="90" height="90" transform="rotate(18 14% 20%)" strokeOpacity="0.05" />
        </g>

        {/* Fade overlay */}
        <rect width="100%" height="100%" fill="url(#da-fade)" />
      </svg>
    </div>
  )
}
