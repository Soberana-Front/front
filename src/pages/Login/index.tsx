import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { LoginForm } from './LoginForm';
import { SocialLoginButtons } from '../../components/shared/SocialLoginButtons';
import { useAuth } from '../../contexts/AuthContext';
import { LoginFormData } from '../../validations/authSchemas';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder – futura integração com OAuth
    alert('Login com Google (em breve)');
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Faça login para acessar o sistema"
    >
      <div className="space-y-6">
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        <SocialLoginButtons
          onGoogleClick={handleGoogleLogin}
          disabled={isLoading}
        />
      </div>
    </AuthLayout>
  );
};

export default Login;