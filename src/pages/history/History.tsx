// Importa hooks do React
import { useState, useEffect, useCallback, useMemo } from 'react'
// Importa o layout do dashboard (reaproveitado, como pede a Issue #84)
import { DashboardLayout } from '@/components/dashboard/DashboardLayout/DashboardLayout'
// Importa componentes de UI já existentes no projeto (reaproveitados)
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { PriceDisplay } from '@/components/dashboard/PriceDisplay/PriceDisplay'
// Ícones
import { Clock, Filter, X } from 'lucide-react'
// Reaproveita o tipo PricingResult (já usado em PricingDetail/pricingService),
// já que cada item do histórico É uma precificação já concluída.
import type { PricingResult } from '@/types/pricing'

// ============================================================
// TIPO LOCAL: HistoryItem
// ============================================================
/**
 * Um item de histórico é um subconjunto de PricingResult — só os campos
 * que a lista/o card precisam exibir e filtrar. Usar Pick<> em vez de
 * redefinir os campos na mão garante que, se PricingResult mudar (ex: o
 * back-end passar a mandar outro campo), o TypeScript nos avisa aqui
 * também, sem duplicar a definição do tipo.
 */
type HistoryItem = Pick<
  PricingResult,
  'id' | 'clinicId' | 'clinicName' | 'procedureId' | 'procedureName' | 'finalPrice' | 'createdAt'
>

// ============================================================
// DADOS MOCKADOS (Issue #84 pede "Dados mockados")
// ============================================================
/**
 * 14 precificações mockadas, espalhadas em datas/clínicas/procedimentos
 * diferentes — o suficiente para ter mais de uma página (PAGE_SIZE = 6)
 * e para os selects de Clínica/Procedimento terem várias opções de verdade.
 *
 * Quando a Issue #88 (useHistory) e o service correspondente existirem,
 * este array sai daqui e vira uma resposta de API real — a função
 * loadHistory() abaixo já está isolada exatamente pra facilitar essa troca.
 */
const MOCK_HISTORY: HistoryItem[] = [
  { id: '1', clinicId: 'c1', clinicName: 'Clínica Odonto Prime', procedureId: 'p1', procedureName: 'Limpeza e Profilaxia', finalPrice: 180, createdAt: '2026-08-22' },
  { id: '2', clinicId: 'c2', clinicName: 'Soberana Odontologia', procedureId: 'p2', procedureName: 'Tratamento de Canal', finalPrice: 650, createdAt: '2026-08-21' },
  { id: '3', clinicId: 'c1', clinicName: 'Clínica Odonto Prime', procedureId: 'p3', procedureName: 'Consulta Odontológica', finalPrice: 150, createdAt: '2026-08-20' },
  { id: '4', clinicId: 'c3', clinicName: 'Sorriso & Saúde', procedureId: 'p4', procedureName: 'Aplicação de Flúor', finalPrice: 120, createdAt: '2026-08-18' },
  { id: '5', clinicId: 'c2', clinicName: 'Soberana Odontologia', procedureId: 'p5', procedureName: 'Clareamento Dental', finalPrice: 450, createdAt: '2026-08-15' },
  { id: '6', clinicId: 'c1', clinicName: 'Clínica Odonto Prime', procedureId: 'p2', procedureName: 'Tratamento de Canal', finalPrice: 680, createdAt: '2026-08-12' },
  { id: '7', clinicId: 'c3', clinicName: 'Sorriso & Saúde', procedureId: 'p3', procedureName: 'Consulta Odontológica', finalPrice: 140, createdAt: '2026-08-10' },
  { id: '8', clinicId: 'c4', clinicName: 'Dental Center', procedureId: 'p1', procedureName: 'Limpeza e Profilaxia', finalPrice: 190, createdAt: '2026-08-08' },
  { id: '9', clinicId: 'c2', clinicName: 'Soberana Odontologia', procedureId: 'p4', procedureName: 'Aplicação de Flúor', finalPrice: 110, createdAt: '2026-08-05' },
  { id: '10', clinicId: 'c4', clinicName: 'Dental Center', procedureId: 'p5', procedureName: 'Clareamento Dental', finalPrice: 470, createdAt: '2026-08-03' },
  { id: '11', clinicId: 'c1', clinicName: 'Clínica Odonto Prime', procedureId: 'p5', procedureName: 'Clareamento Dental', finalPrice: 460, createdAt: '2026-07-30' },
  { id: '12', clinicId: 'c3', clinicName: 'Sorriso & Saúde', procedureId: 'p2', procedureName: 'Tratamento de Canal', finalPrice: 620, createdAt: '2026-07-28' },
  { id: '13', clinicId: 'c4', clinicName: 'Dental Center', procedureId: 'p3', procedureName: 'Consulta Odontológica', finalPrice: 160, createdAt: '2026-07-25' },
  { id: '14', clinicId: 'c2', clinicName: 'Soberana Odontologia', procedureId: 'p1', procedureName: 'Limpeza e Profilaxia', finalPrice: 175, createdAt: '2026-07-20' },
]

// Quantos cards por página
const PAGE_SIZE = 6

// Formato "2026-08-22" -> "22/08/2026" pra exibir no card
const formatDateBR = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

// Formato do estado dos filtros (usado tanto no "rascunho" quanto no "aplicado")
interface HistoryFiltersState {
  dateFrom: string   // yyyy-mm-dd (formato nativo do <input type="date">)
  dateTo: string
  clinicId: string   // '' = todas
  procedureId: string // '' = todos
}

const EMPTY_FILTERS: HistoryFiltersState = {
  dateFrom: '',
  dateTo: '',
  clinicId: '',
  procedureId: '',
}

/**
 * Página de Histórico (Issue #84).
 *
 * Estrutura pensada igual à ClinicsPage/ProceduresPage: DashboardLayout +
 * toolbar de filtros + lista + Pagination reaproveitada. As duas diferenças
 * de propósito:
 *
 * 1) Filtro com botões "Filtrar"/"Limpar" (em vez de aplicar a cada tecla
 *    como o SearchBar): por isso existem DOIS estados de filtro aqui —
 *    `draftFilters` (o que está nos campos, ainda não aplicado) e
 *    `appliedFilters` (o que realmente filtra a lista). Só clicando em
 *    "Filtrar" um vira o outro.
 * 2) HistoryCard e HistoryFilters ainda não existem como componentes
 *    próprios (isso é Issue #85 e #86) — por ora o card e a barra de
 *    filtros estão embutidos aqui mesmo. Quando essas issues forem feitas,
 *    basta extrair os trechos marcados abaixo para os arquivos deles e
 *    importar aqui no lugar.
 */
export const History = () => {
  // "Banco de dados" local — viria do useHistory/service na Issue #88
  const [allItems, setAllItems] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Estado dos filtros: rascunho (inputs) x aplicado (o que filtra de fato)
  const [draftFilters, setDraftFilters] = useState<HistoryFiltersState>(EMPTY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<HistoryFiltersState>(EMPTY_FILTERS)

  // Página atual da paginação
  const [page, setPage] = useState<number>(1)

  // Simula a busca do histórico (troca fácil por uma chamada real no futuro)
  const loadHistory = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // --- Quando a API/useHistory (Issue #88) existir, trocar por: ---
      // const response = await historyService.getHistory()
      // setAllItems(response.data)
      await new Promise((resolve) => setTimeout(resolve, 300))
      setAllItems(MOCK_HISTORY)
    } catch (err) {
      setError('Erro ao carregar o histórico. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  // Opções únicas de clínica e procedimento, extraídas dos próprios dados
  // (assim os selects nunca ficam "desalinhados" com o que existe no mock)
  const clinicOptions = useMemo(() => {
    const map = new Map<string, string>()
    allItems.forEach((item) => map.set(item.clinicId, item.clinicName))
    return Array.from(map, ([value, label]) => ({ value, label }))
  }, [allItems])

  const procedureOptions = useMemo(() => {
    const map = new Map<string, string>()
    allItems.forEach((item) => map.set(item.procedureId, item.procedureName))
    return Array.from(map, ([value, label]) => ({ value, label }))
  }, [allItems])

  // Aplica os filtros (local, em memória — "filtro local" pedido na issue)
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesDateFrom = appliedFilters.dateFrom
        ? item.createdAt >= appliedFilters.dateFrom
        : true
      const matchesDateTo = appliedFilters.dateTo
        ? item.createdAt <= appliedFilters.dateTo
        : true
      const matchesClinic = appliedFilters.clinicId
        ? item.clinicId === appliedFilters.clinicId
        : true
      const matchesProcedure = appliedFilters.procedureId
        ? item.procedureId === appliedFilters.procedureId
        : true

      return matchesDateFrom && matchesDateTo && matchesClinic && matchesProcedure
    })
  }, [allItems, appliedFilters])

  // Pagina o resultado já filtrado
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filteredItems.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // Atualiza um campo do rascunho de filtro (não filtra ainda)
  const handleDraftChange = (field: keyof HistoryFiltersState, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }))
  }

  // Botão "Filtrar": copia o rascunho pro filtro aplicado e volta pra página 1
  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters)
    setPage(1)
  }

  // Botão "Limpar": zera os dois estados e volta pra página 1
  const handleClearFilters = () => {
    setDraftFilters(EMPTY_FILTERS)
    setAppliedFilters(EMPTY_FILTERS)
    setPage(1)
  }

  // Botão "Ver detalhes" do card — a página de destino (Issue #87) ainda
  // não existe, então por ora só loga, igual o RecentHistory já faz hoje.
  const handleViewDetails = (item: HistoryItem) => {
    console.log(`Redirecionando para detalhes da precificação #${item.id}`)
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

        {/* ===== HistoryFilters (embutido — vira componente próprio na Issue #86) ===== */}
        <div className="history-filters-card">
          <div className="history-filters-title">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </div>

          <div className="history-filters-grid">
            <Input
              type="date"
              label="De"
              value={draftFilters.dateFrom}
              onChange={(e) => handleDraftChange('dateFrom', e.target.value)}
            />
            <Input
              type="date"
              label="Até"
              value={draftFilters.dateTo}
              onChange={(e) => handleDraftChange('dateTo', e.target.value)}
            />
            <Select
              label="Clínica"
              placeholder="Todas as clínicas"
              value={draftFilters.clinicId}
              onChange={(e) => handleDraftChange('clinicId', e.target.value)}
              options={clinicOptions}
            />
            <Select
              label="Procedimento"
              placeholder="Todos os procedimentos"
              value={draftFilters.procedureId}
              onChange={(e) => handleDraftChange('procedureId', e.target.value)}
              options={procedureOptions}
            />
          </div>

          <div className="history-filters-actions">
            <Button variant="secondary" onClick={handleClearFilters}>
              <X className="h-4 w-4" />
              Limpar
            </Button>
            <Button onClick={handleApplyFilters}>
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </div>

        {/* Mensagem de erro (ex: falha ao carregar o histórico) */}
        {error && <p className="clinics-page-error">{error}</p>}

        {/* ===== HistoryList / HistoryCard (embutidos — viram componentes nas Issues #85/futuro) ===== */}
        {isLoading ? (
          <p className="history-loading-text">Carregando histórico...</p>
        ) : pageItems.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="Nenhuma precificação encontrada"
            subtitle="Ajuste os filtros ou limpe-os para ver todo o histórico"
          />
        ) : (
          <div className="history-list-grid">
            {pageItems.map((item) => (
              <div key={item.id} className="history-card">
                <div className="history-card-top">
                  <span className="history-card-date">{formatDateBR(item.createdAt)}</span>
                  <PriceDisplay value={item.finalPrice} variant="highlight" size="md" />
                </div>
                <p className="history-card-procedure">{item.procedureName}</p>
                <p className="history-card-clinic">{item.clinicName}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="history-card-button"
                  onClick={() => handleViewDetails(item)}
                >
                  Ver detalhes
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Paginação (Issue #59, reaproveitada) */}
        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </DashboardLayout>
  )
}

export default History
