import type { ReactNode } from 'react'
import {
  AlgeriaMini,
  AttendanceMini,
  CertificateMini,
  EnrolmentMini,
  LeadsMini,
  PaymentsMini,
  ScheduleMini,
} from '@/components/landing/FeatureMinis'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { BlurFade } from '@/components/ui/blur-fade'
import { useContent } from '@/lib/prefs'

const minis: Record<string, ReactNode> = {
  payments: <PaymentsMini />,
  attendance: <AttendanceMini />,
  enrolment: <EnrolmentMini />,
  certificates: <CertificateMini />,
  schedule: <ScheduleMini />,
  leads: <LeadsMini />,
}

/** §4: glass bento. Each tile carries a tiny live piece of the app. */
export function Features() {
  const { features } = useContent()

  return (
    <section id="features" className="relative">

      <div className="relative mx-auto max-w-[1120px]">
        <BlurFade>
          <p className="eyebrow text-accent">{features.eyebrow}</p>
          <h2 className="heading mt-3 max-w-[900px] text-h2 text-balance">{features.title}</h2>
        </BlurFade>

        <BentoGrid className="mt-12">
          {features.items.map((item, i) => {
            const wide = item.id === 'payments'
            return (
              <BlurFade
                key={item.id}
                delay={(i % 3) * 0.06}
                className={wide ? 'md:col-span-2 lg:col-span-3' : undefined}
              >
                <BentoCard
                  name={item.title}
                  description={item.text}
                  icon={item.icon}
                  tone={item.id === 'algeria' ? 'accent' : 'glass'}
                  className={wide ? 'lg:flex-row lg:items-center lg:justify-between lg:gap-12' : undefined}
                  miniClassName={wide ? 'lg:mt-0 lg:w-[52%] lg:shrink-0' : undefined}
                >
                  {item.chips ? <AlgeriaMini chips={item.chips} /> : minis[item.id]}
                </BentoCard>
              </BlurFade>
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
