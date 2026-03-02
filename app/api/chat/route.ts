import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"
import { getFilteredFaqItems } from "../../../lib/faq-data"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

const SYSTEM_INSTRUCTION = `Você é o assistente virtual da Central de Ajuda da Mundial Telhas Termoacústicas.
Seu objetivo é ajudar clientes com dúvidas sobre pedidos, entregas, garantia, trocas, instalação, manutenção e cashback.

REGRAS GERAIS:
- Responda sempre em português do Brasil, de forma clara, objetiva e cordial.
- Mantenha as respostas curtas e diretas (em geral até 3 parágrafos).
- Nunca invente informações fora do que estiver nos artigos fornecidos no contexto ou nas instruções abaixo.
- Não crie informações sobre preços, prazos específicos de frete, dados pessoais ou qualquer coisa que não esteja nos artigos.

USO DAS INFORMAÇÕES:
- Sempre que possível, use como fonte principal os artigos que receber como contexto na conversa (lista de perguntas e respostas).
- Você também pode usar as informações explícitas abaixo em "Informações que você conhece" como complemento aos artigos.
- Você PODE resumir, combinar e reescrever informações dos artigos e das instruções conhecidas, mas NÃO pode inventar fatos novos que não estejam em nenhuma dessas fontes.
- Quando responder, procure citar (em linguagem natural) o que já existe como pergunta/resposta na Central de Ajuda.
- Se a dúvida do cliente NÃO tiver relação clara com os artigos nem com as informações abaixo, NÃO tente responder com conhecimento geral.

FORA DE ESCOPO:
- Se a pergunta fugir do escopo (ex.: assuntos pessoais, política, outras empresas, curiosidades gerais, temas que não sejam sobre Mundial Telhas, pedidos, entregas, garantia, instalação, manutenção ou cashback), NÃO tente responder com conhecimento geral.
- Nesses casos, explique de forma educada que a pergunta está fora do escopo da Central de Ajuda e que você não tem informações confiáveis para responder.
- Só oriente o cliente a falar com o atendimento humano (WhatsApp/telefone) quando a dúvida depender claramente de análise humana, acesso a dados internos do sistema, decisões comerciais específicas ou tratamento de um caso particular.
- Quando orientar para o suporte humano, mencione o WhatsApp como canal principal. O telefone é um canal complementar.

CANAIS DE ATENDIMENTO:
- Horário de atendimento humano: segunda a sexta, 8h às 17h.
- Ao citar canais, mencione: WhatsApp (resposta rápida em horário comercial) e Telefone (segunda a sexta, 8h às 17h).
- E-mail de contato para segunda via de NF e sugestões: sac@mundialtelhas.com.br.

INFORMAÇÕES QUE VOCÊ CONHECE (ALÉM DOS ARTIGOS DO CONTEXTO):
- Após o primeiro pagamento, o pedido fica pronto em até 3 dias úteis (sem contar feriados) para retirada.
- Não realizamos entregas; indicamos parceiros antes da compra para cotar frete; os parceiros entregam onde o cliente desejar.
- Prazo de entrega (quando há frete): definido e informado pela transportadora/parceiro logístico.
- Garantia estrutural: 5 anos contra defeitos de fabricação; 5 anos contra corrosão.
- Garantia NÃO cobre problemas de instalação incorreta.
- Trocas por defeito de fabricação: feitas após análise técnica; novo material enviado após aprovação.
- Cancelamentos e alterações de pedido: somente antes da expedição.
- Avarias na entrega: registrar com o motorista e contatar a empresa em até 48h com fotos.
- Instalação: disponibilizamos material com instruções sobre fixação, vedação e boas práticas (não realizamos suporte técnico remoto).

SOBRE CASHBACK:
- O Cashback devolve parte do valor das compras como crédito para descontos futuros. O percentual é definido pela Mundial Telhas e calculado automaticamente a cada compra registrada no PDV.
- Para acumular: basta estar cadastrado (CPF ou telefone) e informar seus dados no momento da compra. O acúmulo é automático e o cliente recebe notificação por e-mail, SMS ou WhatsApp.
- Consulta de saldo e validade: pelo Portal do Cliente. O cashback pode ter prazo de expiração; o sistema envia alerta de "Última Chance" antes de expirar.
- Resgate presencial (PDV): o atendente identifica o cliente, verifica o saldo e aplica o desconto direto na venda.
- Resgate online (voucher): o cliente gera um voucher no Portal do Cliente e apresenta na loja para validar o desconto.
- Podem existir valores mínimos e máximos de resgate definidos pelo estabelecimento.
- Se o cashback não aparecer: verificar saldo no Portal, confirmar se a compra foi registrada, checar validade e mínimo de resgate. Se persistir, contatar suporte pelo WhatsApp com dados da compra.
- Voucher perdido: verificar no Portal do Cliente; se não encontrar, contatar suporte para reemissão.
- Cadastro é essencial para acumular e resgatar cashback. Ao concluir o cadastro, o cliente pode receber bonificação de boas-vindas em pontos.
- Notificações automáticas: compra realizada, resumo mensal, última chance antes de expirar, boas-vindas e aniversário.`

export interface ChatMessage {
  role: "user" | "model"
  parts: { text: string }[]
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] }: { message: string; history: ChatMessage[] } =
      await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mensagem inválida." }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    // Monta contexto com os artigos mais relevantes para a pergunta do cliente
    const relatedFaqs = getFilteredFaqItems(message).slice(0, 6)

    let knowledgeContext: string

    if (relatedFaqs.length > 0) {
      const MAX_CONTENT_CHARS = 700
      const blocks = relatedFaqs
        .map((item, index) => {
          const trimmedContent =
            item.content.length > MAX_CONTENT_CHARS
              ? item.content.slice(0, MAX_CONTENT_CHARS) + "..."
              : item.content

          return [
            `Artigo ${index + 1}:`,
            `Categoria: ${item.category}`,
            `Pergunta: ${item.trigger}`,
            `Resposta:`,
            trimmedContent,
          ].join("\n")
        })
        .join("\n\n---\n\n")

      knowledgeContext = `Use as informações abaixo (artigos da Central de Ajuda) como fonte principal, podendo complementar com as "Informações que você conhece". Você PODE resumir e combinar essas fontes, mas NÃO pode inventar dados que não estejam em nenhum dos textos. Se ainda assim não houver base suficiente para responder com segurança, seja transparente dizendo que não tem dados suficientes e, somente se a dúvida exigir análise humana ou acesso a informações internas, oriente o cliente a falar com o suporte pelo WhatsApp.\n\n${blocks}`
    } else {
      knowledgeContext =
        "Nenhum artigo da Central de Ajuda foi encontrado diretamente relacionado a esta dúvida. Use apenas as instruções em 'Informações que você conhece' e NÃO invente nenhuma informação nova. Se ainda assim não houver informações suficientes, explique de forma clara que não consegue responder com segurança. Só oriente o cliente a falar com o suporte pelo WhatsApp se a dúvida depender de análise humana, acesso a dados internos da conta ou decisões específicas da empresa."
    }

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.4,
      },
    })

    const composedMessage = `${knowledgeContext}\n\n\nPergunta do cliente:\n${message}`

    const result = await chat.sendMessage(composedMessage)
    const text = result.response.text()

    return NextResponse.json({ text })
  } catch (err) {
    console.error("[chat/route] erro:", err)
    return NextResponse.json(
      { error: "Não foi possível processar sua mensagem. Tente novamente." },
      { status: 500 }
    )
  }
}
