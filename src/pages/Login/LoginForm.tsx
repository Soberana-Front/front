// Importa hooks e utilitários do react-hook-form
import { useForm } from 'react-hook-form';
// Importa resolvedor Zod
import { zodResolver } from '@hookform/resolvers/zod';
// Importa schema e tipo do formulário de login
import { loginSchema, LoginFormData } from '../../validations/authSchemas';
// Importa componentes da UI
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
// Importa Link para navegação interna
import { Link } from 'react-router';

// Props do formulário de login
interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// Componente de formulário de login
export const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  // Configura formulário com validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    // Formulário com submissão via react-hook-form
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      {/* Campo de e-mail */}
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      {/* Campo de senha com toggle de visibilidade */}
      <Input
        label="Senha"
        type="password"
        placeholder="******"
        showPasswordToggle
        error={errors.password?.message}
        required
        {...register('password')}
      />

      {/* Mensagem de erro geral */}
      {error && (
        <div className="auth-error">{error}</div>
      )}

      {/* Botão de submit com estado de loading */}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Entrar
      </Button>

      {/* Links de navegação: esqueci senha e criar conta */}
      <div className="auth-links-container">
        <Link to="/forgot-password" className="link-block">
          Esqueci minha senha
        </Link>
        <div className="text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/register" className="link">
            Criar conta
          </Link>
        </div>
      </div>
    </form>
  );
};