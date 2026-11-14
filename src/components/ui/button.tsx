import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Restyled for the Tableau palette (LANDING_SPEC.md): pill shape, Inter,
// press-scale 0.98 on pointer-down. The focus ring comes from :focus-visible in index.css.
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full font-sans whitespace-nowrap select-none transition-[scale,background-color] duration-150 ease-calm active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Yellow always carries ink text, never white.
        primary:
          "bg-accent font-semibold text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_10px_30px_rgb(242_183_5/0.35)]",
        glass: "glass-dark font-medium text-chalk shadow-none",
        chalk: "bg-chalk font-semibold text-ink",
        board: "bg-board font-semibold text-chalk",
        // The main button on a paper card: board-green by day, chalk by night.
        paper: "bg-paper-action font-semibold text-paper-action-text",
        ghost: "font-medium text-muted-on-board hover:bg-chalk/8",
      },
      size: {
        lg: "h-[3.25rem] px-6 text-[1.0625rem]",
        md: "h-10 px-[1.125rem] text-[0.9375rem]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
