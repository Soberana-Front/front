import { Link, Outlet } from 'react-router'

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link className="text-lg font-semibold text-emerald-800" to="/">
            Soberana
          </Link>
          <span className="text-sm text-slate-500">
            Precificação odontológica
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}
