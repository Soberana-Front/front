import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

import Header from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* =========================
          SIDEBAR DESKTOP
      ========================== */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:shrink-0 border-r border-slate-200 bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* =========================
          SIDEBAR MOBILE
      ========================== */}
      {isSidebarOpen && (
        <>
          {/* Fundo escuro atrás da Sidebar */}
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden">
            {/* Cabeçalho do menu mobile */}
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

            {/* Sidebar */}
            <div
              className="h-[calc(100vh-3.5rem)] overflow-y-auto"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Sidebar />
            </div>
          </aside>
        </>
      )}

      {/* =========================
          CONTEÚDO PRINCIPAL
      ========================== */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* Barra mobile */}
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

        {/* Header */}
        <div className="sticky top-0 z-30 shrink-0">
          <Header />
        </div>

        {/* Conteúdo */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}