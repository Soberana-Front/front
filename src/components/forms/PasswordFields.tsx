// Importa o hook useFormContext para acessar o formulário pai
import { useFormContext } from 'react-hook-form';
// Importa o componente Input da UI
import { Input } from '../ui/Input';

// Componente com os campos de senha do formulário de cadastro
export const PasswordFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="password-fields-container">
      <Input
        label="Senha"
        type="password"
        placeholder="******"
        showPasswordToggle
        error={errors.password?.message as string | undefined}
        required
        {...register('password')}
      />

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