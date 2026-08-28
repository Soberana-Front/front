// Importa React, utilitários, ícone e botão
import * as React from 'react'
import { cn } from '../../utils/cn'
import { X } from 'lucide-react'
import { Button } from './Button'

// Props do Modal (abertura, fechamento, tamanho, overlay, etc.)
export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  className?: string
  disableScroll?: boolean
}

// Mapeia tamanhos para classes Tailwind
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
}

// Componente Modal com overlay, animação e fechamento por ESC
export const Modal = ({
  open,
  onOpenChange,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
  disableScroll = true,
}: ModalProps) => {
  // Bloqueia scroll da página quando o modal está aberto
  React.useEffect(() => {
    if (open && disableScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open, disableScroll])

  // Fecha modal ao pressionar ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  // Fecha ao clicar no overlay (se permitido)
  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onOpenChange(false)
    }
  }

  // Fecha ao clicar no botão X
  const handleClose = () => {
    onOpenChange(false)
  }

  // Não renderiza se estiver fechado
  if (!open) return null

  return (
    // Container centralizado com overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Fundo escuro com blur */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Card do modal com animação de escala */}
      <div
        className={cn(
          'relative bg-white rounded-lg shadow-xl w-full transition-all duration-300 transform',
          sizeClasses[size],
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar (X) */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

// Cabeçalho do modal
export const ModalHeader = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn('mb-4 border-b pb-3', className)}>
    <h3 className="text-lg font-semibold">{children}</h3>
  </div>
)

// Corpo do modal
export const ModalBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('my-4', className)}>{children}</div>

// Rodapé do modal com botões alinhados à direita
export const ModalFooter = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn('mt-6 flex justify-end gap-3 border-t pt-4', className)}>
    {children}
  </div>
)