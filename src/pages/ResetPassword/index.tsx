// Importa hooks e componentes
import { useState } from 'react';
import { useParams } from 'react-router';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useAuth } from '../../contexts/AuthContext';
import { ResetPasswordFormData } from '../../validations/authSchemas';

// Página de redefinição de senha (após clique no link do e-mail)
const ResetPassword = () => {
  // Captura o token da URL
  const { token } = useParams<{ token: string }>();
  const { resetPassword } = useAuth();
  // Estados de loading, erro e sucesso
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Envia a nova senha com o token para o backend
  const handleSubmit = async (data: ResetPasswordFormData) => {
    // Valida se o token existe
    if (!token) {
      setError('Token inválido ou expirado.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword({ token, ...data });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Layout com título e subtítulo
    <AuthLayout
      title="Redefinir senha"
      subtitle="Digite sua nova senha"
      showFooter
    >
      {/* Formulário de redefinição */}
      <ResetPasswordForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        success={success}
      />
    </AuthLayout>
  );
};

export default ResetPassword;