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
  placeholder = 'Digite sua mensagem...', // valor padrão se não for fornecido
  disabled = false,
}) => {
  // Estado para armazenar o texto digitado pelo usuário
  const [message, setMessage] = useState('');

  /**
   * Função chamada ao clicar no botão ou pressionar Enter
   * Valida se a mensagem não está vazia e se o componente não está desabilitado
   */
  const handleSend = () => {
    // Se a mensagem for vazia ou composta apenas por espaços, não faz nada
    if (!message.trim() || disabled) return;

    // Se a função onSendMessage foi passada como prop, chama ela com a mensagem
    if (onSendMessage) {
      onSendMessage(message.trim());
    } else {
      // Caso contrário, apenas loga no console (modo mock)
      console.log('Mensagem enviada:', message.trim());
    }

    // Limpa o campo após o envio (melhora a experiência do usuário)
    setMessage('');
  };

  /**
   * Função chamada quando o usuário pressiona uma tecla no input
   * Permite enviar a mensagem pressionando Enter (sem Shift)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Se a tecla pressionada for Enter e Shift não estiver pressionada
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Previne comportamento padrão (ex: quebra de linha)
      handleSend(); // Dispara o envio
    }
  };

  return (
    // Container principal com estilização consistente com o design system
    <div className="w-full flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
      {/* Campo de texto onde o usuário digita a mensagem */}
      <input
        type="text"
        value={message} // Controlado pelo estado
        onChange={(e) => setMessage(e.target.value)} // Atualiza o estado ao digitar
        onKeyDown={handleKeyDown} // Captura eventos de teclado
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none disabled:cursor-not-allowed"
      />

      {/* Botão de envio com ícone de seta para cima */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!message.trim() || disabled} // Desabilitado se mensagem vazia ou componente desabilitado
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shrink-0 cursor-pointer"
        title="Enviar mensagem"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};