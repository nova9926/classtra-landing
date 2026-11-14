import type { KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type SegmentedProps<T extends string> = {
  options: readonly { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
  /** Accessible name of the control. */
  label: string
  /**
   * Unique name. Tabs get the id `${name}-tab-${id}`; give the panel they control
   * the id `${name}-panel` and `aria-labelledby` the selected tab's id.
   */
  name: string
  className?: string
}

/**
 * Apple-style segmented control: a glass pill with a yellow thumb that slides to the
 * selected option. Used by the Roles tabs and the Pricing switch.
 * Keyboard: Left / Right / Home / End move the selection (role="tablist").
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  name,
  className,
}: SegmentedProps<T>) {
  const reduced = useReducedMotion()

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = options.findIndex((option) => option.id === value)
    const last = options.length - 1
    const next =
      e.key === 'ArrowRight'
        ? (current + 1) % options.length
        : e.key === 'ArrowLeft'
          ? (current + last) % options.length
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : -1
    if (next < 0) return
    e.preventDefault()
    onChange(options[next].id)
    document.getElementById(`${name}-tab-${options[next].id}`)?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('glass-dark inline-flex max-w-full gap-1 rounded-full p-[5px] shadow-none', className)}
    >
      {options.map((option) => {
        const selected = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            id={`${name}-tab-${option.id}`}
            aria-selected={selected}
            aria-controls={`${name}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative cursor-pointer rounded-full px-3 py-[11px] text-[0.9375rem] whitespace-nowrap transition-[color,scale] duration-200 ease-calm active:scale-[0.98] sm:px-[22px] sm:text-base',
              selected ? 'font-semibold text-ink' : 'font-medium text-muted-on-board',
            )}
          >
            {selected && (
              <motion.span
                layoutId={`${name}-thumb`}
                className="absolute inset-0 rounded-full bg-accent"
                // Critically damped: it slides and settles, never bounces.
                transition={reduced ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.4 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
