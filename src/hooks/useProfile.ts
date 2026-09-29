// Importa hooks do React
import { useState, useEffect, useCallback, useRef } from 'react'
// Importa os tipos do perfil
import type { UserProfile, UpdateProfileData } from '../types/profile'

// ============================================================
// DADOS MOCKADOS
// ============================================================

// Usados enquanto a API de perfil não existe.
// Permitem montar e testar a tela sem depender do backend.
const MOCK_PROFILE: UserProfile = {
  id: '1',
  name: 'Ana Souza',
  email: 'ana.souza@soberana.com',
  phone: '(32) 99999-1234',
  specialty: 'Ortodontia',
  avatarUrl: null,
}

// Simula o tempo de resposta da rede (mesmo valor usado no useClinics)
const MOCK_DELAY_MS = 300
const simulateNetwork = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

// ============================================================
// HOOK
// ============================================================

/**
 * Hook responsável pelo estado e pelas operações do Perfil.
 *
 * Mesmo formato do useClinics/useProcedures: loading/error/data no estado
 * e async/await + try/catch em toda operação que mexe com o "servidor"
 * (aqui, ainda mockado). Os comentários marcam onde trocar o mock pela
 * chamada real quando existir um profileService.
 */
export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Guarda a URL temporária (blob:) da foto escolhida, para liberar a memória
  // quando outra foto for escolhida ou a página for fechada.
  // Fica num ref (e não dentro do setProfile) para não ter efeito colateral
  // dentro do updater — o StrictMode executa updaters duas vezes em dev.
  const avatarBlobUrlRef = useRef<string | null>(null)

  // Busca o perfil do usuário logado (hoje mockado)
  const fetchProfile = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // --- Quando a API estiver pronta, substituir o bloco abaixo por: ---
      // const data = await profileService.getProfile()
      // setProfile(data)

      await simulateNetwork()
      setProfile(MOCK_PROFILE)
    } catch (err) {
      setError('Erro ao carregar o perfil. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Carrega o perfil ao montar a página
  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  // Atualiza os dados pessoais (hoje mockado)
  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    setError(null)
    try {
      // Quando a API estiver pronta:
      // const updated = await profileService.updateProfile(data)
      // setProfile(updated)

      await simulateNetwork()
      setProfile((prev) => (prev ? { ...prev, ...data } : prev))
    } catch (err) {
      setError('Erro ao atualizar o perfil. Tente novamente.')
      // Repassa o erro para a página decidir o que fazer (ex: manter o modo edição)
      throw err
    }
  }, [])

  // Atualiza a foto de perfil (hoje mockado)
  const updateAvatar = useCallback(async (file: File) => {
    setError(null)
    try {
      // Quando a API estiver pronta, o upload real será algo como:
      // const { avatarUrl } = await profileService.uploadAvatar(file)
      // setProfile((prev) => (prev ? { ...prev, avatarUrl } : prev))

      await simulateNetwork()

      // Mock: cria uma URL temporária só para exibir a imagem escolhida
      const previewUrl = URL.createObjectURL(file)
      if (avatarBlobUrlRef.current) URL.revokeObjectURL(avatarBlobUrlRef.current)
      avatarBlobUrlRef.current = previewUrl

      setProfile((prev) => (prev ? { ...prev, avatarUrl: previewUrl } : prev))
    } catch (err) {
      setError('Erro ao atualizar a foto. Tente novamente.')
      throw err
    }
  }, [])

  // Libera a URL temporária da foto quando a página é desmontada
  useEffect(() => {
    return () => {
      if (avatarBlobUrlRef.current) URL.revokeObjectURL(avatarBlobUrlRef.current)
    }
  }, [])

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    updateAvatar,
  }
}

export default useProfile