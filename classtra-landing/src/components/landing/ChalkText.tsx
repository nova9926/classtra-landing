import { Fragment, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const STAGGER = 0.035 // seconds between letters
const LETTER = 0.5 // seconds per letter, must match .chalk-letter in index.css

/**
 * Chalk grain: a very light wobble on a stroke. Rendered once in App; use it with
 * `filter="url(#chalk-grain)"` (chalk writing, strike-through, chalk path).
 */
export function ChalkGrainFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="chalk-grain" x="-5%" y="-20%" width="110%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

type ChalkTextProps = {
  text: string
  /** Start writing. Keep false until the heading font has loaded. */
  play: boolean
  /** Seconds to wait before the first letter. */
  delay?: number
  /** Colour of the chalk. Defaults to the accent yellow. */
  className?: string
  /** Extra classes for single words, e.g. a different colour for one of them. */
  wordClassName?: (word: string) => string | undefined
  /** Called once the writing has finished. */
  onWritten?: () => void
}

/**
 * Text "written in chalk": each letter outline draws itself (SVG stroke-dashoffset)
 * with a light chalk grain, then the solid yellow fill fades in.
 *
 * The real text stays in the page as normal HTML (for layout, wrapping and screen readers).
 * Each word gets a zero-width inline SVG sitting on the same baseline, which draws the
 * outline exactly on top of it.
 *
 * Reduced motion: no drawing, the final yellow text is shown straight away.
 */
export function ChalkText({
  text,
  play,
  delay = 0,
  className = 'text-accent',
  wordClassName,
  onWritten,
}: ChalkTextProps) {
  const reduced = useReducedMotion()
  // Once written, the outlines are removed so the heading holds each word only once.
  const [written, setWritten] = useState(false)
  const words = text.split(' ')
  if (reduced) {
    return (
      <span className={className}>
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className={wordClassName?.(word)}>{word}</span>
            {w < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    )
  }

  // Arabic letters join together, so an Arabic word is drawn as one piece, not letter by letter.
  const joined = /[\u0600-\u06FF]/.test(text)
  const pieces = words.map((word) => (joined ? [word] : [...word]))
  const step = joined ? STAGGER * 5 : STAGGER
  const starts = pieces.map((_, i) => pieces.slice(0, i).flat().length)
  const total = pieces.flat().length
  // The fill starts fading in while the last pieces are still being drawn.
  const fillDelay = delay + (total - 1) * step + LETTER * 0.4

  return (
    <span className={className}>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className={cn('whitespace-nowrap', wordClassName?.(word))}>
            {play && !written && (
              <motion.svg
                aria-hidden="true"
                className="inline-block h-[0.5em] w-0 overflow-visible align-baseline"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: fillDelay + 0.15, duration: 0.4 }}
                onAnimationComplete={() => {
                  setWritten(true)
                  onWritten?.()
                }}
              >
                <text x="0" y="100%" filter="url(#chalk-grain)">
                  {pieces[w].map((letter, i) => (
                    <tspan
                      key={i}
                      className="chalk-letter"
                      style={
                        { '--chalk-delay': `${delay + (starts[w] + i) * step}s` } as React.CSSProperties
                      }
                    >
                      {letter}
                    </tspan>
                  ))}
                </text>
              </motion.svg>
            )}
            <motion.span
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ delay: fillDelay, duration: 0.4 }}
            >
              {word}
            </motion.span>
          </span>
          {w < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}
