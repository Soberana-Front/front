import { useEffect, useRef } from 'react'

import { ChatMessage } from '../ChatMessage/ChatMessage'
import { ChatInput } from '../ChatInput/ChatInput'

import type { PricingChatMessage } from '../../../hooks/usePricingChat'

// ========================================
// PROPS
// ========================================

/**
 * Props recebidas pelo componente de conversa.
 *
 * O componente não controla mais a lógica da IA.
 * Essa responsabilidade pertence ao usePricingChat.
 */
interface ChatConversationProps {
  /**
   * Mensagens atuais da conversa.
   */
  messages: PricingChatMessage[]

  /**
   * Função responsável pelo envio de mensagens.
   */
  onSendMessage: (message: string) => void

  /**
   * Indica que a IA está processando uma resposta.
   */
  isTyping: boolean

  /**
   * Indica que a conversa foi finalizada.
   */
  isCompleted: boolean

  /**
   * Finaliza a conversa.
   */
  onFinishConversation: () => void

  /**
   * Avança para a próxima etapa.
   */
  onNext?: () => void
}

// ========================================
// COMPONENTE
// ========================================

/**
 * Exibe a interface da conversa de precificação.
 *
 * A lógica de mensagens e simulação da IA fica
 * centralizada no hook usePricingChat.
 */
export default function ChatConversation({
  messages,
  onSendMessage,
  isTyping,
  isCompleted,
  onFinishConversation,
  onNext,
}: ChatConversationProps) {
  // ========================================
  // REFERÊNCIA DO SCROLL
  // ========================================

  /**
   * Referência utilizada para manter a conversa
   * posicionada na última mensagem.
   */
  const messagesEndRef =
    useRef<HTMLDivElement | null>(null)

  // ========================================
  // SCROLL AUTOMÁTICO
  // ========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages, isTyping])

  // ========================================
  // AVANÇAR
  // ========================================

  /**
   * Só permite avançar depois que a conversa
   * estiver finalizada e a IA não estiver digitando.
   */
  const handleNext = () => {
    if (!isCompleted || isTyping) {
      return
    }

    onNext?.()
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================

  return (
    <section className="chat-conversation">
      {/* ====================================
          CABEÇALHO
          ==================================== */}

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

      {/* ====================================
          ÁREA DO CHAT
          ==================================== */}

      <div className="chat-conversation__card">
        <div className="chat-conversation__messages">
          {/* Renderiza todas as mensagens recebidas do hook */}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              message={message.message}
              timestamp={message.timestamp}
            />
          ))}

          {/* ====================================
              INDICADOR DE DIGITAÇÃO
              ==================================== */}

          {isTyping && (
            <div
              className="chat-conversation__loading"
              aria-live="polite"
            >
              Soberana AI está digitando...
            </div>
          )}

          {/* Elemento utilizado para o scroll automático */}
          <div ref={messagesEndRef} />
        </div>

        {/* ====================================
            CAMPO DE ENVIO
            ==================================== */}

        <div className="chat-conversation__input">
          <ChatInput
            onSendMessage={onSendMessage}
            disabled={isTyping || isCompleted}
          />
        </div>
      </div>

      {/* ====================================
          AÇÕES
          ==================================== */}

      <div className="chat-conversation__footer">
        {/* Finaliza a conversa manualmente */}
        {!isCompleted && (
          <button
            type="button"
            className="chat-conversation__finish-button"
            onClick={onFinishConversation}
            disabled={
              isTyping ||
              messages.length <= 1
            }
          >
            Encerrar conversa
          </button>
        )}

        {/* Avança para o resultado */}
        <button
          type="button"
          className="chat-conversation__next-button"
          onClick={handleNext}
          disabled={
            !isCompleted ||
            isTyping
          }
        >
          Próximo
        </button>
      </div>
    </section>
  )
}