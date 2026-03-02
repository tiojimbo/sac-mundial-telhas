export type FaqCategory = "pedido" | "garantia" | "instalacao" | "geral"

export const faqCategories: { key: FaqCategory; label: string }[] = [
  { key: "pedido", label: "Pedidos e Entregas" },
  { key: "garantia", label: "Garantia e Trocas" },
  { key: "instalacao", label: "Instalação e Manutenção" },
  { key: "geral", label: "Cashback" },
]

export const faqData: Record<
  FaqCategory,
  { value: string; trigger: string; content: string }[]
> = {
  pedido: [
    {
      value: "pedido-3",
      trigger: "Como solicitar a segunda via da nota fiscal?",
      content:
        "Envie um e-mail para sac@mundialtelhas.com.br com seu CPF/CNPJ e o número do pedido. A segunda via é enviada em até 24 horas úteis.",
    },
    {
      value: "pedido-4",
      trigger: "Posso alterar ou cancelar meu pedido?",
      content:
        "Alterações e cancelamentos podem ser solicitados enquanto o pedido não foi expedido. Entre em contato pelo WhatsApp ou telefone o mais rápido possível para que possamos verificar a viabilidade.",
    },
    {
      value: "pedido-5",
      trigger: "O que fazer se o pedido chegou com avarias?",
      content:
        "Registre o problema no ato da entrega junto ao motorista e tire fotos das avarias. Em seguida, entre em contato conosco em até 48 horas pelo WhatsApp com as fotos e o número do pedido para abrirmos uma ocorrência.",
    },
    {
      value: "pedido-6",
      trigger: "Em quanto tempo recebo meu pedido?",
      content:
        "Após o primeiro pagamento aprovado, o seu pedido entra imediatamente na fila de produção e fica pronto em até 3 dias úteis, sem contar feriados.\n\nExemplo prático:\n\n- Pagamento confirmado na segunda-feira → até quinta-feira o pedido já estará pronto para retirada.\n\nAssim que o pedido estiver liberado, nossa equipe entra em contato para informar a liberação para retirada.\n\nImportante: devido à alta rotatividade de pedidos, a retirada deve ser realizada em até 24 horas após a liberação. Não é possível manter o material por muito tempo parado na fábrica.",
    },
    {
      value: "pedido-7",
      trigger: "Realizam entregas?",
      content:
        "Atualmente não realizamos entregas diretamente. Porém, indicamos transportadoras e parceiros logísticos de confiança antes mesmo de você finalizar a compra, para que possa comparar opções e cotar o frete com tranquilidade.\n\nComo funciona na prática:\n\n- Você informa a cidade/bairro onde deseja receber o material;\n- Indicamos parceiros que atuam na sua região;\n- Você negocia diretamente com a transportadora condições de prazo e valor;\n- O parceiro faz a retirada na Mundial Telhas e entrega o pedido no endereço combinado com você.",
    },
  ],
  garantia: [
    {
      value: "garantia-1",
      trigger: "Qual o prazo de garantia das telhas?",
      content:
        "Oferecemos 5 anos de garantia estrutural contra defeitos de fabricação e 5 anos contra corrosão, conforme laudo técnico do fabricante. Durante esse período, cobrimos falhas de fabricação e corrosão dentro das condições de uso previstas.",
    },
    {
      value: "garantia-2",
      trigger: "Como acionar a garantia?",
      content:
        "Entre em contato pelo WhatsApp ou e-mail com fotos do problema, a nota fiscal e uma descrição detalhada. Nossa equipe técnica analisa o caso em até 48 horas úteis e informa os próximos passos.",
    },
    {
      value: "garantia-3",
      trigger: "A garantia cobre problemas de instalação?",
      content:
        "Não. A garantia cobre exclusivamente defeitos de fabricação. Problemas decorrentes de instalação incorreta não estão cobertos. Por isso, disponibilizamos manual técnico e material com instruções sobre fixação, vedação e boas práticas antes e durante a instalação.",
    },
    {
      value: "garantia-4",
      trigger: "Como funciona o processo de troca ou devolução?",
      content:
        "Após a análise técnica, caso seja confirmado defeito de fabricação, realizamos a troca do material sem custo. O prazo para envio do novo material é de até 7 dias úteis após a aprovação.",
    },
  ],
  instalacao: [
    {
      value: "instalacao-1",
      trigger: "Onde encontro o manual de instalação?",
      content:
        "O manual técnico é enviado junto com o pedido por e-mail. Caso precise de uma nova cópia, entre em contato pelo WhatsApp ou acesse a seção de downloads no nosso site.",
    },
    {
      value: "instalacao-2",
      trigger: "Oferecem suporte técnico para instalação?",
      content:
        "Sim. Disponibilizamos material com instruções sobre fixação, vedação e boas práticas para todo o processo de instalação. O material é enviado junto com o pedido ou pode ser solicitado pelo WhatsApp.",
    },
    {
      value: "instalacao-3",
      trigger: "Quais os cuidados de manutenção recomendados?",
      content:
        "Recomendamos inspeção visual semestral, limpeza com água e detergente neutro, e verificação das fixações. Evite pisar diretamente sobre os painéis sem tábua de apoio.",
    },
    {
      value: "instalacao-4",
      trigger: "Posso instalar sobre a estrutura existente?",
      content:
        "Na maioria dos casos, sim. Porém, é necessário avaliar a capacidade de carga da estrutura atual. Envie fotos e medidas pelo WhatsApp para nossa equipe técnica fazer a análise.",
    },
  ],
  geral: [
    {
      value: "geral-1",
      trigger: "O que é o Cashback da Mundial Telhas e como ele funciona?",
      content:
        "O Cashback da Mundial Telhas é um programa de fidelidade que devolve parte do valor das suas compras na forma de crédito. Esse crédito fica disponível na sua conta e pode ser usado como desconto em compras futuras. O percentual de devolução é definido pela Mundial Telhas e calculado automaticamente a cada compra registrada. Por exemplo, se o percentual for de 5% e você gastar R$ 200,00, receberá R$ 10,00 de cashback. Simples assim: quanto mais você compra, mais crédito acumula para economizar nas próximas visitas.",
    },
    {
      value: "geral-2",
      trigger: "Como eu acumulo Cashback nas minhas compras?",
      content:
        "O acúmulo é automático. Toda vez que uma compra é registrada no ponto de venda (PDV) da Mundial Telhas e o atendente identifica seu cadastro (por CPF ou telefone), o sistema calcula o cashback com base no percentual configurado e credita o valor na sua conta. Você receberá uma notificação por e-mail, SMS ou WhatsApp confirmando o saldo acumulado. Não é necessário solicitar nada — basta estar cadastrado e informar seus dados no momento da compra.",
    },
    {
      value: "geral-3",
      trigger: "Onde posso consultar meu saldo de Cashback e sua validade?",
      content:
        "Você pode consultar seu saldo a qualquer momento pelo Portal do Cliente, a área exclusiva personalizada da Mundial Telhas. Lá você visualiza o valor disponível, o histórico de acúmulos e a validade de cada crédito. É importante ficar atento: o cashback pode ter um prazo de expiração. Quando o vencimento estiver próximo, o sistema envia uma notificação de \"Última Chance\" para que você aproveite o saldo antes que ele expire.",
    },
    {
      value: "geral-4",
      trigger: "Como faço para usar meu Cashback?",
      content:
        "Existem duas formas de resgatar seu cashback:\n\n1. Resgate presencial (no PDV): Ao realizar uma compra na loja, informe ao atendente que deseja usar seu cashback. Ele identificará seu cadastro, verificará o saldo disponível, informará o valor que será utilizado e aplicará o desconto diretamente na venda.\n\n2. Resgate online (voucher): Acesse o Portal do Cliente, solicite o resgate do cashback e gere um código (voucher). Na próxima visita à loja, apresente esse código ao atendente para validar o desconto na sua compra.",
    },
    {
      value: "geral-5",
      trigger: "Existem limites ou restrições para usar meu Cashback?",
      content:
        "Sim, podem existir regras definidas pela Mundial Telhas. O estabelecimento pode configurar valores mínimos e máximos para cada resgate. Por exemplo, pode haver um valor mínimo de saldo para que o resgate seja liberado, ou um limite máximo de desconto por compra. Para saber os limites vigentes, consulte o Portal do Cliente ou entre em contato com nosso atendimento pelo WhatsApp.",
    },
    {
      value: "geral-6",
      trigger: "Meu Cashback não apareceu ou não consigo resgatar, o que devo fazer?",
      content:
        "Caso seu cashback não tenha sido creditado ou você não consiga resgatá-lo, siga este passo a passo:\n\n1. Acesse o Portal do Cliente e verifique se o saldo está atualizado.\n2. Confirme se a compra foi registrada corretamente (verifique seu histórico de transações).\n3. Verifique se o cashback não expirou consultando a data de validade.\n4. Certifique-se de que o valor atende ao mínimo de resgate configurado.\n\nSe após essas verificações o problema persistir, entre em contato com o suporte da Mundial Telhas pelo WhatsApp, informando a data da compra, o valor e o comprovante, para que possamos analisar e resolver a situação.",
    },
    {
      value: "geral-7",
      trigger: "Perdi meu voucher de Cashback, e agora?",
      content:
        "Sem preocupação! O voucher é um código único vinculado à sua conta. Acesse o Portal do Cliente e verifique se o voucher ainda está disponível na sua área de resgates. Caso não consiga localizá-lo, entre em contato com o suporte da Mundial Telhas pelo WhatsApp informando seus dados. A equipe poderá verificar a possibilidade de reemissão ou validação do voucher.",
    },
    {
      value: "geral-8",
      trigger: "Meu cadastro de cliente afeta meu Cashback?",
      content:
        "Sim, o cadastro é essencial. É através dele que o sistema identifica você e associa os créditos de cashback à sua conta. Sem cadastro, não é possível acumular nem resgatar cashback. A boa notícia é que o cadastro é rápido — pode ser feito na própria loja pelo atendente ou por você no Portal do Cliente. Além disso, ao concluir o cadastro, você pode receber uma bonificação de boas-vindas em pontos, creditada automaticamente na sua conta.",
    },
    {
      value: "geral-9",
      trigger: "Recebo notificações sobre meu Cashback?",
      content:
        "Sim! O sistema da Mundial Telhas envia notificações automáticas para que você acompanhe seu saldo sem esforço. Veja os principais momentos em que você é notificado:\n\n• Compra realizada: Confirmação de cashback ganho e pontos acumulados.\n• Resumo mensal: Extrato de saldo para lembrar você de aproveitar seus créditos.\n• Última chance: Alerta quando seu cashback ou pontos estão próximos de expirar.\n• Boas-vindas: Mensagem ao concluir o cadastro, com possível bonificação.\n• Aniversário: Mensagem de parabéns com possibilidade de brinde especial.\n\nAs notificações são enviadas por e-mail, SMS ou WhatsApp, conforme seus dados cadastrais.",
    },
  ],
}

const VALID_CATEGORIES: FaqCategory[] = ["pedido", "garantia", "instalacao", "geral"]

export function isFaqCategory(slug: string): slug is FaqCategory {
  return VALID_CATEGORIES.includes(slug as FaqCategory)
}

export function getFaqItem(
  categoria: string,
  pergunta: string
): { value: string; trigger: string; content: string } | null {
  if (!isFaqCategory(categoria)) return null
  return faqData[categoria].find((item) => item.value === pergunta) ?? null
}

export function getStaticFaqParams(): { categoria: string; pergunta: string }[] {
  const params: { categoria: string; pergunta: string }[] = []
  for (const [categoria, items] of Object.entries(faqData)) {
    for (const item of items) {
      params.push({ categoria, pergunta: item.value })
    }
  }
  return params
}

export function getFilteredFaqItems(query: string): {
  value: string
  trigger: string
  content: string
  category: FaqCategory
}[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const items: { value: string; trigger: string; content: string; category: FaqCategory }[] = []
  for (const [category, list] of Object.entries(faqData)) {
    for (const item of list) {
      if (
        item.trigger.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
      ) {
        items.push({ ...item, category: category as FaqCategory })
      }
    }
  }
  return items
}
