// Importa o Zod para validação de schema
import { z } from 'zod'

// Tamanho mínimo da nova senha (Issue #92).
// Fica numa constante porque é usado na regra e na mensagem de erro.
export const NEW_PASSWORD_MIN_LENGTH = 8

/**
 * Schema de validação do formulário de Alterar Senha (Issue #92).
 *
 * Mesmo formato do resetPasswordSchema (authSchemas.ts): campos no z.object
 * e as regras que comparam DOIS campos no .refine(), com `path` apontando
 * em qual campo a mensagem de erro deve aparecer.
 *
 * Arquivo separado (e não dentro do authSchemas.ts) para não mexer em
 * código de outra issue — se o grupo preferir, dá para mover depois.
 */
export const changePasswordSchema = z
  .object({
    // Senha atual: só precisa estar preenchida.
    // Se está CORRETA, quem decide é o "servidor" (hoje, o mock do hook).
    currentPassword: z.string().min(1, 'Informe sua senha atual'),

    // Nova senha: mínimo de 8 caracteres
    newPassword: z
      .string()
      .min(
        NEW_PASSWORD_MIN_LENGTH,
        `A nova senha deve ter pelo menos ${NEW_PASSWORD_MIN_LENGTH} caracteres`
      ),

    // Confirmação: só precisa estar preenchida aqui;
    // a igualdade com a nova senha é conferida no primeiro refine abaixo
    confirmPassword: z.string().min(1, 'Confirme a nova senha'),
  })
  // Regra 1 (pedida na issue): nova senha e confirmação precisam ser iguais.
  // O erro aparece embaixo do campo "Confirmar nova senha".
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  // Regra 2 (extra, não pedida na issue): a nova senha não pode ser igual à atual.
  // Pode ser removida se o grupo não quiser essa regra.
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'],
  })

// Tipo gerado a partir do schema — é o formato que o formulário devolve
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>