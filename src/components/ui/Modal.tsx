import * as React from 'react'
import { cn } from '../../utils/cn'
import { X } from 'lucide-react'
import { Button } from './Button'

export interface ModalProps {
  /** Controla se o modal está aberto */
  open: boolean
  /** Função para fechar o modal */
  onOpenChange: (open: boolean) => void
  /** Conteúdo do modal */
  children: React.ReactNode
  /** Tamanho do modal: sm, md, lg, xl, full */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Se true, fecha ao clicar no overlay (fundo) */
  closeOnOverlayClick?: boolean
  /** Se true, exibe o botão de fechar no canto superior direito */
  showCloseButton?: boolean
  /** Classes CSS adicionais para o conteúdo do modal */
  className?: string
  /** Desabilita o scroll da página quando o modal está aberto */
  disableScroll?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
}

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
  // Impedir scroll da página quando modal está aberto
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

  // Fechar ao pressionar ESC
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay com animação */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Conteúdo do modal com animação de escala e fade */}
      <div
        className={cn(
          'relative bg-white rounded-lg shadow-xl w-full transition-all duration-300 transform',
          sizeClasses[size],
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
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

// Subcomponentes
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

export const ModalBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('my-4', className)}>{children}</div>

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