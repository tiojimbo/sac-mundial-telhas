import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Canais } from "@/components/canais"
import { FooterCta } from "@/components/footer-cta"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FormattedContent } from "@/components/formatted-content"
import { faqCategories, getFilteredFaqItems } from "@/lib/faq-data"
import { BuscaForm } from "./busca-form"

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function BuscaPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams
  const query = typeof q === "string" ? q : ""
  const filteredItems = getFilteredFaqItems(query)

  return (
    <main className="overflow-x-hidden bg-[var(--branco)]">
      <Navbar />
      <section className="px-[5%] pt-[110px] pb-12 max-w-[960px] mx-auto">
        <nav className="text-[13px] text-[var(--cinza-texto)] mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/ajuda" className="hover:text-[var(--azul)] hover:underline">
                Central de Ajuda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[var(--preto-texto)]">Busca</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-6">
          Resultados da busca
        </h1>

        <div className="max-w-[520px] mb-8">
          <BuscaForm defaultValue={query} />
        </div>

        {query.trim() ? (
          <>
            <p className="text-[13px] text-[var(--cinza-texto)] mb-6">
              {filteredItems.length > 0
                ? `${filteredItems.length} resultado${filteredItems.length !== 1 ? "s" : ""} para "${query}"`
                : `Nenhum resultado encontrado para "${query}"`}
            </p>

            {filteredItems.length > 0 ? (
              <div className="max-w-[720px]">
                <Accordion type="single" collapsible>
                  {filteredItems.map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                      <AccordionTrigger>
                        <span className="flex items-center gap-3">
                          <span className="inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[var(--azul)]/10 text-[var(--azul)] shrink-0">
                            {faqCategories.find((f) => f.key === item.category)?.label}
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
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[var(--cinza-texto)] mb-4">
                  Não encontrou o que procurava?
                </p>
                <Link
                  href="#canais"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--azul)] hover:underline"
                >
                  Fale com nosso time de suporte
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-[13px] text-[var(--cinza-texto)]">
            Digite um termo na busca acima para encontrar respostas.
          </p>
        )}
      </section>
      <Canais />
      <FooterCta />
    </main>
  )
}
