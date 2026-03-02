const canais = [
  {
    icon: (
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp%20%282%29-UsyzCsCnxlz01w2hKiMgBOMmdVzstv.png"
        alt="WhatsApp"
        className="w-8 h-8"
        loading="lazy"
      />
    ),
    nome: "WhatsApp",
    desc: "Tire dúvidas, acompanhe pedidos ou registre ocorrências de forma rápida.",
    tempo: "Resposta em ~4 min",
    tempoClass: "bg-[var(--verde)]/10 text-[var(--verde)]",
    href: "#",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-[var(--azul)]"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    nome: "Telefone",
    desc: "Prefere falar? Nossa equipe de suporte está disponível de segunda a sábado.",
    tempo: "Seg a Sex, 8h às 17h",
    tempoClass: "bg-[var(--verde)]/10 text-[var(--verde)]",
    href: "#",
  },
]

export function Canais() {
  return (
    <section
      id="canais"
      className="px-[5%] py-12 max-w-[960px] mx-auto"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--preto-texto)] mb-2 text-balance">
          Canais de suporte
        </h2>
        <p className="text-sm leading-relaxed text-[var(--cinza-texto)] max-w-[500px]">
          Fale com nosso time de suporte pelo canal de sua preferência
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[720px] mx-auto">
        {canais.map((canal) => (
          <a
            key={canal.nome}
            href={canal.href}
            className="group bg-[var(--branco)] rounded-xl px-5 py-4 sm:p-6 text-center transition-all no-underline text-[var(--preto-texto)] block hover:bg-[var(--cinza-suave)] border border-[var(--cinza-borda)] active:scale-[0.99]"
          >
            <div className="mb-3 flex justify-center">{canal.icon}</div>
            <div className="text-sm sm:text-base font-bold mb-1 tracking-tight">{canal.nome}</div>
            <div className="text-xs sm:text-sm text-[var(--cinza-texto)] leading-relaxed">{canal.desc}</div>
            <span
              className={`inline-block mt-3 text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${canal.tempoClass}`}
            >
              {canal.tempo}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
