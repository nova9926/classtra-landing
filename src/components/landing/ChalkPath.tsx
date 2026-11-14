import { useEffect, useState, type RefObject } from 'react'
import { usePrefs } from '@/lib/prefs'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

type Geometry = {
  /** SVG path, in px, in the container's own coordinates. */
  d: string
  /** Page position and height of the container. */
  top: number
  height: number
  /** The furthest the page can scroll. */
  pageEnd: number
  /** true: the cards sit side by side (desktop). false: stacked (phone). */
  horizontal: boolean
  /** How far along the line (0 to 1) each card is reached. */
  stops: number[]
}

const EMPTY: Geometry = { d: '', top: 0, height: 0, pageEnd: 0, horizontal: true, stops: [] }
const GUTTER_X = 14 // px: where the vertical line runs, in the left gutter on phones

function measure(container: HTMLElement): Geometry {
  const box = container.getBoundingClientRect()
  const w = box.width
  const h = box.height
  const cards = [...container.querySelectorAll('[data-step]')].map(
    (card) => card.getBoundingClientRect().top - box.top,
  )
  const horizontal = window.matchMedia('(min-width: 1024px)').matches
  const top = box.top + window.scrollY
  // Right-to-left: card 1 is on the right and the gutter too, so the line is mirrored.
  const rtl = document.documentElement.dir === 'rtl'
  const mx = (x: number) => (rtl ? w - x : x)
  const pageEnd = document.documentElement.scrollHeight - window.innerHeight

  if (horizontal) {
    // A wavy line in the band above the cards (the container's top padding), from card 1
    // to card 3. Behind the frosted cards it would be blurred away, so it runs above them.
    const d = `M${mx(30)} 28 C${mx(w * 0.2)} 4 ${mx(w * 0.3)} 52 ${mx(w * 0.5)} 28 S${mx(w * 0.8)} 4 ${mx(w - 30)} 28`
    // Each card lights up when the line arrives above it.
    return { d, top, height: h, pageEnd, horizontal, stops: [0.02, 0.36, 0.7] }
  }

  // Stacked: a wavy line down the left gutter, from the top of card 1 to the bottom of the last card.
  const y0 = 24
  const y1 = h - 24
  const x = mx(GUTTER_X)
  const span = y1 - y0
  const d = `M${x} ${y0} C${x - 10} ${y0 + span * 0.2} ${x + 10} ${y0 + span * 0.35} ${x} ${y0 + span * 0.5} S${x - 10} ${y0 + span * 0.85} ${x} ${y1}`
  const stops = cards.map((cardTop) => Math.min(0.98, Math.max(0.02, (cardTop + 24 - y0) / span)))
  return { d, top, height: h, pageEnd, horizontal, stops }
}

type ChalkPathProps = {
  /** The `relative` container holding the step cards (each marked with `data-step`). */
  target: RefObject<HTMLElement | null>
}

/** Marks each card the line has reached with `data-lit` (styled in HowItWorks). */
function lightCards(container: HTMLElement | null, stops: number[], progress: number) {
  container?.querySelectorAll('[data-step]').forEach((card, i) => {
    card.toggleAttribute('data-lit', progress >= (stops[i] ?? 1))
  })
}

/**
 * Hand-drawn yellow chalk line that connects the step cards (LANDING_SPEC.md §6).
 * It draws itself as the user scrolls: the stroke length is tied 1:1 to the scroll
 * position. Horizontal above the cards on desktop, vertical in the left gutter on phones.
 * Each card gets `data-lit` when the line reaches it (set on the DOM directly, so
 * scrolling never re-renders React).
 * Reduced motion: the line is simply shown fully drawn, with every card lit.
 */
export function ChalkPath({ target }: ChalkPathProps) {
  const reduced = useReducedMotion()
  const [geometry, setGeometry] = useState(EMPTY)
  const latest = useMotionValue(EMPTY) // same data, readable from the scroll handler
  const { scrollY } = useScroll()
  const { lang } = usePrefs() // a new language changes the layout (and its direction)

  useEffect(() => {
    const container = target.current
    if (!container) return
    // A ResizeObserver also fires once when it starts observing.
    const observer = new ResizeObserver(() => {
      const next = measure(container)
      latest.set(next)
      setGeometry(next)
    })
    observer.observe(container)
    observer.observe(document.body) // sections above can change height and move this one
    return () => observer.disconnect()
  }, [target, latest, lang])

  // Recomputed whenever the scroll position or the measured geometry changes.
  const progress = useTransform(() => {
    const y = scrollY.get()
    const g = latest.get()
    if (reduced) return 1
    if (!g.d) return 0
    const vh = window.innerHeight
    // Scroll positions where the line starts and where it is fully drawn.
    const start = g.top - vh * (g.horizontal ? 0.85 : 0.7)
    const wanted = g.horizontal
      ? g.top - vh * 0.35 // side by side: done when the cards reach 35% of the screen height
      : g.top + g.height - vh * 0.8 // stacked: done when the last card's bottom is on screen
    // Never later than the page can scroll, so the line always finishes.
    const end = Math.max(start + 1, Math.min(wanted, g.pageEnd))
    return Math.min(1, Math.max(0, (y - start) / (end - start)))
  })
  // Hide the round cap that would otherwise show as a dot before the line starts.
  const opacity = useTransform(progress, [0, 0.02], [0, 1])

  useMotionValueEvent(progress, 'change', (value) => {
    lightCards(target.current, latest.get().stops, value)
  })
  // Also once after each measurement, in case the scroll position does not change.
  useEffect(() => {
    lightCards(target.current, geometry.stops, progress.get())
  }, [target, geometry, progress])

  if (!geometry.d) return null

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      <motion.path
        d={geometry.d}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={geometry.horizontal ? 6 : 5}
        strokeLinecap="round"
        filter="url(#chalk-grain)"
        style={{ pathLength: progress, opacity }}
      />
    </svg>
  )
}
