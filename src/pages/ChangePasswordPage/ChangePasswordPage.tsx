// Importa navegação, hooks do react-hook-form, resolver do Zod e ícones
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
// Importa layout do dashboard e componentes de UI já existentes
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
// Importa schema, hook e toast
import {
  changePasswordSchema,
  NEW_PASSWORD_MIN_LENGTH,
  type ChangePasswordFormData,
} from '../../validations/changePasswordSchema'
import { useChangePassword, WRONG_CURRENT_PASSWORD_MESSAGE } from '../../hooks/useChangePassword'
import { useToast } from '../../contexts/ToastContext'

// Para onde voltar ao cancelar ou depois de salvar
const PROFILE_PATH = '/perfil'

/**
 * Página de Alterar Senha (Issue #92).
 *
 * Campos: Senha atual, Nova senha (mín. 8) e Confirmar nova senha.
 *
 * Show/Hide password: não precisou de código novo. O Input.tsx já mostra
 * o botão de olho em todo campo type="password" (showPasswordToggle é
 * true por padrão), igual nas telas de Login e Redefinir Senha.
 *
 * Validação: feita pelo changePasswordSchema (Zod). A igualdade entre
 * "Nova senha" e "Confirmar" é conferida antes de chamar o mock;
 * se a senha atual está certa, quem responde é o mock (useChangePassword).
 *
 * O formulário fica na própria página (sem componente separado) porque só
 * é usado aqui. Se aparecer outro lugar que precise dele, dá para extrair
 * um ChangePasswordForm, como foi feito com o ResetPasswordForm.
 */
export const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { changePassword, isSubmitting } = useChangePassword()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  // Botão "Salvar": só é chamado se o Zod aprovou todos os campos
  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      // Envia só senha atual e nova (a confirmação não vai para o servidor)
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })

      showToast('Senha alterada com sucesso!', 'success')
      // Volta para o Perfil; o toast continua visível porque o
      // ToastContainer fica no main.tsx, fora das páginas
      navigate(PROFILE_PATH)
    } catch (err) {
      // Senha atual errada: mostra o erro embaixo do próprio campo,
      // que é onde o usuário precisa corrigir
      if (err instanceof Error && err.message === WRONG_CURRENT_PASSWORD_MESSAGE) {
        setError('currentPassword', { message: WRONG_CURRENT_PASSWORD_MESSAGE })
        return
      }
      // Qualquer outro erro: aviso geral
      showToast('Não foi possível alterar a senha. Tente novamente.', 'error')
    }
  }

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Voltar para o Perfil (mesmo estilo do "Voltar" do Detalhe do Histórico) */}
        <button
          type="button"
          className="history-detail-back-button"
          onClick={() => navigate(PROFILE_PATH)}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o perfil
        </button>

        {/* Cabeçalho da página */}
        <div>
          <h1 className="dashboard-header-title">Alterar Senha</h1>
          <p className="dashboard-header-subtitle">
            Para sua segurança, informe a senha atual antes de definir a nova
          </p>
        </div>

        {/* Card com o formulário */}
        <div className="change-password-card">
          {/* noValidate: desliga os balões nativos do navegador,
              para aparecerem só as mensagens do Zod */}
          <form onSubmit={handleSubmit(onSubmit)} className="change-password-form" noValidate>
            {/* Senha atual.
                autoComplete="current-password" avisa o navegador/gerenciador
                de senhas que aqui vai a senha já salva */}
            <Input
              label="Senha atual"
              type="password"
              placeholder="Digite sua senha atual"
              autoComplete="current-password"
              error={errors.currentPassword?.message}
              required
              {...register('currentPassword')}
            />

            {/* Nova senha.
                autoComplete="new-password" faz o navegador oferecer uma
                senha forte em vez de preencher a antiga */}
            <Input
              label="Nova senha"
              type="password"
              placeholder={`Mínimo de ${NEW_PASSWORD_MIN_LENGTH} caracteres`}
              autoComplete="new-password"
              error={errors.newPassword?.message}
              required
              {...register('newPassword')}
            />

            {/* Confirmar nova senha */}
            <Input
              label="Confirmar nova senha"
              type="password"
              placeholder="Repita a nova senha"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              required
              {...register('confirmPassword')}
            />

            {/* Botões: Cancelar volta sem salvar; Salvar envia o formulário */}
            <div className="change-password-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(PROFILE_PATH)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ChangePasswordPage