import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Interface que define as props que o componente aceita
interface ChatInputProps {
  /** Função chamada quando o usuário envia uma mensagem */
  onSendMessage?: (message: string) => void;
  /** Texto de placeholder do input */
  placeholder?: string;
  /** Desabilita o campo e o botão */
  disabled?: boolean;
}

// Componente funcional ChatInput
export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Digite sua mensagem...',
  disabled = false,
}) => {
  // Estado para armazenar o texto digitado pelo usuário
  const [message, setMessage] = useState('');

  /**
   * Função chamada ao clicar no botão ou pressionar Enter
   * Valida se a mensagem não está vazia e se o componente não está desabilitado
   */
  const handleSend = () => {
    if (!message.trim() || disabled) return;

    if (onSendMessage) {
      onSendMessage(message.trim());
    } else {
      console.log('Mensagem enviada:', message.trim());
    }

    setMessage('');
  };

  /**
   * Função chamada quando o usuário pressiona uma tecla no input
   * Permite enviar a mensagem pressionando Enter (sem Shift)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // Container principal com estilização consistente com o design system
    <div className="chat-input-container">
      {/* Campo de texto onde o usuário digita a mensagem */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="chat-input-field"
      />

      {/* Botão de envio com ícone de seta para cima */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="chat-input-button"
        title="Enviar mensagem"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};