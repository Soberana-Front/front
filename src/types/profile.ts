// ============================================================
// TIPOS DO PERFIL DO USUÁRIO
// ============================================================

/**
 * Perfil do usuário logado.
 *
 * Fica em types/ (mesmo padrão de types/pricing.ts) porque ainda não
 * existe um profileService — quando ele for criado, o service importa
 * daqui em vez de redefinir o formato.
 */
export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string              // já formatado, ex: "(32) 99999-1234"
  specialty: string          // ex: "Ortodontia"
  avatarUrl: string | null   // null = sem foto (mostra as iniciais)
}

// Campos que o usuário pode editar pelo formulário
// (id e avatarUrl ficam de fora: id vem do backend e a foto tem fluxo próprio)
export type UpdateProfileData = Pick<UserProfile, 'name' | 'email' | 'phone' | 'specialty'>