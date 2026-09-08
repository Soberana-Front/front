// Importa a instância do Axios já configurada.
//
// Essa instância já possui:
// - baseURL da API;
// - Content-Type JSON;
// - token JWT;
// - tratamento global de erro 401.
//
// Dessa forma, não criamos uma segunda instância
// específica para o serviço de precificação.
import { api } from './api'

// ========================================
// TIPOS
// ========================================

/**
 * Dados enviados para criar uma nova precificação.
 *
 * A API poderá receber outros campos futuramente.
 * Por enquanto mantemos o payload genérico o suficiente
 * para a estrutura atual do projeto.
 */
export interface CreatePricingData {
  clinicId: string
  procedureId: string
  [key: string]: unknown
}

/**
 * Resultado retornado pela API após criar ou
 * consultar uma precificação.
 *
 * O backend poderá evoluir esse contrato posteriormente.
 */
export interface PricingResult {
  id: string
  [key: string]: unknown
}

/**
 * Resposta esperada ao enviar uma mensagem
 * para o chat de uma precificação.
 */
export interface PricingChatResponse {
  [key: string]: unknown
}

// ========================================
// SERVIÇO
// ========================================

/**
 * Serviço responsável pela comunicação com os
 * endpoints de precificação da API.
 *
 * Issue #72 — Criar pricingService.
 *
 * Responsabilidades:
 * - criar uma precificação;
 * - buscar uma precificação;
 * - enviar mensagens para o chat;
 * - solicitar a exportação em PDF.
 *
 * O serviço não possui lógica de interface ou estado.
 * Essas responsabilidades pertencem aos hooks e componentes
 * que utilizarem este serviço.
 */
export const pricingService = {
  // ========================================
  // CRIAR PRECIFICAÇÃO
  // ========================================

  /**
   * POST /pricing
   *
   * Cria uma nova precificação.
   *
   * @param data Dados necessários para criar a precificação.
   * @returns Resultado da precificação criada.
   */
  createPricing: async (
    data: CreatePricingData,
  ): Promise<PricingResult> => {
    try {
      const response = await api.post<PricingResult>(
        '/pricing',
        data,
      )

      return response.data
    } catch (error) {
      // O serviço não trata a apresentação do erro.
      // Apenas repassa para quem chamou o método.
      throw error
    }
  },

  // ========================================
  // BUSCAR PRECIFICAÇÃO
  // ========================================

  /**
   * GET /pricing/:id
   *
   * Busca uma precificação existente pelo ID.
   *
   * @param id Identificador da precificação.
   * @returns Dados da precificação encontrada.
   */
  getPricing: async (
    id: string,
  ): Promise<PricingResult> => {
    try {
      const response = await api.get<PricingResult>(
        `/pricing/${id}`,
      )

      return response.data
    } catch (error) {
      // Repassa o erro para o consumidor do serviço.
      throw error
    }
  },

  // ========================================
  // ENVIAR MENSAGEM PARA O CHAT
  // ========================================

  /**
   * POST /pricing/:id/chat
   *
   * Envia uma mensagem para o chat associado
   * a uma precificação.
   *
   * @param id Identificador da precificação.
   * @param message Mensagem enviada pelo usuário.
   * @returns Resposta retornada pelo chat da API.
   */
  sendChatMessage: async (
    id: string,
    message: string,
  ): Promise<PricingChatResponse> => {
    try {
      const response =
        await api.post<PricingChatResponse>(
          `/pricing/${id}/chat`,
          {
            message,
          },
        )

      return response.data
    } catch (error) {
      // Repassa o erro para o consumidor do serviço.
      throw error
    }
  },

  // ========================================
  // EXPORTAR PDF
  // ========================================

  /**
   * GET /pricing/:id/pdf
   *
   * Solicita o PDF da precificação.
   *
   * O responseType "blob" é necessário porque
   * o endpoint retorna um arquivo PDF em vez de
   * um objeto JSON.
   *
   * @param id Identificador da precificação.
   * @returns Arquivo PDF como Blob.
   */
  exportPDF: async (
    id: string,
  ): Promise<Blob> => {
    try {
      const response = await api.get<Blob>(
        `/pricing/${id}/pdf`,
        {
          responseType: 'blob',
        },
      )

      return response.data
    } catch (error) {
      // Repassa o erro para o consumidor do serviço.
      throw error
    }
  },
}

// ========================================
// EXPORT DEFAULT
// ========================================

export default pricingService