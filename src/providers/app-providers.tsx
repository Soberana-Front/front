// Importa cliente do React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Importa hooks e tipos do React
import { useState, type PropsWithChildren } from 'react';
// Importa provedor de autenticação
import { AuthProvider } from '../contexts/AuthContext';
// Importa provedor de notificações (toast)
import { ToastProvider } from '../contexts/ToastContext';

// Componente que centraliza todos os providers da aplicação
export function AppProviders({ children }: PropsWithChildren) {
  // Inicializa o QueryClient apenas uma vez (evita recriações)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,           // Tenta novamente uma vez em caso de falha
            staleTime: 30_000,  // Dados são considerados frescos por 30 segundos
          },
        },
      }),
  );

  return (
    // Aninha os providers na ordem correta (QueryClient → Auth → Toast)
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}