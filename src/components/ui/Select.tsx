// Importa React, utilitário, ícone e Label
import * as React from 'react'
import { cn } from '../../utils/cn'
import { ChevronDown } from 'lucide-react'
import { Label } from './Label'

// Interface de uma opção do select
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Props do Select com suporte a label, ícone, erro e placeholder
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[]
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  optional?: boolean
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

// Mapeia tamanhos para classes Tailwind
const sizeClasses = {
  sm: 'h-8 text-xs px-2',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

// Componente Select com forwardRef, label e validação
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
    // Gera ID único se não fornecido
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div className="w-full">
        {/* Label com indicadores de obrigatório/opcional */}
        {label && (
          <Label htmlFor={selectId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        {/* Container com ícone e select */}
        <div className="relative">
          {/* Ícone à esquerda */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          {/* Select com estilização condicional (erro, ícone, tamanho) */}
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
            {/* Placeholder como opção desabilitada */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {/* Lista de opções */}
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
          {/* Ícone de seta para baixo (substitui o padrão) */}
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {/* Mensagem de erro */}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'