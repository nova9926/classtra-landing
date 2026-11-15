import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { LANGS, setLang, useContent, usePrefs } from '@/lib/prefs'
import { cn } from '@/lib/utils'

/**
 * FR · EN · عربي. A small glass pill; a soft chalk thumb slides to the chosen language.
 * The thumb is chalk-tinted, not yellow: yellow stays for the main actions.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang } = usePrefs()
  const { nav } = useContent()
  const reduced = useReducedMotion()
  const thumb = useId() // the switch can be on screen twice (navbar and menu)

  return (
    <div
      role="group"
      aria-label={nav.languageLabel}
      dir="ltr" // the three codes keep the same order in every language
      className={cn('glass-dark inline-flex items-center gap-0.5 rounded-full p-1 shadow-none', className)}
    >
      {LANGS.map((option) => {
        const active = option.id === lang
        return (
          <button
            key={option.id}
            type="button"
            lang={option.id}
            aria-pressed={active}
            onClick={() => setLang(option.id)}
            className={cn(
              'relative h-8 cursor-pointer rounded-full px-3 text-sm whitespace-nowrap transition-[color,scale] duration-200 ease-calm active:scale-[0.96]',
              active ? 'font-semibold text-chalk' : 'font-medium text-muted-on-board hover:text-chalk',
            )}
          >
            {active && (
              <motion.span
                layoutId={thumb}
                className="absolute inset-0 rounded-full bg-chalk/16"
                transition={reduced ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.4 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
