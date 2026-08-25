import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../validations/authSchemas';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="******"
        showPasswordToggle
        error={errors.password?.message}
        required
        {...register('password')}
      />

      {error && (
        <div className="text-sm text-red-500 text-center">{error}</div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full">
        Entrar
      </Button>

      <div className="text-center text-sm space-y-2">
        <Link to="/forgot-password" className="text-indigo-600 hover:underline block">
          Esqueci minha senha
        </Link>
        <div className="text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Criar conta
          </Link>
        </div>
      </div>
    </form>
  );
};