// Importa tipo de ícone do lucide e o ícone padrão (caixa vazia)
import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
// Importa o Button já existente, usado no botão de ação opcional
import { Button } from './Button'


// Props do EmptyState
export interface EmptyStateProps {
  icon?: LucideIcon                 // ícone customizável (padrão: caixa vazia)
  title?: string                    // mensagem principal (padrão: "Nenhum item encontrado")
  subtitle?: string                 // subtítulo (padrão: "Comece cadastrando um novo item")
  actionLabel?: string              // texto do botão de ação (opcional)
  onAction?: () => void              // clique do botão de ação (opcional)
}

/**
 * Estado vazio reutilizável, exibido quando uma lista não tem dados (Issue #60).
 *
 * Componente puramente apresentacional (sem estado, sem chamada assíncrona) —
 * por isso não há try/catch aqui: quem decide o que a ação faz (ex: abrir o
 * modal de cadastro) é o componente pai, via onAction. O botão só aparece se
 * actionLabel E onAction forem passados juntos, pra não renderizar um botão
 * "morto" sem função.
 */
export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'Nenhum item encontrado',
  subtitle = 'Comece cadastrando um novo item',
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const showAction = Boolean(actionLabel && onAction)

  return (
    <div className="empty-state-container">
      <Icon className="empty-state-icon" strokeWidth={1.5} />
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-subtitle">{subtitle}</p>

      {showAction && (
        <Button type="button" onClick={onAction} className="empty-state-action">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'