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
import { Lock } from 'lucide-react';

const steps = [
  { label: 'Dados Pessoais', value: 0 },
  { label: 'Senha', value: 1 },
];

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    registerUser(data)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err: any) => {
        setError(err.message || 'Erro ao criar conta. Tente novamente.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Preencha seus dados para começar"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSteps
            steps={steps}
            currentStep={currentStep}
            onStepClick={(index) => {
              if (index < currentStep) setCurrentStep(index);
            }}
          />

          {currentStep === 0 && (
            <div className="space-y-4">
              <PersonalDataSection />
              <UserTypeSelector
                value={userType}
                onChange={(value: UserType) => setValue('userType', value)}
                disabled={isLoading}
              />
              {errors.userType && (
                <p className="text-sm text-red-500">{errors.userType.message}</p>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Senha"
                type="password"
                placeholder="******"
                icon={<Lock className="h-4 w-4" />}
                showPasswordToggle
                error={errors.password?.message as string | undefined}
                required
                {...register('password')}
              />
              <Input
                label="Confirmar Senha"
                type="password"
                placeholder="******"
                icon={<Lock className="h-4 w-4" />}
                showPasswordToggle
                error={errors.passwordConfirmation?.message as string | undefined}
                required
                {...register('passwordConfirmation')}
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <div className="flex justify-between gap-4 pt-4">
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

          <div className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/login" className="text-indigo-600 hover:underline font-medium">
              Faça login
            </a>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default Register;