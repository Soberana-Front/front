/* ========================================
 * IMPORTAÇÕES
 * ======================================== */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell } from 'lucide-react';

import { useAuth } from '../../../contexts/AuthContext';
import { authService } from '../../../services/authService';

/* ========================================
 * UTILITÁRIO: GERAR INICIAIS DO NOME
 * ======================================== */

const getInitials = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

/* ========================================
 * COMPONENTE PRINCIPAL
 * ======================================== */

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name ?? 'Doutor(a)';
  const userInitials = user?.name ? getInitials(user.name) : 'DR';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    authService.logout();
    logout();
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      {/* ===== LADO ESQUERDO ===== */}
      <div>
        <h1 className="dashboard-header-title">
          Dashboard
        </h1>

        <p className="dashboard-header-subtitle">
          Precifique seus procedimentos com precisão
        </p>
      </div>

      {/* ===== LADO DIREITO ===== */}
      <div className="dashboard-header-actions">

        {/* Data atual */}
        <div className="dashboard-header-date-badge">
          <Bell className="w-3.5 h-3.5 text-gray-400" />
          <span>16 Jul 2026</span>
        </div>

        {/* Botão de notificações */}
        <button
          type="button"
          aria-label="Notificações"
          className="dashboard-header-notification-btn"
        >
          <Bell className="w-5 h-5" />

          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
        </button>

        {/* Avatar e dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="dashboard-header-avatar"
          >
            {userInitials}
          </button>

          {isDropdownOpen && (
            <div className="dashboard-header-dropdown">

              <div className="dashboard-header-dropdown-user">
                <p className="dashboard-header-dropdown-user-text">
                  Olá, {userName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="dashboard-header-dropdown-item"
              >
                Perfil
              </button>

              <button
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="dashboard-header-dropdown-item"
              >
                Configurações
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="dashboard-header-dropdown-item-danger"
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