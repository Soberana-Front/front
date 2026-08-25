import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react'; // Ícone de enviar idêntico ao do print

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = 'Digite sua mensagem...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Evita enviar mensagens vazias ou compostas só de espaços
    if (!message.trim() || disabled) return;

    if (onSendMessage) {
      onSendMessage(message.trim());
    } else {
      // Mock inicial de envio
      console.log('Mensagem enviada:', message.trim());
    }

    // Limpa o campo após enviar (critério de aceite)
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Dispara o envio ao pressionar Enter (sem a tecla Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none disabled:cursor-not-allowed"
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 shrink-0 cursor-pointer"
        title="Enviar mensagem"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};