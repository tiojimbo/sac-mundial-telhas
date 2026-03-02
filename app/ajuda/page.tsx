import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TemasSection } from "@/components/temas-section"
import { Canais } from "@/components/canais"
import { FooterCta } from "@/components/footer-cta"

export default function AjudaPage() {
  return (
    <main className="overflow-x-hidden bg-[var(--branco)]">
      <Navbar />
      <Hero basePath="/ajuda" />
      <TemasSection basePath="/ajuda" />
      <Canais />
      <FooterCta />
    </main>
  )
}
