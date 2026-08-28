// Importa componente Button da UI
import { Button } from '../ui/Button';
// Importa ícone de e-mail (usado como ícone do Google)
import { Mail } from 'lucide-react';

// Props do componente de botões sociais
interface SocialLoginButtonsProps {
  buttonText?: string;    // Texto do botão (padrão: "Entrar com Google")
  onGoogleClick?: () => void; // Função chamada ao clicar
  disabled?: boolean;     // Desabilita o botão
}

// Componente com botão de login social (apenas Google)
export const SocialLoginButtons = ({
  buttonText = 'Entrar com Google',
  onGoogleClick,
  disabled = false,
}: SocialLoginButtonsProps) => {
  return (
    <div className="space-y-3">
      {/* Divisor com texto "Ou continue com" */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou continue com</span>
        </div>
      </div>

      {/* Botão de login com Google */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={onGoogleClick}
        disabled={disabled}
      >
        <Mail className="h-4 w-4" />
        {buttonText}
      </Button>
    </div>
  );
};