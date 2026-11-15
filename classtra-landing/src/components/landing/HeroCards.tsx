import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Icon } from '@/components/landing/Icon'
import { cn } from '@/lib/utils'
import { useContent } from '@/lib/prefs'

const TRAVEL = 120 // px the front layer rises while the scene straightens
const SPREAD = 28 // px of sideways spread

const tagColor = { paid: 'bg-paid', partial: 'bg-partial', late: 'bg-late' } as const

/**
 * The floating glass cards under the hero text (LANDING_SPEC.md §2 and "Pinned hero cards").
 *
 * The scene is `position: sticky` inside a taller track: it stays pinned for ~100vh of
 * scroll (~50vh on phones). While pinned it goes from tilted back to flat, and the three
 * card layers catch up at different speeds (back 0.6x, middle 0.8x, front 1x).
 * Everything is tied 1:1 to the scroll position, and only transforms are animated.
 *
 * Reduced motion: no pin, no tilt. The flat scene just scrolls with the page.
 * The data is sample data, so the whole scene is hidden from screen readers.
 */
export function HeroCards() {
  const { cards } = useContent().hero
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: track, offset: ['start 0.8', 'end end'] })
  // Flat a little before the pin releases, so it rests flat for a moment.
  const p = useTransform(scrollYProgress, [0, 0.85], [0, 1])

  const rotateX = useTransform(p, [0, 1], [18, 0])
  const scale = useTransform(p, [0, 1], [0.9, 1])
  const backY = useTransform(p, [0, 1], [TRAVEL * 0.6, 0])
  const midY = useTransform(p, [0, 1], [TRAVEL * 0.8, 0])
  const frontY = useTransform(p, [0, 1], [TRAVEL, 0])
  const fromRight = useTransform(p, [0, 1], [SPREAD, 0]) // starts inward, spreads out to the left
  const fromLeft = useTransform(p, [0, 1], [-SPREAD, 0]) // starts inward, spreads out to the right

  const still = Boolean(reduced)

  return (
    <div
      ref={track}
      aria-hidden="true"
      className={cn(
        'relative text-start [--scene-h:34.5rem] sm:[--scene-h:37.5rem]',
        !still && 'h-[calc(var(--scene-h)+50svh)] md:h-[calc(var(--scene-h)+100svh)]',
      )}
    >
      <div
        className={cn(
          'h-[var(--scene-h)] [perspective:1200px]',
          !still && 'sticky top-[max(5.5rem,calc(50svh_-_var(--scene-h)_/_2))]',
        )}
      >
        <motion.div
          className="absolute inset-0 origin-bottom will-change-transform"
          style={still ? undefined : { rotateX, scale }}
        >
          {/* Back layer: dashboard */}
          <motion.div className="absolute inset-0" style={still ? undefined : { y: backY }}>
            <div className="glass-dark absolute top-0 left-0 flex w-full flex-col gap-3.5 rounded-card p-4 sm:left-[20%] sm:w-[60%] sm:p-[22px]">
              <div className="flex items-center justify-between">
                <strong className="heading text-xl">{cards.dashboard.title}</strong>
                <span className="text-xs text-muted-on-board">{cards.dashboard.month}</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {cards.dashboard.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className={cn(
                      'rounded-2xl p-3',
                      'accent' in kpi ? 'bg-accent text-ink' : 'border border-chalk/15 bg-chalk/8',
                    )}
                  >
                    <div className={cn('text-xs', !('accent' in kpi) && 'text-muted-on-board')}>
                      {kpi.label}
                    </div>
                    <div className="heading mt-1 text-2xl sm:text-3xl">{kpi.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex h-14 items-end gap-2 sm:h-[90px]">
                {cards.dashboard.bars.map((height, i, all) => (
                  <div
                    key={i}
                    className={cn(
                      'flex-1 rounded-t-md',
                      i === all.length - 1 ? 'bg-accent' : 'bg-chalk/18',
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Middle layer: attendance and payments */}
          <motion.div className="absolute inset-0" style={still ? undefined : { y: midY }}>
            <motion.div
              className="glass-dark absolute top-[196px] left-0 flex w-[64%] flex-col gap-2.5 rounded-3xl p-[18px] sm:top-[200px] sm:w-[33%]"
              style={still ? undefined : { x: fromRight }}
            >
              <div className="text-[13px] font-semibold text-muted-on-board">
                {cards.attendance.title}
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[11px] font-semibold">
                {cards.attendance.days.map(({ day, state }) => (
                  <div key={day}>
                    <div
                      className={cn(
                        'flex h-9 items-center justify-center rounded-[10px]',
                        state === 'present' && 'bg-accent text-ink',
                        state === 'absent' && 'bg-late/30',
                        state === 'empty' && 'border border-dashed border-chalk/35',
                      )}
                    >
                      {state === 'present' && <Icon name="check" size={18} />}
                      {state === 'absent' && <Icon name="close" size={18} />}
                    </div>
                    {day}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-dark absolute top-[300px] right-0 flex w-[70%] flex-col gap-2 rounded-3xl p-[18px] text-[13px] sm:top-[180px] sm:w-[35%]"
              style={still ? undefined : { x: fromLeft }}
            >
              <div className="font-semibold text-muted-on-board">{cards.paymentsTitle}</div>
              {cards.payments.map((payment) => (
                <div
                  key={payment.name}
                  className="flex items-center justify-between rounded-xl bg-chalk/6 px-2.5 py-2"
                >
                  <span>{payment.name}</span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[11px] font-bold text-ink',
                      tagColor[payment.status],
                    )}
                  >
                    {payment.tag}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Front layer: receipt, certificate, notification */}
          <motion.div className="absolute inset-0" style={still ? undefined : { y: frontY }}>
            <motion.div
              className="glass-dark absolute top-[390px] left-[22%] hidden w-[21%] flex-col gap-1 rounded-[20px] p-4 sm:flex"
              style={still ? undefined : { x: fromRight }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-on-board">
                <Icon name="receipt_long" size={16} />
                {cards.receipt.label}
              </span>
              <span className="heading text-2xl whitespace-nowrap">{cards.receipt.value}</span>
              <span className="text-xs text-muted-on-board">{cards.receipt.detail}</span>
            </motion.div>

            <div className="glass-dark absolute top-[420px] left-[45%] hidden w-[22%] flex-col gap-1 rounded-[20px] border-dashed border-chalk/35 p-4 sm:flex">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-on-board">
                <Icon name="workspace_premium" size={16} />
                {cards.certificate.label}
              </span>
              <span className="heading text-xl whitespace-nowrap">{cards.certificate.value}</span>
              <span className="text-xs text-muted-on-board">{cards.certificate.detail}</span>
            </div>

            <motion.div
              className="absolute top-[468px] left-0 inline-flex items-center gap-2.5 rounded-full bg-accent px-[18px] py-3 text-sm font-semibold text-ink shadow-[0_16px_40px_rgb(0_0_0/0.3)] sm:top-[400px] sm:right-[8%] sm:left-auto"
              style={still ? undefined : { x: fromLeft }}
            >
              <Icon name="notifications" size={20} />
              {cards.notification}
            </motion.div>
          </motion.div>
        </motion.div>

        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-soft-on-board">
          {cards.sampleLabel}
        </span>
      </div>
    </div>
  )
}
