// Importa o Zod para validação de schemas
import { z } from 'zod';

// Schema de validação do formulário de login
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// Tipo inferido do schema de login
export type LoginFormData = z.infer<typeof loginSchema>;

// Schema de validação do formulário de cadastro (com validações de igualdade e obrigatoriedade)
export const registerSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z.string().min(14, 'Telefone inválido'),
    cpf: z.string().min(14, 'CPF inválido'),
    userType: z.enum(['student', 'professional']).nullable(),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: z.string().min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })
  .refine((data) => data.userType !== null, {
    message: 'Selecione um tipo de usuário',
    path: ['userType'],
  });

// Tipo inferido do schema de cadastro
export type RegisterFormData = z.infer<typeof registerSchema>;

// Schema de validação do formulário de recuperação de senha
export const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

// Tipo inferido do schema de recuperação de senha
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Schema de validação do formulário de redefinição de senha (com validação de igualdade)
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: z.string().min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

// Tipo inferido do schema de redefinição de senha
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;