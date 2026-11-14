import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignupForm } from '@/components/auth/SignupForm'
import { Icon } from '@/components/landing/Icon'
import { SectionBand } from '@/components/landing/SectionBand'
import { Segmented } from '@/components/landing/Segmented'
import { useContent } from '@/lib/prefs'
import { ROUTES } from '@/siteConfig'

const EASE = [0.22, 1, 0.36, 1] as const

type AuthPageProps = {
  /** Which of the two forms is showing. It follows the address (see src/lib/route.ts). */
  mode: 'login' | 'signup'
}

/**
 * The account page: one card with two tabs, "Se connecter" and "Créer un compte".
 * The navbar buttons open it on the right tab, and the visitor can switch from one
 * form to the other at any time. Same board, glass and chalk as the landing page.
 */
export function AuthPage({ mode }: AuthPageProps) {
  const { auth } = useContent()

  // Arriving from the landing page: start at the top, whatever was scrolled before.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <SectionBand
      first
      tone="board"
      orbs={[
        '-right-28 top-16 size-[320px] bg-accent/25 md:size-[520px]',
        '-left-40 top-[45%] size-[320px] bg-orb-green/55 md:size-[460px]',
      ]}
      className="min-h-dvh pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <main className="mx-auto flex w-full max-w-[32rem] flex-col items-center gap-6">
        <Segmented
          name="auth"
          label={auth.tabsLabel}
          options={[
            { id: 'login', label: auth.login.tab },
            { id: 'signup', label: auth.signup.tab },
          ]}
          value={mode}
          onChange={(id) => {
            window.location.hash = ROUTES[id]
          }}
        />

        {/* A paper card on the board, like the contact form. */}
        <div
          role="tabpanel"
          id="auth-panel"
          aria-labelledby={`auth-tab-${mode}`}
          className="on-chalk glass-light glass-light-strong w-full rounded-panel p-6 text-on-paper md:p-9"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: EASE }}
            >
              {mode === 'login' ? <LoginForm /> : <SignupForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        <a
          href={ROUTES.home}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-medium text-muted-on-board transition-colors hover:text-chalk"
        >
          <Icon name="arrow_back" size={20} flip />
          {auth.back}
        </a>
      </main>
    </SectionBand>
  )
}
