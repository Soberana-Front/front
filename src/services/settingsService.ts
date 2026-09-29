// Importa a instância do Axios já configurada (baseURL + interceptor de token)
// — a mesma usada pelo clinicService, procedureService e pricingService
import { api } from './api'

// ===========================
// TIPOS
// ===========================

/**
 * Configurações do usuário retornadas pela API.
 *
 * Os campos seguem exatamente o mesmo formato de "settings" que o cadastro
 * (pages/Register) já envia no POST /auth/register — assim o que é criado
 * no cadastro é o mesmo objeto que depois é lido/editado aqui.
 */
export interface UserSettings {
  currency: string       // moeda, ex: 'BRL'
  profitMargin: number   // margem de lucro padrão (%)
  taxRate: number        // alíquota de impostos (%)
  cardFee: number        // taxa da maquininha/cartão (%)
}

// Payload enviado no PUT /settings.
// Como PUT substitui o recurso inteiro, o payload é o objeto completo
// (e não Partial) — o formulário de configurações sempre envia todos os campos.
// Se o time preferir atualização parcial, o caminho seria trocar para PATCH com Partial<UserSettings>
export type UpdateSettingsPayload = UserSettings

// ===========================
// SERVIÇO
// ===========================

/**
 * Serviço responsável por toda comunicação com a API de configurações (Issue #97).
 *
 * Segue o mesmo padrão dos outros services: cada método só faz a chamada HTTP
 * e devolve o resultado (ou lança o erro adiante). Quem trata o erro de fato
 * (toast, mensagem no formulário, etc.) será o hook que consumir este serviço.
 *
 * Não recebe id: as configurações são sempre do usuário logado, identificado
 * pelo token JWT que o interceptor do api.ts já coloca no header Authorization.
 */
export const settingsService = {
  // GET /settings — busca as configurações do usuário logado
  getSettings: async (): Promise<UserSettings> => {
    try {
      const response = await api.get<UserSettings>('/settings')
      return response.data
    } catch (error) {
      // Repassa o erro para quem chamou tratar
      throw error
    }
  },

  // PUT /settings — atualiza as configurações do usuário logado
  updateSettings: async (data: UpdateSettingsPayload): Promise<UserSettings> => {
    try {
      const response = await api.put<UserSettings>('/settings', data)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default settingsService