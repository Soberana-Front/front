// Importa o Zod para validação de schema
import { z } from 'zod'

// ===========================
// LISTAS DE OPÇÕES
// ===========================

/**
 * Especialidades disponíveis no select do ProfileForm (Issue #91).
 *
 * Mesmo padrão do CLINIC_TYPES no clinicSchema.ts: a lista fica junto da
 * validação, porque o schema usa a lista para saber o que é um valor válido.
 * "as const" transforma o array em uma lista fixa (somente leitura),
 * o que permite ao TypeScript conhecer cada valor exato.
 *
 * ATENÇÃO: lista provisória, montada com especialidades odontológicas
 * (o projeto usa clínicas de Odontologia nos mocks). Confirmar com o grupo.
 */
export const SPECIALTIES = [
  'Clínico Geral',
  'Ortodontia',
  'Implantodontia',
  'Endodontia',
  'Periodontia',
  'Prótese Dentária',
  'Odontopediatria',
  'Dentística',
  'Cirurgia Bucomaxilofacial',
  'Harmonização Orofacial',
] as const

// ===========================
// SCHEMA
// ===========================

/**
 * Schema de validação do formulário de perfil.
 *
 * Obrigatoriedade conforme a Issue #91:
 * - Nome e E-mail: obrigatórios;
 * - Telefone e Especialidade: opcionais (a issue não marca como obrigatórios
 *   e o cadastro aceita estudantes, que ainda não têm especialidade).
 *
 * As mensagens de e-mail e telefone são as mesmas do cadastro (authSchemas.ts),
 * para que um dado aceito no cadastro também seja aceito na edição.
 */
export const profileSchema = z.object({
  // Nome: obrigatório; trim() ignora espaços no começo/fim antes de contar
  name: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres'),

  // E-mail: obrigatório e em formato válido
  email: z.string().email('E-mail inválido'),

  // Telefone: opcional. Vazio é aceito; se preenchido, precisa estar completo.
  // O Input (mask="phone") entrega o valor já formatado, por isso o mínimo de
  // 14 caracteres: "(32) 9999-9999".
  phone: z
    .string()
    .refine((value) => value === '' || value.length >= 14, 'Telefone inválido'),

  // Especialidade: opcional. Vazio ('' = "Não informada") ou um item da lista.
  // Fica como z.string() + refine (e não z.enum) para o tipo continuar sendo
  // "string", igual ao UserProfile — assim nenhum outro arquivo precisa mudar.
  specialty: z
    .string()
    .refine(
      (value) => value === '' || (SPECIALTIES as readonly string[]).includes(value),
      'Selecione uma especialidade da lista'
    ),
})

// Tipo gerado a partir do schema — é o formato que o ProfileForm devolve
export type ProfileFormData = z.infer<typeof profileSchema>