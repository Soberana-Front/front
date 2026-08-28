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

// Mapeia estilos por tipo de toast (cores, ícone, fundo)
const toastStyles = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50 border-green-400',
    text: 'text-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50 border-red-400',
    text: 'text-red-800',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-yellow-50 border-yellow-400',
    text: 'text-yellow-800',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50 border-blue-400',
    text: 'text-blue-800',
    iconColor: 'text-blue-500',
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
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const style = toastStyles[toast.type];
        const Icon = style.icon;

        return (
          // Card do toast com animação de entrada
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-top-5 fade-in duration-300',
              style.bg,
              style.text
            )}
            role="alert"
          >
            {/* Ícone do toast */}
            <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', style.iconColor)} />
            {/* Mensagem do toast */}
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            {/* Botão de fechar */}
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
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