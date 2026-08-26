import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Lock } from 'lucide-react';

export const PasswordFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
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