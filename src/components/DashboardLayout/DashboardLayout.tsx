import type { ReactNode } from 'react'
import Header from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

type DashboardLayoutProps = {
  children: ReactNode
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-[240px] shrink-0 border-r border-slate-200 bg-white lg:block">
           <Sidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="h-14 shrink-0 border-b border-slate-200 bg-white">
            <Header />
          </header>

          <main className="min-w-0 flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}