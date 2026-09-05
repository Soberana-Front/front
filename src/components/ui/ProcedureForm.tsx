// Importa hooks do react-hook-form e resolver do Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Importa componentes de UI já existentes (Input, Select) e o novo Textarea
import { Input } from './Input'
import { Select } from './Select'
import { Textarea } from './Textarea'
// Importa schema, tipo e lista de categorias
import {
  procedureSchema,
  PROCEDURE_CATEGORIES,
  type ProcedureFormData,
} from '../../validations/procedureSchema'

// Props do ProcedureForm
export interface ProcedureFormProps {
  formId?: string                                  // id do <form>, usado pelo botão de submit no ModalFooter (Issue #54)
  defaultValues?: Partial<ProcedureFormData>         // valores iniciais (modo edição)
  onSubmit: (data: ProcedureFormData) => void        // chamado com os dados já validados
}

// Opções de Categoria geradas a partir da lista de categorias
const categoryOptions = PROCEDURE_CATEGORIES.map((category) => ({
  value: category,
  label: category,
}))

/**
 * Formulário com os campos de um procedimento (Issue #53).
 *
 * Segue o mesmo padrão do ClinicForm (Issue #46): não tem botões próprios,
 * expõe um formId para o ProcedureModal (Issue #54) disparar o submit
 * de fora do <form>, via atributo form={formId} no botão.
 */
export const ProcedureForm = ({
  formId = 'procedure-form',
  defaultValues,
  onSubmit,
}: ProcedureFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProcedureFormData>({
    resolver: zodResolver(procedureSchema),
    defaultValues,
  })

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="clinic-form">
      {/* Nome */}
      <Input
        label="Nome"
        placeholder="Nome do procedimento"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      {/* Categoria e Tempo lado a lado */}
      <div className="clinic-form-row">
        <Select
          label="Categoria"
          placeholder="Selecione a categoria"
          options={categoryOptions}
          error={errors.category?.message}
          required
          {...register('category')}
        />
        <Input
          label="Tempo"
          type="number"
          placeholder="0"
          rightIcon={<span className="clinic-form-suffix">min</span>}
          error={errors.time?.message}
          required
          {...register('time', { valueAsNumber: true })}
        />
      </div>

      {/* Descrição (opcional) */}
      <Textarea
        label="Descrição"
        placeholder="Descreva o procedimento (opcional)"
        optional
        error={errors.description?.message}
        {...register('description')}
      />
    </form>
  )
}

ProcedureForm.displayName = 'ProcedureForm'