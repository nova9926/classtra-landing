import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { IconChip } from '@/components/landing/Icon'
import { Tagline } from '@/components/landing/Tagline'
import { BlurFade } from '@/components/ui/blur-fade'
import { useContent } from '@/lib/prefs'

const EASE = [0.22, 1, 0.36, 1] as const
const STRIKE = 0.5 // seconds to draw the chalk line
const ROW_STAGGER = 0.45 // seconds between cards when they sit side by side

type Line = { x: number; y: number; w: number }

/** A slightly wobbly hand-drawn line across one line of text. */
const wobble = ({ x, y, w }: Line) =>
  `M${x - 4} ${y + 1} C${x + w * 0.25} ${y - 4} ${x + w * 0.5} ${y + 4} ${x + w * 0.75} ${y - 1} S${x + w} ${y + 2} ${x + w + 4} ${y}`

/**
 * The problem text with a yellow chalk line drawn across it.
 * The text can wrap, so each line of text is measured and gets its own stroke.
 */
function StruckText({ text, play, delay }: { text: string; play: boolean; delay: number }) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<Line[]>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = textRef.current
    const box = el?.parentElement
    if (!el || !box) return
    const measure = () => {
      const origin = box.getBoundingClientRect()
      setLines(
        [...el.getClientRects()].map((r) => ({
          x: r.left - origin.left,
          y: r.top - origin.top + r.height * 0.55,
          w: r.width,
        })),
      )
    }
    // Measured when the box changes size (a ResizeObserver also fires once when it starts),
    // and again when a font finishes loading: the words then move, even if the box does not.
    // The effect re-runs when the text changes (another language).
    const observer = new ResizeObserver(measure)
    observer.observe(box)
    document.fonts.addEventListener('loadingdone', measure)
    return () => {
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', measure)
    }
  }, [text])

  return (
    <p className="relative text-muted-on-board">
      <span ref={textRef}>{text}</span>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {lines.map((line, i) => (
          <motion.path
            key={i}
            d={wobble(line)}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#chalk-grain)"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={play || reduced ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{
              pathLength: { duration: STRIKE, ease: EASE, delay: delay + i * STRIKE * 0.7 },
              opacity: { duration: 0.01, delay: delay + i * STRIKE * 0.7 },
            }}
          />
        ))}
      </svg>
    </p>
  )
}

function ProblemCard({ problem, solution, index }: { problem: string; solution: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  // Side by side (desktop) the cards go one after another; stacked, each plays as it arrives.
  const [sideBySide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  const start = 0.35 + (sideBySide ? index * ROW_STAGGER : 0)

  return (
    <div ref={ref} className="glass-dark flex flex-col gap-4 rounded-card p-7">
      <IconChip name="close" />
      {/* Screen readers get the problem marked as deleted, then the solution. */}
      <del className="no-underline">
        <StruckText text={problem} play={inView} delay={start} />
      </del>
      <motion.p
        className="heading text-2xl md:text-[1.75rem]"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE, delay: start + STRIKE }}
      >
        {solution}
      </motion.p>
    </div>
  )
}

/** §3: three everyday problems, struck through in chalk, each replaced by its solution. */
export function Problems() {
  const { problems } = useContent()

  return (
    <section className="relative">

      <div className="relative mx-auto max-w-[1120px]">
        <Tagline />

        <BlurFade>
          <h2 className="heading max-w-[900px] text-h2 text-balance">{problems.title}</h2>
        </BlurFade>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {problems.items.map((item, i) => (
            <BlurFade key={item.problem} delay={i * 0.06} className="h-full [&>div]:h-full">
              <ProblemCard problem={item.problem} solution={item.solution} index={i} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
