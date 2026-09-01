// Importa hook de navegação
import { useNavigate } from 'react-router';
// Importa contexto de autenticação
import { useAuth } from '../../contexts/AuthContext';
// Importa componente Button da UI
import { Button } from '../ui/Button';
// Importa ícone de logout
import { LogOut } from 'lucide-react';

// Header simples para layouts base/páginas públicas
export const LayoutHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="layout-header">
      <h1 className="layout-header-title">
        Bem-vindo, {user?.name || 'Usuário'}
      </h1>

      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    </header>
  );
};