import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FormattedContent } from "@/components/formatted-content"

export interface FaqAccordionItem {
  value: string
  trigger: string
  content: string
}

interface FaqAccordionProps {
  items: FaqAccordionItem[]
  className?: string
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div className={className}>
      <Accordion type="single" collapsible>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>
              <FormattedContent text={item.content} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
