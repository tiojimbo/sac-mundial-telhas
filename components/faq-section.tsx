"use client"

import { useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FormattedContent } from "@/components/formatted-content"

type FaqCategory = "pedido" | "garantia" | "instalacao" | "geral"

const faqFilters: { key: FaqCategory; label: string }[] = [
  { key: "pedido", label: "Pedidos e Entregas" },
  { key: "garantia", label: "Garantia e Trocas" },
  { key: "instalacao", label: "Instalação e Manutenção" },
  { key: "geral", label: "Cashback" },
]

const faqData: Record<FaqCategory, { value: string; trigger: string; content: string }[]> = {
  pedido: [
    {
      value: "pedido-1",
      trigger: "Como rastrear meu pedido?",
      content:
        "Após a confirmação do envio, você recebe um e-mail com o código de rastreio. Utilize esse código no site da transportadora ou entre em contato pelo nosso WhatsApp para acompanhar a entrega em tempo real.",
    },
    {
      value: "pedido-2",
      trigger: "Qual o prazo de entrega?",
      content:
        "O prazo varia de 3 a 10 dias úteis, dependendo da sua região e da disponibilidade em estoque. Após a confirmação do pagamento, você recebe a previsão de entrega por e-mail.",
    },
    {
      value: "pedido-3",
      trigger: "Como solicitar a segunda via da nota fiscal?",
      content:
        "Envie um e-mail para sac@mundialtelhas.com.br com seu CPF/CNPJ e o número do pedido. A segunda via é enviada em até 24 horas úteis.",
    },
    {
      value: "pedido-4",
      trigger: "Posso alterar ou cancelar meu pedido?",
      content:
        "Alterações e cancelamentos podem ser solicitados enquanto o pedido não foi expedido. Entre em contato pelo WhatsApp ou telefone o mais rápido possível para que possamos verificar a viabilidade.",
    },
    {
      value: "pedido-5",
      trigger: "O que fazer se o pedido chegou com avarias?",
      content:
        "Registre o problema no ato da entrega junto ao motorista e tire fotos das avarias. Em seguida, entre em contato conosco em até 48 horas pelo WhatsApp com as fotos e o número do pedido para abrirmos uma ocorrência.",
    },
  ],
  garantia: [
    {
      value: "garantia-1",
      trigger: "Qual o prazo de garantia das telhas?",
      content:
        "Oferecemos 10 anos de garantia, conforme laudo técnico do fabricante.",
    },
    {
      value: "garantia-2",
      trigger: "Como acionar a garantia?",
      content:
        "Entre em contato pelo WhatsApp ou e-mail com fotos do problema, a nota fiscal e uma descrição detalhada. Nossa equipe técnica analisa o caso em até 48 horas úteis e informa os próximos passos.",
    },
    {
      value: "garantia-3",
      trigger: "A garantia cobre problemas de instalação?",
      content:
        "Não. A garantia cobre exclusivamente defeitos de fabricação. Problemas decorrentes de instalação incorreta não estão cobertos. Por isso, disponibilizamos manual técnico e suporte remoto gratuito antes e durante a instalação.",
    },
    {
      value: "garantia-4",
      trigger: "Como funciona o processo de troca ou devolução?",
      content:
        "Após a análise técnica, caso seja confirmado defeito de fabricação, realizamos a troca do material sem custo. O prazo para envio do novo material é de até 7 dias úteis após a aprovação.",
    },
  ],
  instalacao: [
    {
      value: "instalacao-1",
      trigger: "Onde encontro o manual de instalação?",
      content:
        "O manual técnico é enviado junto com o pedido por e-mail. Caso precise de uma nova cópia, entre em contato pelo WhatsApp ou acesse a seção de downloads no nosso site.",
    },
    {
      value: "instalacao-2",
      trigger: "Oferecem suporte técnico para instalação?",
      content:
        "Sim. Disponibilizamos suporte técnico remoto gratuito por WhatsApp ou telefone durante todo o processo de instalação. Nossa equipe orienta sobre fixação, vedação e boas práticas.",
    },
    {
      value: "instalacao-3",
      trigger: "Quais os cuidados de manutenção recomendados?",
      content:
        "Recomendamos inspeção visual semestral, limpeza com água e detergente neutro, e verificação das fixações. Evite pisar diretamente sobre os painéis sem tábua de apoio.",
    },
    {
      value: "instalacao-4",
      trigger: "Posso instalar sobre a estrutura existente?",
      content:
        "Na maioria dos casos, sim. Porém, é necessário avaliar a capacidade de carga da estrutura atual. Envie fotos e medidas pelo WhatsApp para nossa equipe técnica fazer a análise.",
    },
  ],
  geral: [
    {
      value: "geral-1",
      trigger: "Como atualizar meus dados cadastrais?",
      content:
        "Entre em contato pelo e-mail sac@mundialtelhas.com.br ou WhatsApp informando os dados que deseja alterar, junto com um documento de identificação para validação.",
    },
    {
      value: "geral-2",
      trigger: "Qual o horário de atendimento?",
      content:
        "Nosso atendimento funciona de segunda a sábado, das 8h às 18h. Mensagens recebidas fora desse horário são respondidas no próximo dia útil.",
    },
    {
      value: "geral-3",
      trigger: "Quais são os canais de atendimento disponíveis?",
      content:
        "Você pode nos contatar por WhatsApp, telefone ou e-mail. Todos os canais estão disponíveis na seção abaixo desta página.",
    },
    {
      value: "geral-4",
      trigger: "Como enviar uma reclamação ou sugestão?",
      content:
        "Valorizamos seu feedback. Envie sua reclamação ou sugestão pelo e-mail sac@mundialtelhas.com.br com o assunto 'Reclamação' ou 'Sugestão'. Respondemos em até 24 horas úteis.",
    },
  ],
}

interface FaqSectionProps {
  searchQuery: string
  externalCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function FaqSection({ searchQuery, externalCategory, onCategoryChange }: FaqSectionProps) {
  const isSearching = searchQuery.trim().length > 0

  useEffect(() => {
    if (externalCategory && faqData[externalCategory as FaqCategory]) {
      onCategoryChange(null)
      const el = document.querySelector(`#faq-${externalCategory}`)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [externalCategory, onCategoryChange])

  const getFilteredItems = (): { value: string; trigger: string; content: string; category: FaqCategory }[] => {
    if (!isSearching) return []
    const query = searchQuery.toLowerCase()
    const allItems: { value: string; trigger: string; content: string; category: FaqCategory }[] = []
    for (const [category, items] of Object.entries(faqData)) {
      for (const item of items) {
        if (
          item.trigger.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query)
        ) {
          allItems.push({ ...item, category: category as FaqCategory })
        }
      }
    }
    return allItems
  }

  const filteredItems = getFilteredItems()

  return (
    <section id="faq" className="px-[5%] py-12 max-w-[960px] mx-auto border-t border-[var(--cinza-borda)]">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-[var(--verde)] mb-3">
          Base de conhecimento
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-2 text-balance">
          Perguntas frequentes
        </h2>
        <p className="text-sm leading-relaxed text-[var(--cinza-texto)] max-w-[500px]">
          Encontre respostas rápidas sobre pedidos, garantia, instalação e muito mais.
        </p>
      </div>

      <div className="max-w-[720px] mx-auto">
        {isSearching ? (
          <>
            <p className="text-[13px] text-[var(--cinza-texto)] text-center mb-6">
              {filteredItems.length > 0
                ? `${filteredItems.length} resultado${filteredItems.length !== 1 ? "s" : ""} para "${searchQuery}"`
                : `Nenhum resultado encontrado para "${searchQuery}"`}
            </p>

            {filteredItems.length > 0 ? (
              <Accordion type="single" collapsible key="search">
                {filteredItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>
                      <span className="flex items-center gap-3">
                        <span className="inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[var(--azul)]/10 text-[var(--azul)] shrink-0">
                          {faqFilters.find((f) => f.key === item.category)?.label}
                        </span>
                        {item.trigger}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <FormattedContent text={item.content} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[var(--cinza-texto)] mb-4">
                  Não encontrou o que procurava?
                </p>
                <a
                  href="#canais"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--azul)] hover:underline"
                >
                  Fale com nosso time de suporte
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-10">
            {faqFilters.map((filter) => (
              <div key={filter.key} id={`faq-${filter.key}`} className="scroll-mt-6">
                <h3 className="text-[15px] font-semibold text-[var(--preto-texto)] mb-4">
                  {filter.label}
                </h3>
                <Accordion type="single" collapsible>
                  {faqData[filter.key].map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                      <AccordionTrigger>{item.trigger}</AccordionTrigger>
                      <AccordionContent>
                        <FormattedContent text={item.content} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
