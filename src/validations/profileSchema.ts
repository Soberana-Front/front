// Importa o Zod para validação de schema
import { z } from 'zod'

/**
 * Schema de validação do formulário de perfil.
 *
 * As regras de e-mail e telefone são as mesmas do cadastro (authSchemas.ts),
 * para que um dado aceito no cadastro também seja aceito na edição.
 * O telefone chega já com máscara do Input (mask="phone"), por isso o
 * mínimo de 14 caracteres: "(32) 9999-9999".
 */
export const profileSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  specialty: z.string().trim().min(2, 'Informe sua especialidade'),
})

// Tipo gerado a partir do schema — é o formato que o ProfileForm devolve
export type ProfileFormData = z.infer<typeof profileSchema>