// Importa hooks e componentes
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { FormSteps } from '../../components/ui/FormSteps';
import { PersonalDataSection } from '../../components/forms/PersonalDataSection';
import { UserTypeSelector, UserType } from '../../components/ui/UserTypeSelector';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { registerSchema, RegisterFormData } from '../../validations/authSchemas';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

// Passos do formulário de cadastro
const steps = [
  { label: 'Dados Pessoais', value: 0 },
  { label: 'Senha', value: 1 },
];

// Página de cadastro com fluxo em 2 passos
const Register = () => {
  // Hooks de autenticação e toast
  const { register: registerUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  // Estados de passo, loading e erro
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configura o formulário com validação Zod
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      userType: null,
      password: '',
      passwordConfirmation: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = methods;

  const userType = watch('userType');

  // Avança para o próximo passo após validar os campos atuais
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = ['name', 'email', 'phone', 'cpf', 'userType'];
    } else if (currentStep === 1) {
      fieldsToValidate = ['password', 'passwordConfirmation'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // Volta para o passo anterior
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Submissão final do cadastro
  const onSubmit = (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    // Adiciona configurações padrão ao payload
    const payload = {
      ...data,
      settings: {
        currency: 'BRL',
        profitMargin: 30,
        taxRate: 15,
        cardFee: 2,
      },
    };

    // Chama serviço de registro e redireciona para login em caso de sucesso
    registerUser(payload)
      .then(() => { 
        showToast('Conta criada com sucesso! Faça login para acessar o sistema.', 'success');
        navigate('/login');
      })
      .catch((err: any) => {
      showToast(err.message || 'Erro ao criar conta. Tente novamente.', 'error');
})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    // Layout de autenticação com título e subtítulo
    <AuthLayout
      title="Criar conta"
      subtitle="Preencha seus dados para começar"
    >
      {/* Provider do react-hook-form para os componentes filhos */}
      <FormProvider {...methods}>
        {/* Formulário com submissão via react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* Indicador de passos */}
          <FormSteps
            steps={steps}
            currentStep={currentStep}
            onStepClick={(index) => {
              if (index < currentStep) setCurrentStep(index);
            }}
          />

          {/* Passo 1: Dados Pessoais + Tipo de Usuário */}
          {currentStep === 0 && (
            <div className="step-content">
              <PersonalDataSection />
              <UserTypeSelector
                value={userType}
                onChange={(value: UserType) => setValue('userType', value)}
                disabled={isLoading}
              />
              {errors.userType && (
                <p className="field-error">{errors.userType.message}</p>
              )}
            </div>
          )}

          {/* Passo 2: Senha e Confirmação */}
          {currentStep === 1 && (
            <div className="step-content">
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
                label="Confirmar Senha"
                type="password"
                placeholder="******"
                showPasswordToggle
                error={errors.passwordConfirmation?.message as string | undefined}
                required
                {...register('passwordConfirmation')}
              />
            </div>
          )}

          {/* Mensagem de erro geral */}
          {error && (
            <div className="auth-error">{error}</div>
          )}

          {/* Botões de navegação entre passos */}
          <div className="step-navigation">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0 || isLoading}
            >
              Voltar
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNextStep}>
                Próximo
              </Button>
            ) : (
              <Button type="submit" isLoading={isLoading}>
                Cadastrar
              </Button>
            )}
          </div>

          {/* Link para página de login */}
          <div className="auth-footer">
            Já tem uma conta?{' '}
            <a href="/login" className="link">
              Faça login
            </a>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default Register;