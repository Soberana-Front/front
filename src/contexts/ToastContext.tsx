// Importa React e hooks
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define os tipos de toast
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Estrutura de um toast
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Tipo do contexto de toast
interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

// Cria o contexto
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Provider do contexto de toast
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // Estado com a lista de toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Remove um toast pelo ID
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Adiciona um novo toast e agenda remoção automática
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Hook para usar o contexto de toast
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};