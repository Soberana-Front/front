// Importa o hook useFormContext para acessar o formulário pai
import { useFormContext } from 'react-hook-form';
// Importa o componente Input da UI
import { Input } from '../ui/Input';

// Componente com os campos de senha do formulário de cadastro
export const PasswordFields = () => {
  // Obtém register e errors do contexto do formulário
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    // Container com espaçamento vertical
    <div className="space-y-4">
      {/* Campo: Senha */}
      <Input
        label="Senha"
        type="password"
        placeholder="******"
        showPasswordToggle               // Habilita mostrar/ocultar senha
        error={errors.password?.message as string | undefined}
        required                          // Exibe asterisco vermelho
        {...register('password')}         // Registra no react-hook-form
      />

      {/* Campo: Confirmar Senha */}
      <Input
        label="Confirmar senha"
        type="password"
        placeholder="******"
        showPasswordToggle
        error={errors.passwordConfirmation?.message as string | undefined}
        required
        {...register('passwordConfirmation')}
      />
    </div>
  );
};