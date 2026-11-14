import { useRef, useState, type MouseEvent } from 'react'
import { animate, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { Icon } from '@/components/landing/Icon'
import { LanguageSwitch } from '@/components/landing/LanguageSwitch'
import { ThemeToggle } from '@/components/landing/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useContent } from '@/lib/prefs'
import { cn } from '@/lib/utils'
import { BRAND, ROUTES } from '@/siteConfig'

const EASE = [0.22, 1, 0.36, 1] as const
// Scroll-to-top eases in and out: it sets off gently, glides, and lands softly.
const GLIDE = [0.65, 0, 0.35, 1] as const
const TOP_ZONE = 80 // px from the top of the page where the navbar always stays visible
const MIN_MOVE = 6 // px of scroll before the direction counts (ignores tiny jitters)

/**
 * The three menu bars. When the menu opens they fold into a cross: the top and bottom
 * bars meet in the middle and rotate, the middle one shrinks away. Same path back.
 */
function MenuIcon({ open }: { open: boolean }) {
  const bar =
    'absolute left-[3px] h-0.5 w-[18px] rounded-full bg-current transition-[translate,rotate,scale,opacity] duration-350 ease-calm'
  return (
    <span aria-hidden="true" className="relative block size-6">
      <span className={cn(bar, 'top-[6px]', open && 'translate-y-[5px] rotate-45')} />
      <span className={cn(bar, 'top-[11px]', open && 'scale-x-0 opacity-0')} />
      <span className={cn(bar, 'top-[16px]', open && '-translate-y-[5px] -rotate-45')} />
    </span>
  )
}

type NavbarProps = {
  /** The account page: only the logo, the language switch and the mode switch. */
  minimal?: boolean
}

/**
 * Floating glass pill.
 *
 * Landing page: logo, the two section links, the language and mode switches, then the
 * two account buttons. "Créer un compte" is the solid chalk pill (the main action of the
 * bar); "Se connecter" is the glass outline. Yellow stays for the page's own calls to action.
 *
 * It fades away while the user scrolls down and pops back as soon as they scroll up. It
 * also comes back on keyboard focus, and never hides while the mobile menu is open.
 *
 * Below 1024px the links and the switches move into the menu: the button morphs into a
 * cross and an extra-glassy panel materialises under the pill.
 */
export function Navbar({ minimal = false }: NavbarProps) {
  const { nav } = useContent()
  const reduced = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolledAway, setScrolledAway] = useState(false)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const moved = y - lastY.current
    if (y >= TOP_ZONE && Math.abs(moved) < MIN_MOVE) return
    lastY.current = y
    setScrolledAway(y >= TOP_ZONE && moved > 0)
  })

  const visible = !scrolledAway || menuOpen
  const closeMenu = () => setMenuOpen(false)

  /** Logo click: glide all the way to the top. Any scroll, touch or key press takes over at once. */
  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const from = window.scrollY
    if (reduced || from < 1) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const interrupts = ['wheel', 'touchstart', 'keydown'] as const
    const release = () => interrupts.forEach((type) => window.removeEventListener(type, stop))
    const controls = animate(from, 0, {
      // Longer distances take a little longer, within 0.8s to 1.6s.
      duration: Math.min(1.6, Math.max(0.8, from / 2500)),
      ease: GLIDE,
      onUpdate: (y) => window.scrollTo({ top: y, behavior: 'instant' }),
      onComplete: release,
    })
    function stop() {
      controls.stop()
      release()
    }
    interrupts.forEach((type) => window.addEventListener(type, stop, { passive: true }))
  }

  return (
    <header
      className={cn(
        'pointer-events-none fixed inset-x-0 top-4 flex justify-center px-4',
        menuOpen ? 'z-[60]' : 'z-40', // above the menu's dimming layer while it is open
      )}
    >
      <motion.nav
        aria-label={nav.ariaLabel}
        className={cn(
          'flex h-14 w-full items-center justify-between gap-3 rounded-full py-2 ps-5 pe-2',
          minimal ? 'max-w-[760px]' : 'max-w-[1080px]',
          menuOpen ? 'glass-menu' : 'glass-floating',
          visible && 'pointer-events-auto',
        )}
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible || reduced ? 0 : -16,
          scale: visible || reduced ? 1 : 0.96,
        }}
        transition={
          visible
            ? { type: 'spring', bounce: 0, duration: 0.4 } // pops back, settles without bouncing
            : { duration: 0.25, ease: EASE } // fades away quietly
        }
        // Keyboard users: tabbing into the hidden navbar brings it back.
        onFocusCapture={() => setScrolledAway(false)}
      >
        <a
          href={ROUTES.home}
          onClick={minimal ? undefined : scrollToTop}
          className="flex shrink-0 items-center gap-2 rounded-full"
        >
          <span className="inline-flex size-7 items-center justify-center rounded-[9px] bg-accent text-ink">
            <Icon name="school" size={18} />
          </span>
          <span dir="ltr" className="font-brand text-[1.3125rem] leading-none font-bold text-chalk">
            {BRAND.wordmark}
          </span>
        </a>

        {!minimal && (
          <div className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => (
              <a key={link.href} href={link.href} className={buttonVariants({ variant: 'ghost', size: 'md' })}>
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <LanguageSwitch className={cn(!minimal && 'hidden lg:inline-flex')} />
          <ThemeToggle className={cn(!minimal && 'hidden lg:inline-flex')} />

          {!minimal && (
            <>
              <a href={ROUTES.login} className={buttonVariants({ variant: 'glass', size: 'md' })}>
                {nav.login}
              </a>
              <a
                href={ROUTES.signup}
                className={cn(buttonVariants({ variant: 'chalk', size: 'md' }), 'hidden sm:inline-flex')}
              >
                {nav.signup}
              </a>

              {/* "trap-focus" keeps the page scrollable, so the section links can scroll to their section. */}
              <Sheet open={menuOpen} onOpenChange={setMenuOpen} modal="trap-focus">
                <SheetTrigger
                  aria-label={menuOpen ? nav.closeLabel : nav.menuLabel}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'text-chalk lg:hidden',
                  )}
                >
                  <MenuIcon open={menuOpen} />
                </SheetTrigger>
                <SheetContent closeLabel={nav.closeLabel}>
                  <SheetTitle className="sr-only">{nav.menuTitle}</SheetTitle>
                  {nav.links.map((link, i) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      // Each link rises and fades in a little after the one before it.
                      style={{ '--i': i } as React.CSSProperties}
                      className="flex items-center justify-between rounded-[1.25rem] px-4 py-3.5 text-lg font-medium text-chalk transition-[opacity,translate,background-color] delay-[calc(var(--i)*60ms+90ms)] duration-400 ease-calm group-data-ending-style/sheet:opacity-0 group-data-ending-style/sheet:delay-0 group-data-ending-style/sheet:duration-150 group-data-starting-style/sheet:translate-y-3 group-data-starting-style/sheet:opacity-0 hover:bg-chalk/8 active:bg-chalk/12 motion-reduce:translate-y-0"
                    >
                      {link.label}
                      <Icon name="arrow_forward" size={20} flip className="text-accent" />
                    </a>
                  ))}

                  <a
                    href={ROUTES.signup}
                    onClick={closeMenu}
                    className={cn(buttonVariants({ variant: 'chalk', size: 'md' }), 'mx-2 mt-1 h-12 sm:hidden')}
                  >
                    {nav.signup}
                  </a>

                  <div className="mt-2 flex items-center justify-between gap-3 border-t border-chalk/12 px-2 pt-3 pb-1">
                    <LanguageSwitch />
                    <ThemeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </motion.nav>
    </header>
  )
}
