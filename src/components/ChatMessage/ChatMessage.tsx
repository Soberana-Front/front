import React from 'react';

export interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ia';
  timestamp: string;
  avatar?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
  avatar,
}) => {
  const isUser = sender === 'user';

  // Iniciais para fallback do avatar
  const avatarFallback = isUser ? 'US' : 'IA';

  return (
    <div
      className={`flex items-end gap-2 my-2.5 ${
        isUser ? 'flex-row-reverse self-end' : 'flex-row self-start'
      }`}
    >
      {/* Avatar (Foto ou Iniciais) */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden bg-gray-200 border border-gray-300 text-gray-700">
        {avatar ? (
          <img
            src={avatar}
            alt={isUser ? 'Usuário' : 'IA'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{avatarFallback}</span>
        )}
      </div>

      {/* Balão da Mensagem + Timestamp */}
      <div
        className={`flex flex-col max-w-[75%] sm:max-w-[60%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-xs'
              : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-xs'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>

        {/* Timestamp Visível */}
        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {timestamp}
        </span>
      </div>
    </div>
  );
};