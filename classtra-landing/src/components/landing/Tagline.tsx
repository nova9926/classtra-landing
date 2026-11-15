import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ChalkText } from '@/components/landing/ChalkText'
import { useFontReady } from '@/hooks/use-font-ready'
import { useContent } from '@/lib/prefs'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The slogan, written in chalk in a large italic face when it scrolls into view:
 * the letters draw themselves one by one, the brand name in yellow, and a chalk
 * flourish underlines it once the writing is done.
 * Reduced motion: the finished line is simply shown.
 */
export function Tagline() {
  const { tagline } = useContent()
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const fontReady = useFontReady('italic 700 1em "Playfair Display"')
  const reduced = useReducedMotion()
  const [written, setWritten] = useState(false)
  const play = inView && fontReady

  return (
    <div className="mb-16 flex flex-col items-center text-center md:mb-24">
      {/* The slogan is in English on a French page: say so for screen readers. */}
      <p
        ref={ref}
        lang={tagline.lang}
        dir="ltr"
        className="max-w-[1000px] font-flourish text-[clamp(2.125rem,6.2vw,4.5rem)] leading-[1.12] font-bold text-balance italic"
      >
        <ChalkText
          text={tagline.text}
          play={play}
          className="text-chalk"
          wordClassName={(word) => (word === tagline.accent ? 'text-accent' : undefined)}
          onWritten={() => setWritten(true)}
        />
      </p>

      <svg
        aria-hidden="true"
        viewBox="0 0 400 18"
        preserveAspectRatio="none"
        className="mt-4 h-[18px] w-[min(60%,26rem)] overflow-visible"
      >
        <motion.path
          d="M4 11 C60 2 130 17 200 9 S320 3 396 10"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#chalk-grain)"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={written || reduced ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ pathLength: { duration: 0.7, ease: EASE }, opacity: { duration: 0.01 } }}
        />
      </svg>
    </div>
  )
}
