// Importa a instância do Axios já configurada (mesma usada pelo clinicService)
import { api } from './api'
// Importa o tipo literal de categoria, definido junto com o schema do formulário
import type { ProcedureCategory } from '../validations/procedureSchema'

// ===========================
// TIPOS
// ===========================

// Formato de um procedimento retornado pela API
export interface Procedure {
  id: string
  name: string
  category: ProcedureCategory
  time: number          // em minutos
  description?: string  // opcional
}

// Payload enviado ao criar/editar um procedimento (sem o id, gerado pelo backend)
export type ProcedurePayload = Omit<Procedure, 'id'>

// Parâmetros de busca/paginação enviados no GET /procedures
export interface GetProceduresParams {
  search?: string
  category?: string
  page?: number
  pageSize?: number
}

// Formato paginado retornado pela API
export interface PaginatedProcedures {
  data: Procedure[]
  page: number
  totalPages: number
  totalItems: number
}

// ===========================
// SERVIÇO
// ===========================

/**
 * Serviço responsável por toda comunicação com a API de procedimentos (Issue #57).
 *
 * Segue exatamente o mesmo padrão do clinicService (Issue #51): cada método
 * usa async/await dentro de try/catch, e repassa o erro adiante (throw) —
 * quem trata de fato é o hook useProcedures, que decide a mensagem exibida
 * ao usuário.
 */
export const procedureService = {
  // GET /procedures — lista procedimentos com paginação e filtros
  getProcedures: async (params?: GetProceduresParams): Promise<PaginatedProcedures> => {
    try {
      const response = await api.get<PaginatedProcedures>('/procedures', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // GET /procedures/:id — busca um procedimento específico
  getProcedure: async (id: string): Promise<Procedure> => {
    try {
      const response = await api.get<Procedure>(`/procedures/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // POST /procedures — cria um novo procedimento
  createProcedure: async (data: ProcedurePayload): Promise<Procedure> => {
    try {
      const response = await api.post<Procedure>('/procedures', data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // PUT /procedures/:id — atualiza um procedimento existente
  updateProcedure: async (id: string, data: ProcedurePayload): Promise<Procedure> => {
    try {
      const response = await api.put<Procedure>(`/procedures/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // DELETE /procedures/:id — exclui um procedimento
  deleteProcedure: async (id: string): Promise<void> => {
    try {
      await api.delete(`/procedures/${id}`)
    } catch (error) {
      throw error
    }
  },
}

export default procedureService