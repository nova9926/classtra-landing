import { useRef } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionProps,
  type UseInViewOptions,
} from "motion/react"

type MarginType = UseInViewOptions["margin"]

// Magic UI blur-fade, tuned for LANDING_SPEC.md "Section reveals": fade up 16px in
// 0.6s with the calm ease, once only, when scrolled into view. The blur is off by
// default (the spec forbids animating blur on scroll, and a filter on a parent
// also stops the glass inside it from blurring). Reduced motion: opacity only.

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: MarginType
  /** e.g. "6px". Leave unset for no blur. */
  blur?: string
}

export function BlurFade({
  children,
  className,
  duration = 0.6,
  delay = 0,
  offset = 16,
  direction = "up",
  inView = true,
  inViewMargin = "-50px",
  blur,
  ...props
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const reduced = useReducedMotion()
  const isInView = !inView || inViewResult

  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const from = reduced ? 0 : direction === "right" || direction === "down" ? -offset : offset

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { [axis]: from, opacity: 0, ...(blur ? { filter: `blur(${blur})` } : {}) },
        visible: { [axis]: 0, opacity: 1, ...(blur ? { filter: "blur(0px)" } : {}) },
      }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
