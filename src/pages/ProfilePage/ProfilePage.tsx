// Importa hooks do React, link de rota e ícones
import { useState } from 'react'
import { Link } from 'react-router'
import { KeyRound, Pencil } from 'lucide-react'
// Importa layout do dashboard e componentes de UI
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout'
import { AvatarUpload } from '../../components/ui/AvatarUpload'
import { ProfileForm } from '../../components/ui/ProfileForm'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
// Importa hook do perfil, toast e tipos
import { useProfile } from '../../hooks/useProfile'
import { useToast } from '../../contexts/ToastContext'
import type { ProfileFormData } from '../../validations/profileSchema'

// id do <form> do ProfileForm — o botão "Salvar" usa esse id para enviar o formulário
const PROFILE_FORM_ID = 'profile-form'

// Rota da futura página de alteração de senha.
// ATENÇÃO: essa rota ainda não existe no router. Não dá para apontar para
// /forgot-password, porque ela está dentro do PublicRoute, que redireciona
// usuário logado para /dashboard.
const CHANGE_PASSWORD_PATH = '/perfil/alterar-senha'

/**
 * Página de Perfil do usuário.
 *
 * Junta AvatarUpload (foto), ProfileForm (dados pessoais) e useProfile
 * (estado + dados mockados). Assim como na ClinicsPage, a página é quem
 * decide o que fazer com os eventos dos componentes "burros".
 *
 * Fluxo do botão "Editar Dados":
 * - modo leitura: campos travados, só aparece "Editar Dados";
 * - modo edição:  campos liberados, aparecem "Cancelar" e "Salvar".
 */
export const ProfilePage = () => {
  const { profile, isLoading, error, updateProfile, updateAvatar } = useProfile()
  const { showToast } = useToast()

  // Controla se o formulário está em modo edição
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  // Chave do formulário: ao mudar, o React recria o ProfileForm do zero.
  // É o jeito mais seguro de "resetar" os campos aqui, porque o Input.tsx
  // guarda um estado interno que o reset() do react-hook-form não atualiza.
  const [formKey, setFormKey] = useState(0)

  // Botão "Editar Dados": só libera os campos
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Botão "Cancelar": trava os campos e descarta o que foi digitado
  const handleCancel = () => {
    setIsEditing(false)
    setFormKey((key) => key + 1)
  }

  // Botão "Salvar": envia os dados validados pelo ProfileForm
  const handleSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true)
    try {
      await updateProfile(data)
      showToast('Dados atualizados com sucesso!', 'success')
      setIsEditing(false)
      // Recria o formulário com os dados salvos
      setFormKey((key) => key + 1)
    } catch {
      // Continua em modo edição para o usuário não perder o que digitou
      showToast('Não foi possível atualizar os dados. Tente novamente.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Troca de foto: independente do modo edição (é salva na hora)
  const handleAvatarChange = async (file: File) => {
    setIsUploadingAvatar(true)
    try {
      await updateAvatar(file)
      showToast('Foto atualizada com sucesso!', 'success')
    } catch {
      showToast('Não foi possível atualizar a foto. Tente novamente.', 'error')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Cabeçalho da página com título e botões de ação */}
        <div className="profile-page-header">
          <div>
            <h1 className="dashboard-header-title">Meu Perfil</h1>
            <p className="dashboard-header-subtitle">Visualize e edite seus dados pessoais</p>
          </div>

          {/* Os botões só aparecem depois que o perfil carregou */}
          {profile && (
            <div className="profile-page-actions">
              {isEditing ? (
                <>
                  {/* As `key` diferentes impedem o React de reaproveitar o mesmo
                      <button> ao trocar de modo. Sem isso, o clique em "Editar"
                      poderia virar um submit no botão "Salvar" que aparece
                      no mesmo lugar. */}
                  <Button
                    key="cancel"
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    key="save"
                    type="submit"
                    form={PROFILE_FORM_ID}
                    isLoading={isSubmitting}
                  >
                    Salvar
                  </Button>
                </>
              ) : (
                <Button key="edit" type="button" variant="outline" onClick={handleEdit}>
                  <Pencil className="h-4 w-4" />
                  Editar Dados
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Mensagem de erro (ex: falha ao carregar o perfil) */}
        {error && <p className="profile-page-error">{error}</p>}

        {/* Carregando o perfil */}
        {isLoading && (
          <div className="profile-page-loading">
            <Spinner size="lg" />
          </div>
        )}

        {/* Conteúdo principal: foto + formulário */}
        {!isLoading && profile && (
          <div className="profile-card">
            <div className="profile-card-body">
              {/* Foto de perfil */}
              <AvatarUpload
                imageUrl={profile.avatarUrl}
                name={profile.name}
                onChange={handleAvatarChange}
                isUploading={isUploadingAvatar}
              />

              {/* Dados pessoais */}
              <div className="profile-card-form">
                <h2 className="profile-section-title">Dados pessoais</h2>
                <ProfileForm
                  key={formKey}
                  formId={PROFILE_FORM_ID}
                  defaultValues={{
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    specialty: profile.specialty,
                  }}
                  isEditing={isEditing}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>

            {/* Link para alterar senha */}
            <div className="profile-card-footer">
              <Link to={CHANGE_PASSWORD_PATH} className="profile-password-link">
                <KeyRound className="h-4 w-4" />
                Alterar Senha
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage