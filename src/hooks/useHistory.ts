// Importa hooks do React
import { useState, useEffect, useCallback, useMemo } from 'react'
// Reaproveita os tipos centralizados de Pricing
import type { PricingResult, PricingDetail as PricingDetailData } from '../types/pricing'
// Reaproveita o formato de filtros já definido no componente HistoryFilters
// (Issue #86) — o hook NÃO redefine esse tipo, só importa, pra não ter
// duas fontes de verdade pro mesmo formato.
import { EMPTY_HISTORY_FILTERS, type HistoryFiltersState } from '../components/ui/HistoryFilters'

// ============================================================
// TIPOS
// ============================================================

/**
 * Item de histórico: mesmo subconjunto de PricingResult usado no
 * HistoryCard (Issue #85) — repetido aqui como tipo local só por
 * conveniência de leitura; estruturalmente é o mesmo formato.
 */
export type HistoryItem = Pick<
  PricingResult,
  'id' | 'clinicId' | 'clinicName' | 'procedureId' | 'procedureName' | 'finalPrice' | 'createdAt'
>

// Estado de paginação exposto pelo hook (mesmo formato do useProcedures)
export interface HistoryPagination {
  page: number
  totalPages: number
  totalItems: number
}

// Quantos cards por página
const PAGE_SIZE = 6

// ============================================================
// DADOS MOCKADOS
// ============================================================
/**
 * Movidos pra cá: antes viviam soltos na History.tsx (lista) e na
 * HistoryDetail.tsx (detalhe, duplicados). Agora existe UM lugar só
 * com os dados mockados do módulo inteiro de Histórico.
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

// Detalhes completos (com conversa) — mesmos 3 ids que existiam na HistoryDetail.tsx
const MOCK_HISTORY_DETAILS: Record<string, PricingDetailData> = {
  '1': {
    id: '1', clinicId: 'c1', clinicName: 'Clínica Odonto Prime', procedureId: 'p1', procedureName: 'Limpeza e Profilaxia',
    materialCost: 20, fixedCosts: 30, variableCosts: 15, hourCost: 60, commission: 10, taxes: 8, margin: 25,
    finalPrice: 180, profit: 45, createdAt: '2026-08-22',
    conversation: [
      { id: 'm1', sender: 'ia', message: 'Olá! Vamos calcular o preço da Limpeza e Profilaxia.', timestamp: '09:00' },
      { id: 'm2', sender: 'user', message: 'Quero considerar meia hora de cadeira e margem de 25%.', timestamp: '09:01' },
      { id: 'm3', sender: 'ia', message: 'Com os custos informados, o preço final sugerido é R$ 180,00.', timestamp: '09:02' },
    ],
  },
  '2': {
    id: '2', clinicId: 'c2', clinicName: 'Soberana Odontologia', procedureId: 'p2', procedureName: 'Tratamento de Canal',
    materialCost: 90, fixedCosts: 80, variableCosts: 40, hourCost: 150, commission: 15, taxes: 10, margin: 30,
    finalPrice: 650, profit: 195, createdAt: '2026-08-21',
    conversation: [
      { id: 'm1', sender: 'ia', message: 'Vamos precificar o Tratamento de Canal dessa clínica.', timestamp: '14:10' },
      { id: 'm2', sender: 'user', message: 'São duas sessões, material mais caro que o comum.', timestamp: '14:11' },
      { id: 'm3', sender: 'ia', message: 'Considerando as duas sessões, o preço final ficou em R$ 650,00.', timestamp: '14:13' },
    ],
  },
  '3': {
    id: '3', clinicId: 'c1', clinicName: 'Clínica Odonto Prime', procedureId: 'p3', procedureName: 'Consulta Odontológica',
    materialCost: 5, fixedCosts: 20, variableCosts: 5, hourCost: 40, commission: 8, taxes: 6, margin: 20,
    finalPrice: 150, profit: 30, createdAt: '2026-08-20',
    conversation: [
      { id: 'm1', sender: 'ia', message: 'Essa é uma consulta de avaliação simples, sem procedimento associado.', timestamp: '11:00' },
      { id: 'm2', sender: 'user', message: 'Confirmado, só avaliação mesmo.', timestamp: '11:01' },
      { id: 'm3', sender: 'ia', message: 'Preço final sugerido: R$ 150,00.', timestamp: '11:02' },
    ],
  },
}

// Fallback genérico para qualquer id fora do mock acima
const DEFAULT_HISTORY_DETAIL: PricingDetailData = {
  id: '0', clinicId: 'c0', clinicName: 'Clínica não encontrada', procedureId: 'p0', procedureName: 'Procedimento não encontrado',
  materialCost: 0, fixedCosts: 0, variableCosts: 0, hourCost: 0, commission: 0, taxes: 0, margin: 0,
  finalPrice: 0, profit: 0, createdAt: new Date().toISOString(), conversation: [],
}

/**
 * Hook responsável pelo estado e pelas operações do módulo de Histórico
 * (Issue #88).
 *
 * Estrutura idêntica ao useProcedures/useClinics: mock local, filtro e
 * paginação aplicados em memória (useMemo), async/await + try/catch em
 * toda operação. A diferença é que aqui os filtros só são "commitados"
 * quando o consumidor chama applyFilters() (botão Filtrar) — updateFilter
 * sozinho só atualiza o rascunho, sem refiltrar a lista.
 */
export const useHistory = () => {
  // "Banco de dados" local — todos os itens, sem filtro nem paginação
  const [allItems, setAllItems] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Filtros: rascunho (o que está nos campos) x aplicado (o que filtra de fato)
  const [draftFilters, setDraftFilters] = useState<HistoryFiltersState>(EMPTY_HISTORY_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<HistoryFiltersState>(EMPTY_HISTORY_FILTERS)

  const [page, setPage] = useState<number>(1)

  // Busca o histórico (mockado por enquanto — Funcionalidade "Buscar histórico (mockado)")
  const fetchHistory = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      // --- Quando a API existir, trocar por: ---
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
    fetchHistory()
  }, [fetchHistory])

  // Opções únicas de clínica/procedimento pros selects do HistoryFilters
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

  // Aplica os filtros já "commitados" (appliedFilters) sobre allItems
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesDateFrom = appliedFilters.dateFrom ? item.createdAt >= appliedFilters.dateFrom : true
      const matchesDateTo = appliedFilters.dateTo ? item.createdAt <= appliedFilters.dateTo : true
      const matchesClinic = appliedFilters.clinicId ? item.clinicId === appliedFilters.clinicId : true
      const matchesProcedure = appliedFilters.procedureId ? item.procedureId === appliedFilters.procedureId : true
      return matchesDateFrom && matchesDateTo && matchesClinic && matchesProcedure
    })
  }, [allItems, appliedFilters])

  // Pagina o resultado já filtrado
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const history = useMemo(
    () => filteredItems.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredItems, safePage]
  )

  // Atualiza um campo do rascunho de filtro (Funcionalidade "Filtrar histórico" — parte 1)
  const updateFilter = useCallback((field: keyof HistoryFiltersState, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }))
  }, [])

  // "Commita" o rascunho como filtro aplicado e volta pra página 1 (parte 2)
  const applyFilters = useCallback(() => {
    setAppliedFilters(draftFilters)
    setPage(1)
  }, [draftFilters])

  // Zera rascunho e filtro aplicado, volta pra página 1
  const clearFilters = useCallback(() => {
    setDraftFilters(EMPTY_HISTORY_FILTERS)
    setAppliedFilters(EMPTY_HISTORY_FILTERS)
    setPage(1)
  }, [])

  // Muda de página mantendo os filtros atuais
  const goToPage = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  // Busca o detalhe de UMA precificação por id (Funcionalidade "Buscar
  // detalhe de uma precificação") — usado pela HistoryDetail.tsx
  const getHistoryDetail = useCallback(async (id: string): Promise<PricingDetailData> => {
    // --- Quando a API existir, trocar por: ---
    // return await historyService.getHistoryDetail(id)
    await new Promise((resolve) => setTimeout(resolve, 300))
    return MOCK_HISTORY_DETAILS[id] ?? { ...DEFAULT_HISTORY_DETAIL, id }
  }, [])

  return {
    history,
    isLoading,
    error,
    filters: draftFilters,
    pagination: { page: safePage, totalPages, totalItems: filteredItems.length } as HistoryPagination,
    clinicOptions,
    procedureOptions,
    updateFilter,
    applyFilters,
    clearFilters,
    goToPage,
    getHistoryDetail,
    refetch: fetchHistory,
  }
}
