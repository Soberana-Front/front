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
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

// Componente indicador de progresso em passos
export const FormSteps = ({
  steps,
  currentStep,
  onStepClick,
  className,
}: FormStepsProps) => {
  return (
    <div className={cn('form-steps', className)}>
      <div className="form-steps-inner">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = onStepClick && (isCompleted || isActive);

          return (
            <React.Fragment key={step.value}>
              {/* Círculo do passo com número ou check */}
              <div className="form-step-item">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    'form-step-circle',
                    isActive && 'form-step-circle-active',
                    isCompleted && 'form-step-circle-completed',
                    !isActive && !isCompleted && 'form-step-circle-inactive',
                    isClickable ? 'form-step-circle-clickable' : 'form-step-circle-disabled'
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
                    'form-step-label',
                    isActive && 'form-step-label-active',
                    isCompleted && 'form-step-label-completed',
                    !isActive && !isCompleted && 'form-step-label-inactive'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Linha conectora entre passos */}
              {index < steps.length - 1 && (
                <div className="form-step-connector-wrapper">
                  <div
                    className={cn(
                      'form-step-connector-line',
                      index < currentStep ? 'form-step-connector-completed' : 'form-step-connector-inactive'
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