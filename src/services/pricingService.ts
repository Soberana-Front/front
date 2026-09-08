// ============================================================
// SERVIÇO DE PRECIFICAÇÃO
// ============================================================

/**
 * Importa a instância Axios centralizada da aplicação.
 *
 * A instância já possui:
 * - baseURL;
 * - Content-Type;
 * - autenticação;
 * - tratamento global de erros.
 */
import { api } from './api'

/**
 * Importa os tipos centralizados do domínio de Pricing.
 */
import type {
  ChatMessage,
  CreatePricingData,
  PricingChatResponse,
  PricingResult,
} from '../types/pricing'

// ============================================================
// TIPOS EXPORTADOS
// ============================================================

/**
 * Reexporta os tipos para manter compatibilidade
 * com arquivos que eventualmente importem esses tipos
 * diretamente do pricingService.
 */
export type {
  ChatMessage,
  CreatePricingData,
  PricingChatResponse,
  PricingResult,
}

// ============================================================
// SERVIÇO
// ============================================================

/**
 * Serviço responsável pela comunicação com a API
 * de precificação.
 *
 * Endpoints:
 *
 * POST /pricing
 * GET /pricing/:id
 * POST /pricing/:id/chat
 * GET /pricing/:id/pdf
 */
export const pricingService = {
  // ==========================================================
  // CRIAR PRECIFICAÇÃO
  // ==========================================================

  /**
   * Cria uma nova precificação.
   *
   * Endpoint:
   * POST /pricing
   */
  createPricing: async (
    data: CreatePricingData,
  ): Promise<PricingResult> => {
    const response = await api.post<PricingResult>(
      '/pricing',
      data,
    )

    return response.data
  },

  // ==========================================================
  // BUSCAR PRECIFICAÇÃO
  // ==========================================================

  /**
   * Busca uma precificação pelo ID.
   *
   * Endpoint:
   * GET /pricing/:id
   */
  getPricing: async (
    id: string,
  ): Promise<PricingResult> => {
    const response = await api.get<PricingResult>(
      `/pricing/${id}`,
    )

    return response.data
  },

  // ==========================================================
  // ENVIAR MENSAGEM PARA O CHAT
  // ==========================================================

  /**
   * Envia uma mensagem para a conversa
   * associada a uma precificação.
   *
   * Endpoint:
   * POST /pricing/:id/chat
   */
  sendChatMessage: async (
    id: string,
    message: string,
  ): Promise<PricingChatResponse> => {
    const response =
      await api.post<PricingChatResponse>(
        `/pricing/${id}/chat`,
        {
          message,
        },
      )

    return response.data
  },

  // ==========================================================
  // EXPORTAR PDF
  // ==========================================================

  /**
   * Solicita o PDF da precificação.
   *
   * Endpoint:
   * GET /pricing/:id/pdf
   *
   * O retorno é um Blob porque o servidor
   * retorna um arquivo PDF.
   */
  exportPDF: async (
    id: string,
  ): Promise<Blob> => {
    const response = await api.get<Blob>(
      `/pricing/${id}/pdf`,
      {
        responseType: 'blob',
      },
    )

    return response.data
  },
}

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default pricingService