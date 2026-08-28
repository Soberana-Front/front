// Importa React e o hook para acessar o formulário pai
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
// Importa componentes da UI e ícones
import { Input } from '../ui/Input';
import { User, Mail, Phone, UserSquare } from 'lucide-react';

// Componente com os campos de dados pessoais (Passo 1 do cadastro)
export const PersonalDataSection = () => {
  // Obtém register e errors do contexto do formulário
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    // Container com espaçamento vertical entre os campos
    <div className="space-y-4">
      {/* Campo: Nome Completo */}
      <Input
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        error={errors.name?.message as string | undefined}
        required
        {...register('name')}
      />

      {/* Campo: E-mail */}
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message as string | undefined}
        required
        {...register('email')}
      />

      {/* Campo: Telefone (com máscara) */}
      <Input
        label="Telefone"
        placeholder="(00) 00000-0000"
        mask="phone"
        error={errors.phone?.message as string | undefined}
        required
        {...register('phone')}
      />

      {/* Campo: CPF (com máscara) */}
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