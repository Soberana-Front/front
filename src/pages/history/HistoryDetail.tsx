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
// Reaproveita o tipo PricingDetail (PricingResult + conversation) — mesmo
// tipo já usado na página de Precificação (pages/PricingDetail)
import type { PricingDetail as PricingDetailData } from '@/types/pricing'

// ============================================================
// DADOS MOCKADOS (Issue #87 pede "Buscar dados da precificação por ID (mock)")
// ============================================================
/**
 * 3 detalhes completos, com os MESMOS ids/clínica/procedimento/preço/data
 * dos 3 primeiros itens do MOCK_HISTORY em History.tsx — assim, ao clicar
 * em "Ver detalhes" nesses cards, os dados batem entre a lista e o
 * detalhamento. Os demais ids (4 a 14) caem no DEFAULT_HISTORY_DETAIL
 * abaixo, que serve de fallback genérico.
 */
const MOCK_HISTORY_DETAILS: Record<string, PricingDetailData> = {
  '1': {
    id: '1',
    clinicId: 'c1',
    clinicName: 'Clínica Odonto Prime',
    procedureId: 'p1',
    procedureName: 'Limpeza e Profilaxia',
    materialCost: 20,
    fixedCosts: 30,
    variableCosts: 15,
    hourCost: 60,
    commission: 10,
    taxes: 8,
    margin: 25,
    finalPrice: 180,
    profit: 45,
    createdAt: '2026-08-22',
    conversation: [
      { id: 'm1', sender: 'ia', message: 'Olá! Vamos calcular o preço da Limpeza e Profilaxia.', timestamp: '09:00' },
      { id: 'm2', sender: 'user', message: 'Quero considerar meia hora de cadeira e margem de 25%.', timestamp: '09:01' },
      { id: 'm3', sender: 'ia', message: 'Com os custos informados, o preço final sugerido é R$ 180,00.', timestamp: '09:02' },
    ],
  },
  '2': {
    id: '2',
    clinicId: 'c2',
    clinicName: 'Soberana Odontologia',
    procedureId: 'p2',
    procedureName: 'Tratamento de Canal',
    materialCost: 90,
    fixedCosts: 80,
    variableCosts: 40,
    hourCost: 150,
    commission: 15,
    taxes: 10,
    margin: 30,
    finalPrice: 650,
    profit: 195,
    createdAt: '2026-08-21',
    conversation: [
      { id: 'm1', sender: 'ia', message: 'Vamos precificar o Tratamento de Canal dessa clínica.', timestamp: '14:10' },
      { id: 'm2', sender: 'user', message: 'São duas sessões, material mais caro que o comum.', timestamp: '14:11' },
      { id: 'm3', sender: 'ia', message: 'Considerando as duas sessões, o preço final ficou em R$ 650,00.', timestamp: '14:13' },
    ],
  },
  '3': {
    id: '3',
    clinicId: 'c1',
    clinicName: 'Clínica Odonto Prime',
    procedureId: 'p3',
    procedureName: 'Consulta Odontológica',
    materialCost: 5,
    fixedCosts: 20,
    variableCosts: 5,
    hourCost: 40,
    commission: 8,
    taxes: 6,
    margin: 20,
    finalPrice: 150,
    profit: 30,
    createdAt: '2026-08-20',
    conversation: [
      { id: 'm1', sender: 'ia', message: 'Essa é uma consulta de avaliação simples, sem procedimento associado.', timestamp: '11:00' },
      { id: 'm2', sender: 'user', message: 'Confirmado, só avaliação mesmo.', timestamp: '11:01' },
      { id: 'm3', sender: 'ia', message: 'Preço final sugerido: R$ 150,00.', timestamp: '11:02' },
    ],
  },
}

// Fallback genérico para qualquer id que não esteja no mock acima
const DEFAULT_HISTORY_DETAIL: PricingDetailData = {
  id: '0',
  clinicId: 'c0',
  clinicName: 'Clínica não encontrada',
  procedureId: 'p0',
  procedureName: 'Procedimento não encontrado',
  materialCost: 0,
  fixedCosts: 0,
  variableCosts: 0,
  hourCost: 0,
  commission: 0,
  taxes: 0,
  margin: 0,
  finalPrice: 0,
  profit: 0,
  createdAt: new Date().toISOString(),
  conversation: [],
}

// Formata a data (aceita "yyyy-mm-dd" ou ISO completo) para dd/mm/aaaa
const formatDateBR = (date: string): string => {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/**
 * Página de detalhamento de uma precificação do histórico (Issue #87).
 *
 * Fica em pages/history/, separada da pages/PricingDetail já existente
 * (Issue #74): aquela é o resultado exibido logo após o wizard de
 * precificação (por isso é uma página "cheia", sem sidebar); esta é
 * alcançada navegando pelo Histórico, então continua dentro do
 * DashboardLayout — mesma decisão de layout da History.tsx.
 *
 * Assim como a History.tsx, a busca por ID aqui é 100% mockada
 * (MOCK_HISTORY_DETAILS) — quando o back-end de histórico existir
 * (junto da Issue #88 / useHistory), a função loadDetail() abaixo é o
 * lugar certo pra trocar pela chamada real.
 */
export const HistoryDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [detail, setDetail] = useState<PricingDetailData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadDetail = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // --- Quando existir um endpoint real, trocar por: ---
        // const data = await historyService.getHistoryDetail(id)
        await new Promise((resolve) => setTimeout(resolve, 300))
        if (!isMounted) return

        const found = id ? MOCK_HISTORY_DETAILS[id] : undefined
        setDetail(found ?? { ...DEFAULT_HISTORY_DETAIL, id: id ?? DEFAULT_HISTORY_DETAIL.id })
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
