// Importa hooks do React
import { useState } from 'react';
// Importa layout de autenticação
import { AuthLayout } from '../../components/layout/AuthLayout';
// Importa formulário de recuperação de senha
import { ForgotPasswordForm } from './ForgotPasswordForm';
// Importa contexto de autenticação
import { useAuth } from '../../contexts/AuthContext';
// Importa tipo do formulário
import { ForgotPasswordFormData } from '../../validations/authSchemas';

// Página de recuperação de senha
const ForgotPassword = () => {
  // Obtém função de recuperação do contexto
  const { forgotPassword } = useAuth();
  // Estados de loading, erro e sucesso
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Envia e-mail de recuperação
  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await forgotPassword(data.email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Layout com título, subtítulo e rodapé
    <AuthLayout
      title="Recuperar senha"
      subtitle="Enviaremos um link para redefinir sua senha"
      showFooter
    >
      {/* Formulário com props de estado */}
      <ForgotPasswordForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        success={success}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;