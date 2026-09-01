// Importa componente de navegação do React Router
import { NavLink } from 'react-router'
// Importa serviço de autenticação para logout
import { authService } from '../../services/authService'
// Importa ícones da navegação
import {
  BarChart3,
  Building2,
  ClipboardList,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from 'lucide-react'

// Lista de itens do menu de navegação
const navigationItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Clínicas',
    icon: Building2,
    href: '/clinicas',
  },
  {
    label: 'Procedimentos',
    icon: ClipboardList,
    href: '/procedimentos',
  },
  {
    label: 'Comparações',
    icon: BarChart3,
    href: '/comparacoes',
  },
  {
    label: 'Histórico',
    icon: History,
    href: '/historico',
  },
  {
    label: 'Perfil',
    icon: User,
    href: '/perfil',
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
  },
]

// Componente da barra lateral com navegação e logout
export function Sidebar() {
  return (
    <aside className="sidebar-container">
      {/* Logo da aplicação */}
      <div className="sidebar-logo">
        <div className="flex items-center gap-2">
          <div className="sidebar-logo-icon">S</div>
          <span className="sidebar-logo-text">Soberana</span>
        </div>
      </div>

      {/* Menu de navegação com links */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-list">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive ? 'sidebar-nav-item-active' : 'sidebar-nav-item-inactive'}`
                }
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Botão de logout com ícone */}
      <div className="sidebar-logout">
        <button
          type="button"
          onClick={() => authService.logout()}
          className="sidebar-logout-btn"
        >
          <LogOut size={16} strokeWidth={1.8} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}