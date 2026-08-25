import * as React from 'react'
import { cn } from '../../utils/cn'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Texto do label */
  children: React.ReactNode
  /** Se true, exibe um asterisco vermelho indicando campo obrigatório */
  required?: boolean
  /** Se true, exibe "(opcional)" ao lado do label */
  optional?: boolean
}

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
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
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