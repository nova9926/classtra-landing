import { useRef } from 'react'
import { ChalkPath } from '@/components/landing/ChalkPath'
import { BlurFade } from '@/components/ui/blur-fade'
import { useContent } from '@/lib/prefs'

/** §6: three steps on chalk, connected by a chalk line that draws itself on scroll. */
export function HowItWorks() {
  const { how } = useContent()
  const steps = useRef<HTMLDivElement>(null)

  return (
    <section id="how" className="relative">

      <div className="relative mx-auto max-w-[1120px]">
        <BlurFade>
          <p className="eyebrow text-paper-strong">{how.eyebrow}</p>
          <h2 className="heading mt-3 max-w-[780px] text-h2 text-balance">{how.title}</h2>
        </BlurFade>

        {/* The chalk line needs room: the gutter on phones (ps-9), a band above the cards on desktop (lg:pt-14). */}
        <div
          ref={steps}
          className="relative mt-12 grid gap-6 ps-9 lg:mt-8 lg:grid-cols-3 lg:gap-10 lg:ps-0 lg:pt-14"
        >
          <ChalkPath target={steps} />

          {how.steps.map((step, i) => (
            <BlurFade key={step.title} delay={i * 0.06} className="h-full">
              <div
                data-step
                className="group glass-light relative flex h-full flex-col gap-3.5 rounded-card p-7"
              >
                {/* Yellow border, faded in when ChalkPath marks the card with data-lit (opacity only). */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-[inherit] border-2 border-accent opacity-0 transition-opacity duration-300 ease-calm group-data-[lit]:opacity-100"
                />
                <span className="heading text-6xl leading-none text-paper-strong">{i + 1}</span>
                <h3 className="heading text-[1.625rem]">{step.title}</h3>
                <p className="text-muted-on-paper">{step.text}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
