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

// Mapeia cada tipo para classes customizadas e ícone
const typeConfig = {
  success: {
    icon: CheckCircle,
    containerClass: 'toast-item-success',
    iconClass: 'toast-item-icon-success',
    textClass: 'toast-item-text-success',
  },
  error: {
    icon: AlertCircle,
    containerClass: 'toast-item-error',
    iconClass: 'toast-item-icon-error',
    textClass: 'toast-item-text-error',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'toast-item-warning',
    iconClass: 'toast-item-icon-warning',
    textClass: 'toast-item-text-warning',
  },
  info: {
    icon: Info,
    containerClass: 'toast-item-info',
    iconClass: 'toast-item-icon-info',
    textClass: 'toast-item-text-info',
  },
};

// Componente que exibe um único toast com ícone, mensagem e botão fechar
export const ToastItem = ({ message, type, onClose }: ToastItemProps) => {
  const { icon: Icon, containerClass, iconClass, textClass } = typeConfig[type];

  return (
    // Card do toast com animação de entrada
    <div
      className={cn('toast-item-base', containerClass)}
      role="alert"
    >
      {/* Ícone do tipo de toast */}
      <Icon className={cn('toast-item-icon', iconClass)} />
      {/* Mensagem do toast */}
      <span className={cn('toast-item-text', textClass)}>{message}</span>
      {/* Botão de fechar */}
      <button
        type="button"
        onClick={onClose}
        className="toast-item-close-btn"
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};