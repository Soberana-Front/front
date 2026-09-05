// Importa hooks do React
import { useState, useEffect, useCallback } from 'react'
// Importa o serviço e os tipos de procedimento
import { procedureService } from '../services/procedureService'
import type { Procedure, ProcedurePayload, GetProceduresParams } from '../services/procedureService'

// Estado de paginação exposto pelo hook
export interface ProceduresPagination {
  page: number
  totalPages: number
  totalItems: number
}

// Dados mockados usados enquanto a API real (Issue #57) não está disponível.
// Mesma estratégia do useClinics: permite montar e testar a tela (Issue #52)
// sem depender do backend.
const MOCK_PROCEDURES: Procedure[] = [
  { id: '1', name: 'Limpeza dental', category: 'Prevenção', time: 30, description: 'Remoção de tártaro e placa bacteriana' },
  { id: '2', name: 'Extração de siso', category: 'Cirurgia', time: 60, description: 'Remoção cirúrgica do terceiro molar' },
  { id: '3', name: 'Clareamento dental', category: 'Estética', time: 45, description: 'Clareamento a laser em consultório' },
  { id: '4', name: 'Radiografia panorâmica', category: 'Diagnóstico', time: 15, description: 'Raio-x completo da arcada dentária' },
]

const PAGE_SIZE = 10

/**
 * Hook responsável pelo estado e pelas operações de Procedimentos (Issue #56).
 *
 * Estrutura idêntica ao useClinics (Issue #50): mock local, filtro e
 * paginação aplicados em memória, async/await + try/catch em toda operação,
 * e comentários marcando onde trocar o mock pelo procedureService real.
 * A única diferença de comportamento é o filtro: aqui existem DOIS filtros
 * combináveis (texto de busca E categoria), enquanto em Clínicas era só texto.
 */
export const useProcedures = () => {
  const [allProcedures, setAllProcedures] = useState<Procedure[]>(MOCK_PROCEDURES)
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [category, setCategory] = useState<string>('') // '' = todas as categorias
  const [pagination, setPagination] = useState<ProceduresPagination>({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  })

  // Aplica filtro de texto + categoria e paginação sobre allProcedures
  const applyFilterAndPagination = useCallback(
    (source: Procedure[], searchTerm: string, categoryFilter: string, page: number) => {
      const term = searchTerm.trim().toLowerCase()

      const filtered = source.filter((procedure) => {
        const matchesSearch = term ? procedure.name.toLowerCase().includes(term) : true
        const matchesCategory = categoryFilter ? procedure.category === categoryFilter : true
        return matchesSearch && matchesCategory
      })

      const totalItems = filtered.length
      const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
      const safePage = Math.min(page, totalPages)
      const start = (safePage - 1) * PAGE_SIZE
      const pageItems = filtered.slice(start, start + PAGE_SIZE)

      setProcedures(pageItems)
      setPagination({ page: safePage, totalPages, totalItems })
    },
    []
  )

  // Carrega os procedimentos (hoje mockado; troca para procedureService.getProcedures quando a API #57 estiver pronta)
  const fetchProcedures = useCallback(
    async (params?: GetProceduresParams) => {
      setIsLoading(true)
      setError(null)

      try {
        // --- Quando a API estiver pronta, substituir o bloco abaixo por: ---
        // const response = await procedureService.getProcedures(params)
        // setAllProcedures(response.data)
        // setPagination({ page: response.page, totalPages: response.totalPages, totalItems: response.totalItems })

        await new Promise((resolve) => setTimeout(resolve, 300))
        applyFilterAndPagination(
          MOCK_PROCEDURES,
          params?.search ?? search,
          params?.category ?? category,
          params?.page ?? 1
        )
      } catch (err) {
        setError('Erro ao carregar os procedimentos. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [applyFilterAndPagination, search, category]
  )

  // Atualiza o termo de busca e reaplica filtro/paginação (volta pra página 1)
  const filterProcedures = useCallback(
    (term: string) => {
      setSearch(term)
      applyFilterAndPagination(allProcedures, term, category, 1)
    },
    [allProcedures, category, applyFilterAndPagination]
  )

  // Atualiza o filtro de categoria e reaplica (volta pra página 1)
  const filterByCategory = useCallback(
    (categoryFilter: string) => {
      setCategory(categoryFilter)
      applyFilterAndPagination(allProcedures, search, categoryFilter, 1)
    },
    [allProcedures, search, applyFilterAndPagination]
  )

  // Muda de página mantendo os filtros atuais
  const goToPage = useCallback(
    (page: number) => {
      applyFilterAndPagination(allProcedures, search, category, page)
    },
    [allProcedures, search, category, applyFilterAndPagination]
  )

  // Cria um procedimento novo (mockado por enquanto)
  const createProcedure = useCallback(
    async (data: ProcedurePayload) => {
      setError(null)
      try {
        // Quando a API estiver pronta: const created = await procedureService.createProcedure(data)
        const created: Procedure = { id: crypto.randomUUID(), ...data }
        const updated = [created, ...allProcedures]
        setAllProcedures(updated)
        applyFilterAndPagination(updated, search, category, 1)
        return created
      } catch (err) {
        setError('Erro ao criar o procedimento. Tente novamente.')
        throw err
      }
    },
    [allProcedures, search, category, applyFilterAndPagination]
  )

  // Edita um procedimento existente (mockado por enquanto)
  const updateProcedure = useCallback(
    async (id: string, data: ProcedurePayload) => {
      setError(null)
      try {
        // Quando a API estiver pronta: await procedureService.updateProcedure(id, data)
        const updated = allProcedures.map((procedure) =>
          procedure.id === id ? { ...procedure, ...data } : procedure
        )
        setAllProcedures(updated)
        applyFilterAndPagination(updated, search, category, pagination.page)
      } catch (err) {
        setError('Erro ao atualizar o procedimento. Tente novamente.')
        throw err
      }
    },
    [allProcedures, search, category, pagination.page, applyFilterAndPagination]
  )

  // Exclui um procedimento (mockado por enquanto)
  const deleteProcedure = useCallback(
    async (id: string) => {
      setError(null)
      try {
        // Quando a API estiver pronta: await procedureService.deleteProcedure(id)
        const updated = allProcedures.filter((procedure) => procedure.id !== id)
        setAllProcedures(updated)
        applyFilterAndPagination(updated, search, category, pagination.page)
      } catch (err) {
        setError('Erro ao excluir o procedimento. Tente novamente.')
        throw err
      }
    },
    [allProcedures, search, category, pagination.page, applyFilterAndPagination]
  )

  useEffect(() => {
    fetchProcedures()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    procedures,
    isLoading,
    error,
    pagination,
    search,
    category,
    filterProcedures,
    filterByCategory,
    goToPage,
    createProcedure,
    updateProcedure,
    deleteProcedure,
    refetch: fetchProcedures,
  }
}