"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

type HeroProps =
  | {
      basePath: string
    }
  | {
      searchQuery: string
      onSearchChange: (query: string) => void
      onCategoryClick: (category: string) => void
    }

function isLinkMode(props: HeroProps): props is { basePath: string } {
  return "basePath" in props && typeof props.basePath === "string"
}

export function Hero(props: HeroProps) {
  const router = useRouter()
  const [localQuery, setLocalQuery] = useState("")

  const searchQuery = isLinkMode(props) ? localQuery : props.searchQuery
  const setSearchQuery = isLinkMode(props) ? setLocalQuery : props.onSearchChange

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (isLinkMode(props)) {
      if (q) router.push(`${props.basePath}/busca?q=${encodeURIComponent(q)}`)
    } else {
      if (q) {
        const el = document.querySelector("#faq")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <section className="bg-[var(--azul)] pt-[110px] pb-16 px-[5%]">
      <div className="max-w-[680px] mx-auto text-center">
        <span className="inline-block text-[11px] font-semibold tracking-[2.5px] uppercase text-[var(--verde)] mb-5">
          Central de Ajuda
        </span>
        <h1 className="text-[clamp(30px,4.5vw,48px)] font-bold tracking-tight leading-[1.1] text-[var(--branco)] mb-8 text-balance">
          Como podemos ajudar?
        </h1>

        <form onSubmit={handleSubmit} className="relative max-w-[520px] mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--cinza-texto)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por pedido, garantia, instalação..."
            inputMode="search"
            enterKeyHint="search"
            className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border-2 border-[var(--branco)]/20 bg-[var(--branco)] text-[var(--preto-texto)] text-[15px] font-sans placeholder:text-[var(--cinza-texto)] focus:outline-none focus:border-[var(--verde)] transition-colors"
          />
        </form>
      </div>
    </section>
  )
}
