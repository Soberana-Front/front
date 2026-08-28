// Importa React e hooks para gerenciar estado, referências e efeitos colaterais
import React, { useState, useRef, useEffect } from 'react';
// Importa o componente de mensagem e seus tipos
import { ChatMessage, ChatMessageProps } from '../ChatMessage/ChatMessage';
// Importa o componente de input do chat
import { ChatInput } from '../ChatInput/ChatInput';

// Mensagens iniciais exibidas quando o chat é carregado
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

// Componente principal da janela de chat
export const ChatWindow: React.FC = () => {
  // Estado que armazena todas as mensagens do chat
  const [messages, setMessages] = useState<ChatMessageProps[]>(INITIAL_MESSAGES);
  
  // Referência para o último elemento da lista (usado para scroll automático)
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /**
   * Função que rola a tela suavemente para a última mensagem
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Efeito que dispara o scroll automático sempre que a lista de mensagens é atualizada
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Função chamada quando o usuário envia uma mensagem
   * Adiciona a mensagem do usuário e simula uma resposta da IA após 1 segundo
   */
  const handleSendMessage = (text: string) => {
    // Obtém o horário atual para o timestamp
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Cria a mensagem do usuário
    const userMessage: ChatMessageProps = {
      sender: 'user',
      message: text,
      timestamp: currentTime,
    };

    // Adiciona a mensagem do usuário à lista
    setMessages((prev) => [...prev, userMessage]);

    // Simula resposta da IA com delay de 1 segundo
    setTimeout(() => {
      const iaResponse: ChatMessageProps = {
        sender: 'ia',
        message: 'Entendido! Estou processando as informações para a sua precificação.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Adiciona a resposta da IA à lista
      setMessages((prev) => [...prev, iaResponse]);
    }, 1000);
  };

  return (
    // Container principal do chat com borda, sombra e altura total
    <div className="flex flex-col h-full w-full bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      
      {/* ========================================
          CABEÇALHO DO CHAT
          Exibe nome do assistente e status online
      ======================================== */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2 bg-white">
        {/* Indicador de status (bola verde) */}
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        {/* Nome do assistente */}
        <span className="font-bold text-slate-800 text-sm">Soberana AI</span>
        {/* Status online */}
        <span className="text-xs text-slate-400">• On-line</span>
      </div>

      {/* ========================================
          ÁREA DE MENSAGENS (rolável)
          Exibe todas as mensagens em uma lista rolável
      ======================================== */}
      <div className="flex-1 p-5 overflow-y-auto space-y-2 bg-slate-50/50 min-h-75">
        {/* Renderiza cada mensagem usando o componente ChatMessage */}
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
            avatar={msg.avatar}
          />
        ))}
        {/* Elemento fantasma para scroll automático */}
        <div ref={messagesEndRef} />
      </div>

      {/* ========================================
          INPUT DE ENVIO DE MENSAGEM
          Campo de texto + botão enviar
      ======================================== */}
      <div className="p-3 bg-white border-t border-slate-100">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};