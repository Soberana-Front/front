import { useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Menu, X } from 'lucide-react';

import { Sidebar } from './Sidebar';
import { LayoutHeader } from './Header';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-page">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="layout-desktop-sidebar">
        <div className="layout-desktop-sidebar-sticky">
          <Sidebar />
        </div>
      </aside>

      {/* SIDEBAR MOBILE */}
      {isSidebarOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsSidebarOpen(false)}
            className="layout-mobile-backdrop"
          />

          <aside className="layout-mobile-drawer">
            <div className="layout-mobile-drawer-header">
              <span className="layout-mobile-drawer-title">
                Menu
              </span>

              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setIsSidebarOpen(false)}
                className="layout-mobile-drawer-close"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="layout-mobile-drawer-content"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Sidebar />
            </div>
          </aside>
        </>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="layout-main-area">

        {/* BARRA MOBILE */}
        <div className="layout-mobile-bar">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setIsSidebarOpen(true)}
            className="layout-mobile-menu-button"
          >
            <Menu size={22} />
          </button>

          <span className="layout-mobile-title">
            Soberana
          </span>
        </div>

        {/* HEADER */}
        <LayoutHeader />

        {/* CONTEÚDO DAS ROTAS */}
        <main className="layout-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
};