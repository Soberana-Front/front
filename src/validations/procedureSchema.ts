// Importa o Zod para validação de schema
import { z } from 'zod'

// Lista de categorias de procedimento para o select de Categoria
export const PROCEDURE_CATEGORIES = [
  'Cirurgia',
  'Estética',
  'Diagnóstico',
  'Ortodontia',
  'Prevenção',
] as const

// Tipo literal derivado da lista acima, reaproveitado pelo procedureService.ts
// (mesma estratégia usada em BrazilianState/ClinicType, pra manter os dois
// lados com o mesmo tipo e sem precisar de "as any" na integração)
export type ProcedureCategory = (typeof PROCEDURE_CATEGORIES)[number]

// Schema de validação do formulário de procedimento (Issue #53)
// Usa a API do Zod v4 (parâmetro "error" unificado) — o projeto tem
// zod@4.4.3 instalado, e a API antiga (errorMap/invalid_type_error) não existe mais nela
export const procedureSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  category: z.enum(PROCEDURE_CATEGORIES, {
    error: 'Selecione uma categoria',
  }),
  // Tempo é number puro (input type="number"), em minutos, obrigatório
  time: z
    .number({ error: 'Informe o tempo do procedimento' })
    .min(1, 'O tempo deve ser de pelo menos 1 minuto'),
  // Descrição é opcional (Critério de Aceite não exige preenchimento)
  description: z.string().max(500, 'A descrição deve ter no máximo 500 caracteres').optional(),
})

// Tipo dos dados que o formulário manipula e envia
export type ProcedureFormData = z.infer<typeof procedureSchema>