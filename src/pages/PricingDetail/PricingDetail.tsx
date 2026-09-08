import React, {
  useEffect,
  useState,
} from 'react'

import {
  ArrowLeft,
  FileDown,
  Loader2,
} from 'lucide-react'

import {
  useNavigate,
  useParams,
} from 'react-router'

import pricingService from '@/services/pricingService'

import { formatCurrency } from '@/utils/formatCurrency'

import type {
  PricingDetail as PricingDetailType,
} from '@/types/pricing'

// ============================================================
// DADOS MOCKADOS
// ============================================================

const MOCK_PRICING_DETAIL: PricingDetailType = {
  id: 'pricing-001',

  clinicId: '1',

  clinicName:
    'Clínica OdontoSoberana',

  procedureId: 'proc-001',

  procedureName:
    'Restauração em Resina',

  materialCost: 85,

  fixedCosts: 120,

  variableCosts: 45,

  hourCost: 150,

  commission: 40,

  taxes: 35,

  margin: 30,

  finalPrice: 650,

  profit: 175,

  createdAt:
    '2026-09-08T10:30:00',

  conversation: [
    {
      id: 'message-001',

      sender: 'ia',

      message:
        'Olá! Vou ajudar você a calcular o preço ideal para esse procedimento.',

      timestamp: '10:30',
    },

    {
      id: 'message-002',

      sender: 'user',

      message:
        'Quero calcular o preço de uma restauração em resina.',

      timestamp: '10:31',
    },

    {
      id: 'message-003',

      sender: 'ia',

      message:
        'Perfeito. Considerei os custos de materiais, custos fixos, custos variáveis, hora clínica, comissão, impostos e margem desejada.',

      timestamp: '10:32',
    },

    {
      id: 'message-004',

      sender: 'user',

      message:
        'A margem desejada para esse procedimento é de 30%.',

      timestamp: '10:33',
    },

    {
      id: 'message-005',

      sender: 'ia',

      message:
        'Com essas informações, o preço final sugerido para o procedimento é de R$ 650,00.',

      timestamp: '10:34',
    },
  ],
}

// ============================================================
// FORMATADORES
// ============================================================

const formatDate = (
  date: string,
): string => {
  const parsedDate = new Date(date)

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return date
  }

  return parsedDate.toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  )
}

const formatPercentage = (
  value: number,
): string => `${value}%`

// ============================================================
// COMPONENTE
// ============================================================

export const PricingDetail: React.FC =
  () => {
    const navigate = useNavigate()

    const { id } =
      useParams<{ id: string }>()

    // --------------------------------------------------------
    // Estado da precificação
    // --------------------------------------------------------

    const [
      pricing,
      setPricing,
    ] = useState<PricingDetailType>(
      MOCK_PRICING_DETAIL,
    )

    // --------------------------------------------------------
    // Estado de carregamento
    // --------------------------------------------------------

    const [
      isLoading,
      setIsLoading,
    ] = useState(true)

    // --------------------------------------------------------
    // Estado de exportação
    // --------------------------------------------------------

    const [
      isExporting,
      setIsExporting,
    ] = useState(false)

    // --------------------------------------------------------
    // Estado de erro
    // --------------------------------------------------------

    const [
      error,
      setError,
    ] = useState<string | null>(
      null,
    )

    // ========================================================
    // BUSCAR PRECIFICAÇÃO
    // ========================================================

    useEffect(() => {
      let isMounted = true

      const loadPricing =
        async () => {
          setIsLoading(true)
          setError(null)

          try {
            // ------------------------------------------------
            // Sem ID: utiliza mock
            // ------------------------------------------------

            if (!id) {
              if (isMounted) {
                setPricing(
                  MOCK_PRICING_DETAIL,
                )
              }

              return
            }

            // ------------------------------------------------
            // Busca pela API
            // ------------------------------------------------

            const data =
              await pricingService.getPricing(
                id,
              )

            if (!isMounted) {
              return
            }

            /**
             * A API pode ainda não possuir
             * o campo conversation.
             *
             * Por isso mantemos a conversa mockada
             * como fallback.
             */
            const apiData =
              data as Partial<PricingDetailType>

            setPricing({
              ...MOCK_PRICING_DETAIL,

              ...apiData,

              id:
                apiData.id ?? id,

              conversation:
                apiData.conversation ??
                MOCK_PRICING_DETAIL.conversation,
            })
          } catch {
            // ------------------------------------------------
            // Fallback para dados mockados
            // ------------------------------------------------

            if (isMounted) {
              setPricing({
                ...MOCK_PRICING_DETAIL,

                id:
                  id ??
                  MOCK_PRICING_DETAIL.id,
              })

              setError(
                'Não foi possível carregar os dados da API. Exibindo dados mockados.',
              )
            }
          } finally {
            if (isMounted) {
              setIsLoading(false)
            }
          }
        }

      void loadPricing()

      return () => {
        isMounted = false
      }
    }, [id])

    // ========================================================
    // EXPORTAR PDF
    // ========================================================

    const handleExportPDF =
      async () => {
        if (
          !pricing.id ||
          isExporting
        ) {
          return
        }

        setIsExporting(true)

        try {
          const pdf =
            await pricingService.exportPDF(
              pricing.id,
            )

          const url =
            URL.createObjectURL(
              pdf,
            )

          const link =
            document.createElement(
              'a',
            )

          link.href = url

          link.download =
            `precificacao-${pricing.id}.pdf`

          document.body.appendChild(
            link,
          )

          link.click()

          link.remove()

          URL.revokeObjectURL(
            url,
          )
        } catch {
          window.alert(
            'A exportação pela API não está disponível no momento.',
          )
        } finally {
          setIsExporting(false)
        }
      }

    // ========================================================
    // LOADING
    // ========================================================

    if (isLoading) {
      return (
        <main className="pricing-detail">
          <div className="pricing-detail__loading">
            <Loader2 className="pricing-detail__loading-icon" />

            <span>
              Carregando precificação...
            </span>
          </div>
        </main>
      )
    }

    // ========================================================
    // RENDER
    // ========================================================

    return (
      <main className="pricing-detail">
        <div className="pricing-detail__container">

          {/* ================================================
              BOTÃO VOLTAR
              ================================================ */}

          <button
            type="button"
            className="pricing-detail__back-button"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowLeft className="h-4 w-4" />

            Voltar
          </button>

          {/* ================================================
              CABEÇALHO
              ================================================ */}

          <header className="pricing-detail__header">
            <div>
              <span className="pricing-detail__step">
                DETALHAMENTO DA PRECIFICAÇÃO
              </span>

              <h1 className="pricing-detail__title">
                {pricing.procedureName}
              </h1>

              <p className="pricing-detail__description">
                Visualize todos os dados e informações utilizados
                na precificação.
              </p>
            </div>

            {/* ==============================================
                EXPORTAR PDF
                ============================================== */}

            <button
              type="button"
              className="pricing-detail__export-button"
              onClick={
                handleExportPDF
              }
              disabled={
                isExporting
              }
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 pricing-detail__spin" />
              ) : (
                <FileDown className="h-4 w-4" />
              )}

              {isExporting
                ? 'Exportando...'
                : 'Exportar PDF'}
            </button>
          </header>

          {/* ================================================
              AVISO DE FALLBACK
              ================================================ */}

          {error && (
            <div
              className="pricing-detail__notice"
              role="status"
            >
              {error}
            </div>
          )}

          {/* ================================================
              INFORMAÇÕES
              ================================================ */}

          <section className="pricing-detail__info-card">

            <div className="pricing-detail__section-header">
              <h2>
                Informações da Precificação
              </h2>
            </div>

            <div className="pricing-detail__info-grid">

              <div className="pricing-detail__info-item">
                <span>
                  Clínica
                </span>

                <strong>
                  {pricing.clinicName}
                </strong>
              </div>

              <div className="pricing-detail__info-item">
                <span>
                  Procedimento
                </span>

                <strong>
                  {pricing.procedureName}
                </strong>
              </div>

              <div className="pricing-detail__info-item">
                <span>
                  Data da precificação
                </span>

                <strong>
                  {formatDate(
                    pricing.createdAt,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__info-item">
                <span>
                  ID da precificação
                </span>

                <strong>
                  {pricing.id}
                </strong>
              </div>

            </div>
          </section>

          {/* ================================================
              CONVERSA
              ================================================ */}

          <section className="pricing-detail__conversation-card">

            <div className="pricing-detail__section-header">
              <div>
                <h2>
                  Conversa com a Soberana AI
                </h2>

                <p>
                  Histórico completo da conversa utilizada
                  na precificação.
                </p>
              </div>
            </div>

            <div className="pricing-detail__timeline">

              {pricing.conversation.map(
                (message) => (
                  <div
                    key={message.id}
                    className={`pricing-detail__timeline-item ${
                      message.sender ===
                      'user'
                        ? 'pricing-detail__timeline-item--user'
                        : 'pricing-detail__timeline-item--ia'
                    }`}
                  >

                    <div className="pricing-detail__timeline-marker">
                      {message.sender ===
                      'ia'
                        ? 'AI'
                        : 'Você'}
                    </div>

                    <div className="pricing-detail__message">

                      <div className="pricing-detail__message-header">

                        <strong>
                          {message.sender ===
                          'ia'
                            ? 'Soberana AI'
                            : 'Você'}
                        </strong>

                        <span>
                          {
                            message.timestamp
                          }
                        </span>

                      </div>

                      <p>
                        {
                          message.message
                        }
                      </p>

                    </div>

                  </div>
                ),
              )}

            </div>
          </section>

          {/* ================================================
              RESULTADO
              ================================================ */}

          <section className="pricing-detail__result-card">

            <div className="pricing-detail__section-header">
              <div>

                <h2>
                  Resultado Final
                </h2>

                <p>
                  Detalhamento dos principais valores
                  da precificação.
                </p>

              </div>
            </div>

            <div className="pricing-detail__result-grid">

              <div className="pricing-detail__result-item">
                <span>
                  Custo de materiais
                </span>

                <strong>
                  {formatCurrency(
                    pricing.materialCost,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Custos fixos
                </span>

                <strong>
                  {formatCurrency(
                    pricing.fixedCosts,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Custos variáveis
                </span>

                <strong>
                  {formatCurrency(
                    pricing.variableCosts,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Custo por hora
                </span>

                <strong>
                  {formatCurrency(
                    pricing.hourCost,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Comissão
                </span>

                <strong>
                  {formatPercentage(
                    pricing.commission,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Impostos
                </span>

                <strong>
                  {formatPercentage(
                    pricing.taxes,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Margem
                </span>

                <strong>
                  {formatPercentage(
                    pricing.margin,
                  )}
                </strong>
              </div>

              <div className="pricing-detail__result-item">
                <span>
                  Lucro
                </span>

                <strong>
                  {formatCurrency(
                    pricing.profit,
                  )}
                </strong>
              </div>

            </div>

            {/* ==============================================
                PREÇO FINAL
                ============================================== */}

            <div className="pricing-detail__final-price">

              <span>
                Preço Final
              </span>

              <strong>
                {formatCurrency(
                  pricing.finalPrice,
                )}
              </strong>

            </div>

          </section>

        </div>
      </main>
    )
  }

export default PricingDetail