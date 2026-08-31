import { useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Menu, X } from 'lucide-react';

import { Sidebar } from './Sidebar';
import { LayoutHeader } from './Header';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* =====================================================
          SIDEBAR DESKTOP
          Aparece SOMENTE em telas grandes.
          
          hidden      = escondida por padrão
          lg:flex     = aparece a partir de 1024px
      ===================================================== */}
      <aside className="hidden lg:flex lg:w-60 lg:shrink-0 lg:flex-col">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* =====================================================
          SIDEBAR MOBILE
          Só existe visualmente em telas menores que lg.
          
          Ela NÃO ocupa espaço no layout.
          É um drawer sobre o conteúdo.
      ===================================================== */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden">
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

            <div
              className="h-[calc(100vh-3.5rem)] overflow-y-auto"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Sidebar />
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          ÁREA PRINCIPAL
      ===================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ===================================================
            BARRA MOBILE
            Aparece somente abaixo do breakpoint lg.
        =================================================== */}
        <div className="sticky top-0 z-30 flex h-12 shrink-0 items-center border-b border-slate-200 bg-white px-3 lg:hidden">
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

        {/* ===================================================
            HEADER
        =================================================== */}
        <LayoutHeader />

        {/* ===================================================
            CONTEÚDO DAS ROTAS
        =================================================== */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
    </div>
  );
};