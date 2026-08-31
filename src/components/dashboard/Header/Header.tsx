// ========================================
// IMPORTAÇÕES
// ========================================
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { authService } from '../../../services/authService';

// ========================================
// UTILITÁRIO: GERAR INICIAIS DO NOME
// ========================================
/**
 * Converte um nome completo em iniciais (máx 2 caracteres)
 * Ex: "João Silva" → "JS"
 */
const getInitials = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean)          // Remove espaços vazios
    .map((part) => part[0])   // Pega a primeira letra de cada parte
    .join('')                 // Junta tudo
    .slice(0, 2)              // Limita a 2 caracteres
    .toUpperCase();           // Converte para maiúsculo
};

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export default function DashboardHeader() {
  // Obtém dados do usuário e função de logout do contexto de autenticação
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Nome do usuário com fallback
  const userName = user?.name ?? 'Doutor(a)';
  // Iniciais do usuário com fallback
  const userInitials = user?.name ? getInitials(user.name) : 'DR';

  // Estado para controlar abertura/fechamento do dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Alterna o estado do dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Função de logout: limpa sessão e redireciona para login
  const handleLogout = () => {
    authService.logout(); // Remove token do localStorage e header
    logout();             // Limpa estado do contexto
    navigate('/login');   // Redireciona para login
  };

  return (
    // ========================================
    // CABEÇALHO PRINCIPAL
    // ========================================
    <header className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">

      {/* ===== LADO ESQUERDO: Título e subtítulo ===== */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Precifique seus procedimentos com precisão
        </p>
      </div>

      {/* ===== LADO DIREITO: Ações (data, notificações, avatar) ===== */}
      <div className="flex items-center gap-4">

        {/* Data atual (estático) */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
          <Bell className="w-3.5 h-3.5 text-gray-400" />
          <span>16 Jul 2026</span>
        </div>

        {/* Botão de notificações (estático) */}
        <button
          type="button"
          aria-label="Notificações"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
        </button>

        {/* ========================================
            AVATAR E DROPDOWN DO USUÁRIO
        ======================================== */}
        <div className="relative">
          {/* Botão do avatar (exibe as iniciais) */}
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-9 h-9 rounded-lg bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {userInitials}
          </button>

          {/* Dropdown (exibido condicionalmente) */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              {/* Saudação ao usuário */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Olá, {userName}</p>
              </div>

              {/* Opção: Perfil */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Perfil
              </button>

              {/* Opção: Configurações */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Configurações
              </button>

              {/* Opção: Sair (com cor vermelha) */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}