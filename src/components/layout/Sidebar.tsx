import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Calculator,
  GitCompare,
  History,
  UserCircle,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/clinicas", icon: Building2, label: "Clínicas" },
  { to: "/procedimentos", icon: Stethoscope, label: "Procedimentos" },
  { to: "/precificacao", icon: Calculator, label: "Precificação" },
  { to: "/comparacoes", icon: GitCompare, label: "Comparações" },
  { to: "/historico", icon: History, label: "Histórico" },
  { to: "/perfil", icon: UserCircle, label: "Perfil" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-indigo-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold flex items-center gap-2">
        <span>Soberana</span>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700/70"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
