import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// shadcn/ui Input, restyled for the form cards: tall touch target, 18px text
// (no zoom on iPhone), soft fill. Colours come from the "paper" tokens, so it follows dark mode. The focus ring comes from
// :focus-visible in index.css; an invalid field gets a red border.
export const fieldClass =
  "h-[3.25rem] w-full min-w-0 rounded-[14px] border border-paper-strong/25 bg-field px-4 text-lg text-on-paper transition-colors placeholder:text-muted-on-paper/70 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(fieldClass, className)}
      {...props}
    />
  )
}

export { Input }
