"use client"

import { Search } from "lucide-react"

interface BuscaFormProps {
  defaultValue: string
}

export function BuscaForm({ defaultValue }: BuscaFormProps) {
  return (
    <form method="get" action="/ajuda/busca" className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--cinza-texto)]" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Buscar por pedido, garantia, instalação..."
        inputMode="search"
        enterKeyHint="search"
        className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-xl border-2 border-[var(--cinza-borda)] bg-[var(--branco)] text-[var(--preto-texto)] text-[15px] font-sans placeholder:text-[var(--cinza-texto)] focus:outline-none focus:border-[var(--azul)] transition-colors"
      />
    </form>
  )
}
