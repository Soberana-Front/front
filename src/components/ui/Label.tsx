// Importa React e utilitário de classes
import * as React from 'react'
import { cn } from '../../utils/cn'

// Props do Label com indicadores de obrigatório/opcional
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  required?: boolean
  optional?: boolean
}

// Componente Label com forwardRef para acessibilidade
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, optional, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('label', className)}
        {...props}
      >
        {children}
        {/* Asterisco para campos obrigatórios */}
        {required && (
          <span className="label-required" aria-hidden="true">
            *
          </span>
        )}
        {/* Indicador de campo opcional */}
        {optional && (
          <span className="label-optional">
            (opcional)
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'