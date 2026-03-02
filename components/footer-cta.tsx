export function FooterCta() {
  return (
    <footer className="bg-[var(--preto-texto)] px-[5%] py-6 flex justify-center items-center flex-wrap gap-4 sm:gap-6 text-center">
      <p className="text-[12px] sm:text-[13px] text-[var(--branco)]/40">
        {"© 2026 Mundial Telhas. Todos os direitos reservados."}
      </p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <a
          href="#"
          className="inline-flex items-center justify-center min-h-[40px] px-3 rounded-lg text-[12px] sm:text-[13px] text-[var(--branco)]/40 no-underline hover:text-[var(--branco)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--branco)]/60"
        >
          Política de Privacidade
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center min-h-[40px] px-3 rounded-lg text-[12px] sm:text-[13px] text-[var(--branco)]/40 no-underline hover:text-[var(--branco)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--branco)]/60"
        >
          Termos de Uso
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center min-h-[40px] px-3 rounded-lg text-[12px] sm:text-[13px] text-[var(--branco)]/40 no-underline hover:text-[var(--branco)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--branco)]/60"
        >
          Catálogo
        </a>
      </div>
    </footer>
  )
}
