// Importa o Zod para validação de schema
import { z } from 'zod'

// Lista de UFs para o select de Estado
export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

// Lista de tipos de clínica para o select de Tipo
export const CLINIC_TYPES = [
  'Odontologia',
  'Clínico Geral',
  'Multiespecialidade',
  'Ortodontia',
  'Estética',
] as const

/**
 * Converte o valor formatado pelo Input (mask="currency", ex: "R$ 3.500,00")
 * de volta para número (ex: 3500). O Input.tsx não expõe essa conversão,
 * então ela fica aqui, próxima da validação que também precisa dela.
 */
const parseCurrencyToNumber = (value: string): number => {
  const digitsOnly = value.replace(/\D/g, '')
  if (!digitsOnly) return 0
  return parseFloat(digitsOnly) / 100
}

// Schema de validação do formulário de clínica (Issue #46)
export const clinicSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  city: z.string().min(2, 'A cidade deve ter pelo menos 2 caracteres'),
  state: z.enum(BRAZILIAN_STATES, {
    error: 'Selecione um estado',
  }),
  address: z.string().min(3, 'O endereço deve ter pelo menos 3 caracteres'),
  type: z.enum(CLINIC_TYPES, {
    error: 'Selecione um tipo de clínica',
  }),
  // Comissão é number puro (input type="number"), validado como percentual
  commission: z
    .number({ error: 'Informe a comissão' })
    .min(0, 'A comissão não pode ser negativa')
    .max(100, 'A comissão não pode ser maior que 100%'),
  // Aluguel e Custos chegam como string formatada (mask="currency") e são convertidos aqui
  rent: z
    .string()
    .min(1, 'Informe o valor do aluguel')
    .transform(parseCurrencyToNumber)
    .refine((value) => value >= 0, 'O aluguel não pode ser negativo'),
  costs: z
    .string()
    .min(1, 'Informe o valor dos custos')
    .transform(parseCurrencyToNumber)
    .refine((value) => value >= 0, 'Os custos não podem ser negativos'),
})

// Tipo dos dados ANTES da transformação (o que o formulário realmente manipula)
export type ClinicFormInput = z.input<typeof clinicSchema>

// Tipo dos dados DEPOIS da transformação (o que sai pronto pro clinicService)
export type ClinicFormOutput = z.output<typeof clinicSchema>