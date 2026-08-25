import { Button } from '../ui/Button';
import { Mail } from 'lucide-react';

interface SocialLoginButtonsProps {
  /** Texto do botão */
  buttonText?: string;
  /** Função chamada ao clicar em Google */
  onGoogleClick?: () => void;
  /** Desabilita o botão */
  disabled?: boolean;
}

export const SocialLoginButtons = ({
  buttonText = 'Entrar com Google',
  onGoogleClick,
  disabled = false,
}: SocialLoginButtonsProps) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou continue com</span>
        </div>
      </div>

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