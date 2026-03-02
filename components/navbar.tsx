export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--branco)] flex items-center justify-center px-[5%] h-[56px] sm:h-[64px] border-b border-[var(--cinza-borda)]">
      <a href="/" className="no-underline h-full flex items-center" aria-label="Voltar para o site Mundial Telhas">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1691591533.3591-logo_principal-N-WU3zfs0K0VUhxyM6P9SOkoXaUgfwnu.webp"
          alt="Mundial Telhas Termoacusticas"
          className="h-8 sm:h-10 w-auto"
          loading="lazy"
        />
      </a>
    </nav>
  )
}
