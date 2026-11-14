import type { ComponentPropsWithoutRef, PointerEvent } from "react"

import { cn } from "@/lib/utils"

// Magic UI magic-card, reduced to what LANDING_SPEC.md §4 asks for: a soft yellow
// light that follows the cursor across the glass. The position is written straight
// to the CSS variables --x / --y on pointermove (no React re-render). Mouse only:
// touch screens never get the glow.

interface MagicCardProps extends ComponentPropsWithoutRef<"div"> {
  /** Turn the cursor light off (e.g. on the solid yellow tile). */
  glow?: boolean
  /** Radius of the light, in px. */
  gradientSize?: number
  /** Any CSS color. Defaults to the accent yellow. */
  gradientColor?: string
  /** 0 to 1. */
  gradientOpacity?: number
}

export function MagicCard({
  children,
  className,
  glow = true,
  gradientSize = 220,
  gradientColor = "var(--color-accent)",
  gradientOpacity = 0.18,
  ...props
}: MagicCardProps) {
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      className={cn("group/magic relative isolate overflow-hidden", className)}
      onPointerMove={glow ? handlePointerMove : undefined}
      {...props}
    >
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/magic:opacity-100"
          style={{
            background: `radial-gradient(${gradientSize}px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, ${gradientColor} ${gradientOpacity * 100}%, transparent), transparent 100%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}
