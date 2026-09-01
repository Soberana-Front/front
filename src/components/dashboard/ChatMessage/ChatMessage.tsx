import React from 'react';

// Interface que define as props do componente
export interface ChatMessageProps {
  message: string; // Conteúdo da mensagem
  sender: 'user' | 'ia'; // Quem enviou: usuário ou IA
  timestamp?: string; // Horário da mensagem (opcional)
  avatar?: string; // URL da imagem do avatar (opcional)
}

// Componente que exibe uma única mensagem no chat
export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
  avatar,
}) => {
  // Define se a mensagem é do usuário (true) ou da IA (false)
  const isUser = sender === 'user';

  return (
    // Container principal da mensagem com alinhamento flexível
    <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-ia'}`}>
      
      {/* AVATAR (à esquerda para IA, à direita para usuário) */}
      {!isUser ? (
        // Avatar da IA (Soberana) - fundo roxo/índigo
        <div className="chat-avatar chat-avatar-ia">
          {avatar ? <img src={avatar} alt="IA" className="w-full h-full rounded-full" /> : 'S'}
        </div>
      ) : (
        // Avatar do usuário - fundo escuro
        <div className="chat-avatar chat-avatar-user">
          {avatar ? <img src={avatar} alt="User" className="w-full h-full rounded-full" /> : 'U'}
        </div>
      )}

      {/* BALÃO DA MENSAGEM */}
      <div className={`chat-bubble-wrapper ${isUser ? 'chat-bubble-wrapper-user' : 'chat-bubble-wrapper-ia'}`}>
        
        {/* Balão com estilo diferenciado por sender */}
        <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-ia'}`}>
          <p className="chat-bubble-text">{message}</p>
        </div>

        {/* Timestamp (horário) - exibido abaixo do balão */}
        {timestamp && (
          <span className="chat-timestamp">{timestamp}</span>
        )}
      </div>
    </div>
  );
};