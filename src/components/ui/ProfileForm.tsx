// Importa hooks do react-hook-form e resolver do Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Importa componentes de UI já existentes
import { Input } from './Input'
import { Select } from './Select'
// Importa schema, tipo do formulário e lista de especialidades
import {
  profileSchema,
  SPECIALTIES,
  type ProfileFormData,
} from '../../validations/profileSchema'

// ===========================
// TIPOS
// ===========================

// Props do ProfileForm
export interface ProfileFormProps {
  formId?: string                               // id do <form>, usado pelo botão "Salvar" que fica fora dele
  defaultValues: ProfileFormData                // dados atuais do perfil
  isEditing: boolean                            // false = modo visualização (campos travados)
  onSubmit: (data: ProfileFormData) => void     // chamado só com dados já validados
}

// ===========================
// OPÇÕES DO SELECT
// ===========================

// Opções de Especialidade geradas a partir da lista (mesmo padrão do ClinicForm).
// A primeira opção, de valor vazio, permite deixar o campo sem especialidade.
// Não usei a prop `placeholder` do Select porque ela cria uma opção
// DESABILITADA: depois de escolher uma especialidade, o usuário não
// conseguiria mais voltar para "nenhuma" — e o campo é opcional.
const specialtyOptions = [
  { value: '', label: 'Não informada' },
  ...SPECIALTIES.map((specialty) => ({ value: specialty, label: specialty })),
]

// ===========================
// COMPONENTE
// ===========================

/**
 * Formulário de dados pessoais (Issue #91).
 *
 * Campos: Nome (obrigatório), E-mail (obrigatório),
 *         Telefone (com máscara, opcional), Especialidade (select, opcional).
 *
 * Modo visualização x edição:
 * o formulário não guarda esse estado; ele recebe `isEditing` da página.
 * - isEditing = false -> todos os campos desabilitados (visualização);
 * - isEditing = true  -> campos liberados para edição.
 *
 * Botões: seguindo o padrão do ClinicForm, o formulário não tem botões
 * próprios. "Editar Dados", "Cancelar" e "Salvar" ficam na ProfilePage,
 * e o "Salvar" envia este formulário de fora usando `form={formId}`.
 *
 * Sobre o `defaultValue` repetido em cada Input:
 * o Input.tsx guarda o texto num estado interno (internalValue) que só é
 * inicializado por `defaultValue` ou `value`. O `register` do
 * react-hook-form não passa nenhum dos dois, então sem esse defaultValue
 * explícito os campos de texto abririam vazios. O Select não tem esse
 * problema (não guarda estado interno), por isso não precisa.
 */
export const ProfileForm = ({
  formId = 'profile-form',
  defaultValues,
  isEditing,
  onSubmit,
}: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  // Campos travados no modo visualização
  const isDisabled = !isEditing

  return (
    // noValidate desliga a validação nativa do navegador (ex: o balão do
    // type="email"), para que apareçam só as mensagens do Zod, em português
    // e no mesmo estilo dos outros campos.
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="profile-form" noValidate>
      {/* Nome — texto, obrigatório */}
      <Input
        label="Nome"
        placeholder="Seu nome completo"
        defaultValue={defaultValues.name}
        disabled={isDisabled}
        error={errors.name?.message}
        required
        {...register('name')}
      />

      {/* E-mail — tipo email, obrigatório */}
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        defaultValue={defaultValues.email}
        disabled={isDisabled}
        error={errors.email?.message}
        required
        {...register('email')}
      />

      {/* Telefone e Especialidade lado a lado */}
      <div className="profile-form-row">
        {/* Telefone — com máscara (00) 00000-0000, opcional */}
        <Input
          label="Telefone"
          mask="phone"
          placeholder="(00) 00000-0000"
          defaultValue={defaultValues.phone}
          disabled={isDisabled}
          error={errors.phone?.message}
          optional
          {...register('phone')}
        />

        {/* Especialidade — select, opcional */}
        <Select
          label="Especialidade"
          options={specialtyOptions}
          disabled={isDisabled}
          error={errors.specialty?.message}
          optional
          {...register('specialty')}
        />
      </div>
    </form>
  )
}

ProfileForm.displayName = 'ProfileForm'