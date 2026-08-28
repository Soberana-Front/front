// Importa React e utilitários
import * as React from 'react'
import { cn } from '../../utils/cn'
import { Label } from './Label'
import { Eye, EyeOff } from 'lucide-react'

// Props do Input com suporte a ícones, máscaras e toggle de senha
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  required?: boolean
  optional?: boolean
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
  showPasswordToggle?: boolean
  mask?: 'cpf' | 'phone' | 'cnpj' | 'cep' | 'currency' | 'none'
  size?: 'sm' | 'md' | 'lg'
}

// Mapeia tamanhos para classes Tailwind
const sizeClasses = {
  sm: 'h-8 text-xs px-2',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

// Aplica máscara conforme o tipo (CPF, telefone, CNPJ, CEP, moeda)
const applyMask = (value: string, mask: InputProps['mask']): string => {
  if (!mask || mask === 'none') return value
  const digits = value.replace(/\D/g, '')
  switch (mask) {
    case 'cpf':
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14)
    case 'phone':
      if (digits.length <= 10) {
        return digits
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .slice(0, 14)
      } else {
        return digits
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .slice(0, 15)
      }
    case 'cnpj':
      return digits
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
        .slice(0, 18)
    case 'cep':
      return digits.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9)
    case 'currency':
      const number = parseFloat(digits) / 100
      if (isNaN(number)) return 'R$ 0,00'
      return number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      })
    default:
      return value
  }
}

// Componente Input com forwardRef, máscara e toggle de senha
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      required,
      optional,
      icon,
      rightIcon,
      onRightIconClick,
      showPasswordToggle = true,
      mask,
      size = 'md',
      type = 'text',
      value,
      defaultValue,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<string>(
      (defaultValue as string) || (value as string) || ''
    )

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    // Aplica máscara ao valor digitado e atualiza estado
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
      if (mask && mask !== 'none') {
        const masked = applyMask(newValue, mask)
        newValue = masked
        e.target.value = masked
      }
      setInternalValue(newValue)
      if (onChange) onChange(e)
    }

    // Sincroniza com value controlado externamente
    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        const strValue = String(value)
        setInternalValue(mask && mask !== 'none' ? applyMask(strValue, mask) : strValue)
      }
    }, [value, mask])

    const togglePassword = () => setShowPassword(!showPassword)

    // Renderiza ícone direito (toggle de senha ou ícone customizado)
    const defaultRightIcon = isPassword && showPasswordToggle ? (
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        <span className="sr-only">{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</span>
      </button>
    ) : rightIcon ? (
      <button
        type="button"
        onClick={onRightIconClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        tabIndex={-1}
      >
        {rightIcon}
      </button>
    ) : null

    return (
      <div className="w-full">
        {/* Label com indicadores opcionais e obrigatório */}
        {label && (
          <Label htmlFor={inputId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        <div className="relative">
          {/* Ícone à esquerda */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          {/* Campo de entrada com máscara e validação visual */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              'w-full rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              icon ? 'pl-9' : 'pl-3',
              (rightIcon || defaultRightIcon) ? 'pr-9' : 'pr-3',
              sizeClasses[size],
              className
            )}
            value={internalValue}
            onChange={handleChange}
            {...props}
          />
          {/* Ícone direito (toggle ou customizado) */}
          {defaultRightIcon || rightIcon}
        </div>
        {/* Mensagem de erro */}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'