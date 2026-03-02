import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Canais } from "@/components/canais"
import { FooterCta } from "@/components/footer-cta"
import {
  faqCategories,
  faqData,
  isFaqCategory,
  type FaqCategory,
} from "@/lib/faq-data"

interface PageProps {
  params: Promise<{ categoria: string }>
}

export async function generateStaticParams() {
  return faqCategories.map((c) => ({ categoria: c.key }))
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  if (!isFaqCategory(categoria)) notFound()

  const categoryConfig = faqCategories.find((c) => c.key === categoria)
  const items = faqData[categoria as FaqCategory]

  return (
    <main className="overflow-x-hidden bg-[var(--branco)]">
      <Navbar />
      <section className="px-[5%] pt-[110px] pb-12 max-w-[960px] mx-auto">

        <Link
          href="/ajuda"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--azul)] hover:underline mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Link>

        {/* Breadcrumb */}
        <nav className="text-[13px] text-[var(--cinza-texto)] mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/ajuda" className="hover:text-[var(--azul)] hover:underline">
                Central de Ajuda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[var(--preto-texto)]">
              {categoryConfig?.label ?? categoria}
            </li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-8">
          {categoryConfig?.label}
        </h1>

        <ul className="max-w-[720px] flex flex-col divide-y divide-[var(--cinza-borda)] border border-[var(--cinza-borda)] rounded-xl overflow-hidden">
          {items.map((item) => (
            <li key={item.value}>
              <Link
                href={`/ajuda/${categoria}/${item.value}`}
                className="flex items-center justify-between gap-4 px-5 py-4 bg-[var(--branco)] hover:bg-[var(--cinza-suave)] transition-colors group"
              >
                <span className="text-[14px] text-[var(--preto-texto)] group-hover:text-[var(--azul)] transition-colors leading-snug">
                  {item.trigger}
                </span>
                <span className="text-[var(--cinza-texto)] group-hover:text-[var(--azul)] shrink-0 transition-colors">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Canais />
      <FooterCta />
    </main>
  )
}
