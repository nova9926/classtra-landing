import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Icon } from '@/components/landing/Icon'
import { cn } from '@/lib/utils'
import { useContent, usePrefs } from '@/lib/prefs'

// The tiny "working pieces of the app" inside the feature tiles (LANDING_SPEC.md §4).
// Each one plays once, when it scrolls into view. With reduced motion they show
// their final state straight away. Only transform, opacity and color are animated.

const EASE = [0.22, 1, 0.36, 1] as const
const tagColor = { paid: 'bg-paid', partial: 'bg-partial', late: 'bg-late' } as const

/** `play` turns true the first time the element is mostly on screen. */
function usePlayOnce() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = Boolean(useReducedMotion())
  return { ref, play: inView || reduced, reduced }
}

/** Paiements & relances: 3 payment rows; the late one pulses softly once. */
export function PaymentsMini() {
  const { ref, play, reduced } = usePlayOnce()
  const { samples } = useContent().features
  return (
    <div ref={ref} className="flex flex-col gap-2 text-[0.9375rem]">
      {samples.payments.map((row, i) => (
        <motion.div
          key={row.name}
          className="flex items-center justify-between gap-3 rounded-2xl bg-chalk/6 px-4 py-3"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={
            play
              ? {
                  opacity: 1,
                  y: 0,
                  ...(row.status === 'late' && !reduced
                    ? {
                        backgroundColor: [
                          'rgba(244, 241, 234, 0.06)',
                          'rgba(246, 207, 198, 0.3)',
                          'rgba(244, 241, 234, 0.06)',
                        ],
                      }
                    : {}),
                }
              : undefined
          }
          transition={{
            duration: 0.5,
            ease: EASE,
            delay: i * 0.1,
            backgroundColor: { duration: 1.4, delay: 0.8, times: [0, 0.4, 1] },
          }}
        >
          <span className="flex flex-col leading-tight">
            <span className="font-medium">{row.name}</span>
            <span className="text-sm text-muted-on-board">{row.detail}</span>
          </span>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap text-ink',
              tagColor[row.status],
            )}
          >
            {row.tag}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/** Présences: 5 students; the check marks tick one by one. */
export function AttendanceMini() {
  const { ref, play, reduced } = usePlayOnce()
  const { samples } = useContent().features
  return (
    <div ref={ref} className="flex flex-col text-[0.9375rem]">
      {samples.attendance.map((name, i) => (
        <div
          key={name}
          className="flex items-center justify-between border-b border-chalk/10 py-2 last:border-b-0"
        >
          {name}
          <span className="relative size-6 rounded-full border border-chalk/35">
            <motion.span
              className="absolute -inset-px flex items-center justify-center rounded-full bg-accent text-ink"
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              animate={play ? { opacity: 1, scale: 1 } : undefined}
              transition={{ type: 'spring', bounce: 0, duration: 0.35, delay: 0.3 + i * 0.25 }}
            >
              <Icon name="check" size={16} />
            </motion.span>
          </span>
        </div>
      ))}
    </div>
  )
}

/** Inscriptions: a small student card. */
export function EnrolmentMini() {
  const { ref, play, reduced } = usePlayOnce()
  const { student } = useContent().features.samples
  return (
    <div ref={ref}>
      <motion.div
        className="flex items-center gap-3 rounded-2xl bg-chalk/6 p-4"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-ink">
          {student.initials}
        </span>
        <span className="flex min-w-0 flex-col leading-snug">
          <span className="font-semibold">{student.name}</span>
          <span className="text-sm text-muted-on-board">{student.group}</span>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-on-board">
            <Icon name="call" size={14} />
            {student.phone}
          </span>
        </span>
      </motion.div>
    </div>
  )
}

/** Attestations: a tiny certificate slides out of a slot, like a page being printed. */
export function CertificateMini() {
  const { ref, play, reduced } = usePlayOnce()
  const { certificate } = useContent().features.samples
  return (
    <div ref={ref} className="mx-auto w-full max-w-[240px]">
      <div className="relative z-10 h-3 rounded-full border border-chalk/18 bg-ink/60" />
      <div className="-mt-1.5 overflow-hidden px-3">
        <motion.div
          className="flex flex-col gap-0.5 rounded-b-xl bg-chalk px-4 pt-5 pb-4 text-ink"
          initial={reduced ? false : { y: '-100%' }}
          animate={play ? { y: '0%' } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        >
          <span className="flex items-center justify-between">
            <span className="heading text-lg">{certificate.title}</span>
            <Icon name="workspace_premium" size={22} className="text-board" />
          </span>
          <span className="text-sm font-semibold">{certificate.course}</span>
          <span className="text-xs text-muted-on-chalk">{certificate.name}</span>
        </motion.div>
      </div>
    </div>
  )
}

// Position (top) and height of each block, in % of the day column.
const BLOCKS = [
  [
    { top: 6, height: 34, color: 'bg-accent' },
    { top: 54, height: 28, color: 'bg-chalk/25' },
  ],
  [{ top: 22, height: 42, color: 'bg-orb-mint' }],
  [
    { top: 6, height: 26, color: 'bg-chalk/25' },
    { top: 44, height: 42, color: 'bg-accent' },
  ],
  [{ top: 30, height: 36, color: 'bg-orb-mint' }],
  [{ top: 10, height: 46, color: 'bg-chalk/25' }],
]

/** Groupes & salles: a 5-day mini calendar; the blocks drop in one by one. */
export function ScheduleMini() {
  const { ref, play, reduced } = usePlayOnce()
  const { samples } = useContent().features
  return (
    <div ref={ref} className="grid grid-cols-5 gap-1.5 text-center text-[11px] font-semibold text-muted-on-board">
      {samples.days.map((day, d) => (
        <div key={day}>
          {day}
          <div className="relative mt-1.5 h-24 rounded-xl bg-chalk/6">
            {BLOCKS[d].map((block, b) => (
              <motion.div
                key={b}
                className={cn('absolute inset-x-1 origin-top rounded-md', block.color)}
                style={{ top: `${block.top}%`, height: `${block.height}%` }}
                initial={reduced ? false : { opacity: 0, scaleY: 0.3 }}
                animate={play ? { opacity: 1, scaleY: 1 } : undefined}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 + d * 0.1 + b * 0.08 }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Suivi des prospects: Appel → Visite → Inscrit, with one dot moving across. */
export function LeadsMini() {
  const { ref, play, reduced } = usePlayOnce()
  const { leadStages } = useContent().features
  // In Arabic the columns run right to left, so the dot travels the other way.
  const way = usePrefs().lang === 'ar' ? -1 : 1
  const at = (columns: number) => `${way * columns * 33.33}%`
  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-3 gap-2 text-center text-sm font-semibold">
        {leadStages.map((stage) => (
          <div key={stage} className="rounded-2xl bg-chalk/6 px-2 pt-3 pb-10">
            {stage}
          </div>
        ))}
      </div>
      {/* The wrapper is as wide as the track, so x in % moves the dot one column at a time. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-3.5 h-3.5"
        initial={reduced ? { x: at(2) } : { x: at(0) }}
        animate={play && !reduced ? { x: [at(0), at(1), at(1), at(2)] } : undefined}
        transition={{ duration: 2.4, ease: EASE, times: [0, 0.35, 0.6, 1], delay: 0.4 }}
      >
        <span className="absolute start-[16.66%] block size-3.5 -translate-x-1/2 rounded-full bg-accent rtl:translate-x-1/2 shadow-[0_0_0_4px_rgb(242_183_5/0.2)]" />
      </motion.div>
    </div>
  )
}

/** Pensé pour l'Algérie: two plain chips on the yellow tile. No animation. */
export function AlgeriaMini({ chips }: { chips: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span key={chip} className="rounded-full border border-ink/15 bg-ink/10 px-4 py-1.5 font-semibold">
          {chip}
        </span>
      ))}
    </div>
  )
}
