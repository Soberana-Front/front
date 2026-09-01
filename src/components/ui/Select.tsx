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
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`

    // Tamanho do select
    const sizeClass = {
      sm: 'select-size-sm',
      md: 'select-size-md',
      lg: 'select-size-lg',
    }[size]

    return (
      <div className="select-wrapper">
        {/* Label com indicadores de obrigatório/opcional */}
        {label && (
          <Label htmlFor={selectId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        {/* Container com ícone e select */}
        <div className="select-field-wrapper">
          {/* Ícone à esquerda */}
          {icon && (
            <div className="select-icon-left">
              {icon}
            </div>
          )}
          {/* Select com estilização condicional (erro, ícone, tamanho) */}
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'select-field',
              sizeClass,
              icon && 'select-with-icon-left',
              error && 'select-error',
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
          <ChevronDown className="select-chevron" />
        </div>
        {/* Mensagem de erro */}
        {error && <p className="select-error-text">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'