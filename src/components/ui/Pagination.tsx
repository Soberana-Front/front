// Importa React, ícones e utilitário de classes CSS
import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

// Props do componente Pagination
export interface PaginationProps {
  currentPage: number                    // Página atual (começando em 1)
  totalPages: number                     // Total de páginas disponíveis
  onPageChange: (page: number) => void   // Callback chamado com o novo número de página
  className?: string                     // Classes CSS adicionais
}

/**
 * Paginação reutilizável (Issue #59).
 *
 * Componente "burro" (dumb component): não guarda estado próprio, apenas
 * recebe a página atual e o total, e avisa o pai quando o usuário quer
 * mudar de página. Quem controla os dados (ex: useClinics) decide o que
 * fazer com a nova página.
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  // Desabilita "Anterior" na primeira página (Critério de Aceite)
  const isFirstPage = currentPage <= 1
  // Desabilita "Próximo" na última página (Critério de Aceite)
  const isLastPage = currentPage >= totalPages

  const handlePrevious = () => {
    if (!isFirstPage) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (!isLastPage) onPageChange(currentPage + 1)
  }

  // Não renderiza nada se houver 0 ou 1 página (nada para paginar)
  if (totalPages <= 1) return null

  return (
    <div className={cn('pagination-container', className)}>
      {/* Botão "Anterior" */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isFirstPage}
        className="pagination-button"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Anterior</span>
      </button>

      {/* Indicador de página atual / total */}
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botão "Próximo" */}
      <button
        type="button"
        onClick={handleNext}
        disabled={isLastPage}
        className="pagination-button"
        aria-label="Próxima página"
      >
        <span>Próximo</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

Pagination.displayName = 'Pagination'