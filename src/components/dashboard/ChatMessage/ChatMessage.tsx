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
    // Se for do usuário, alinha à direita (flex-row-reverse)
    // Se for da IA, alinha à esquerda (flex-row)
    <div className={`flex items-start gap-3 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* ========================================
          AVATAR (à esquerda para IA, à direita para usuário)
      ======================================== */}
      {!isUser ? (
        // Avatar da IA (Soberana) - fundo roxo/índigo
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 font-semibold text-xs shadow-sm">
          {avatar ? <img src={avatar} alt="IA" className="w-full h-full rounded-full" /> : 'S'}
        </div>
      ) : (
        // Avatar do usuário - fundo escuro
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-semibold text-xs">
          {avatar ? <img src={avatar} alt="User" className="w-full h-full rounded-full" /> : 'U'}
        </div>
      )}

      {/* ========================================
          BALÃO DA MENSAGEM
      ======================================== */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Balão com estilo diferenciado por sender */}
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? // Mensagem do usuário: fundo roxo, texto branco, sem borda superior direita
                'bg-indigo-600 text-white rounded-tr-none'
              : // Mensagem da IA: fundo cinza claro, texto escuro, sem borda superior esquerda
                'bg-[#EEF2F6] text-slate-800 rounded-tl-none'
          }`}
        >
          {/* Conteúdo da mensagem com suporte a quebras de linha */}
          <p className="whitespace-pre-line">{message}</p>
        </div>

        {/* Timestamp (horário) - exibido abaixo do balão */}
        {timestamp && (
          <span className="text-[11px] text-slate-400 mt-1 px-1">{timestamp}</span>
        )}
      </div>
    </div>
  );
};