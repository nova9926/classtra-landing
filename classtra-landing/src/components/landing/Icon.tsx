import { cn } from '@/lib/utils'

type IconProps = {
  /**
   * Material Symbols name, e.g. "school", "arrow_forward".
   * The font only contains the icons listed in index.html (icon_names): add new ones there.
   */
  name: string
  /** Size in px. */
  size?: number
  /** Mirror the icon in right-to-left languages. Use it for arrows that mean "next" or "back". */
  flip?: boolean
  className?: string
}

/** Google Material Symbols Rounded, filled. Decorative: always hidden from screen readers. */
export function Icon({ name, size = 24, flip = false, className }: IconProps) {
  return (
    <span
      className={cn('material-symbols-rounded', flip && 'rtl:-scale-x-100', className)}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}

type IconChipProps = {
  name: string
  /** "board": yellow icon on a glass-tinted chip. "accent": ink icon, for the yellow tile. */
  tone?: 'board' | 'accent'
  className?: string
}

/** 52px icon chip with a 16px radius. Tinted, not blurred: it always sits on a glass card. */
export function IconChip({ name, tone = 'board', className }: IconChipProps) {
  return (
    <span
      className={cn(
        'inline-flex size-[52px] shrink-0 items-center justify-center rounded-chip',
        tone === 'board'
          ? 'border border-chalk/18 bg-chalk/8 text-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]'
          : 'bg-ink/10 text-ink',
        className,
      )}
    >
      <Icon name={name} size={26} />
    </span>
  )
}
