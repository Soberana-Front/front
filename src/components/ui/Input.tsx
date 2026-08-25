import * as React from 'react'
import { cn } from '../../utils/cn'
import { Label } from './Label'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Texto do label */
  label?: string
  /** Mensagem de erro */
  error?: string
  /** Indica se o campo é obrigatório (exibe asterisco) */
  required?: boolean
  /** Indica se o campo é opcional (exibe "(opcional)") */
  optional?: boolean
  /** Ícone à esquerda do input */
  icon?: React.ReactNode
  /** Ícone à direita do input (sobrescreve o toggle de senha se usado) */
  rightIcon?: React.ReactNode
  /** Ação ao clicar no ícone direito (ex: limpar campo) */
  onRightIconClick?: () => void
  /** Se true, exibe o botão de mostrar/ocultar senha (apenas para type="password") */
  showPasswordToggle?: boolean
  /** Máscara para o input (ex: 'cpf', 'phone', 'cnpj', 'cep') */
  mask?: 'cpf' | 'phone' | 'cnpj' | 'cep' | 'currency' | 'none'
  /** Tamanho do input */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 text-xs px-2',
  md: 'h-10 text-sm px-3',
  lg: 'h-12 text-base px-4',
}

// Funções de máscara
const applyMask = (value: string, mask: InputProps['mask']): string => {
  if (!mask || mask === 'none') return value

  // Remove caracteres não numéricos
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
      return digits
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9)

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

    // Controla se o input é de senha (e se o toggle está ativo)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    // Função para aplicar máscara e atualizar estado
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value
      if (mask && mask !== 'none') {
        // Aplica a máscara
        const masked = applyMask(newValue, mask)
        newValue = masked
        // Atualiza o valor do input
        e.target.value = masked
      }
      setInternalValue(newValue)
      if (onChange) {
        onChange(e)
      }
    }

    // Sincroniza com value controlado externamente
    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        const strValue = String(value)
        if (mask && mask !== 'none') {
          setInternalValue(applyMask(strValue, mask))
        } else {
          setInternalValue(strValue)
        }
      }
    }, [value, mask])

    const togglePassword = () => setShowPassword(!showPassword)

    // Ícone direito padrão (toggle de senha)
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
        {label && (
          <Label htmlFor={inputId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
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
          {defaultRightIcon || rightIcon}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'