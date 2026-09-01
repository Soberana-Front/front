// Importa componentes de navegação do React Router
import { Navigate, Outlet } from 'react-router';
// Importa hook de autenticação
import { useAuth } from '../contexts/AuthContext';
// Importa componente de loading
import { Spinner } from './ui/Spinner';

// Componente para rotas públicas (redireciona usuário autenticado)
export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="route-loading-container">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};