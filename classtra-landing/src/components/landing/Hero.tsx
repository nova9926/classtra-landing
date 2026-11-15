import { motion, useReducedMotion } from 'motion/react'
import { ChalkText } from '@/components/landing/ChalkText'
import { HeroCards } from '@/components/landing/HeroCards'
import { Icon } from '@/components/landing/Icon'
import { buttonVariants } from '@/components/ui/button'
import { useFontReady } from '@/hooks/use-font-ready'
import { useContent, usePrefs } from '@/lib/prefs'

const EASE = [0.22, 1, 0.36, 1] as const
const CHALK_DELAY = 0.15 // the chalk starts just after the H1 begins to fade in
const REST_DELAY = 1.1 // sub, buttons, chips and cards follow the chalk writing

export function Hero() {
  const { hero } = useContent()
  const { lang } = usePrefs()
  // The heading face differs in Arabic; wait for whichever one this language uses.
  const ready = useFontReady(
    lang === 'ar' ? '700 1em "Reem Kufi"' : '700 1em "Stardos Stencil"',
    hero.titleAccent,
  )
  const reduced = useReducedMotion()

  // Everything after the H1 fades up together, 0.06s apart.
  const rest = (index: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: {
      duration: 0.6,
      ease: EASE,
      delay: (reduced ? 0.1 : REST_DELAY) + index * 0.06,
    },
  })

  return (
    <section id="top" className="relative">

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center text-center">
        <motion.span
          className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-none"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Icon name="location_on" size={18} className="text-accent" />
          {hero.badge}
        </motion.span>

        <motion.h1
          className="heading mt-6 max-w-[1100px] text-h1 text-balance"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {hero.titleStart}{' '}
          <span className="sm:block">
            <ChalkText text={hero.titleAccent} play={ready} delay={CHALK_DELAY} />
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[640px] text-muted-on-board md:text-[1.3125rem]"
          {...rest(0)}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-[22rem] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center"
          {...rest(1)}
        >
          <a href={hero.primaryCta.href} className={buttonVariants({ variant: 'primary' })}>
            {hero.primaryCta.label}
            <Icon name="arrow_forward" size={20} flip />
          </a>
          <a href={hero.secondaryCta.href} className={buttonVariants({ variant: 'glass' })}>
            <Icon name="play_circle" size={20} />
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.ul
          className="mt-6 flex flex-wrap justify-center gap-2.5 text-[0.9375rem]"
          {...rest(2)}
        >
          {hero.trust.map((item) => (
            <li
              key={item.label}
              className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-2 shadow-none"
            >
              <Icon name={item.icon} size={18} className="text-accent" />
              {item.label}
            </li>
          ))}
        </motion.ul>

        <motion.div className="mt-10 w-full" {...rest(3)}>
          <HeroCards />
        </motion.div>
      </div>
    </section>
  )
}
