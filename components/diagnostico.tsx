"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, RotateCcw, Lightbulb, ClipboardList, Rocket, Zap, Factory, Home, Wheat, Building2, Thermometer, VolumeX, BoltIcon, Sparkles, Ruler, Move, Building, BookOpen } from "lucide-react"

const perguntas = [
  {
    texto: "Como você classificaria seu projeto?",
    opcoes: [
      { icone: <Factory className="w-5 h-5" />, texto: "Galpão industrial ou comercial" },
      { icone: <Home className="w-5 h-5" />, texto: "Residência ou condomínio" },
      { icone: <Wheat className="w-5 h-5" />, texto: "Rural / Agronegócio" },
      { icone: <Building2 className="w-5 h-5" />, texto: "Construção civil em larga escala" },
    ],
  },
  {
    texto: "Qual é a sua maior prioridade na cobertura?",
    opcoes: [
      { icone: <Thermometer className="w-5 h-5" />, texto: "Isolamento térmico (reduzir calor)" },
      { icone: <VolumeX className="w-5 h-5" />, texto: "Isolamento acústico (reduzir ruído)" },
      { icone: <BoltIcon className="w-5 h-5" />, texto: "Custo-benefício e durabilidade" },
      { icone: <Sparkles className="w-5 h-5" />, texto: "Estética e acabamento premium" },
    ],
  },
  {
    texto: "Qual é o tamanho aproximado da área?",
    opcoes: [
      { icone: <Ruler className="w-5 h-5" />, texto: "Até 100 m²" },
      { icone: <Move className="w-5 h-5" />, texto: "100 a 500 m²" },
      { icone: <Building className="w-5 h-5" />, texto: "500 a 2.000 m²" },
      { icone: <Factory className="w-5 h-5" />, texto: "Acima de 2.000 m²" },
    ],
  },
  {
    texto: "Em que fase está o seu projeto?",
    opcoes: [
      { icone: <Lightbulb className="w-5 h-5" />, texto: "Apenas pesquisando opções" },
      { icone: <ClipboardList className="w-5 h-5" />, texto: "Planejando e coletando orçamentos" },
      { icone: <Rocket className="w-5 h-5" />, texto: "Pronto para comprar em breve" },
      { icone: <Zap className="w-5 h-5" />, texto: "Urgente, preciso agora" },
    ],
  },
]

function FilledPhone({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
    </svg>
  )
}

export function Diagnostico() {
  const [step, setStep] = useState(0)
  const [respostas, setRespostas] = useState<(number | undefined)[]>([])
  const [showResult, setShowResult] = useState(false)

  const current = perguntas[step]

  const selectOption = (i: number) => {
    const newRespostas = [...respostas]
    newRespostas[step] = i
    setRespostas(newRespostas)
  }

  const next = () => {
    if (respostas[step] === undefined) return
    if (step + 1 >= perguntas.length) {
      setShowResult(true)
    } else {
      setStep(step + 1)
    }
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  const restart = () => {
    setStep(0)
    setRespostas([])
    setShowResult(false)
  }

  const urgencia = respostas[3] ?? 0
  const isUrgent = urgencia >= 2

  return (
    <section id="diagnostico" className="px-[5%] py-12 max-w-[960px] mx-auto border-t border-[var(--cinza-borda)]">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="inline-block text-[11px] font-semibold tracking-[2px] uppercase text-[var(--verde)] mb-3">
          Diagnóstico técnico
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-2 text-balance">
          Pronto para descobrir a cobertura ideal?
        </h2>
        <p className="text-sm leading-relaxed text-[var(--cinza-texto)] max-w-[500px]">
          Em 4 perguntas mapeamos seu projeto e conectamos você ao especialista mais qualificado para o seu caso.
        </p>
      </div>

      <div className="max-w-[640px] mx-auto bg-[var(--cinza-suave)] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[var(--azul)] to-[#0a4da8] px-8 py-7">
          <div className="h-[3px] bg-[var(--branco)]/20 rounded-sm mb-5">
            <div
              className="h-full bg-[var(--verde)] rounded-sm transition-all duration-400"
              style={{ width: `${showResult ? 100 : (step / perguntas.length) * 100}%` }}
            />
          </div>
          <div className="text-[11px] tracking-wider uppercase text-[var(--branco)]/60 mb-1.5">
            {showResult ? "Diagnóstico concluído" : `Pergunta ${step + 1} de ${perguntas.length}`}
          </div>
          <div className="text-xl font-semibold tracking-tight leading-snug text-[var(--branco)]">
            {showResult ? "Encontramos o perfil ideal para você!" : current.texto}
          </div>
        </div>

        {/* Body */}
        {!showResult ? (
          <div className="px-8 py-7">
            <div className="flex flex-col gap-2.5">
              {current.opcoes.map((op, i) => (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className={`flex items-center gap-3.5 px-[18px] py-3.5 border-[1.5px] rounded-xl cursor-pointer transition-all text-sm font-medium text-left ${
                    respostas[step] === i
                      ? "border-[var(--azul)] bg-[var(--azul)]/5 text-[var(--azul)]"
                      : "border-[var(--cinza-borda)] bg-[var(--branco)] text-[var(--preto-texto)] hover:border-[var(--azul)] hover:bg-[var(--azul)]/5"
                  }`}
                >
                  <span className="flex-shrink-0 text-[var(--azul)]">{op.icone}</span>
                  <span>{op.texto}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-5 border-t border-[var(--cinza-borda)]">
              {step > 0 ? (
                <button
                  onClick={back}
                  className="bg-transparent border-none cursor-pointer font-sans text-[13px] text-[var(--cinza-texto)] flex items-center gap-1 p-2 rounded-lg transition-all hover:bg-[var(--cinza-suave)] hover:text-[var(--preto-texto)]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={next}
                disabled={respostas[step] === undefined}
                className="bg-[var(--azul)] text-[var(--branco)] border-none cursor-pointer font-sans text-sm font-semibold px-6 py-3 rounded-[10px] transition-all flex items-center gap-1.5 hover:bg-[#0a4da8] hover:translate-x-0.5 disabled:opacity-40 disabled:cursor-default disabled:hover:translate-x-0"
              >
                Próximo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="px-8 py-8">
            <span className="inline-flex items-center gap-1.5 bg-[var(--verde)]/10 text-[var(--verde)] text-[12px] font-semibold px-3 py-1 rounded-full mb-4">
              Diagnóstico concluído
            </span>
            <h3 className="text-[22px] font-bold tracking-tight mb-2 text-[var(--preto-texto)]">
              {isUrgent
                ? "Você está pronto para conversar com um especialista"
                : "Vamos aprofundar sua pesquisa antes de orçar"}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--cinza-texto)] mb-6">
              {isUrgent
                ? "Com base nas suas respostas, você tem um projeto definido e precisa de agilidade. Nosso consultor pode fechar um orçamento em minutos."
                : "Você ainda está na fase de avaliação. Preparamos conteúdo específico para o seu tipo de projeto, isso vai te ajudar a comparar melhor e tomar a melhor decisão."}
            </p>
            <div className="flex flex-col gap-2.5">
              {isUrgent ? (
                <>
                  <a href="#" className="flex items-center gap-3.5 px-4 py-3.5 border-[1.5px] border-[var(--cinza-borda)] rounded-xl no-underline text-[var(--preto-texto)] transition-all text-sm hover:border-[var(--verde)] hover:bg-[var(--verde)]/5 hover:translate-x-1">
                    <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">WhatsApp</div>
                      <div className="text-xs text-[var(--cinza-texto)] mt-0.5">Mais rápido</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--cinza-texto)]" />
                  </a>
                  <a href="#" className="flex items-center gap-3.5 px-4 py-3.5 border-[1.5px] border-[var(--cinza-borda)] rounded-xl no-underline text-[var(--preto-texto)] transition-all text-sm hover:border-[var(--verde)] hover:bg-[var(--verde)]/5 hover:translate-x-1">
                    <FilledPhone className="w-5 h-5 text-[var(--verde)]" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Ligar agora</div>
                      <div className="text-xs text-[var(--cinza-texto)] mt-0.5">{"Seg a Sáb, 8h às 18h"}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--cinza-texto)]" />
                  </a>
                </>
              ) : (
                <>
                  <a href="#faq" className="flex items-center gap-3.5 px-4 py-3.5 border-[1.5px] border-[var(--cinza-borda)] rounded-xl no-underline text-[var(--preto-texto)] transition-all text-sm hover:border-[var(--verde)] hover:bg-[var(--verde)]/5 hover:translate-x-1">
                    <BookOpen className="w-5 h-5 text-[var(--verde)]" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Ver guia técnico completo</div>
                      <div className="text-xs text-[var(--cinza-texto)] mt-0.5">Autoatendimento</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--cinza-texto)]" />
                  </a>
                  <a href="#" className="flex items-center gap-3.5 px-4 py-3.5 border-[1.5px] border-[var(--cinza-borda)] rounded-xl no-underline text-[var(--preto-texto)] transition-all text-sm hover:border-[var(--verde)] hover:bg-[var(--verde)]/5 hover:translate-x-1">
                    <Image src="/images/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Tirar dúvidas no WhatsApp</div>
                      <div className="text-xs text-[var(--cinza-texto)] mt-0.5">~4 min de espera</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--cinza-texto)]" />
                  </a>
                </>
              )}
            </div>
            <button
              onClick={restart}
              className="mt-5 bg-transparent border border-[var(--cinza-borda)] px-[18px] py-2.5 rounded-[10px] cursor-pointer font-sans text-[13px] text-[var(--cinza-texto)] flex items-center gap-1.5 hover:bg-[var(--cinza-suave)]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Refazer diagnóstico
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
