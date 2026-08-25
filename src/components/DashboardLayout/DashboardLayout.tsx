import type { ReactNode } from 'react';
import Header from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:shrink-0 border-r border-slate-200 bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* Header fixo/sticky */}
        <div className="sticky top-0 z-40 shrink-0">
          <Header />
        </div>

        {/* Conteúdo da página */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}