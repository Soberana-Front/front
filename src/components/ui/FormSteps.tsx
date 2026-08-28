// Importa React e utilitário de classes
import * as React from 'react';
import { cn } from '../../utils/cn';
// Importa ícone de check
import { Check } from 'lucide-react';

// Interface de um passo individual
export interface Step {
  label: string;
  value: number;
}

// Props do componente de passos
export interface FormStepsProps {
  steps: Step[];                       // Lista de passos
  currentStep: number;                 // Passo atual (0-indexado)
  onStepClick?: (index: number) => void; // Função para navegar
  className?: string;                  // Classes CSS adicionais
}

// Componente indicador de progresso em passos
export const FormSteps = ({
  steps,
  currentStep,
  onStepClick,
  className,
}: FormStepsProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          // Define estados do passo
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = onStepClick && (isCompleted || isActive);

          return (
            <React.Fragment key={step.value}>
              {/* Círculo do passo com número ou check */}
              <div className="flex flex-col items-center flex-1">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                    isActive && 'border-indigo-600 bg-indigo-600 text-white',
                    isCompleted && 'border-green-500 bg-green-500 text-white',
                    !isActive && !isCompleted && 'border-gray-300 bg-white text-gray-500',
                    isClickable && 'cursor-pointer hover:opacity-80',
                    !isClickable && 'cursor-default'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Label do passo */}
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isActive && 'text-indigo-600',
                    isCompleted && 'text-green-600',
                    !isActive && !isCompleted && 'text-gray-500'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Linha conectora entre passos */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div
                    className={cn(
                      'h-0.5 w-full',
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};