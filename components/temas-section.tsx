import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { faqCategories, faqData } from "@/lib/faq-data"

const PREVIEW_COUNT = 3

interface TemasSectionProps {
  basePath: string
}

export function TemasSection({ basePath }: TemasSectionProps) {
  return (
    <section className="px-[5%] py-12 max-w-[960px] mx-auto border-t border-[var(--cinza-borda)]">
      <h2 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] text-center mb-8 text-balance">
        Leia tudo sobre a Mundial
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {faqCategories.map((cat) => {
          const preview = faqData[cat.key].slice(0, PREVIEW_COUNT)
          return (
            <div
              key={cat.key}
              className="flex flex-col rounded-xl border border-[var(--cinza-borda)] bg-[var(--branco)] p-6"
            >
              <h3 className="text-[15px] font-bold text-[var(--preto-texto)] mb-4">
                {cat.label}
              </h3>

              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {preview.map((item) => (
                  <li key={item.value}>
                    <Link
                      href={`${basePath}/${cat.key}/${item.value}`}
                      className="text-[13.5px] text-[var(--azul)] hover:underline leading-snug"
                    >
                      {item.trigger}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`${basePath}/${cat.key}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--preto-texto)] border border-[var(--cinza-borda)] rounded-full px-4 py-2 w-fit hover:border-[var(--azul)] hover:text-[var(--azul)] transition-colors"
              >
                Conferir mais artigos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
