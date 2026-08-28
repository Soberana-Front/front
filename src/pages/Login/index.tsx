// Importa hooks do React
import { useState } from 'react';
// Importa hook de navegação
import { useNavigate } from 'react-router';
// Importa layout de autenticação
import { AuthLayout } from '../../components/layout/AuthLayout';
// Importa formulário de login
import { LoginForm } from './LoginForm';
// Importa botões de login social
import { SocialLoginButtons } from '../../components/shared/SocialLoginButtons';
// Importa contexto de autenticação
import { useAuth } from '../../contexts/AuthContext';
// Importa tipo do formulário
import { LoginFormData } from '../../validations/authSchemas';

// Página de login
const Login = () => {
  // Obtém função de login do contexto
  const { login } = useAuth();
  const navigate = useNavigate();
  // Estados de loading e erro
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Envia credenciais para autenticação
  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login({ email: data.email, password: data.password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder para login com Google
  const handleGoogleLogin = () => {
    alert('Login com Google (em breve)');
  };

  return (
    // Layout com título e subtítulo
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Faça login para acessar o sistema"
    >
      {/* Container com espaçamento entre formulário e botão social */}
      <div className="space-y-6">
        {/* Formulário de login */}
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        {/* Botão de login com Google */}
        <SocialLoginButtons
          onGoogleClick={handleGoogleLogin}
          disabled={isLoading}
        />
      </div>
    </AuthLayout>
  );
};

export default Login;