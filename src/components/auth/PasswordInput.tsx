import { useState, type ComponentProps } from 'react'
import { Icon } from '@/components/landing/Icon'
import { Input } from '@/components/ui/input'
import { useContent } from '@/lib/prefs'

/** A password field with an eye button to show or hide what was typed. */
export function PasswordInput(props: ComponentProps<typeof Input>) {
  const [shown, setShown] = useState(false)
  const { auth } = useContent()

  return (
    // Passwords are typed left to right in every language, so the eye stays on the right.
    <div dir="ltr" className="relative">
      <Input type={shown ? 'text' : 'password'} className="pr-13" {...props} />
      <button
        type="button"
        aria-label={shown ? auth.hidePassword : auth.showPassword}
        aria-pressed={shown}
        onClick={() => setShown((value) => !value)}
        className="absolute top-1/2 right-1.5 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted-on-paper transition-colors hover:text-on-paper"
      >
        <Icon name={shown ? 'visibility_off' : 'visibility'} size={22} />
      </button>
    </div>
  )
}
