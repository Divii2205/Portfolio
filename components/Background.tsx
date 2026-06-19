'use client'

/**
 * Unified page atmosphere. One fixed surface behind everything so the page
 * reads as a single designed canvas instead of disconnected dark slabs.
 * Self-contained: glows + grid + grain are all CSS / inline SVG (no network).
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07060b]"
    >
      {/* Soft violet glow, top-left */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#7c3aed]/20 blur-[140px]" />
      {/* Rose glow, bottom-right */}
      <div className="absolute -bottom-48 -right-32 h-[560px] w-[560px] rounded-full bg-[#fda4af]/10 blur-[150px]" />
      {/* Faint central magenta wash for depth */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-[#f0abfc]/[0.06] blur-[160px]" />

      {/* Hairline grid — structure without noise */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)',
        }}
      />

      {/* Fine film grain to kill banding on the gradients */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom vignette to ground the page */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#07060b] to-transparent" />
    </div>
  )
}
