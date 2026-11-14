import * as React from "react"
import { cn } from "cn"

import { Icon } from "@/components/landing/Icon"
import { fieldClass } from "@/components/ui/input"

// shadcn/ui NativeSelect, restyled to match Input. It is a real <select>, so phones
// open their own picker: the easiest way to choose one of 58 wilayas.

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div className={cn("relative w-full", className)} data-slot="native-select-wrapper">
      <select
        data-slot="native-select"
        className={cn(fieldClass, "cursor-pointer appearance-none pe-11")}
        {...props}
      />
      <Icon
        name="expand_more"
        className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-paper-strong"
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOption }
