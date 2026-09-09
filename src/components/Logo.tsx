type LogoProps = {
  className?: string
  /** Renders the mark in white outline only — for use on dark backgrounds */
  mono?: boolean
}

/**
 * FanFlow NZ mark — a flowing wave (the "flow") fanning out from a single point
 * (the "fan"), per BRAND_IDENTITY.md.
 */
export default function Logo({ className = 'h-9 w-9', mono = false }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="FanFlow NZ"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ff-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8656" />
          <stop offset="55%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#ED5218" />
        </linearGradient>
      </defs>

      <rect
        width="40"
        height="40"
        rx="11"
        fill={mono ? 'none' : 'url(#ff-tile)'}
        stroke={mono ? 'currentColor' : 'none'}
        strokeOpacity={mono ? 0.35 : 0}
        strokeWidth={mono ? 1.5 : 0}
      />

      {/* Three fanned flow lines, tightest at the source */}
      <g
        fill="none"
        stroke={mono ? 'currentColor' : '#FFFFFF'}
        strokeLinecap="round"
        strokeWidth="2.6"
      >
        <path d="M8 15.5c3.4-3.1 6.3-3.1 8.8 0 2.9 3.6 6.2 3.6 9.9 0" opacity="0.55" />
        <path d="M8 21c3.4-3.4 6.5-3.4 9.3 0 3.1 3.8 6.6 3.8 10.5 0" />
        <path d="M8 26.8c3.4-3.6 6.7-3.6 9.8 0 3.3 4 7 4 11.2 0" opacity="0.55" />
      </g>

      {/* Accent dot — the creator the flow originates from */}
      <circle cx="8" cy="21" r="2.6" fill={mono ? 'currentColor' : '#27AE60'} />
    </svg>
  )
}
