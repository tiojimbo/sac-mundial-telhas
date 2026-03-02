import { Star } from "lucide-react"

const depoimentos = [
  {
    texto: '"O atendimento consultivo foi o que me fez fechar. Eles me ajudaram a entender qual espessura precisava antes de eu falar com qualquer vendedor."',
    nome: "Ricardo C.",
    empresa: "Galpao Industrial - Goiania",
    iniciais: "RC",
  },
  {
    texto: '"Minha duvida foi resolvida pelo FAQ sem nem precisar entrar em contato. Quando precisei de orcamento, ja sabia exatamente o que pedir."',
    nome: "Fernanda A.",
    empresa: "Residencia - Sao Paulo",
    iniciais: "FA",
  },
  {
    texto: '"Fiz o diagnostico online, o consultor ja veio com meu perfil mapeado. Economizamos tempo e fechamos o pedido na mesma semana."',
    nome: "Marcos L.",
    empresa: "Construtora - Brasilia",
    iniciais: "ML",
  },
]

export function ProvaSocial() {
  return (
    <section id="prova" className="bg-[var(--azul)] px-[5%] py-20">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--verde)] mb-3">
        O que nossos clientes dizem
      </div>
      <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight leading-[1.1] text-[var(--branco)] max-w-[600px] mb-3.5 text-balance">
        Resultados reais, projetos de verdade.
      </h2>
      <p className="text-base leading-relaxed text-[var(--branco)]/60 max-w-[520px] mb-10">
        De galpoes industriais a residencias, a telha certa faz toda a diferenca.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px]">
        {depoimentos.map((dep) => (
          <div
            key={dep.nome}
            className="bg-[var(--branco)]/[0.07] border border-[var(--branco)]/12 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex gap-0.5 text-[#FFD54F] mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[var(--branco)]/82 mb-[18px] italic">
              {dep.texto}
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[var(--verde)] to-[#a3d44e] flex items-center justify-center text-[15px] font-bold text-[var(--branco)]">
                {dep.iniciais}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[var(--branco)]">
                  {dep.nome}
                </div>
                <div className="text-[11px] text-[var(--branco)]/50 mt-px">
                  {dep.empresa}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
