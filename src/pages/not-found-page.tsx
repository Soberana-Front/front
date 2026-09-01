// Importa Link para navegação interna
import { Link } from 'react-router'

// Página 404 - exibida quando a rota não é encontrada
export function NotFoundPage() {
  return (
    // Container centralizado com texto
    <section className="not-found-page">
      {/* Código do erro */}
      <p className="not-found-code">Erro 404</p>
      {/* Mensagem principal */}
      <h1 className="not-found-title">Página não encontrada</h1>
      {/* Link para voltar à home */}
      <Link
        className="not-found-link"
        to="/"
      >
        Voltar ao início
      </Link>
    </section>
  )
}