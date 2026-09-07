import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "../ChatMessage/ChatMessage";
import { ChatInput } from "../ChatInput/ChatInput";

interface ChatMessageData {
  id: number;
  sender: "user" | "ia";
  message: string;
  timestamp: string;
}

interface ChatConversationProps {
  onNext?: () => void;
  onConversationComplete?: () => void;
}

const INITIAL_MESSAGE: ChatMessageData = {
  id: 1,
  sender: "ia",
  message:
    "Olá! Vamos precificar seu procedimento. Me conte mais sobre os custos envolvidos...",
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

const MOCK_AI_RESPONSE =
  "Entendido! Obrigado pelas informações. Vou considerar esses dados para a sua precificação.";

export default function ChatConversation({
  onNext,
  onConversationComplete,
}: ChatConversationProps) {
  const [messages, setMessages] = useState<ChatMessageData[]>([
    INITIAL_MESSAGE,
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const [conversationCompleted, setConversationCompleted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isProcessing]);

  const handleSendMessage = (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText || isProcessing) {
      return;
    }

    const userMessage: ChatMessageData = {
      id: Date.now(),
      sender: "user",
      message: trimmedText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setConversationCompleted(false);
    setIsProcessing(true);

    window.setTimeout(() => {
      const aiMessage: ChatMessageData = {
        id: Date.now() + 1,
        sender: "ia",
        message: MOCK_AI_RESPONSE,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        aiMessage,
      ]);

      setIsProcessing(false);
      setConversationCompleted(true);

      onConversationComplete?.();
    }, 1000);
  };

  const handleNext = () => {
    if (!conversationCompleted || isProcessing) {
      return;
    }

    onNext?.();
  };

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
          disabled={!conversationCompleted || isProcessing}
        >
          Próximo
        </button>
      </div>
    </section>
  );
}