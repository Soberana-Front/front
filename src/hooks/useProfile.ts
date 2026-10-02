// Importa hooks do React
import { useState, useEffect, useCallback, useRef } from 'react'
// Importa os tipos do perfil
import type { UserProfile, UpdateProfileData, ChangePasswordPayload } from '../types/profile'

// ============================================================
// DADOS MOCKADOS
// ============================================================

// Perfil usado enquanto a API não existe
const MOCK_USER: UserProfile = {
  id: '1',
  name: 'Ana Souza',
  email: 'ana.souza@soberana.com',
  phone: '(32) 99999-1234',
  specialty: 'Ortodontia',
  avatarUrl: null,
}

/**
 * Senha atual "cadastrada" no mock (veio do antigo useChangePassword).
 *
 * PARA TESTAR: use 12345678 como senha atual.
 * Qualquer outra cai no erro "Senha atual incorreta".
 *
 * É `let` porque, depois de uma alteração bem-sucedida, a senha nova passa
 * a ser a "atual". Fica fora do hook para sobreviver à troca de página;
 * volta para 12345678 ao recarregar o navegador.
 */
let mockCurrentPassword = '12345678'

// Simula o tempo de resposta da rede (mesmo valor dos outros hooks)
const MOCK_DELAY_MS = 300
const simulateNetwork = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

// Mensagem de senha atual errada. Exportada porque a página de Alterar Senha
// usa para mostrar o erro embaixo do campo certo.
export const WRONG_CURRENT_PASSWORD_MESSAGE = 'Senha atual incorreta'

// ============================================================
// OPÇÕES DO HOOK
// ============================================================

interface UseProfileOptions {
  /**
   * Busca o perfil assim que o componente monta (padrão: true).
   * A página Alterar Senha passa false: ela só precisa do changePassword
   * e não deve disparar uma busca de perfil (com API real, seria uma
   * requisição à toa).
   */
  fetchOnMount?: boolean
}

// ============================================================
// HOOK
// ============================================================

/**
 * Hook que gerencia o perfil do usuário (Issue #94).
 *
 * Estado (como pedido na issue):
 * - user:      perfil do usuário logado (UserProfile, que estende User) ou null
 * - isLoading: true enquanto o PERFIL está sendo buscado
 * - error:     mensagem do último erro, ou null
 *
 * Funcionalidades (todas mockadas):
 * - fetchProfile:   busca os dados do perfil
 * - updateProfile:  atualiza os dados pessoais
 * - updateAvatar:   troca a foto (já existia, usada pelo AvatarUpload)
 * - changePassword: altera a senha
 *
 * Por que isLoading NÃO liga ao salvar:
 * a ProfilePage só mostra o formulário quando isLoading é false.
 * Se salvar também ligasse o isLoading, o formulário sumiria da tela
 * a cada "Salvar". Por isso o "salvando..." de cada ação fica na página
 * (isSubmitting / isUploadingAvatar), como já era feito.
 */
export const useProfile = ({ fetchOnMount = true }: UseProfileOptions = {}) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  // Começa true só quando vai buscar ao montar; senão a tela ficaria "carregando" para sempre
  const [isLoading, setIsLoading] = useState<boolean>(fetchOnMount)
  const [error, setError] = useState<string | null>(null)

  // URL temporária (blob:) da foto escolhida, para liberar a memória depois.
  // Fica num ref (e não dentro do setUser) para não ter efeito colateral
  // dentro do updater — o StrictMode executa updaters duas vezes em dev.
  const avatarBlobUrlRef = useRef<string | null>(null)

  // ------------------------------------------------------------
  // Buscar perfil
  // ------------------------------------------------------------
  const fetchProfile = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Quando a API estiver pronta: const data = await profileService.getProfile()
      //                              setUser(data)
      await simulateNetwork()
      setUser(MOCK_USER)
    } catch (err) {
      setError('Erro ao carregar o perfil. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Busca ao montar, se a opção estiver ligada
  useEffect(() => {
    if (fetchOnMount) fetchProfile()
  }, [fetchOnMount, fetchProfile])

  // ------------------------------------------------------------
  // Atualizar dados pessoais
  // ------------------------------------------------------------
  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    setError(null)
    try {
      // Quando a API estiver pronta: const updated = await profileService.updateProfile(data)
      //                              setUser(updated)
      await simulateNetwork()
      setUser((prev) => (prev ? { ...prev, ...data } : prev))
    } catch (err) {
      setError('Erro ao atualizar o perfil. Tente novamente.')
      // Repassa o erro para a página decidir o que fazer (ex: manter o modo edição)
      throw err
    }
  }, [])

  // ------------------------------------------------------------
  // Trocar foto
  // ------------------------------------------------------------
  const updateAvatar = useCallback(async (file: File) => {
    setError(null)
    try {
      // Quando a API estiver pronta: const { avatarUrl } = await profileService.uploadAvatar(file)
      //                              setUser((prev) => (prev ? { ...prev, avatarUrl } : prev))
      await simulateNetwork()

      // Mock: cria uma URL temporária só para exibir a imagem escolhida
      const previewUrl = URL.createObjectURL(file)
      if (avatarBlobUrlRef.current) URL.revokeObjectURL(avatarBlobUrlRef.current)
      avatarBlobUrlRef.current = previewUrl

      setUser((prev) => (prev ? { ...prev, avatarUrl: previewUrl } : prev))
    } catch (err) {
      setError('Erro ao atualizar a foto. Tente novamente.')
      throw err
    }
  }, [])

  // ------------------------------------------------------------
  // Alterar senha (veio do antigo useChangePassword)
  // ------------------------------------------------------------
  const changePassword = useCallback(async (data: ChangePasswordPayload) => {
    setError(null)
    try {
      // Quando a API estiver pronta: await authService.changePassword(data)
      //
      // ATENÇÃO para o backend: senha atual errada NÃO deve responder 401.
      // O interceptor do api.ts trata todo 401 como "sessão expirada"
      // (apaga o token e manda para o /login). Usar 400 ou 422.

      await simulateNetwork()

      // Mock: confere a senha atual
      if (data.currentPassword !== mockCurrentPassword) {
        throw new Error(WRONG_CURRENT_PASSWORD_MESSAGE)
      }

      // Mock: a nova senha passa a ser a atual
      mockCurrentPassword = data.newPassword
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao alterar a senha. Tente novamente.'
      setError(message)
      // Repassa o erro para a página mostrar no campo certo
      throw err
    }
  }, [])

  // Libera a URL temporária da foto quando o componente desmonta
  useEffect(() => {
    return () => {
      if (avatarBlobUrlRef.current) URL.revokeObjectURL(avatarBlobUrlRef.current)
    }
  }, [])

  return {
    // estado
    user,
    isLoading,
    error,
    // ações
    fetchProfile,
    updateProfile,
    updateAvatar,
    changePassword,
  }
}

export default useProfile