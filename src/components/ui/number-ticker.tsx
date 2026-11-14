import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react"
import { animate, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

// Magic UI number-ticker, tuned for the pricing switch (LANDING_SPEC.md §7):
// it shows the value straight away (no count-up when it scrolls into view) and
// rolls to the new value in 0.4s whenever `value` changes. French number format.
// Reduced motion: the number just changes.

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  /** Seconds. */
  duration?: number
  locale?: string
}

export function NumberTicker({
  value,
  duration = 0.4,
  locale = "fr-FR",
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef(value) // the number currently on screen
  const reduced = useReducedMotion()
  // React writes the text once; after that the animation owns it.
  const [initial] = useState(() => new Intl.NumberFormat(locale).format(value))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const write = (n: number) => {
      shown.current = n
      el.textContent = new Intl.NumberFormat(locale).format(Math.round(n))
    }
    if (reduced) {
      write(value)
      return
    }
    const controls = animate(shown.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: write,
    })
    return () => controls.stop()
  }, [value, duration, locale, reduced])

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} {...props}>
      {initial}
    </span>
  )
}
