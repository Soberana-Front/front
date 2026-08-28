// Importa componentes de navegação do React Router
import { Navigate, Outlet } from 'react-router';
// Importa hook de autenticação
import { useAuth } from '../contexts/AuthContext';
// Importa componente de loading
import { Spinner } from './ui/Spinner';

// Componente para rotas públicas (redireciona usuário autenticado)
export const PublicRoute = () => {
  // Obtém estado de autenticação e loading
  const { isAuthenticated, isLoading } = useAuth();

  // Exibe spinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redireciona para dashboard se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Renderiza as rotas filhas (login, register, etc.)
  return <Outlet />;
};