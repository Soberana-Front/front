// Importa a instância do Axios já configurada (baseURL + interceptor de token)
import { api } from './api'
// Importa os tipos literais de Estado e Tipo, definidos junto com o schema
// de validação do formulário — assim Clinic usa exatamente os mesmos
// valores possíveis que o ClinicForm, sem duplicar a lista em dois lugares
import type { BrazilianState, ClinicType } from '../validations/clinicSchema'

// Formato de uma clínica retornada pela API
export interface Clinic {
  id: string
  name: string
  city: string
  state: BrazilianState   // antes era "string" — agora só aceita uma UF válida
  address: string
  type: ClinicType   // antes era "string" — agora só aceita um tipo válido
  commission: number   // percentual (%)
  rent: number          // R$
  costs: number          // R$
}

// Payload enviado ao criar/editar uma clínica (sem o id, gerado pelo backend)
export type ClinicPayload = Omit<Clinic, 'id'>

// Parâmetros de busca/paginação enviados no GET /clinics
export interface GetClinicsParams {
  search?: string
  city?: string
  state?: string
  page?: number
  pageSize?: number
}

// Formato paginado retornado pela API
export interface PaginatedClinics {
  data: Clinic[]
  page: number
  totalPages: number
  totalItems: number
}

// ===========================
// SERVIÇO
// ===========================

/**
 * Serviço responsável por toda comunicação com a API de clínicas (Issue #51).
 *
 * Cada método aqui é "burro": só faz a chamada HTTP e devolve o resultado
 * (ou lança o erro adiante). Quem trata o erro de fato (exibir toast,
 * mensagem no formulário, etc.) é o hook useClinics, que consome este serviço.
 * Isso mantém a camada de serviço simples e reutilizável.
 */
export const clinicService = {
  // GET /clinics — lista clínicas com paginação e filtros
  getClinics: async (params?: GetClinicsParams): Promise<PaginatedClinics> => {
    try {
      const response = await api.get<PaginatedClinics>('/clinics', { params })
      return response.data
    } catch (error) {
      // Repassa o erro para quem chamou tratar (useClinics)
      throw error
    }
  },

  // GET /clinics/:id — busca uma clínica específica
  getClinic: async (id: string): Promise<Clinic> => {
    try {
      const response = await api.get<Clinic>(`/clinics/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // POST /clinics — cria uma nova clínica
  createClinic: async (data: ClinicPayload): Promise<Clinic> => {
    try {
      const response = await api.post<Clinic>('/clinics', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // PUT /clinics/:id — atualiza uma clínica existente
  updateClinic: async (id: string, data: ClinicPayload): Promise<Clinic> => {
    try {
      const response = await api.put<Clinic>(`/clinics/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // DELETE /clinics/:id — exclui uma clínica
  deleteClinic: async (id: string): Promise<void> => {
    try {
      await api.delete(`/clinics/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default clinicService


/*
Nota: o serviço reaproveita services/api.ts (que já tem baseURL e o interceptor que adiciona o token JWT e trata 401) em vez de criar uma instância nova do axios — segue o padrão certo, mesmo que dashboardService.ts no projeto atual tenha criado a sua própria instância separada. Não mexi no dashboardService.ts, só optei por não repetir esse padrão no arquivo novo.

cada método usa async/await dentro de try/catch; hoje só faz throw error (repassa pra cima), porque decidir o que fazer com o erro (mensagem pro usuário, log, etc.) é responsabilidade de quem consome o serviço.

*/