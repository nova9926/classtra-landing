import { Icon } from '@/components/landing/Icon'
import { buttonVariants } from '@/components/ui/button'
import { toggleTheme, useContent, usePrefs } from '@/lib/prefs'
import { cn } from '@/lib/utils'

const swap = 'absolute transition-[opacity,rotate,scale] duration-500 ease-calm'

/**
 * Light / dark switch. The button shows where it takes you: a moon by day, a sun by night.
 * The two icons turn into each other, and the new mode spreads out from the button.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const dark = usePrefs().theme === 'dark'
  const { nav } = useContent()

  return (
    <button
      type="button"
      aria-label={dark ? nav.toLight : nav.toDark}
      onClick={(e) => {
        const box = e.currentTarget.getBoundingClientRect()
        toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 })
      }}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'relative text-chalk', className)}
    >
      <Icon
        name="dark_mode"
        size={22}
        className={cn(swap, dark ? '-rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100')}
      />
      <Icon
        name="light_mode"
        size={22}
        className={cn(swap, dark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0')}
      />
    </button>
  )
}
