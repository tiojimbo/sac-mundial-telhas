"use client"

import { Building2, DollarSign, HelpCircle, Zap } from "lucide-react"

const situacoes = [
  {
    icon: <Building2 className="w-6 h-6 text-[var(--azul)]" />,
    title: "Estou planejando uma obra",
    desc: "Quero entender qual telha é ideal para o meu projeto.",
    target: "#faq",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[var(--azul)]" />,
    title: "Quero entender preços e prazos",
    desc: "Preciso de valores e condições para incluir no meu planejamento.",
    target: "#faq",
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-[var(--azul)]" />,
    title: "Tenho dúvidas técnicas",
    desc: "Quero saber sobre espessura, isolamento, instalação e garantia.",
    target: "#faq",
  },
  {
    icon: <Zap className="w-6 h-6 text-[var(--azul)]" />,
    title: "Já sei o que preciso",
    desc: "Quero fazer meu diagnóstico e falar com um especialista.",
    target: "#diagnostico",
  },
]

export function Triagem() {
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="triagem" className="px-[5%] py-12 max-w-[960px] mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-xl font-bold tracking-tight text-[var(--preto-texto)] mb-1.5 text-balance">
          Em que momento você está?
        </h2>
        <p className="text-sm text-[var(--cinza-texto)]">
          Escolha sua situação e vamos direcionar você ao conteúdo certo.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[860px] mx-auto">
        {situacoes.map((sit) => (
          <button
            key={sit.title}
            onClick={() => scrollToSection(sit.target)}
            className="group bg-[var(--branco)] rounded-xl p-5 text-center cursor-pointer transition-all hover:bg-[var(--azul)]/[0.03] border border-[var(--cinza-borda)] hover:border-[var(--azul)]"
          >
            <div className="w-11 h-11 rounded-lg bg-[var(--azul)]/8 flex items-center justify-center mx-auto mb-3">
              {sit.icon}
            </div>
            <div className="text-[13px] font-semibold tracking-tight text-[var(--preto-texto)] mb-1">
              {sit.title}
            </div>
            <div className="text-xs leading-relaxed text-[var(--cinza-texto)]">
              {sit.desc}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
