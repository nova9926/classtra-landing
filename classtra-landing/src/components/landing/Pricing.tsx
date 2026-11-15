import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@/components/landing/Icon'
import { Segmented } from '@/components/landing/Segmented'
import { BlurFade } from '@/components/ui/blur-fade'
import { buttonVariants } from '@/components/ui/button'
import { NumberTicker } from '@/components/ui/number-ticker'
import { cn } from '@/lib/utils'
import type { PlanId } from '@/i18n/types'
import { useContent } from '@/lib/prefs'
import { PRICES, formatNumber } from '@/siteConfig'

const EASE = [0.22, 1, 0.36, 1] as const
// The text that changes with the plan fades out then in: 0.4s in total.
const swap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: EASE },
}

type PricingProps = {
  /** Selected plan. Lives in App, because the contact form preselects it too. */
  plan: PlanId
  onPlanChange: (plan: PlanId) => void
}

/** §7: one big pricing card with a Mensuel · 6 mois · Annuel switch, and what every plan includes. */
export function Pricing({ plan, onPlanChange }: PricingProps) {
  const { pricing } = useContent()
  const active = pricing.plans.find((p) => p.id === plan) ?? pricing.plans[0]
  const price = formatNumber(PRICES[active.id])

  return (
    <section id="pricing" className="relative">
      <div className="mx-auto max-w-[1120px]">
        <BlurFade>
          <p className="eyebrow text-paper-strong">{pricing.eyebrow}</p>
          <h2 className="heading mt-3 text-h2 text-balance">{pricing.title}</h2>
          <p className="mt-4 text-muted-on-paper md:text-[1.3125rem]">{pricing.sub}</p>
        </BlurFade>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <BlurFade className="h-full">
            {/* Board-green card with the chalk grid and a 3px yellow ring. */}
            <div className="on-board relative flex h-full flex-col items-start gap-7 overflow-hidden rounded-panel bg-board p-7 text-chalk ring-3 ring-accent md:p-10">
              <div aria-hidden="true" className="chalk-grid pointer-events-none absolute inset-0" />

              <Segmented
                name="pricing"
                label={pricing.switchLabel}
                options={pricing.plans}
                value={plan}
                onChange={onPlanChange}
                className="relative"
              />

              <div
                role="tabpanel"
                id="pricing-panel"
                aria-labelledby={`pricing-tab-${plan}`}
                className="relative flex w-full flex-col gap-4"
              >
                {/* Fixed height, so the card does not jump when the badge comes and goes. */}
                <div className="h-8">
                  <AnimatePresence initial={false}>
                    {'badge' in active && (
                      <motion.span
                        key="badge"
                        className="inline-flex h-8 items-center rounded-full bg-accent px-3.5 text-sm font-semibold text-ink"
                        {...swap}
                      >
                        {active.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {/* The rolling digits are for the eyes; screen readers get the final price. */}
                  <NumberTicker
                    value={PRICES[active.id]}
                    aria-hidden="true"
                    className="heading text-[clamp(3.5rem,9vw,5.5rem)] leading-none"
                  />
                  <span className="sr-only">
                    {price} {pricing.currency} {active.unit}
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={plan}
                      aria-hidden="true"
                      className="text-xl font-medium text-muted-on-board"
                      {...swap}
                    >
                      {pricing.currency} {active.unit}
                    </motion.span>
                  </AnimatePresence>
                </p>

                <div className="min-h-[3.6rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={plan} className="text-muted-on-board" {...swap}>
                      {active.note}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <a href="#contact" className={cn(buttonVariants(), 'relative mt-auto w-full sm:w-auto')}>
                {active.choose}
                <Icon name="arrow_forward" size={20} flip />
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.06} className="h-full">
            <div className="glass-light flex h-full flex-col gap-6 rounded-panel p-7 md:p-10">
              <h3 className="heading text-[1.625rem]">{pricing.includedTitle}</h3>
              <ul className="flex flex-col gap-4">
                {pricing.included.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Icon name="check_circle" className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* The one extra charge, stated plainly next to what is included. */}
              <p className="mt-auto flex items-start gap-3 border-t border-paper-strong/15 pt-5 text-[0.9375rem] text-muted-on-paper">
                <Icon name="groups" size={22} className="mt-0.5 shrink-0 text-paper-strong" />
                {pricing.extraStudents}
              </p>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.12}>
          <p className="mt-8 text-center text-balance text-muted-on-paper">
            {/* Inline, so the icon stays with the first word when the line wraps. */}
            <Icon name="verified" size={22} className="me-2 align-[-0.3em] text-paper-strong" />
            {pricing.footnote}
          </p>
        </BlurFade>
      </div>
    </section>
  )
}
