import type { ReactNode } from 'react';

import Header from '../Header/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-0 flex-1 bg-slate-50">
      
      {/* =====================================================
          HEADER DO DASHBOARD
      ===================================================== */}
      <div className="sticky top-0 z-20 shrink-0">
        <Header />
      </div>

      {/* =====================================================
          CONTEÚDO DO DASHBOARD
      ===================================================== */}
      <main className="min-w-0">
        {children}
      </main>

    </div>
  );
}