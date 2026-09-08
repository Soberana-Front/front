import {
  useCallback,
  useState,
} from 'react'

import type {
  ChatMessage,
} from '../types/pricing'

import type {
  AdicionarItemData,
} from '../components/dashboard/AdicionarItem/AdicionarItem'

// ============================================================
// COMPATIBILIDADE
// ============================================================

/**
 * Mantém o nome PricingChatMessage utilizado pelos
 * componentes atuais, mas agora ele é baseado no tipo
 * oficial ChatMessage.
 */
export type PricingChatMessage = ChatMessage

// ============================================================
// RESPOSTA MOCKADA DA IA
// ============================================================

/**
 * Resposta utilizada enquanto a API real da IA
 * ainda não está integrada.
 */
const MOCK_AI_RESPONSE =
  'Entendido! Obrigado pelas informações. Vou considerar esses dados para a sua precificação.'

// ============================================================
// MENSAGEM INICIAL
// ============================================================

/**
 * Cria a mensagem inicial da conversa.
 */
const createInitialMessage = (): PricingChatMessage => ({
  id: `initial-${Date.now()}`,
  sender: 'ia',
  message:
    'Olá! Vamos precificar seu procedimento. Me conte mais sobre os custos envolvidos...',
  timestamp: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
})

// ============================================================
// FORMATAÇÃO
// ============================================================

/**
 * Formata um valor numérico para moeda brasileira.
 */
const formatCurrency = (
  value: number,
): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

/**
 * Converte a categoria interna do item
 * para um texto amigável.
 */
const getCategoryLabel = (
  category: AdicionarItemData['category'],
): string => {
  switch (category) {
    case 'material':
      return 'Material'

    case 'comissao':
      return 'Comissão'

    case 'imposto':
      return 'Imposto'

    case 'gasto_adicional':
      return 'Gasto adicional'

    case 'outro':
      return 'Outro'

    default:
      return 'Outro'
  }
}

// ============================================================
// HOOK
// ============================================================

/**
 * Hook responsável pelo gerenciamento da conversa
 * de precificação.
 */
export function usePricingChat() {
  // ==========================================================
  // MENSAGENS
  // ==========================================================

  const [messages, setMessages] = useState<
    PricingChatMessage[]
  >([createInitialMessage()])

  // ==========================================================
  // ESTADO DA IA
  // ==========================================================

  const [isTyping, setIsTyping] =
    useState(false)

  // ==========================================================
  // ESTADO DA CONVERSA
  // ==========================================================

  const [isCompleted, setIsCompleted] =
    useState(false)

  // ==========================================================
  // ENVIAR MENSAGEM
  // ==========================================================

  const sendMessage = useCallback(
    (text: string) => {
      const trimmedText = text.trim()

      if (!trimmedText) {
        return
      }

      if (isTyping) {
        return
      }

      if (isCompleted) {
        return
      }

      // ------------------------------------------------------
      // Mensagem do usuário
      // ------------------------------------------------------

      const userMessage: PricingChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        message: trimmedText,
        timestamp: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        ),
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
      ])

      // ------------------------------------------------------
      // Inicia simulação da IA
      // ------------------------------------------------------

      setIsTyping(true)

      window.setTimeout(() => {
        const aiMessage: PricingChatMessage = {
          id: `ia-${Date.now()}`,
          sender: 'ia',
          message: MOCK_AI_RESPONSE,
          timestamp: new Date().toLocaleTimeString(
            [],
            {
              hour: '2-digit',
              minute: '2-digit',
            },
          ),
        }

        setMessages((currentMessages) => [
          ...currentMessages,
          aiMessage,
        ])

        setIsTyping(false)
        setIsCompleted(true)
      }, 1000)
    },
    [isTyping, isCompleted],
  )

  // ==========================================================
  // ADICIONAR ITEM
  // ==========================================================

  const addItem = useCallback(
    (item: AdicionarItemData) => {
      if (isTyping) {
        return
      }

      if (isCompleted) {
        return
      }

      const categoryLabel =
        getCategoryLabel(item.category)

      const itemMessage: PricingChatMessage = {
        id: `item-${Date.now()}`,
        sender: 'user',
        message:
          `Item adicionado: ${item.name} — ` +
          `${formatCurrency(item.value)} ` +
          `(${categoryLabel})`,
        timestamp: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        ),
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        itemMessage,
      ])
    },
    [isTyping, isCompleted],
  )

  // ==========================================================
  // FINALIZAR CONVERSA
  // ==========================================================

  const finishConversation = useCallback(() => {
    if (isTyping) {
      return
    }

    if (messages.length <= 1) {
      return
    }

    setIsCompleted(true)
  }, [isTyping, messages.length])

  // ==========================================================
  // RESET
  // ==========================================================

  const resetChat = useCallback(() => {
    setMessages([createInitialMessage()])
    setIsTyping(false)
    setIsCompleted(false)
  }, [])

  // ==========================================================
  // RETORNO
  // ==========================================================

  return {
    messages,
    isTyping,
    isCompleted,

    sendMessage,
    addItem,

    finishConversation,
    resetChat,
  }
}

export default usePricingChat