import * as React from 'react'
import { cn } from '../../utils/cn'
import { ChevronDown } from 'lucide-react'
import { Label } from './Label'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Opções do select */
  options: SelectOption[]
  /** Texto do label */
  label?: string
  /** Texto do placeholder (exibido como opção desabilitada) */
  placeholder?: string
  /** Mensagem de erro */
  error?: string
  /** Indica se o campo é obrigatório (exibe asterisco no label) */
  required?: boolean
  /** Indica se o campo é opcional (exibe "(opcional)" no label) */
  optional?: boolean
  /** Ícone a ser exibido à esquerda do select (opcional) */
  icon?: React.ReactNode
  /** Tamanho do select */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 text-xs px-2',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      placeholder,
      error,
      required,
      optional,
      icon,
      size = 'md',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={selectId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full rounded-md border border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              icon ? 'pl-9' : 'pl-3',
              sizeClasses[size],
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'