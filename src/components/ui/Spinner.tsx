import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const spinnerVariants = cva(
  'inline-block animate-spin rounded-full border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-[3px]',
        xl: 'h-12 w-12 border-4',
      },
      color: {
        primary: 'text-indigo-600',
        secondary: 'text-gray-600',
        white: 'text-white',
        danger: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
)

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  /** Texto opcional exibido ao lado do spinner */
  label?: string
  /** Posição do texto em relação ao spinner */
  labelPosition?: 'right' | 'left' | 'bottom'
  /** Se true, ocupa a tela inteira com fundo branco semi-transparente */
  fullScreen?: boolean
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, label, labelPosition = 'right', fullScreen, ...props }, ref) => {
    const spinnerElement = (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, color }), className)}
        role="status"
        aria-label="Carregando"
        {...props}
      >
        <span className="sr-only">Carregando...</span>
      </div>
    )

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            {spinnerElement}
            {label && <span className="text-sm text-gray-600">{label}</span>}
          </div>
        </div>
      )
    }

    if (!label) return spinnerElement

    return (
      <div
        className={cn(
          'inline-flex items-center gap-2',
          labelPosition === 'bottom' && 'flex-col'
        )}
      >
        {labelPosition === 'left' && <span className="text-sm text-gray-600">{label}</span>}
        {spinnerElement}
        {labelPosition === 'right' && <span className="text-sm text-gray-600">{label}</span>}
        {labelPosition === 'bottom' && <span className="text-sm text-gray-600">{label}</span>}
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

// Mantém compatibilidade com o spinner simples que você já tinha
export const SimpleSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  </div>
)