"use client"

import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ChatMessage } from "@/app/api/chat/route"

interface DisplayMessage {
  role: "user" | "model"
  text: string
}

const WELCOME: DisplayMessage = {
  role: "model",
  text: "Olá! Sou o assistente virtual da Mundial Telhas. Como posso ajudar você hoje?",
}

const OPEN_ANIMATION  = "chatPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both"
const CLOSE_ANIMATION = "chatPopOut 0.25s cubic-bezier(0.4, 0, 1, 1) both"
const CLOSE_DURATION  = 260

export function ChatWidget() {
  const [open, setOpen]           = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [messages, setMessages]   = useState<DisplayMessage[]>([WELCOME])
  const [input, setInput]         = useState("")
  const [loading, setLoading]     = useState(false)
  const panelRef  = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  /* Animação de ENTRADA — roda antes do browser pintar */
  useLayoutEffect(() => {
    if (open && !isClosing && panelRef.current) {
      panelRef.current.style.animation = OPEN_ANIMATION
    }
  }, [open, isClosing])

  /* Animação de SAÍDA — reflow garante reinício da animação */
  useEffect(() => {
    if (!isClosing || !panelRef.current) return
    const panel = panelRef.current
    panel.style.animation = "none"
    void panel.offsetHeight          // força reflow
    panel.style.animation = CLOSE_ANIMATION
  }, [isClosing])

  /* Scroll e foco ao abrir */
  useEffect(() => {
    if (open && !isClosing) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        inputRef.current?.focus()
      }, 50)
    }
  }, [open, isClosing, messages])

  const handleOpen = () => {
    setIsClosing(false)
    setOpen(true)
  }

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setOpen(false)
      setIsClosing(false)
    }, CLOSE_DURATION)
  }

  const buildHistory = (): ChatMessage[] =>
    messages.slice(1).map((m) => ({ role: m.role, parts: [{ text: m.text }] }))

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setLoading(true)

    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: buildHistory() }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text ?? data.error ?? "Não foi possível obter uma resposta. Tente novamente.",
        },
      ])
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: "Erro de conexão. Tente novamente." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Keyframes garantidos independente do build do Tailwind */}
      <style>{`
        @keyframes chatPopIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1);   }
        }
        @keyframes chatPopOut {
          from { opacity: 1; transform: scale(1);   }
          to   { opacity: 0; transform: scale(0.8); }
        }
      `}</style>

      {open && (
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            bottom: "96px",
            right: "20px",
            zIndex: 50,
            width: "360px",
            maxWidth: "calc(100vw - 20px)",
            height: "480px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "1rem",
            boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            border: "1px solid var(--cinza-borda)",
            backgroundColor: "var(--branco)",
            overflow: "hidden",
            transformOrigin: "bottom right",
          }}
          role="dialog"
          aria-label="Chat de suporte"
        >
          {/* header */}
          <div className="flex items-center px-4 py-3 bg-[var(--azul)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--verde)]" aria-hidden />
              <span className="text-[14px] font-semibold text-white">
                Mundial Telhas
              </span>
            </div>
          </div>

          {/* messages */}
          <ScrollArea className="flex-1 min-h-0 bg-[var(--cinza-suave)]">
            <div className="px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[var(--azul)] text-white rounded-br-sm"
                        : "bg-white text-[var(--preto-texto)] border border-[var(--cinza-borda)] rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[var(--cinza-borda)] rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                    <Loader2 className="w-4 h-4 text-[var(--azul)] animate-spin" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-[var(--cinza-borda)] bg-[var(--branco)]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua dúvida..."
              disabled={loading}
              className="flex-1 text-[13.5px] px-3 py-2 rounded-lg border border-[var(--cinza-borda)] bg-[var(--cinza-suave)] text-[var(--preto-texto)] placeholder:text-[var(--cinza-texto)] focus:outline-none focus:border-[var(--azul)] transition-colors disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Enviar mensagem"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--azul)] text-white transition-opacity hover:opacity-90 disabled:opacity-40 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* toggle button */}
      <button
        onClick={open ? handleClose : handleOpen}
        aria-label={open ? "Fechar chat" : "Abrir chat de suporte"}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--azul)] text-white flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  )
}
