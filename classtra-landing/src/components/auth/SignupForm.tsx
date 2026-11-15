import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { EMAIL } from '@/components/auth/LoginForm'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { PHONE } from '@/components/landing/ContactCTA'
import { buttonVariants } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { fr } from '@/i18n/fr'
import type { EstablishmentId } from '@/i18n/types'
import { useContent } from '@/lib/prefs'
import { cn } from '@/lib/utils'

type Fields = {
  establishment: string
  type: EstablishmentId
  wilaya: string
  fullName: string
  email: string
  phone: string
  password: string
}

const legalLink = 'rounded-sm font-semibold text-paper-strong underline underline-offset-2'

/** Create an account: the establishment, then the director's own account. */
export function SignupForm() {
  const { auth, wilayas, contact } = useContent()
  const text = auth.signup
  const [submitted, setSubmitted] = useState(false)

  const schema = useMemo(
    () =>
      z.object({
        establishment: z.string().trim().min(2, auth.errors.establishment),
        type: z.enum(['training', 'tutoring', 'private', 'languages', 'other']),
        wilaya: z.string().min(1, auth.errors.wilaya),
        fullName: z.string().trim().min(3, auth.errors.fullName),
        email: z.string().trim().regex(EMAIL, auth.errors.email),
        phone: z.string().trim().regex(PHONE, auth.errors.phone),
        // At least 10 characters, with one capital letter and one digit.
        password: z
          .string()
          .min(10, auth.errors.password)
          .regex(/[A-Z]/, auth.errors.password)
          .regex(/\d/, auth.errors.password),
      }),
    [auth.errors],
  )

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: {
      establishment: '',
      type: 'training',
      wilaya: '',
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  })

  const onSubmit = () => {
    // TODO: send the new account to the Classtra API over HTTPS.
    // The password must never be logged, stored in the browser or kept in memory after the call.
    resetField('password')
    setSubmitted(true)
  }

  const field = (name: keyof Fields) => ({
    id: `signup-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `signup-${name}-error` : undefined,
    ...register(name),
  })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="heading text-[2rem]">{text.title}</h1>
        <p className="text-muted-on-paper">{text.sub}</p>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="heading mb-3 text-xl">{text.establishmentTitle}</legend>

        <Field
          id="signup-establishment"
          label={text.establishment}
          required
          error={errors.establishment?.message}
        >
          <Input
            type="text"
            autoComplete="organization"
            placeholder={text.establishmentPlaceholder}
            {...field('establishment')}
          />
        </Field>

        <Field id="signup-type" label={text.type}>
          <NativeSelect {...field('type')}>
            {text.types.map((type) => (
              <NativeSelectOption key={type.id} value={type.id}>
                {type.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field id="signup-wilaya" label={text.wilaya} required error={errors.wilaya?.message}>
          <NativeSelect autoComplete="address-level1" {...field('wilaya')}>
            <NativeSelectOption value="">{contact.wilayaPlaceholder}</NativeSelectOption>
            {wilayas.map((wilaya, i) => (
              // The value is always the French name, so accounts read the same in every language.
              <NativeSelectOption key={wilaya} value={fr.wilayas[i]}>
                {String(i + 1).padStart(2, '0')} · {wilaya}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="heading mb-3 text-xl">{text.directorTitle}</legend>

        <Field id="signup-fullName" label={text.fullName} required error={errors.fullName?.message}>
          <Input type="text" autoComplete="name" {...field('fullName')} />
        </Field>

        <Field id="signup-email" label={text.email} required error={errors.email?.message}>
          <Input
            type="email"
            autoComplete="email"
            dir="ltr"
            className="rtl:text-end"
            placeholder={text.emailPlaceholder}
            {...field('email')}
          />
        </Field>

        <Field id="signup-phone" label={text.phone} required error={errors.phone?.message}>
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className="rtl:text-end"
            placeholder={contact.phonePlaceholder}
            {...field('phone')}
          />
        </Field>

        <Field
          id="signup-password"
          label={text.password}
          required
          hint={text.passwordHint}
          error={errors.password?.message}
        >
          <PasswordInput autoComplete="new-password" {...field('password')} />
        </Field>
      </fieldset>

      {/* TODO: link the two legal pages once they are written. */}
      <p className="text-sm text-muted-on-paper">
        {text.terms.before}{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className={legalLink}>
          {text.terms.sales}
        </a>{' '}
        {text.terms.and}{' '}
        <a href="#" onClick={(e) => e.preventDefault()} className={legalLink}>
          {text.terms.privacy}
        </a>
        .
      </p>

      {submitted && (
        <p role="status" className="rounded-[14px] bg-paper-strong/10 px-4 py-3 text-[0.9375rem] font-medium">
          {text.notice}
        </p>
      )}

      <button type="submit" className={cn(buttonVariants({ variant: 'paper' }), 'w-full')}>
        {text.submit}
      </button>
    </form>
  )
}
