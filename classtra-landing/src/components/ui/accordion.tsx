import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "cn"

import { Icon } from "@/components/landing/Icon"

// shadcn/ui Accordion, restyled for LANDING_SPEC.md §8: each item is a light-glass
// card, the question is in Stardos Stencil, the height animates in 0.3s and the
// `expand_more` icon rotates.

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("glass-light rounded-[22px]", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger heading flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-[22px] px-6 py-5 text-start text-xl leading-tight text-on-paper md:text-[1.375rem]",
          className
        )}
        {...props}
      >
        {children}
        <Icon
          name="expand_more"
          size={28}
          className="shrink-0 text-paper-strong transition-[rotate] duration-300 ease-calm group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-calm data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("px-6 pb-6 text-muted-on-paper", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
