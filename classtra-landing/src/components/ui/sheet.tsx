import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"

import { Icon } from "@/components/landing/Icon"
import { buttonVariants } from "@/components/ui/button"

// shadcn/ui Sheet, restyled as an extra-glassy panel that materialises just under
// the navbar, growing out of the menu button (top right) and leaving the same way.
// Children can stagger themselves with the `group/sheet` data attributes:
//   group-data-starting-style/sheet:…  (state it enters from)
//   group-data-ending-style/sheet:…    (state it leaves to)

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-board/55 transition-opacity duration-300 ease-calm data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  closeLabel = "Fermer",
  ...props
}: SheetPrimitive.Popup.Props & { closeLabel?: string }) {
  return (
    <SheetPrimitive.Portal data-slot="sheet-portal">
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "group/sheet glass-menu fixed inset-x-4 top-[5.25rem] z-50 flex origin-top-right flex-col rtl:origin-top-left gap-1 rounded-card p-2 text-chalk",
          // Materialise: scale, rise and un-blur together. Enter and exit follow the same path.
          "transition-[opacity,translate,scale,filter] duration-350 ease-calm data-ending-style:duration-250",
          "data-starting-style:-translate-y-3 data-starting-style:scale-[0.92] data-starting-style:opacity-0 data-starting-style:blur-sm",
          "data-ending-style:-translate-y-3 data-ending-style:scale-[0.92] data-ending-style:opacity-0 data-ending-style:blur-sm",
          // Reduced motion: a plain fade.
          "motion-reduce:transition-opacity motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-ending-style:scale-100 motion-reduce:data-ending-style:blur-none motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:blur-none",
          className
        )}
        {...props}
      >
        {children}
        {/* The menu button itself turns into the close button, so this one only
            appears for keyboard users (focus is kept inside the panel). */}
        <SheetPrimitive.Close
          data-slot="sheet-close"
          aria-label={closeLabel}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "sr-only text-chalk focus-visible:not-sr-only focus-visible:absolute focus-visible:end-2 focus-visible:top-2 focus-visible:inline-flex"
          )}
        >
          <Icon name="close" size={22} />
        </SheetPrimitive.Close>
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("heading px-3 py-2 text-xl text-chalk", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-on-board", className)}
      {...props}
    />
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }
