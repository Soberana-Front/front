import { useEffect, useRef, useState } from 'react'

import { ChatMessage } from '../ChatMessage/ChatMessage'
import { ChatInput } from '../ChatInput/ChatInput'

import type {
  PricingWizardMessage,
} from '../../../hooks/usePricingWizard'

// ========================================
// PROPS
// ========================================

interface ChatConversationProps {
  /**
   * Mensagens controladas pelo usePricingWizard.
   */
  messages?: PricingWizardMessage[]

  /**
   * Permite adicionar uma nova mensagem
   * ao estado central do wizard.
   */
  onAddMessage?: (
    message: PricingWizardMessage,
  ) => void

  onNext?: () => void

  onConversationComplete?: () => void
}

// ========================================
// RESPOSTA MOCKADA DA IA
// ========================================

const MOCK_AI_RESPONSE =
  'Entendido! Obrigado pelas informações. Vou considerar esses dados para a sua precificação.'

// ========================================
// COMPONENTE
// ========================================

export default function ChatConversation({
  messages = [],
  onAddMessage,
  onNext,
  onConversationComplete,
}: ChatConversationProps) {
  // Controla somente o processamento local da resposta da IA.
  const [isProcessing, setIsProcessing] =
    useState(false)

  // Indica se a conversa atual foi concluída.
  const [conversationCompleted, setConversationCompleted] =
    useState(false)

  // Referência utilizada para rolar automaticamente
  // até a última mensagem.
  const messagesEndRef =
    useRef<HTMLDivElement | null>(null)

  // ========================================
  // SCROLL AUTOMÁTICO
  // ========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, isProcessing])

  // ========================================
  // ENVIO DE MENSAGEM
  // ========================================

  const handleSendMessage = (text: string) => {
    const trimmedText = text.trim()

    // Não envia mensagem vazia ou enquanto
    // a IA ainda estiver processando.
    if (!trimmedText || isProcessing) {
      return
    }

    const userMessage: PricingWizardMessage = {
      id: Date.now(),
      sender: 'user',
      message: trimmedText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    // A mensagem agora é adicionada ao estado
    // centralizado no usePricingWizard.
    onAddMessage?.(userMessage)

    setConversationCompleted(false)
    setIsProcessing(true)

    // Mock temporário da resposta da IA.
    window.setTimeout(() => {
      const aiMessage: PricingWizardMessage = {
        id: Date.now() + 1,
        sender: 'ia',
        message: MOCK_AI_RESPONSE,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      // Adiciona a resposta da IA ao mesmo
      // estado centralizado do wizard.
      onAddMessage?.(aiMessage)

      setIsProcessing(false)
      setConversationCompleted(true)

      onConversationComplete?.()
    }, 1000)
  }

  // ========================================
  // AVANÇAR
  // ========================================

  const handleNext = () => {
    if (!conversationCompleted || isProcessing) {
      return
    }

    onNext?.()
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================

  return (
    <section className="chat-conversation">
      <header className="chat-conversation__header">
        <div>
          <span className="chat-conversation__step">
            Etapa 3
          </span>

          <h2 className="chat-conversation__title">
            Converse com a Soberana AI
          </h2>

          <p className="chat-conversation__description">
            Converse com a IA para refinar as informações da sua
            precificação.
          </p>
        </div>
      </header>

      <div className="chat-conversation__card">
        <div className="chat-conversation__messages">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              message={message.message}
              timestamp={message.timestamp}
            />
          ))}

          {isProcessing && (
            <div className="chat-conversation__loading">
              Soberana AI está digitando...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-conversation__input">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isProcessing}
          />
        </div>
      </div>

      <div className="chat-conversation__footer">
        <button
          type="button"
          className="chat-conversation__next-button"
          onClick={handleNext}
          disabled={
            !conversationCompleted ||
            isProcessing
          }
        >
          Próximo
        </button>
      </div>
    </section>
  )
}