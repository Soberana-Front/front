import { useEffect, useRef } from 'react'

import { ChatMessage } from '../ChatMessage/ChatMessage'
import { ChatInput } from '../ChatInput/ChatInput'
import AdicionarItem from '../AdicionarItem/AdicionarItem'

import type {
  PricingChatMessage,
} from '../../../hooks/usePricingChat'

import type {
  AdicionarItemData,
} from '../AdicionarItem/AdicionarItem'

// ========================================
// PROPS
// ========================================

/**
 * Props recebidas pelo componente de conversa.
 *
 * O componente não controla a lógica da IA.
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
   * Função responsável pela inclusão de um
   * novo item de custo na conversa.
   */
  onAddItem: (item: AdicionarItemData) => void

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
 * A lógica de mensagens, IA e adição de itens
 * fica centralizada nos hooks.
 */
export default function ChatConversation({
  messages,
  onSendMessage,
  onAddItem,
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

  /**
   * Sempre que uma mensagem nova for adicionada
   * ou a IA começar a digitar, leva a conversa
   * automaticamente para o final.
   */
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
          {/* ====================================
              MENSAGENS
              ==================================== */}

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

        {/* ====================================
            ADICIONAR ITEM
            ==================================== */}

        <div className="chat-conversation__add-item">
          <AdicionarItem
            onAddItem={onAddItem}
            disabled={isTyping || isCompleted}
          />
        </div>
      </div>

      {/* ====================================
          AÇÕES
          ==================================== */}

      <div className="chat-conversation__footer">
        {/* ====================================
            FINALIZAR CONVERSA
            ==================================== */}

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

        {/* ====================================
            PRÓXIMO
            ==================================== */}

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