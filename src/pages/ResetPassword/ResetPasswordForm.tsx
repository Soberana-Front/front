// Importa hooks e utilitários do react-hook-form
import { useForm } from 'react-hook-form';
// Importa resolvedor Zod
import { zodResolver } from '@hookform/resolvers/zod';
// Importa schema e tipo do formulário
import { resetPasswordSchema, ResetPasswordFormData } from '../../validations/authSchemas';
// Importa componentes da UI
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

// Props do formulário de redefinição de senha
interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
}

// Componente de formulário para redefinir senha (após token válido)
export const ResetPasswordForm = ({
  onSubmit,
  isLoading,
  error,
  success,
}: ResetPasswordFormProps) => {
  // Configura formulário com validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  // Tela de sucesso após redefinição
  if (success) {
    return (
      <div className="success-container">
        <div className="success-box">
          <p className="success-title">Senha redefinida com sucesso!</p>
          <p className="success-subtext">
            Sua senha foi alterada. Agora você pode fazer login com sua nova senha.
          </p>
        </div>
        <a href="/login" className="link">
          Ir para o login
        </a>
      </div>
    );
  }

  return (
    // Formulário com submissão via react-hook-form
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      {/* Instrução para o usuário */}
      <p className="form-instruction">
        Digite sua nova senha abaixo.
      </p>

      {/* Campo da nova senha com toggle */}
      <Input
        label="Nova senha"
        type="password"
        placeholder="******"
        showPasswordToggle
        error={errors.password?.message}
        required
        {...register('password')}
      />

      {/* Campo de confirmação da senha com toggle */}
      <Input
        label="Confirmar nova senha"
        type="password"
        placeholder="******"
        showPasswordToggle
        error={errors.passwordConfirmation?.message}
        required
        {...register('passwordConfirmation')}
      />

      {/* Mensagem de erro geral */}
      {error && (
        <div className="auth-error">{error}</div>
      )}

      {/* Botão de submit com estado de loading */}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Redefinir senha
      </Button>

      {/* Link para voltar ao login */}
      <div className="auth-footer">
        Lembrou sua senha?{' '}
        <a href="/login" className="link">
          Faça login
        </a>
      </div>
    </form>
  );
};