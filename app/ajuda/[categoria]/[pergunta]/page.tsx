import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Canais } from "@/components/canais"
import { FooterCta } from "@/components/footer-cta"
import { FormattedContent } from "@/components/formatted-content"
import {
  faqCategories,
  getFaqItem,
  getStaticFaqParams,
  isFaqCategory,
} from "@/lib/faq-data"

interface PageProps {
  params: Promise<{ categoria: string; pergunta: string }>
}

export async function generateStaticParams() {
  return getStaticFaqParams()
}

export default async function PerguntaPage({ params }: PageProps) {
  const { categoria, pergunta } = await params

  if (!isFaqCategory(categoria)) notFound()

  const item          = getFaqItem(categoria, pergunta)
  if (!item) notFound()

  const categoryConfig = faqCategories.find((c) => c.key === categoria)

  return (
    <main className="overflow-x-hidden bg-[var(--branco)]">
      <Navbar />
      <section className="px-[5%] pt-[110px] pb-16 max-w-[960px] mx-auto">

        <Link
          href={`/ajuda/${categoria}`}
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--azul)] hover:underline mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Link>

        {/* Breadcrumb */}
        <nav className="text-[13px] text-[var(--cinza-texto)] mb-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/ajuda" className="hover:text-[var(--azul)] hover:underline">
                Central de Ajuda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/ajuda/${categoria}`}
                className="hover:text-[var(--azul)] hover:underline"
              >
                {categoryConfig?.label ?? categoria}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[var(--preto-texto)] line-clamp-1">
              {item.trigger}
            </li>
          </ol>
        </nav>

        {/* Conteúdo da resposta */}
        <div className="max-w-[720px]">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-6 leading-snug">
            {item.trigger}
          </h1>

          <FormattedContent text={item.content} />

          {/* Separador */}
          <hr className="my-8 border-[var(--cinza-borda)]" />

          {/* Link de retorno */}
          <Link
            href={`/ajuda/${categoria}`}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--azul)] hover:underline"
          >
            ← Ver todas as perguntas sobre {categoryConfig?.label}
          </Link>
        </div>
      </section>
      <Canais />
      <FooterCta />
    </main>
  )
}
