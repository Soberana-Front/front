import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

import Header from '../Header/Header';
import { Sidebar } from '@/components/layout/Sidebar';

// ========================================
// PROPS DO COMPONENTE
// ========================================

interface DashboardLayoutProps {
  children: ReactNode;
}

// ========================================
// COMPONENTE DE LAYOUT DO DASHBOARD
// ========================================

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Controla apenas a Sidebar MOBILE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          ESTRUTURA PRINCIPAL
          
          DESKTOP:
          Sidebar desktop + conteúdo

          MOBILE:
          Somente conteúdo + botão de menu
      ===================================================== */}

      <div className="flex min-h-screen">

        {/* ===================================================
            SIDEBAR DESKTOP

            - Aparece somente em telas grandes
            - Desaparece em tablet/celular
            - NÃO é a sidebar mobile
        =================================================== */}

        <aside
          className="
            hidden
            lg:flex
            lg:w-60
            lg:shrink-0
            lg:flex-col
            border-r
            border-slate-200
            bg-white
          "
        >
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </aside>


        {/* ===================================================
            ÁREA PRINCIPAL
        =================================================== */}

        <div className="min-w-0 flex-1 flex flex-col">


          {/* =================================================
              BARRA MOBILE

              - Aparece somente abaixo de lg
              - Contém o botão ☰
              - NÃO aparece no desktop
          ================================================= */}

          <div
            className="
              sticky
              top-0
              z-40
              flex
              h-12
              items-center
              border-b
              border-slate-200
              bg-white
              px-3
              lg:hidden
            "
          >
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
              className="
                rounded-lg
                p-2
                text-slate-600
                transition-colors
                hover:bg-slate-100
                hover:text-slate-900
              "
            >
              <Menu size={22} />
            </button>

            <span className="ml-2 text-sm font-semibold text-slate-900">
              Soberana
            </span>
          </div>


          {/* =================================================
              SIDEBAR MOBILE

              IMPORTANTE:

              Esta versão possui lg:hidden.

              Portanto, mesmo que isSidebarOpen esteja true,
              ela NÃO será exibida em telas desktop.

              Ela só existe visualmente no mobile.
          ================================================= */}

          {isSidebarOpen && (
            <>
              {/* ---------------------------------------------
                  BACKDROP MOBILE
              --------------------------------------------- */}

              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setIsSidebarOpen(false)}
                className="
                  fixed
                  inset-0
                  z-40
                  bg-black/40
                  lg:hidden
                "
              />

              {/* ---------------------------------------------
                  DRAWER MOBILE
              --------------------------------------------- */}

              <aside
                className="
                  fixed
                  inset-y-0
                  left-0
                  z-50
                  flex
                  w-72
                  flex-col
                  bg-white
                  shadow-xl
                  lg:hidden
                "
              >

                {/* -------------------------------------------
                    CABEÇALHO DO MENU MOBILE
                ------------------------------------------- */}

                <div
                  className="
                    flex
                    h-14
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    px-4
                  "
                >
                  <span className="text-sm font-bold text-slate-900">
                    Menu
                  </span>

                  <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={() => setIsSidebarOpen(false)}
                    className="
                      rounded-lg
                      p-2
                      text-slate-500
                      transition-colors
                      hover:bg-slate-100
                      hover:text-slate-900
                    "
                  >
                    <X size={20} />
                  </button>
                </div>


                {/* -------------------------------------------
                    CONTEÚDO DA SIDEBAR MOBILE

                    Reutiliza exatamente o mesmo Sidebar.tsx.
                    Não precisa aceitar nenhuma prop.
                ------------------------------------------- */}

                <div
                  className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                  "
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Sidebar />
                </div>

              </aside>
            </>
          )}


          {/* =================================================
              HEADER DO DASHBOARD
          ================================================= */}

          <div className="sticky top-0 z-30 shrink-0">
            <Header />
          </div>


          {/* =================================================
              CONTEÚDO DA PÁGINA
          ================================================= */}

          <main className="min-w-0 flex-1">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}