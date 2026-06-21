'use client'

/**
 * Quiet page background. One fixed paper surface behind everything so the page
 * reads as a single calm canvas. Self-contained: just the paper colour, a
 * whisper of grain to stop flat banding, and one very faint maroon wash.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#efe9dd]"
    >
      {/* Barely-there maroon wash, bottom corner — keeps the accent present without shouting */}
      <div className="absolute -bottom-48 -right-32 h-[560px] w-[560px] rounded-full bg-[#7d3c3c]/[0.05] blur-[160px]" />

      {/* Fine paper grain to kill flatness/banding */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
