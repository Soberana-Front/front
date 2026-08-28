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
      <div className="text-center space-y-4">
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
          <p className="font-medium">Senha redefinida com sucesso!</p>
          <p className="text-sm mt-1">
            Sua senha foi alterada. Agora você pode fazer login com sua nova senha.
          </p>
        </div>
        <a href="/login" className="text-sm text-indigo-600 hover:underline font-medium">
          Ir para o login
        </a>
      </div>
    );
  }

  return (
    // Formulário com submissão via react-hook-form
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Instrução para o usuário */}
      <p className="text-sm text-gray-600 -mt-2">
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
        <div className="text-sm text-red-500 text-center">{error}</div>
      )}

      {/* Botão de submit com estado de loading */}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Redefinir senha
      </Button>

      {/* Link para voltar ao login */}
      <div className="text-center text-sm text-gray-600">
        Lembrou sua senha?{' '}
        <a href="/login" className="text-indigo-600 hover:underline font-medium">
          Faça login
        </a>
      </div>
    </form>
  );
};