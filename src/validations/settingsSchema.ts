//Lista de moedas, limites e regras de validação
// Importa o Zod para validação de schema
import { z } from 'zod'

// ===========================
// LISTAS DE OPÇÕES
// ===========================

/**
 * Moedas disponíveis no select (Issue #93).
 *
 * `value` é o código que vai para a API (o cadastro já envia 'BRL'),
 * `label` é o texto que o usuário vê.
 * Mesmo padrão das listas do clinicSchema.ts (lista junto da validação).
 */
export const CURRENCY_OPTIONS = [
  { value: 'BRL', label: 'Real (R$)' },
  { value: 'USD', label: 'Dólar (US$)' },
  { value: 'EUR', label: 'Euro (€)' },
] as const

// Só os códigos ('BRL', 'USD', 'EUR'), usados na validação
const CURRENCY_CODES: readonly string[] = CURRENCY_OPTIONS.map((option) => option.value)

// ===========================
// LIMITES
// ===========================

// Limites dos campos numéricos. Ficam em constantes porque aparecem
// na regra, na mensagem de erro e nos atributos min/max dos inputs.
export const PERCENT_MIN = 0
export const PERCENT_MAX = 100
export const SERVICE_TIME_MIN = 1      // minutos
export const SERVICE_TIME_MAX = 480    // minutos (8 horas)

// ===========================
// SCHEMA
// ===========================

/**
 * Cria a regra de um campo percentual (0 a 100).
 * As três porcentagens da tela têm a mesma regra; só muda o nome no texto.
 *
 * `z.number({ error })`: com `valueAsNumber` no register, campo vazio
 * chega como NaN, e o Zod responde com a mensagem "Informe ...".
 * (Mesmo formato do campo `commission` no clinicSchema.ts.)
 */
const percentField = (fieldName: string) =>
  z
    .number({ error: `Informe ${fieldName}` })
    .min(PERCENT_MIN, `O valor não pode ser negativo`)
    .max(PERCENT_MAX, `O valor não pode ser maior que ${PERCENT_MAX}%`)

/**
 * Schema de validação da página de Configurações (Issue #93).
 * Os nomes dos campos são os mesmos do UserSettings (settingsService.ts),
 * assim os dados do formulário vão direto para o updateSettings.
 */
export const settingsSchema = z.object({
  // Moeda: precisa ser um dos códigos da lista.
  // z.string() + refine (e não z.enum) para o tipo continuar "string",
  // igual ao UserSettings — mesmo motivo do campo specialty no profileSchema.
  currency: z
    .string()
    .refine((value) => CURRENCY_CODES.includes(value), 'Selecione uma moeda'),

  // Porcentagens (0 a 100)
  profitMargin: percentField('a margem de lucro'),
  taxRate: percentField('a alíquota de impostos'),
  cardFee: percentField('a taxa de cartão'),

  // Tempo médio de atendimento: minutos inteiros, de 1 a 480
  averageServiceTime: z
    .number({ error: 'Informe o tempo médio de atendimento' })
    .int('Use apenas minutos inteiros')
    .min(SERVICE_TIME_MIN, `O tempo deve ser de pelo menos ${SERVICE_TIME_MIN} minuto`)
    .max(SERVICE_TIME_MAX, `O tempo não pode passar de ${SERVICE_TIME_MAX} minutos`),
})

// Tipo gerado a partir do schema — é o formato que o formulário devolve
export type SettingsFormData = z.infer<typeof settingsSchema>