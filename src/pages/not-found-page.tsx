import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="text-center">
      <p className="text-sm font-medium text-emerald-700">Erro 404</p>
      <h1 className="mt-2 text-3xl font-bold">Página não encontrada</h1>
      <Link
        className="mt-6 inline-block font-medium text-emerald-700 underline"
        to="/"
      >
        Voltar ao início
      </Link>
    </section>
  )
}
