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
    // Container da sidebar com altura total e borda direita
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo da aplicação */}
      <div className="flex h-14 items-center border-b border-slate-100 px-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-blue-600 text-xs font-bold text-white">
            S
          </div>
          <span className="text-sm font-bold text-slate-900">
            Soberana
          </span>
        </div>
      </div>

      {/* Menu de navegação com links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-violet-50 font-semibold text-violet-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`
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
      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={() => authService.logout()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut size={16} strokeWidth={1.8} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}