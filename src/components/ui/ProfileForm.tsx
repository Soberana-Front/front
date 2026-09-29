// Importa hooks do react-hook-form e resolver do Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Importa componente de UI já existente
import { Input } from './Input'
// Importa schema e tipo do formulário
import { profileSchema, type ProfileFormData } from '../../validations/profileSchema'

// Props do ProfileForm
export interface ProfileFormProps {
  formId?: string                               // id do <form>, usado pelo botão "Salvar" que fica fora dele
  defaultValues: ProfileFormData                // dados atuais do perfil
  isEditing: boolean                            // false = campos travados (só leitura)
  onSubmit: (data: ProfileFormData) => void     // chamado com os dados já validados
}

/**
 * Formulário com os dados pessoais do usuário.
 *
 * Segue o mesmo padrão do ClinicForm: não tem botões próprios.
 * Os botões "Editar Dados", "Cancelar" e "Salvar" ficam na ProfilePage,
 * e o "Salvar" dispara este formulário de fora usando `form={formId}`.
 *
 * Quando isEditing é false, todos os campos ficam desabilitados — é assim
 * que o botão "Editar Dados" "habilita a edição": ele só troca esse booleano.
 *
 * Sobre o `defaultValue` repetido em cada Input:
 * o Input.tsx guarda o valor num estado interno (internalValue) que só é
 * inicializado a partir de `defaultValue` ou `value`. O `register` do
 * react-hook-form não passa nenhum dos dois, então sem esse defaultValue
 * explícito o estado interno do Input começaria vazio e poderia apagar o
 * texto do campo na próxima renderização (ex: ao trocar isEditing).
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

  // Campos travados fora do modo edição
  const isDisabled = !isEditing

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="profile-form">
      {/* Nome */}
      <Input
        label="Nome"
        placeholder="Seu nome completo"
        defaultValue={defaultValues.name}
        disabled={isDisabled}
        error={errors.name?.message}
        required
        {...register('name')}
      />

      {/* Email */}
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
        <Input
          label="Telefone"
          mask="phone"
          placeholder="(00) 00000-0000"
          defaultValue={defaultValues.phone}
          disabled={isDisabled}
          error={errors.phone?.message}
          required
          {...register('phone')}
        />
        <Input
          label="Especialidade"
          placeholder="Ex: Ortodontia"
          defaultValue={defaultValues.specialty}
          disabled={isDisabled}
          error={errors.specialty?.message}
          required
          {...register('specialty')}
        />
      </div>
    </form>
  )
}

ProfileForm.displayName = 'ProfileForm'