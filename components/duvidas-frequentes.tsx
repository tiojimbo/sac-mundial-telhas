import Link from "next/link"
import { FaqAccordion } from "@/components/faq-accordion"
import { faqData } from "@/lib/faq-data"

export function DuvidasFrequentes() {
  const items = faqData.geral

  return (
    <section className="px-[5%] py-12 max-w-[960px] mx-auto border-t border-[var(--cinza-borda)]">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-2 text-balance">
          Dúvidas frequentes
        </h2>
        <p className="text-sm leading-relaxed text-[var(--cinza-texto)] max-w-[500px]">
          Respostas rápidas sobre atendimento, horários e canais. Para mais detalhes por tema, acesse os atalhos acima.
        </p>
      </div>

      <div className="max-w-[720px] mx-auto">
        <FaqAccordion items={items} />
      </div>

      <p className="text-center mt-6">
        <Link
          href="/ajuda/geral"
          className="text-[14px] font-semibold text-[var(--azul)] hover:underline"
        >
          Ver todas as dúvidas gerais →
        </Link>
      </p>
    </section>
  )
}
