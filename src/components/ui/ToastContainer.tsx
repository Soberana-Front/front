// Importa hooks e utilitários
import { useEffect, useState } from 'react';
// Cria portal para renderizar fora da hierarquia
import { createPortal } from 'react-dom';
// Importa contexto de toast
import { useToast } from '../../contexts/ToastContext';
// Importa utilitário de classes
import { cn } from '../../utils/cn';
// Importa ícones
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Mapeia estilos por tipo de toast (cores, ícone, fundo) – usando classes customizadas
const toastStyles = {
  success: {
    icon: CheckCircle,
    containerClass: 'toast-container-success',
    iconClass: 'toast-icon-success',
  },
  error: {
    icon: XCircle,
    containerClass: 'toast-container-error',
    iconClass: 'toast-icon-error',
  },
  warning: {
    icon: AlertCircle,
    containerClass: 'toast-container-warning',
    iconClass: 'toast-icon-warning',
  },
  info: {
    icon: Info,
    containerClass: 'toast-container-info',
    iconClass: 'toast-icon-info',
  },
};

// Componente que renderiza os toasts via portal
export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  // Controla montagem para evitar erro de hidratação
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  // Renderiza os toasts no body via portal
  return createPortal(
    <div className="toast-container-list">
      {toasts.map((toast) => {
        const style = toastStyles[toast.type];
        const Icon = style.icon;

        return (
          // Card do toast com animação de entrada
          <div
            key={toast.id}
            className={cn(
              'toast-item',
              style.containerClass
            )}
            role="alert"
          >
            {/* Ícone do toast */}
            <Icon className={cn('toast-icon', style.iconClass)} />
            {/* Mensagem do toast */}
            <span className="toast-message">{toast.message}</span>
            {/* Botão de fechar */}
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="toast-close-btn"
              aria-label="Fechar notificação"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
};