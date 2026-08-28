// Importa React e utilitário de classes
import * as React from 'react';
import { cn } from '../../utils/cn';
// Importa ícones para cada tipo de toast
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

// Define os tipos de toast disponíveis
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Props do item de toast
interface ToastItemProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

// Mapeia cada tipo para ícone, cores de fundo, texto e ícone
const typeConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-500',
  },
};

// Componente que exibe um único toast com ícone, mensagem e botão fechar
export const ToastItem = ({ message, type, onClose }: ToastItemProps) => {
  const { icon: Icon, bg, text, iconColor } = typeConfig[type];

  return (
    // Card do toast com animação de entrada
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-top-5 fade-in duration-300',
        bg
      )}
      role="alert"
    >
      {/* Ícone do tipo de toast */}
      <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', iconColor)} />
      {/* Mensagem do toast */}
      <span className={cn('text-sm font-medium flex-1', text)}>{message}</span>
      {/* Botão de fechar */}
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};