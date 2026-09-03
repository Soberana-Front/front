// Importa hooks do React
import { useState, useEffect, useCallback } from 'react'
// Importa o serviço e os tipos de clínica
import { clinicService } from '../services/clinicService'
import type { Clinic, ClinicPayload, GetClinicsParams } from '../services/clinicService'

// Estado de paginação exposto pelo hook
export interface ClinicsPagination {
  page: number
  totalPages: number
  totalItems: number
}

// Dados mockados usados enquanto a API real (Issue #51) não está disponível.
// Isso permite montar e testar a tela (Issue #45) sem depender do backend.
const MOCK_CLINICS: Clinic[] = [
  { id: '1', name: 'Clínica Odonto Prime', city: 'Juiz de Fora', state: 'MG', address: 'Rua A, 100', type: 'Odontologia', commission: 10, rent: 3500, costs: 1200 },
  { id: '2', name: 'Soberana Odontologia', city: 'Belo Horizonte', state: 'MG', address: 'Av. B, 200', type: 'Multiespecialidade', commission: 12, rent: 5200, costs: 1800 },
  { id: '3', name: 'Sorriso & Saúde', city: 'São Paulo', state: 'SP', address: 'Rua C, 300', type: 'Clínico Geral', commission: 8, rent: 4100, costs: 1500 },
]

const PAGE_SIZE = 10

/**
 * Hook responsável pelo estado e pelas operações de Clínicas (Issue #50).
 *
 * Segue o mesmo formato de useDashboardData.ts já usado no projeto:
 * loading/error/data no estado, e async/await + try/catch em toda
 * operação que mexe com o "servidor" (aqui, ainda mockado).
 */
export const useClinics = () => {
  // Lista completa (mock) — base para filtro e paginação locais
  const [allClinics, setAllClinics] = useState<Clinic[]>(MOCK_CLINICS)
  // Lista já filtrada/paginada, exibida na tabela
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [pagination, setPagination] = useState<ClinicsPagination>({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  })

  // Aplica filtro de texto (nome, cidade, estado) e paginação sobre allClinics
  const applyFilterAndPagination = useCallback(
    (source: Clinic[], searchTerm: string, page: number) => {
      const term = searchTerm.trim().toLowerCase()

      const filtered = term
        ? source.filter(
            (clinic) =>
              clinic.name.toLowerCase().includes(term) ||
              clinic.city.toLowerCase().includes(term) ||
              clinic.state.toLowerCase().includes(term)
          )
        : source

      const totalItems = filtered.length
      const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
      const safePage = Math.min(page, totalPages)
      const start = (safePage - 1) * PAGE_SIZE
      const pageItems = filtered.slice(start, start + PAGE_SIZE)

      setClinics(pageItems)
      setPagination({ page: safePage, totalPages, totalItems })
    },
    []
  )

  // Carrega as clínicas (hoje mockado; troca para clinicService.getClinics quando a API #51 estiver pronta)
  const fetchClinics = useCallback(
    async (params?: GetClinicsParams) => {
      setIsLoading(true)
      setError(null)

      try {
        // --- Quando a API estiver pronta, substituir o bloco abaixo por: ---
        // const response = await clinicService.getClinics(params)
        // setAllClinics(response.data)
        // setPagination({ page: response.page, totalPages: response.totalPages, totalItems: response.totalItems })

        // Simula delay de rede para o mock
        await new Promise((resolve) => setTimeout(resolve, 300))
        applyFilterAndPagination(MOCK_CLINICS, params?.search ?? search, params?.page ?? 1)
      } catch (err) {
        setError('Erro ao carregar as clínicas. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [applyFilterAndPagination, search]
  )

  // Atualiza o termo de busca e reaplica filtro/paginação (volta pra página 1)
  const filterClinics = useCallback(
    (term: string) => {
      setSearch(term)
      applyFilterAndPagination(allClinics, term, 1)
    },
    [allClinics, applyFilterAndPagination]
  )

  // Muda de página mantendo o filtro atual
  const goToPage = useCallback(
    (page: number) => {
      applyFilterAndPagination(allClinics, search, page)
    },
    [allClinics, search, applyFilterAndPagination]
  )

  // Cria uma clínica nova (mockado por enquanto)
  const createClinic = useCallback(
    async (data: ClinicPayload) => {
      setError(null)
      try {
        // Quando a API estiver pronta: const created = await clinicService.createClinic(data)
        const created: Clinic = { id: crypto.randomUUID(), ...data }
        const updated = [created, ...allClinics]
        setAllClinics(updated)
        applyFilterAndPagination(updated, search, 1)
        return created
      } catch (err) {
        setError('Erro ao criar a clínica. Tente novamente.')
        throw err
      }
    },
    [allClinics, search, applyFilterAndPagination]
  )

  // Edita uma clínica existente (mockado por enquanto)
  const updateClinic = useCallback(
    async (id: string, data: ClinicPayload) => {
      setError(null)
      try {
        // Quando a API estiver pronta: await clinicService.updateClinic(id, data)
        const updated = allClinics.map((clinic) =>
          clinic.id === id ? { ...clinic, ...data } : clinic
        )
        setAllClinics(updated)
        applyFilterAndPagination(updated, search, pagination.page)
      } catch (err) {
        setError('Erro ao atualizar a clínica. Tente novamente.')
        throw err
      }
    },
    [allClinics, search, pagination.page, applyFilterAndPagination]
  )

  // Exclui uma clínica (mockado por enquanto)
  const deleteClinic = useCallback(
    async (id: string) => {
      setError(null)
      try {
        // Quando a API estiver pronta: await clinicService.deleteClinic(id)
        const updated = allClinics.filter((clinic) => clinic.id !== id)
        setAllClinics(updated)
        applyFilterAndPagination(updated, search, pagination.page)
      } catch (err) {
        setError('Erro ao excluir a clínica. Tente novamente.')
        throw err
      }
    },
    [allClinics, search, pagination.page, applyFilterAndPagination]
  )

  // Carrega a lista ao montar o componente
  useEffect(() => {
    fetchClinics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    clinics,
    isLoading,
    error,
    pagination,
    search,
    filterClinics,
    goToPage,
    createClinic,
    updateClinic,
    deleteClinic,
    refetch: fetchClinics,
  }
}

/*
é quem realmente trata o erro — captura no catch, guarda uma mensagem amigável em error (estado exposto pro componente exibir), e usa finally pra garantir que isLoading sempre volte a false, mesmo se der erro.
 
*/