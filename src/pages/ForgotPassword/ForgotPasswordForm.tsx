// Importa hooks e utilitários de formulário
import { useForm } from 'react-hook-form';
// Importa resolvedor Zod para validação
import { zodResolver } from '@hookform/resolvers/zod';
// Importa schema e tipo do formulário
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../validations/authSchemas';
// Importa componentes da UI
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

// Props do formulário de recuperação de senha
interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
}

// Componente de formulário para recuperar senha
export const ForgotPasswordForm = ({
  onSubmit,
  isLoading,
  error,
  success,
}: ForgotPasswordFormProps) => {
  // Configura o formulário com validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Tela de sucesso após envio do e-mail
  if (success) {
    return (
      <div className="success-container">
        <div className="success-box">
          <p className="success-title">E-mail enviado!</p>
          <p className="success-subtext">
            Enviamos um link de recuperação para o seu e-mail. Verifique sua caixa de entrada.
          </p>
        </div>
        <a href="/login" className="link">
          Voltar para o login
        </a>
      </div>
    );
  }

  return (
    // Formulário com submissão via react-hook-form
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      {/* Instrução para o usuário */}
      <p className="form-instruction">
        Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
      </p>

      {/* Campo de e-mail */}
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      {/* Mensagem de erro geral */}
      {error && (
        <div className="auth-error">{error}</div>
      )}

      {/* Botão de envio com estado de loading */}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Enviar link de recuperação
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