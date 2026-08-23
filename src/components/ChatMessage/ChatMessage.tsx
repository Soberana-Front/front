import React from 'react';

export interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ia';
  timestamp?: string;
  avatar?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  timestamp,
  avatar,
}) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex items-start gap-3 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar Soberana / Usuário */}
      {!isUser ? (
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-semibold text-xs shadow-sm">
          {avatar ? <img src={avatar} alt="IA" className="w-full h-full rounded-full" /> : 'S'}
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-semibold text-xs">
          {avatar ? <img src={avatar} alt="User" className="w-full h-full rounded-full" /> : 'U'}
        </div>
      )}

      {/* Balão da Mensagem */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-none'
              : 'bg-[#EEF2F6] text-slate-800 rounded-tl-none'
          }`}
        >
          <p className="whitespace-pre-line">{message}</p>
        </div>
        {timestamp && (
          <span className="text-[11px] text-slate-400 mt-1 px-1">{timestamp}</span>
        )}
      </div>
    </div>
  );
};