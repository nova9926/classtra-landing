import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Icon } from '@/components/landing/Icon'
import { BlurFade } from '@/components/ui/blur-fade'
import { buttonVariants } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { fr } from '@/i18n/fr'
import type { PlanId } from '@/i18n/types'
import { useContent } from '@/lib/prefs'
import { cn } from '@/lib/utils'
import { PRICES, formatNumber } from '@/siteConfig'

const EASE = [0.22, 1, 0.36, 1] as const

/** Algerian mobile number: 10 digits starting with 05, 06 or 07. Spaces, dots and dashes are fine. */
export const PHONE = /^0[567](?:[\s.-]?\d){8}$/

type Fields = { center: string; name: string; phone: string; wilaya: string; payment: 'cash' | 'online' }

type ContactCTAProps = {
  /** The chosen plan. Shared with the Pricing switch: changing one changes the other. */
  plan: PlanId
  onPlanChange: (plan: PlanId) => void
}

/** §9: the final call to action. Leave your details, we call you back. Form only. */
export function ContactCTA({ plan, onPlanChange }: ContactCTAProps) {
  const { contact, pricing, wilayas } = useContent()
  const [sent, setSent] = useState(false)

  // The error messages are in the visitor's language, so the rules are rebuilt when it changes.
  const schema = useMemo(
    () =>
      z.object({
        center: z.string().trim().min(2, contact.errors.center),
        name: z.string().trim().min(2, contact.errors.name),
        phone: z.string().trim().regex(PHONE, contact.errors.phone),
        wilaya: z.string().min(1, contact.errors.wilaya),
        payment: z.enum(['cash', 'online']),
      }),
    [contact.errors],
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { center: '', name: '', phone: '', wilaya: '', payment: 'cash' },
  })

  const onSubmit = (fields: Fields) => {
    // The request always uses the French labels, whatever language the visitor reads in.
    const request = {
      ...fields,
      phone: fields.phone.replace(/\D/g, ''),
      plan: fr.pricing.plans.find((p) => p.id === plan)?.label,
      payment: fr.contact.payments.find((p) => p.id === fields.payment)?.label,
    }
    // TODO: connect to Classtra API. There is no backend yet, so the request is only logged.
    console.log('Demande de rappel', request)
    setSent(true)
  }

  // Shared wiring for a field: react-hook-form + error state for assistive tech.
  const field = (name: keyof Fields) => ({
    id: `contact-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    ...register(name),
  })

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative">
      <BlurFade className="mx-auto max-w-[1120px]">
        <div className="glass-dark grid items-center gap-10 rounded-panel p-7 md:p-12 lg:grid-cols-2 lg:gap-14 lg:p-16">
          <div className="flex flex-col gap-5">
            <h2 id="contact-title" className="heading text-h2 text-balance">
              {contact.titleStart} <span className="text-accent">{contact.titleAccent}</span>{' '}
              {contact.titleEnd}
            </h2>
            <p className="text-muted-on-board md:text-[1.1875rem]">{contact.sub}</p>
          </div>

          {/* A paper card, more opaque than usual: it sits on dark glass and must stay readable. */}
          <div className="on-chalk glass-light glass-light-strong rounded-card p-6 text-on-paper md:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="thanks"
                  // Keyboard and screen-reader users land on the confirmation as it appears,
                  // not on a button that has vanished.
                  ref={(el) => el?.focus({ preventScroll: true })}
                  tabIndex={-1}
                  role="status"
                  className="flex min-h-[18rem] flex-col items-center justify-center gap-4 rounded-2xl text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Icon name="check_circle" size={56} className="text-paper-strong" />
                  <p className="heading text-[1.75rem] text-balance">{contact.success}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <Field id="contact-center" label={contact.fields.center} error={errors.center?.message}>
                    <Input type="text" autoComplete="organization" {...field('center')} />
                  </Field>

                  <Field id="contact-name" label={contact.fields.name} error={errors.name?.message}>
                    <Input type="text" autoComplete="name" {...field('name')} />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="contact-phone" label={contact.fields.phone} error={errors.phone?.message}>
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

                    <Field id="contact-wilaya" label={contact.fields.wilaya} error={errors.wilaya?.message}>
                      <NativeSelect autoComplete="address-level1" {...field('wilaya')}>
                        <NativeSelectOption value="">{contact.wilayaPlaceholder}</NativeSelectOption>
                        {wilayas.map((wilaya, i) => (
                          // The value is always the French name, so requests read the same in every language.
                          <NativeSelectOption key={wilaya} value={fr.wilayas[i]}>
                            {String(i + 1).padStart(2, '0')} · {wilaya}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </Field>
                  </div>

                  {/* The plan: preselected by the pricing switch, and changeable here. */}
                  <Field id="contact-plan" label={contact.fields.plan}>
                    <NativeSelect
                      id="contact-plan"
                      name="plan"
                      value={plan}
                      onChange={(e) => onPlanChange(e.target.value as PlanId)}
                    >
                      {pricing.plans.map((p) => (
                        <NativeSelectOption key={p.id} value={p.id}>
                          {p.label} · {formatNumber(PRICES[p.id])} {pricing.currency}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </Field>

                  {/* How they would like to pay. */}
                  <fieldset className="flex flex-col gap-1.5">
                    <legend className="mb-1.5 text-[0.9375rem] font-semibold">
                      {contact.fields.payment}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {contact.payments.map((option) => (
                        <label
                          key={option.id}
                          className="group flex cursor-pointer flex-col rounded-[14px] border border-paper-strong/25 bg-field px-4 py-3 leading-snug transition-colors has-checked:border-paper-action has-checked:bg-paper-action has-checked:text-paper-action-text has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-paper-strong"
                        >
                          <input
                            type="radio"
                            value={option.id}
                            className="sr-only"
                            {...register('payment')}
                          />
                          <span className="font-semibold">{option.label}</span>
                          <span className="text-sm text-muted-on-paper group-has-checked:text-paper-action-text/75">
                            {option.hint}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <button type="submit" className={cn(buttonVariants({ variant: 'paper' }), 'mt-2 w-full')}>
                    <Icon name="call" size={20} />
                    {contact.submit}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </BlurFade>
    </section>
  )
}
