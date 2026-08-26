import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { User, Mail, Phone, UserSquare } from 'lucide-react';

export const PersonalDataSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <Input
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        error={errors.name?.message as string | undefined}
        required
        {...register('name')}
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message as string | undefined}
        required
        {...register('email')}
      />

      <Input
        label="Telefone"
        placeholder="(00) 00000-0000"
        mask="phone"
        error={errors.phone?.message as string | undefined}
        required
        {...register('phone')}
      />

      <Input
        label="CPF"
        placeholder="000.000.000-00"
        mask="cpf"
        error={errors.cpf?.message as string | undefined}
        required
        {...register('cpf')}
      />
    </div>
  );
};