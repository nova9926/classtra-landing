import type { ReactNode } from 'react'
import { ParallaxLayers } from '@/components/landing/ParallaxLayers'
import { cn } from '@/lib/utils'

type SectionBandProps = {
  /** "board": green with the chalk grid. "chalk": the paper sections (light by day, deep green by night). */
  tone: 'board' | 'chalk'
  /** One class string per light orb (see ParallaxLayers). */
  orbs?: string[]
  /** The band at the very top of the page keeps its glow up to the top edge. */
  first?: boolean
  /** Extra classes for the column of sections, e.g. a smaller bottom padding above the page end. */
  className?: string
  children: ReactNode
}

/**
 * A run of sections that share one background (LANDING_SPEC.md "Background depth").
 *
 * The page is three bands: board (hero → roles), chalk (how → FAQ), board (contact + footer).
 * Because the grid, grain and light orbs belong to the band and not to each section,
 * nothing is cut off where two sections of the same colour meet, and the background fades
 * to the plain band colour at the edges where the colour changes. The band also owns the
 * rhythm: the same space between every section, and the same space above and below.
 */
export function SectionBand({ tone, orbs, first = false, className, children }: SectionBandProps) {
  return (
    <div
      className={cn(
        'relative px-4 md:px-6',
        tone === 'board' ? 'on-board bg-board text-chalk' : 'on-chalk bg-paper text-on-paper',
      )}
    >
      <ParallaxLayers tone={tone} orbs={orbs} feather={{ top: !first, bottom: true }} />
      <div
        className={cn('relative flex flex-col gap-24 py-24 md:gap-[7.5rem] md:py-[7.5rem]', className)}
      >
        {children}
      </div>
    </div>
  )
}
