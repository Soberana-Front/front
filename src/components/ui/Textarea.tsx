// Importa React e utilitários já usados no Input
import * as React from 'react'
import { cn } from '../../utils/cn'
import { Label } from './Label'

// Props do Textarea, seguindo o mesmo formato do Input (label, error, required)
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
  optional?: boolean
}

/**
 * Campo de texto multilinha (Issue #53 - campo "Descrição").
 *
 * Não existia um componente de textarea no projeto ainda — o Input.tsx
 * só lida com <input>. Criei este componente novo replicando o mesmo
 * padrão visual (wrapper, Label, mensagem de erro) em vez de reaproveitar
 * o Input, porque <textarea> tem atributos e comportamento de altura
 * diferentes de <input> (não faz sentido herdar máscara, ícones, etc.).
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, required, optional, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div className="input-wrapper">
        {label && (
          <Label htmlFor={textareaId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'input-field',
            'textarea-field',
            error && 'input-error',
            className
          )}
          {...props}
        />
        {error && <p className="input-error-text">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'