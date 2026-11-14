import type { ReactNode } from "react"

/** One labelled form field, with an optional hint and its error message underneath. */
export function Field({
  id,
  label,
  hint,
  required = false,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  /** Adds the star after the label. */
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.9375rem] font-semibold">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted-on-paper">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
