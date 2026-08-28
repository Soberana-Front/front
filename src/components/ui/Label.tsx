// Importa React e utilitário de classes
import * as React from 'react'
import { cn } from '../../utils/cn'

// Props do Label com indicadores de obrigatório/opcional
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode // Conteúdo do label
  required?: boolean        // Exibe asterisco vermelho
  optional?: boolean        // Exibe "(opcional)"
}

// Componente Label com forwardRef para acessibilidade
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, optional, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-sm font-medium text-gray-700 mb-1',
          className
        )}
        {...props}
      >
        {children}
        {/* Asterisco para campos obrigatórios */}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
        {/* Indicador de campo opcional */}
        {optional && (
          <span className="ml-1 text-xs font-normal text-gray-400">
            (opcional)
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'