// Importa Link para navegação interna
import { Link } from 'react-router'

// Página 404 - exibida quando a rota não é encontrada
export function NotFoundPage() {
  return (
    // Container centralizado com texto
    <section className="text-center">
      {/* Código do erro */}
      <p className="text-sm font-medium text-emerald-700">Erro 404</p>
      {/* Mensagem principal */}
      <h1 className="mt-2 text-3xl font-bold">Página não encontrada</h1>
      {/* Link para voltar à home */}
      <Link
        className="mt-6 inline-block font-medium text-emerald-700 underline"
        to="/"
      >
        Voltar ao início
      </Link>
    </section>
  )
}