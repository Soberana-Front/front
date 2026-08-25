import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatMessageProps } from '../ChatMessage/ChatMessage';
import { ChatInput } from '../ChatInput/ChatInput';

const INITIAL_MESSAGES: ChatMessageProps[] = [
  {
    sender: 'ia',
    message: 'Olá! Vamos calcular o preço do seu procedimento. 👋',
    timestamp: '10:00',
  },
  {
    sender: 'ia',
    message:
      'Para começar, selecione uma clínica e um procedimento usando os botões à esquerda. Depois, me diga como posso ajudar — posso ajustar custos, calcular margens ou simular cenários.',
    timestamp: '10:01',
  },
];

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: ChatMessageProps = {
      sender: 'user',
      message: text,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const iaResponse: ChatMessageProps = {
        sender: 'ia',
        message: 'Entendido! Estou processando as informações para a sua precificação.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, iaResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* Cabeçalho */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2 bg-white">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="font-bold text-slate-800 text-sm">Soberana AI</span>
        <span className="text-xs text-slate-400">• On-line</span>
      </div>

      {/* Área de Mensagens (Rolável) */}
      <div className="flex-1 p-5 overflow-y-auto space-y-2 bg-slate-50/50 min-h-[300px]">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
            avatar={msg.avatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de Envio */}
      <div className="p-3 bg-white border-t border-slate-100">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};