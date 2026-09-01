// Importa componente Button da UI
import { Button } from '../ui/Button';
// Importa ícone de e-mail (usado como ícone do Google)
import { Mail } from 'lucide-react';

// Props do componente de botões sociais
interface SocialLoginButtonsProps {
  buttonText?: string;
  onGoogleClick?: () => void;
  disabled?: boolean;
}

// Componente com botão de login social (apenas Google)
export const SocialLoginButtons = ({
  buttonText = 'Entrar com Google',
  onGoogleClick,
  disabled = false,
}: SocialLoginButtonsProps) => {
  return (
    <div className="social-login-buttons">
      {/* Divisor com texto "Ou continue com" */}
      <div className="social-login-divider">
        <div className="absolute inset-0 flex items-center">
          <div className="social-login-divider-line" />
        </div>
        <div className="social-login-divider-text-wrapper">
          <span className="social-login-divider-text">Ou continue com</span>
        </div>
      </div>

      {/* Botão de login com Google */}
      <Button
        variant="outline"
        className="social-login-btn"
        onClick={onGoogleClick}
        disabled={disabled}
      >
        <Mail className="h-4 w-4" />
        {buttonText}
      </Button>
    </div>
  );
};