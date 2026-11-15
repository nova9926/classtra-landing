import { useLayoutEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { usePrefs } from '@/lib/prefs'
import { cn } from '@/lib/utils'

// Size of one repeat of the far layer, in px. Must match index.css.
const PERIOD = { board: 48, chalk: 200 } // .chalk-grid, .paper-grain
const mobile =
  typeof window === 'undefined' ? null : window.matchMedia('(max-width: 767.98px)')

type ParallaxLayersProps = {
  /** Far layer: "board" draws the chalk grid, "chalk" a subtle paper grain. */
  tone?: 'board' | 'chalk'
  /**
   * One class string per orb: position, size and color, e.g.
   * "top-[30%] -right-28 size-[520px] bg-accent/25".
   * The position is where the orb sits when that part of the band is in the middle of
   * the screen.
   */
  orbs?: string[]
  /**
   * Which edges fade to the band's plain colour. Where two bands of different colours
   * meet, both fade, so no glow or grid line is ever cut by the colour change.
   */
  feather?: { top?: boolean; bottom?: boolean }
}

/**
 * Background depth for a band of sections (LANDING_SPEC.md "Background depth").
 * Used by SectionBand; the glass content goes on top.
 *  - far:    chalk grid (board) or paper grain (chalk), 0.2x scroll speed
 *  - middle: blurred orbs, 0.5x scroll speed, drifting slowly
 * Phones get half the strength. Reduced motion gets none.
 * Only translate3d is animated, never blur or shadow.
 */
export function ParallaxLayers({
  tone = 'board',
  orbs = [],
  feather = { top: true, bottom: true },
}: ParallaxLayersProps) {
  // By night the paper sections are dark too, so they get the chalk grid instead of the grain.
  const dark = usePrefs().theme === 'dark'
  const pattern = tone === 'board' || dark ? 'board' : 'chalk'
  const edge = tone === 'board' ? 'to-board' : 'to-paper'
  const ref = useRef<HTMLDivElement>(null)
  const reduced = Boolean(useReducedMotion())
  const { scrollY } = useScroll()
  const top = useMotionValue(0) // where the band starts on the page

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => top.set(el.getBoundingClientRect().top + window.scrollY)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [top])

  // The far layer is a repeating pattern, so wrapping the offset looks identical and keeps
  // the layer small. A layer that moves at 0.2x is pushed back by 0.8 of the scroll.
  const period = PERIOD[pattern]
  const farY = useTransform(() => {
    const push = reduced ? 0 : mobile?.matches ? 0.4 : 0.8
    return (((scrollY.get() * push - top.get()) % period) + period) % period
  })

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={cn(
          'absolute inset-x-0 will-change-transform',
          pattern === 'board' ? 'chalk-grid' : 'paper-grain',
        )}
        style={{ y: farY, top: -period, bottom: -period }}
      />
      {orbs.map((orb, i) => (
        <Orb key={orb} className={orb} index={i} bandTop={top} reduced={reduced} />
      ))}
      {feather.top && (
        <div className={cn('absolute inset-x-0 top-0 h-40 bg-linear-to-t from-transparent md:h-56', edge)} />
      )}
      {feather.bottom && (
        <div className={cn('absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent md:h-56', edge)} />
      )}
    </div>
  )
}

type OrbProps = {
  className: string
  index: number
  bandTop: MotionValue<number>
  reduced: boolean
}

/**
 * One blurred light. It sits exactly where its classes put it when it is in the middle
 * of the screen, and lags behind the scroll by half (a quarter on phones) around that
 * point, so it never wanders far from home.
 */
function Orb({ className, index, bandTop, reduced }: OrbProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const centre = useMotionValue(0) // the orb's centre, measured from the top of the band

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => centre.set(el.offsetTop + el.offsetHeight / 2)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [centre])

  const y = useTransform(() => {
    if (reduced) return 0
    const lag = mobile?.matches ? 0.25 : 0.5
    const screenMiddle = scrollY.get() + window.innerHeight / 2
    return (screenMiddle - bandTop.get() - centre.get()) * lag
  })

  return (
    <motion.div className="absolute inset-0" style={{ y }}>
      <div
        ref={ref}
        className={cn('orb', className)}
        style={{ '--orb-duration': `${22 + (index % 4) * 3}s` } as React.CSSProperties}
      />
    </motion.div>
  )
}
