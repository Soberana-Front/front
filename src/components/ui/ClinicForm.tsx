// Importa hooks do react-hook-form e resolver do Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Importa componentes de UI já existentes
import { Input } from './Input'
import { Select } from './Select'
// Importa schema, tipos e listas de opções
import {
  clinicSchema,
  BRAZILIAN_STATES,
  CLINIC_TYPES,
  type ClinicFormInput,
  type ClinicFormOutput,
} from '../../validations/clinicSchema'

// Props do ClinicForm
export interface ClinicFormProps {
  formId?: string                              // id do <form>, usado pelo botão de submit no ModalFooter (Issue #47)
  defaultValues?: Partial<ClinicFormInput>       // valores iniciais (modo edição)
  onSubmit: (data: ClinicFormOutput) => void     // chamado com os dados já validados e convertidos
}

// Opções de Estado geradas a partir da lista de UFs
const stateOptions = BRAZILIAN_STATES.map((uf) => ({ value: uf, label: uf }))

// Opções de Tipo geradas a partir da lista de tipos de clínica
const typeOptions = CLINIC_TYPES.map((type) => ({ value: type, label: type }))

/**
 * Formulário com os campos de uma clínica (Issue #46).
 *
 * Não tem botões próprios de "Salvar"/"Cancelar" — quem exibe os botões
 * é o ClinicModal (Issue #47), usando o atributo `form={formId}` no botão
 * de submit para disparar este formulário de fora dele. Isso deixa o
 * mesmo ClinicForm reutilizável tanto pra criar quanto pra editar.
 */
export const ClinicForm = ({
  formId = 'clinic-form',
  defaultValues,
  onSubmit,
}: ClinicFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClinicFormInput, unknown, ClinicFormOutput>({
    resolver: zodResolver(clinicSchema),
    defaultValues,
  })

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="clinic-form">
      {/* Nome */}
      <Input
        label="Nome"
        placeholder="Nome da clínica"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      {/* Cidade e Estado lado a lado */}
      <div className="clinic-form-row">
        <Input
          label="Cidade"
          placeholder="Cidade"
          error={errors.city?.message}
          required
          {...register('city')}
        />
        <Select
          label="Estado"
          placeholder="UF"
          options={stateOptions}
          error={errors.state?.message}
          required
          {...register('state')}
        />
      </div>

      {/* Endereço */}
      <Input
        label="Endereço"
        placeholder="Rua, número, bairro"
        error={errors.address?.message}
        required
        {...register('address')}
      />

      {/* Tipo */}
      <Select
        label="Tipo"
        placeholder="Selecione o tipo"
        options={typeOptions}
        error={errors.type?.message}
        required
        {...register('type')}
      />

      {/* Comissão, Aluguel e Custos lado a lado */}
      <div className="clinic-form-row clinic-form-row-three">
        <Input
          label="Comissão"
          type="number"
          placeholder="0"
          rightIcon={<span className="clinic-form-suffix">%</span>}
          error={errors.commission?.message}
          required
          {...register('commission', { valueAsNumber: true })}
        />
        <Input
          label="Aluguel"
          mask="currency"
          placeholder="R$ 0,00"
          error={errors.rent?.message}
          required
          {...register('rent')}
        />
        <Input
          label="Custos"
          mask="currency"
          placeholder="R$ 0,00"
          error={errors.costs?.message}
          required
          {...register('costs')}
        />
      </div>
    </form>
  )
}

ClinicForm.displayName = 'ClinicForm'