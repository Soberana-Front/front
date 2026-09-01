import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

import Header from '../Header/Header';
import { Sidebar } from '@/components/layout/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-inner">

        {/* SIDEBAR DESKTOP */}
        <aside className="dashboard-desktop-sidebar">
          <div className="dashboard-desktop-sidebar-sticky">
            <Sidebar />
          </div>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <div className="dashboard-main-area">

          {/* BARRA MOBILE */}
          <div className="dashboard-mobile-bar">
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
              className="dashboard-mobile-menu-button"
            >
              <Menu size={22} />
            </button>
            <span className="dashboard-mobile-title">Soberana</span>
          </div>

          {/* SIDEBAR MOBILE */}
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setIsSidebarOpen(false)}
                className="dashboard-mobile-backdrop"
              />

              {/* Drawer */}
              <aside className="dashboard-mobile-drawer">
                <div className="dashboard-mobile-drawer-header">
                  <span className="dashboard-mobile-drawer-title">Menu</span>
                  <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={() => setIsSidebarOpen(false)}
                    className="dashboard-mobile-drawer-close"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div
                  className="dashboard-mobile-drawer-content"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Sidebar />
                </div>
              </aside>
            </>
          )}

          {/* HEADER */}
          <div className="dashboard-header-wrapper">
            <Header />
          </div>

          {/* CONTEÚDO */}
          <main className="dashboard-content">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}