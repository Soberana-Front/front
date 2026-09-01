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

// Mapeia tamanhos para classes customizadas
const sizeClasses = {
  sm: 'modal-size-sm',
  md: 'modal-size-md',
  lg: 'modal-size-lg',
  xl: 'modal-size-xl',
  full: 'modal-size-full',
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
      className="modal-container"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Fundo escuro com blur */}
      <div
        className={cn(
          'modal-overlay',
          open ? 'modal-overlay-enter' : 'modal-overlay-exit'
        )}
        aria-hidden="true"
      />

      {/* Card do modal com animação de escala */}
      <div
        className={cn(
          'modal-content',
          sizeClasses[size],
          open ? 'modal-content-enter' : 'modal-content-exit',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar (X) */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="modal-close-btn"
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
  <div className={cn('modal-header', className)}>
    <h3 className="modal-title">{children}</h3>
  </div>
)

// Corpo do modal
export const ModalBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('modal-body', className)}>{children}</div>

// Rodapé do modal com botões alinhados à direita
export const ModalFooter = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn('modal-footer', className)}>
    {children}
  </div>
)