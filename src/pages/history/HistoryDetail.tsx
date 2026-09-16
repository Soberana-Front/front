// Importa hooks do React
import { useEffect, useState } from 'react'
// Importa hooks de rota (mesmo pacote usado em PricingDetail.tsx)
import { useNavigate, useParams } from 'react-router'
// Ícone do botão "Voltar"
import { ArrowLeft } from 'lucide-react'
// Layout do dashboard (reaproveitado, igual a History.tsx)
import { DashboardLayout } from '@/components/dashboard/DashboardLayout/DashboardLayout'
// Componentes reutilizáveis já existentes no projeto
import { ChatMessage } from '@/components/dashboard/ChatMessage/ChatMessage'
import { PriceDisplay } from '@/components/dashboard/PriceDisplay/PriceDisplay'
import { ProfitIndicator } from '@/components/dashboard/ProfitIndicator/ProfitIndicator'
import { ExportPDFButton } from '@/components/dashboard/ExportPDFButton/ExportPDFButton'
// Reaproveita o tipo PricingDetail (PricingResult + conversation)
import type { PricingDetail as PricingDetailData } from '@/types/pricing'
// Hook central do módulo de Histórico (Issue #88) — busca o detalhe por id
import { useHistory } from '@/hooks/useHistory'

// Formata a data (aceita "yyyy-mm-dd" ou ISO completo) para dd/mm/aaaa
const formatDateBR = (date: string): string => {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/**
 * Página de detalhamento de uma precificação do histórico (Issue #87).
 *
 * Desde a Issue #88, a busca mockada por id não mora mais aqui — ela foi
 * pro useHistory (getHistoryDetail), a mesma fonte de dados usada pela
 * History.tsx. Esta página só chama o hook, guarda o resultado num
 * useState local (porque é um fetch avulso, disparado uma vez ao montar,
 * diferente da lista que o hook já mantém pronta) e cuida do layout.
 */
export const HistoryDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getHistoryDetail } = useHistory()

  const [detail, setDetail] = useState<PricingDetailData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadDetail = async () => {
      setIsLoading(true)
      setError(null)
      try {
        if (!id) return
        const data = await getHistoryDetail(id)
        if (isMounted) setDetail(data)
      } catch {
        if (isMounted) setError('Erro ao carregar os detalhes da precificação.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadDetail()
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Botão Voltar — sempre volta para a lista de Histórico */}
        <button
          type="button"
          className="history-detail-back-button"
          onClick={() => navigate('/historico')}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o histórico
        </button>

        {isLoading || !detail ? (
          <p className="history-loading-text">Carregando detalhes...</p>
        ) : (
          <>
            {/* Cabeçalho com título e botão de exportar (Issue #68, reaproveitado) */}
            <div className="history-page-header">
              <div>
                <h1 className="dashboard-header-title">{detail.procedureName}</h1>
                <p className="dashboard-header-subtitle">{detail.clinicName}</p>
              </div>
              <ExportPDFButton />
            </div>

            {error && <p className="clinics-page-error">{error}</p>}

            {/* Informações: Clínica, Procedimento, Data */}
            <section className="history-detail-card">
              <h2 className="history-detail-section-title">Informações</h2>
              <div className="history-detail-info-grid">
                <div className="history-detail-info-item">
                  <span>Clínica</span>
                  <strong>{detail.clinicName}</strong>
                </div>
                <div className="history-detail-info-item">
                  <span>Procedimento</span>
                  <strong>{detail.procedureName}</strong>
                </div>
                <div className="history-detail-info-item">
                  <span>Data</span>
                  <strong>{formatDateBR(detail.createdAt)}</strong>
                </div>
              </div>
            </section>

            {/* Conversa completa com a IA, como uma timeline de mensagens */}
            <section className="history-detail-card">
              <h2 className="history-detail-section-title">Conversa com a Soberana AI</h2>
              {detail.conversation.length === 0 ? (
                <p className="history-detail-empty-conversation">
                  Nenhuma conversa registrada para esta precificação.
                </p>
              ) : (
                <div className="history-detail-timeline">
                  {detail.conversation.map((message) => (
                    <ChatMessage
                      key={message.id}
                      sender={message.sender}
                      message={message.message}
                      timestamp={message.timestamp}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Resultado final: margem (%) e preço final (destacado) */}
            <section className="history-detail-card">
              <h2 className="history-detail-section-title">Resultado Final</h2>
              <div className="history-detail-result-row">
                <ProfitIndicator value={detail.margin} label="Margem" />
                <PriceDisplay
                  value={detail.finalPrice}
                  variant="highlight"
                  size="lg"
                  label="Preço final"
                />
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default HistoryDetail
