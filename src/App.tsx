import { useEffect, useState } from 'react'
import { AuthPage } from '@/components/auth/AuthPage'
import { ChalkGrainFilter } from '@/components/landing/ChalkText'
import { ContactCTA } from '@/components/landing/ContactCTA'
import { FAQ } from '@/components/landing/FAQ'
import { Features } from '@/components/landing/Features'
import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Navbar } from '@/components/landing/Navbar'
import { Pricing } from '@/components/landing/Pricing'
import { Problems } from '@/components/landing/Problems'
import { Roles } from '@/components/landing/Roles'
import { SectionBand } from '@/components/landing/SectionBand'
import type { PlanId } from '@/i18n/types'
import { useRoute } from '@/lib/route'
import { DEFAULT_PLAN } from '@/siteConfig'

// Page shell: the landing page, or the account page when the address says so.
export default function App() {
  const route = useRoute()
  // Chosen in Pricing, preselected in the contact form.
  const [plan, setPlan] = useState<PlanId>(DEFAULT_PLAN)

  // Coming back from the account page: the landing page starts at the top.
  useEffect(() => {
    if (route === 'home' && ['', '#', '#top'].includes(window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [route])

  return (
    // overflow-x-clip (not hidden): no sideways scroll, and position: sticky keeps working.
    <div className="overflow-x-clip">
      <ChalkGrainFilter />
      <Navbar minimal={route !== 'home'} />

      {route !== 'home' ? (
        <AuthPage mode={route} />
      ) : (
        <>
          <main>
            <SectionBand
              first
              tone="board"
              orbs={[
                '-right-28 top-20 size-[320px] bg-accent/25 md:size-[520px]',
                '-left-40 top-[14%] size-[320px] bg-orb-green/55 md:size-[460px]',
                'right-[8%] top-[34%] size-[280px] bg-accent/15 md:size-[380px]',
                '-left-32 top-[52%] size-[300px] bg-orb-mint/25 md:size-[420px]',
                '-right-32 top-[66%] size-[300px] bg-orb-green/50 md:size-[440px]',
                '-left-24 top-[80%] size-[260px] bg-accent/15 md:size-[360px]',
              ]}
            >
              <Hero />
              <Problems />
              <Features />
              <Roles />
            </SectionBand>

            <SectionBand
              tone="chalk"
              orbs={[
                '-left-40 top-[14%] size-[320px] bg-accent/35 md:size-[520px]',
                '-right-44 top-[42%] size-[320px] bg-orb-mint/45 md:size-[560px]',
                'left-[18%] top-[68%] size-[280px] bg-accent/25 md:size-[420px]',
              ]}
            >
              <HowItWorks />
              <Pricing plan={plan} onPlanChange={setPlan} />
              <FAQ />
            </SectionBand>
          </main>

          {/* The last band ends the page: a tighter gap above the footer and less space below it.
              It sits outside <main> so the footer is a proper page footer. */}
          <SectionBand
            tone="board"
            orbs={['left-[30%] top-[18%] size-[320px] bg-accent/25 md:size-[520px]']}
            className="gap-20 pb-10 md:gap-24 md:pb-12"
          >
            <ContactCTA plan={plan} onPlanChange={setPlan} />
            <Footer />
          </SectionBand>
        </>
      )}
    </div>
  )
}
