import { BlurFade } from '@/components/ui/blur-fade'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useContent } from '@/lib/prefs'

/** §8: glass accordion, one answer open at a time. */
export function FAQ() {
  const { faq } = useContent()

  return (
    <section id="faq" className="relative">
      {/* Heading on the left, questions on the right: both keep the page's left edge. */}
      <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <BlurFade>
          <h2 className="heading text-h2 text-balance">{faq.title}</h2>
        </BlurFade>

        <BlurFade delay={0.06}>
          <Accordion multiple={false} defaultValue={['0']}>
            {faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={String(i)}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  )
}
