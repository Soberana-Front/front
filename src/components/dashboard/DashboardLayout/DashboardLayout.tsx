import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import Header from '../Header/Header';
import { Sidebar } from '@/components/layout/Sidebar';

// ========================================
// PROPS DO COMPONENTE
// ========================================
interface DashboardLayoutProps {
  children: ReactNode; // Conteúdo da página (children)
}

// ========================================
// COMPONENTE DE LAYOUT DO DASHBOARD
// Gerencia a estrutura da área logada (sidebar + header + conteúdo)
// ========================================
export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Estado que controla a abertura/fechamento da sidebar em dispositivos móveis
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Container principal com fundo cinza claro e flex
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* ========================================
          SIDEBAR DESKTOP
          Visível apenas em telas grandes (≥ 1024px)
      ======================================== */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:shrink-0 border-r border-slate-200 bg-white">
        {/* Fixa a sidebar no topo da tela */}
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* ========================================
          SIDEBAR MOBILE (DRAWER)
          Exibido como overlay quando o menu hambúrguer é clicado
      ======================================== */}
      {isSidebarOpen && (
        <>
          {/* Fundo escuro (backdrop) atrás da sidebar – fecha ao clicar */}
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          {/* Drawer da sidebar */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden">
            {/* Cabeçalho do drawer com título e botão fechar */}
            <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
              <span className="text-sm font-bold text-slate-900">
                Menu
              </span>

              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Conteúdo da sidebar com altura ajustada (sem o cabeçalho) */}
            <div
              className="h-[calc(100vh-3.5rem)] overflow-y-auto"
              onClick={() => setIsSidebarOpen(false)} // Fecha ao clicar em qualquer item
            >
              <Sidebar />
            </div>
          </aside>
        </>
      )}

      {/* ========================================
          CONTEÚDO PRINCIPAL (à direita da sidebar)
      ======================================== */}
      <div className="min-w-0 flex-1 flex flex-col">
        
        {/* =========================
            BARRA MOBILE (apenas telas pequenas)
            Exibe ícone de menu hambúrguer e logo
        ========================== */}
        <div className="sticky top-0 z-40 flex h-12 items-center border-b border-slate-200 bg-white px-3 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Menu size={22} />
          </button>

          <span className="ml-2 text-sm font-semibold text-slate-900">
            Soberana
          </span>
        </div>

        {/* =========================
            HEADER DO DASHBOARD
            Componente fixo no topo com título e ações (notificações, avatar)
        ========================== */}
        <div className="sticky top-0 z-30 shrink-0">
          <Header />
        </div>

        {/* =========================
            CONTEÚDO DA PÁGINA (children)
            Área onde as páginas são renderizadas
        ========================== */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}