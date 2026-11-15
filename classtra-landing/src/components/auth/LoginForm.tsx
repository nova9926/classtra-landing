import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { buttonVariants } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useContent } from '@/lib/prefs'
import { cn } from '@/lib/utils'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Fields = { email: string; password: string }

/** Sign in: e-mail and password. */
export function LoginForm() {
  const { auth } = useContent()
  const text = auth.login
  const [submitted, setSubmitted] = useState(false)

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().trim().regex(EMAIL, auth.errors.email),
        password: z.string().min(1, auth.errors.passwordRequired),
      }),
    [auth.errors],
  )

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Fields>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } })

  const onSubmit = () => {
    // TODO: send the e-mail and password to the Classtra API over HTTPS.
    // The password must never be logged, stored in the browser or kept in memory after the call.
    resetField('password')
    setSubmitted(true)
  }

  const field = (name: keyof Fields) => ({
    id: `login-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `login-${name}-error` : undefined,
    ...register(name),
  })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-1 flex flex-col gap-2">
        <h1 className="heading text-[2rem]">{text.title}</h1>
        <p className="text-muted-on-paper">{text.sub}</p>
      </div>

      <Field id="login-email" label={text.email} error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          dir="ltr"
          className="rtl:text-end"
          placeholder={text.emailPlaceholder}
          {...field('email')}
        />
      </Field>

      <Field id="login-password" label={text.password} error={errors.password?.message}>
        <PasswordInput autoComplete="current-password" {...field('password')} />
      </Field>

      {submitted && (
        <p role="status" className="rounded-[14px] bg-paper-strong/10 px-4 py-3 text-[0.9375rem] font-medium">
          {text.notice}
        </p>
      )}

      <button type="submit" className={cn(buttonVariants({ variant: 'paper' }), 'mt-2 w-full')}>
        {text.submit}
      </button>

      {/* TODO: link to the password-reset page once it exists. */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="self-center rounded-sm font-semibold text-paper-strong underline-offset-4 hover:underline"
      >
        {text.forgot}
      </a>
    </form>
  )
}
