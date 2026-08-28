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
  // Obtém usuário e função logout do contexto
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Limpa estado e redireciona para login
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // Cabeçalho com sombra e espaçamento
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      {/* Saudação com fallback */}
      <h1 className="text-xl font-semibold">
        Bem-vindo, {user?.name || 'Usuário'}
      </h1>

      {/* Botão de logout com ícone */}
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