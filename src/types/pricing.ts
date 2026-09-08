// ============================================================
// TIPOS DE PRECIFICAÇÃO
// ============================================================

/**
 * Resultado completo de uma precificação.
 *
 * Representa os dados principais retornados pela API
 * de precificação.
 */
export interface PricingResult {
  id: string
  clinicId: string
  clinicName: string
  procedureId: string
  procedureName: string
  materialCost: number
  fixedCosts: number
  variableCosts: number
  hourCost: number
  commission: number
  taxes: number
  margin: number
  finalPrice: number
  profit: number
  createdAt: string
}

/**
 * Mensagem utilizada na conversa com a IA.
 *
 * sender identifica quem enviou a mensagem:
 * - user = usuário
 * - ia = Soberana AI
 */
export interface ChatMessage {
  id: string
  message: string
  sender: 'user' | 'ia'
  timestamp: string
}

/**
 * Dados enviados para criação de uma precificação.
 *
 * Os campos clinicId e procedureId são obrigatórios.
 * Outros dados podem ser enviados conforme a evolução
 * da API.
 */
export interface CreatePricingData {
  clinicId: string
  procedureId: string
  [key: string]: unknown
}

/**
 * Dados utilizados para o detalhamento de uma precificação.
 *
 * O resultado possui todos os campos de PricingResult
 * e também a conversa completa associada à precificação.
 */
export interface PricingDetail extends PricingResult {
  conversation: ChatMessage[]
}

/**
 * Resposta recebida ao enviar uma mensagem para
 * o chat de uma precificação.
 *
 * Mantemos a estrutura flexível enquanto o contrato
 * definitivo da API não estiver disponível.
 */
export interface PricingChatResponse {
  [key: string]: unknown
}