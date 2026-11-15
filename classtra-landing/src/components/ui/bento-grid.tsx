import { type ComponentPropsWithoutRef, type ReactNode } from "react"

import { IconChip } from "@/components/landing/Icon"
import { MagicCard } from "@/components/ui/magic-card"
import { cn } from "@/lib/utils"

// Magic UI bento-grid, restyled for the Tableau palette (LANDING_SPEC.md §4):
// glass tiles, Material Symbols icon chip, Stardos title, and a slot for a
// small live UI. The default call-to-action button and its icon are gone.

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  description: string
  /** Material Symbols name. */
  icon: string
  /** "glass" (default) is a dark-glass tile; "accent" is the solid yellow tile. */
  tone?: "glass" | "accent"
  /** Classes for the wrapper around the mini UI (children). */
  miniClassName?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => (
  <div
    className={cn("grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}
    {...props}
  >
    {children}
  </div>
)

const BentoCard = ({
  name,
  description,
  icon,
  tone = "glass",
  className,
  miniClassName,
  children,
  ...props
}: BentoCardProps) => (
  <MagicCard
    glow={tone === "glass"}
    className={cn(
      // Lift 3px on hover (mouse) or press (touch). The cursor glow comes from MagicCard.
      "flex h-full flex-col gap-6 rounded-card p-7 transition-[translate,border-color] duration-200 ease-calm hover:-translate-y-[3px] active:-translate-y-[3px] motion-reduce:translate-none",
      tone === "glass" ? "glass-dark hover:border-chalk/35" : "bg-accent text-ink",
      className
    )}
    {...props}
  >
    <div className="flex flex-col gap-3">
      <IconChip name={icon} tone={tone === "glass" ? "board" : "accent"} />
      <h3 className="heading mt-1 text-2xl">{name}</h3>
      <p className={cn(tone === "glass" && "text-muted-on-board")}>{description}</p>
    </div>
    {children && <div className={cn("mt-auto", miniClassName)}>{children}</div>}
  </MagicCard>
)

export { BentoCard, BentoGrid }
