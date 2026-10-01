// Importa hooks do React
import { useState, useCallback } from 'react'

// ============================================================
// TIPOS
// ============================================================

// Dados enviados para alterar a senha.
// A confirmação NÃO vai para o "servidor": ela só existe para o
// formulário conferir que o usuário digitou a nova senha certo.
export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

// ============================================================
// DADOS MOCKADOS
// ============================================================

/**
 * Senha atual "cadastrada" no mock.
 *
 * PARA TESTAR: use 12345678 como senha atual.
 * Qualquer outra senha atual cai no erro "Senha atual incorreta",
 * simulando o que o backend vai responder de verdade.
 *
 * É `let` (e não `const`) porque, depois de uma alteração bem-sucedida,
 * a senha nova passa a ser a "atual" — igual aconteceria no servidor.
 * Como fica fora do hook, o valor sobrevive enquanto a aba estiver aberta
 * e volta para 12345678 ao recarregar a página.
 */
let mockCurrentPassword = '12345678'

// Simula o tempo de resposta da rede (mesmo valor dos outros hooks)
const MOCK_DELAY_MS = 300
const simulateNetwork = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

// Mensagem usada quando a senha atual não confere
export const WRONG_CURRENT_PASSWORD_MESSAGE = 'Senha atual incorreta'

// ============================================================
// HOOK
// ============================================================

/**
 * Hook responsável pela alteração de senha (Issue #92).
 *
 * Mesmo formato dos outros hooks do projeto (useClinics, useProfile):
 * estado de carregamento + erro, e async/await com try/catch.
 * Hoje a alteração é mockada; o comentário marca onde entra a API real.
 */
export const useChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const changePassword = useCallback(async (data: ChangePasswordPayload) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // --- Quando a API estiver pronta, substituir o bloco abaixo por algo como: ---
      // await authService.changePassword(data)
      //
      // ATENÇÃO para o backend: senha atual errada NÃO deve responder 401.
      // O interceptor do api.ts trata TODO 401 como "sessão expirada":
      // apaga o token e manda o usuário para o /login. Para senha errada,
      // o ideal é 400 ou 422 com uma mensagem.

      await simulateNetwork()

      // Mock: confere a senha atual
      if (data.currentPassword !== mockCurrentPassword) {
        throw new Error(WRONG_CURRENT_PASSWORD_MESSAGE)
      }

      // Mock: a nova senha passa a ser a atual
      mockCurrentPassword = data.newPassword
    } catch (err) {
      // Guarda a mensagem para quem quiser exibir e repassa o erro
      // para a página decidir onde mostrar (ex: embaixo do campo)
      const message =
        err instanceof Error ? err.message : 'Erro ao alterar a senha. Tente novamente.'
      setError(message)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return {
    changePassword,
    isSubmitting,
    error,
  }
}

export default useChangePassword