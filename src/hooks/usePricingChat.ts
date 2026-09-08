import { useCallback, useState } from 'react'

// ========================================
// TIPOS
// ========================================

/**
 * Representa uma mensagem exibida na conversa
 * de precificação.
 */
export interface PricingChatMessage {
  id: number
  sender: 'user' | 'ia'
  message: string
  timestamp: string
}

// ========================================
// CONSTANTES
// ========================================

/**
 * Resposta mockada da IA.
 *
 * Enquanto a integração com o backend não existe,
 * utilizamos esta resposta para simular o comportamento
 * da inteligência artificial.
 */
const MOCK_AI_RESPONSE =
  'Entendido! Obrigado pelas informações. Vou considerar esses dados para a sua precificação.'

/**
 * Cria a mensagem inicial da conversa.
 *
 * Utilizamos uma função em vez de um objeto fixo para
 * que o horário seja atualizado sempre que o chat for
 * reiniciado.
 */
const createInitialMessage = (): PricingChatMessage => ({
  id: 1,
  sender: 'ia',
  message:
    'Olá! Vamos precificar seu procedimento. Me conte mais sobre os custos envolvidos...',
  timestamp: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
})

// ========================================
// HOOK PRINCIPAL
// ========================================

/**
 * Hook responsável por controlar toda a lógica
 * da conversa de precificação.
 *
 * Responsabilidades:
 * - Armazenar mensagens;
 * - Informar quando a IA está digitando;
 * - Enviar mensagens;
 * - Simular respostas da IA;
 * - Finalizar a conversa;
 * - Reiniciar o chat.
 */
export function usePricingChat() {
  // ========================================
  // ESTADO DAS MENSAGENS
  // ========================================

  /**
   * Lista completa das mensagens da conversa.
   */
  const [messages, setMessages] = useState<
    PricingChatMessage[]
  >([createInitialMessage()])

  // ========================================
  // ESTADO DE DIGITAÇÃO
  // ========================================

  /**
   * Indica se a IA está simulando uma resposta.
   */
  const [isTyping, setIsTyping] = useState(false)

  // ========================================
  // ESTADO DE CONCLUSÃO
  // ========================================

  /**
   * Indica se a conversa foi finalizada.
   */
  const [isCompleted, setIsCompleted] = useState(false)

  // ========================================
  // ENVIAR MENSAGEM
  // ========================================

  /**
   * Adiciona uma mensagem do usuário e inicia
   * a simulação da resposta da IA.
   */
  const sendMessage = useCallback(
    (text: string) => {
      const trimmedText = text.trim()

      // Não permite enviar mensagens vazias.
      if (!trimmedText) {
        return
      }

      // Não permite enviar outra mensagem enquanto
      // a IA ainda estiver respondendo.
      if (isTyping) {
        return
      }

      // Não permite continuar uma conversa finalizada.
      if (isCompleted) {
        return
      }

      // ========================================
      // MENSAGEM DO USUÁRIO
      // ========================================

      const userMessage: PricingChatMessage = {
        id: Date.now(),
        sender: 'user',
        message: trimmedText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
      ])

      // Ativa o indicador de digitação da IA.
      setIsTyping(true)

      // ========================================
      // RESPOSTA MOCKADA
      // ========================================

      /**
       * Simula o tempo de processamento da IA.
       *
       * Posteriormente este setTimeout poderá ser
       * substituído por uma chamada à API.
       */
      window.setTimeout(() => {
        const aiMessage: PricingChatMessage = {
          id: Date.now() + 1,
          sender: 'ia',
          message: MOCK_AI_RESPONSE,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }

        setMessages((currentMessages) => [
          ...currentMessages,
          aiMessage,
        ])

        // A IA terminou de responder.
        setIsTyping(false)

        // A conversa pode ser finalizada.
        setIsCompleted(true)
      }, 1000)
    },
    [isTyping, isCompleted],
  )

  // ========================================
  // FINALIZAR CONVERSA
  // ========================================

  /**
   * Finaliza manualmente a conversa.
   *
   * Não permite finalizar enquanto a IA estiver
   * processando uma resposta ou antes de existir
   * uma interação do usuário.
   */
  const finishConversation = useCallback(() => {
    if (isTyping) {
      return
    }

    if (messages.length <= 1) {
      return
    }

    setIsCompleted(true)
  }, [isTyping, messages.length])

  // ========================================
  // RESET
  // ========================================

  /**
   * Reinicia somente o estado do chat.
   */
  const resetChat = useCallback(() => {
    setMessages([createInitialMessage()])
    setIsTyping(false)
    setIsCompleted(false)
  }, [])

  // ========================================
  // RETORNO
  // ========================================

  return {
    messages,
    isTyping,
    isCompleted,
    sendMessage,
    finishConversation,
    resetChat,
  }
}

export default usePricingChat