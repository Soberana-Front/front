//Valores mockados e o salvar mockado, já usando os tipos do settingsService
// Importa hooks do React
import { useState, useEffect, useCallback } from 'react'
// Importa o tipo das configurações do settingsService (Issue #97).
// O service ainda não é chamado (não há backend), mas o tipo já é o oficial.
import type { UserSettings, UpdateSettingsPayload } from '../services/settingsService'

// ============================================================
// DADOS MOCKADOS
// ============================================================

// Valores usados enquanto a API de configurações não existe.
// Moeda e porcentagens seguem os valores padrão de um cadastro novo.
const MOCK_SETTINGS: UserSettings = {
  currency: 'BRL',
  profitMargin: 30,
  taxRate: 6,
  cardFee: 3.5,
  averageServiceTime: 60,
}

// Simula o tempo de resposta da rede (mesmo valor dos outros hooks)
const MOCK_DELAY_MS = 300
const simulateNetwork = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

// ============================================================
// HOOK
// ============================================================

/**
 * Hook responsável pelo estado e pelas operações de Configurações (Issue #93).
 *
 * Mesmo formato do useProfile/useClinics: loading/error/data no estado e
 * async/await + try/catch. Os comentários marcam a troca do mock pelo
 * settingsService, que já está pronto desde a Issue #97.
 */
export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Busca as configurações do usuário logado (hoje mockado)
  const fetchSettings = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // --- Quando a API estiver pronta, substituir o bloco abaixo por: ---
      // const data = await settingsService.getSettings()
      // setSettings(data)

      await simulateNetwork()
      setSettings(MOCK_SETTINGS)
    } catch (err) {
      setError('Erro ao carregar as configurações. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Carrega as configurações ao montar a página
  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  // Salva as configurações (hoje mockado)
  const updateSettings = useCallback(async (data: UpdateSettingsPayload) => {
    setError(null)
    try {
      // Quando a API estiver pronta:
      // const updated = await settingsService.updateSettings(data)
      // setSettings(updated)

      await simulateNetwork()
      // Mock: o "servidor" devolve exatamente o que foi enviado
      setSettings(data)
    } catch (err) {
      setError('Erro ao salvar as configurações. Tente novamente.')
      // Repassa o erro para a página mostrar o aviso
      throw err
    }
  }, [])

  return {
    settings,
    isLoading,
    error,
    fetchSettings,
    updateSettings,
  }
}

export default useSettings