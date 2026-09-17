// Importa hooks do React (só o useNavigate agora — o resto do estado veio pro useHistory)
import { useNavigate } from 'react-router'
// Importa o layout do dashboard (reutilizado, como pede a Issue #84)
import { DashboardLayout } from '@/components/dashboard/DashboardLayout/DashboardLayout'
// Importa componentes de UI já existentes no projeto (reaproveitados)
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { HistoryCard, type HistoryCardItem } from '@/components/ui/HistoryCard'
import { HistoryFilters } from '@/components/ui/HistoryFilters'
// Ícone
import { Clock } from 'lucide-react'
// Hook central do módulo de Histórico (Issue #88)
import { useHistory } from '@/hooks/useHistory'

/**
 * Página de Histórico (Issue #84).
 *
 * Desde a Issue #88, toda a lógica de estado (mock, filtros, paginação)
 * mora no hook useHistory — esta página ficou só com a parte visual:
 * monta o layout e passa os dados/funções do hook pros componentes
 * (HistoryFilters, HistoryCard, Pagination).
 */
export const History = () => {
  const navigate = useNavigate()

  const {
    history,
    isLoading,
    error,
    filters,
    pagination,
    clinicOptions,
    procedureOptions,
    updateFilter,
    applyFilters,
    clearFilters,
    goToPage,
  } = useHistory()

  // Botão "Ver detalhes" do card — navega para a HistoryDetail (Issue #87)
  const handleViewDetails = (item: HistoryCardItem) => {
    navigate(`/historico/${item.id}`)
  }

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Cabeçalho da página */}
        <div className="history-page-header">
          <div>
            <h1 className="dashboard-header-title">Histórico</h1>
            <p className="dashboard-header-subtitle">Consulte as precificações já realizadas</p>
          </div>
        </div>

        {/* Filtros (Issue #86) */}
        <HistoryFilters
          filters={filters}
          onChange={updateFilter}
          onApply={applyFilters}
          onClear={clearFilters}
          clinicOptions={clinicOptions}
          procedureOptions={procedureOptions}
        />

        {/* Mensagem de erro (ex: falha ao carregar o histórico) */}
        {error && <p className="clinics-page-error">{error}</p>}

        {/* Lista de cards (Issue #85) */}
        {isLoading ? (
          <p className="history-loading-text">Carregando histórico...</p>
        ) : history.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="Nenhuma precificação encontrada"
            subtitle="Ajuste os filtros ou limpe-os para ver todo o histórico"
          />
        ) : (
          <div className="history-list-grid">
            {history.map((item) => (
              <HistoryCard key={item.id} item={item} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}

        {/* Paginação (Issue #59, reaproveitada) */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      </div>
    </DashboardLayout>
  )
}

export default History
