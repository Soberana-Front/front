// Importa utilitário de classes CSS (mesmo padrão do Pagination.tsx)
import { cn } from '../../utils/cn'
// Reaproveita o Button e o PriceDisplay já existentes
import { Button } from './Button'
import { PriceDisplay } from '@/components/dashboard/PriceDisplay/PriceDisplay'
// Reaproveita o tipo PricingResult — mesma ideia da History.tsx (Issue #84)
import type { PricingResult } from '@/types/pricing'

// ============================================================
// TIPO EXPORTADO: HistoryCardItem
// ============================================================
/**
 * Subconjunto de PricingResult com só os campos que o card exibe.
 * Exportado aqui pra quem for montar a lista (History.tsx, e futuramente
 * RecentHistory no dashboard) poder tipar o array de itens contra o
 * mesmo formato que o card espera, sem duplicar a definição.
 */
export type HistoryCardItem = Pick<
  PricingResult,
  'id' | 'clinicName' | 'procedureName' | 'finalPrice' | 'createdAt'
>

// Props do HistoryCard
export interface HistoryCardProps {
  item: HistoryCardItem                        // dados da precificação a exibir
  onViewDetails?: (item: HistoryCardItem) => void // chamado ao clicar em "Ver detalhes"
  className?: string
}

// Formata "2026-08-22" -> "22/08/2026" (formatação de data pedida na issue)
const formatDateBR = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

/**
 * Card de resumo de uma precificação do histórico (Issue #85).
 *
 * Componente "burro" (dumb component), no mesmo espírito do
 * ClinicTable/ProcedureTable: só recebe os dados prontos (`item`) e avisa
 * o componente pai quando o usuário clica em "Ver detalhes" — quem decide
 * pra onde navegar é quem usa o card (hoje a History.tsx, na Issue #87 vai
 * navegar de verdade pra HistoryDetail).
 *
 * Antes esse JSX estava embutido dentro da History.tsx (Issue #84); aqui
 * ele só foi extraído para este arquivo, sem mudar a aparência.
 */
export const HistoryCard = ({ item, onViewDetails, className }: HistoryCardProps) => {
  // Se ninguém passar onViewDetails, cai num fallback (mesmo comportamento
  // provisório que o RecentHistory já usa hoje, até a Issue #87 existir)
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(item)
    } else {
      console.log(`Redirecionando para detalhes da precificação #${item.id}`)
    }
  }

  return (
    <div className={cn('history-card', className)}>
      {/* Linha superior: data + preço final (formatação de moeda via PriceDisplay) */}
      <div className="history-card-top">
        <span className="history-card-date">{formatDateBR(item.createdAt)}</span>
        <PriceDisplay value={item.finalPrice} variant="highlight" size="md" />
      </div>

      {/* Nome do procedimento */}
      <p className="history-card-procedure">{item.procedureName}</p>

      {/* Nome da clínica */}
      <p className="history-card-clinic">{item.clinicName}</p>

      {/* Botão "Ver detalhes" */}
      <Button
        variant="outline"
        size="sm"
        className="history-card-button"
        onClick={handleViewDetails}
      >
        Ver detalhes
      </Button>
    </div>
  )
}

HistoryCard.displayName = 'HistoryCard'
