// Importa o tipo User do authService: é o usuário logado (id, name, email)
import type { User } from '../services/authService'

// ============================================================
// TIPOS DO PERFIL DO USUÁRIO
// ============================================================

/**
 * Perfil completo do usuário logado.
 *
 * Issue #94: o hook useProfile guarda o estado `user: User | null`.
 * Por isso o UserProfile agora ESTENDE o User do authService: ele é um
 * User (id, name, email) com os campos extras que só a tela de Perfil usa.
 * Assim existe uma fonte só para id/name/email, e um UserProfile pode ser
 * usado em qualquer lugar que espera um User.
 */
export interface UserProfile extends User {
  phone: string              // já formatado, ex: "(32) 99999-1234"
  specialty: string          // ex: "Ortodontia" ('' = não informada)
  avatarUrl: string | null   // null = sem foto (mostra as iniciais)
}

// Campos que o usuário pode editar pelo formulário de Perfil
// (id e avatarUrl ficam de fora: id vem do backend e a foto tem fluxo próprio)
export type UpdateProfileData = Pick<UserProfile, 'name' | 'email' | 'phone' | 'specialty'>

/**
 * Dados enviados para alterar a senha.
 * Veio do antigo useChangePassword.ts (Issue #92), que deixa de existir:
 * a alteração de senha agora faz parte do useProfile (Issue #94).
 * A confirmação NÃO entra aqui: ela só serve para o formulário conferir
 * a digitação e não vai para o "servidor".
 */
export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

// ============================================================
// TIPOS DO PERFIL DO USUÁRIO
// ============================================================

/**
 * Perfil do usuário logado.
 *
 * Fica em types/ (mesmo padrão de types/pricing.ts) porque ainda não
 * existe um profileService — quando ele for criado, o service importa
 * daqui em vez de redefinir o formato.
 
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
export type UpdateProfileData = Pick<UserProfile, 'name' | 'email' | 'phone' | 'specialty'>*/