const stats = [
  { num: "+5", suffix: " anos", label: "No mercado" },
  { num: "24", suffix: "/7", label: "Suporte" },
]

export function StatsBar() {
  return (
    <div className="bg-[var(--cinza-suave)] border-y border-[var(--cinza-borda)] px-[5%] py-5 flex justify-center gap-10 md:gap-16 flex-wrap">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-xl font-bold text-[var(--preto-texto)] tracking-tight">
            {stat.num}
            <span className="text-[var(--verde)]">{stat.suffix}</span>
          </div>
          <div className="text-[11px] text-[var(--cinza-texto)] tracking-wide uppercase mt-0.5">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
