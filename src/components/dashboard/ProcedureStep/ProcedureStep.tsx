import { Check, Clock } from 'lucide-react'
import { useState } from 'react'

import { useProcedures } from '../../../hooks/useProcedures'
import type { Procedure } from '../../../services/procedureService'

/**
 * Props recebidas pelo ProcedureStep.
 *
 * onNext:
 * Função executada quando o usuário seleciona um procedimento
 * e clica no botão "Próximo".
 *
 * initialProcedureId:
 * Permite iniciar a etapa com um procedimento previamente selecionado.
 * Isso será útil quando o wizard precisar recuperar o estado anterior.
 */
interface ProcedureStepProps {
  onNext?: (procedure: Procedure) => void
  initialProcedureId?: string
}

/**
 * Segunda etapa do wizard de precificação.
 *
 * Responsabilidades:
 * - Carregar os procedimentos disponíveis.
 * - Permitir a seleção de um procedimento.
 * - Destacar visualmente o procedimento selecionado.
 * - Impedir o avanço enquanto nenhum procedimento estiver selecionado.
 * - Entregar o procedimento selecionado para a próxima etapa.
 *
 * A busca dos procedimentos é feita através do hook existente
 * useProcedures, evitando duplicação de lógica.
 */
export default function ProcedureStep({
  onNext,
  initialProcedureId = '',
}: ProcedureStepProps) {
  // Hook responsável por fornecer os procedimentos mockados existentes.
  const { procedures, isLoading, error } = useProcedures()

  // Guarda somente o ID do procedimento selecionado.
  const [selectedProcedureId, setSelectedProcedureId] =
    useState(initialProcedureId)

  // Guarda a mensagem de validação da etapa.
  const [validationError, setValidationError] = useState<string | null>(null)

  /**
   * Encontra o objeto completo do procedimento selecionado.
   *
   * Dessa forma, o componente mantém apenas o ID no estado,
   * mas consegue entregar o objeto completo ao avançar.
   */
  const selectedProcedure = procedures.find(
    (procedure) => procedure.id === selectedProcedureId,
  )

  /**
   * Seleciona um procedimento.
   *
   * Ao selecionar uma opção, qualquer mensagem de validação
   * anteriormente apresentada é removida.
   */
  const handleSelect = (procedureId: string) => {
    setSelectedProcedureId(procedureId)
    setValidationError(null)
  }

  /**
   * Valida a seleção e avança para a próxima etapa.
   *
   * A validação também existe aqui além do disabled do botão,
   * garantindo que a regra seja respeitada mesmo caso
   * handleNext seja chamado por outro meio futuramente.
   */
  const handleNext = () => {
    // Não permite avançar sem um procedimento selecionado.
    if (!selectedProcedure) {
      setValidationError(
        'Selecione um procedimento para continuar.',
      )

      return
    }

    // Envia o procedimento selecionado para o componente pai.
    onNext?.(selectedProcedure)
  }

  // Estado de carregamento dos procedimentos.
  if (isLoading) {
    return (
      <section className="procedure-step">
        <div className="procedure-step-header">
          <p className="procedure-step-indicator">
            Etapa 2
          </p>

          <h2 className="procedure-step-title">
            Selecione o procedimento
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          Carregando procedimentos...
        </p>
      </section>
    )
  }

  // Estado de erro ao carregar os procedimentos.
  if (error) {
    return (
      <section className="procedure-step">
        <div className="procedure-step-header">
          <p className="procedure-step-indicator">
            Etapa 2
          </p>

          <h2 className="procedure-step-title">
            Selecione o procedimento
          </h2>
        </div>

        <p className="procedure-step-error">
          {error}
        </p>
      </section>
    )
  }

  return (
    <section className="procedure-step">
      {/* Cabeçalho da segunda etapa */}
      <header className="procedure-step-header">
        <p className="procedure-step-indicator">
          Etapa 2
        </p>

        <h2 className="procedure-step-title">
          Selecione o procedimento
        </h2>

        <p className="procedure-step-description">
          Escolha o procedimento que será utilizado na precificação.
        </p>
      </header>

      {/* Lista de procedimentos disponíveis */}
      <div className="procedure-step-grid">
        {procedures.map((procedure) => {
          // Verifica se este procedimento é o atualmente selecionado.
          const isSelected =
            procedure.id === selectedProcedureId

          return (
            <button
              key={procedure.id}
              type="button"
              onClick={() => handleSelect(procedure.id)}
              aria-pressed={isSelected}
              className={[
                'procedure-step-card',
                isSelected
                  ? 'procedure-step-card-selected'
                  : '',
              ].join(' ')}
            >
              {/* Indicador visual do procedimento selecionado */}
              {isSelected && (
                <span className="procedure-step-selected-icon">
                  <Check className="h-4 w-4" />
                </span>
              )}

              {/* Nome do procedimento */}
              <h3 className="procedure-step-card-title">
                {procedure.name}
              </h3>

              {/* Categoria */}
              <p className="procedure-step-card-category">
                {procedure.category}
              </p>

              {/* Descrição, quando disponível */}
              {procedure.description && (
                <p className="procedure-step-card-description">
                  {procedure.description}
                </p>
              )}

              {/* Tempo estimado do procedimento */}
              <div className="procedure-step-card-meta">
                <Clock className="h-4 w-4" />

                <span>
                  {procedure.time} minutos
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Mensagem apresentada quando a validação falhar */}
      {validationError && (
        <p
          role="alert"
          className="procedure-step-error"
        >
          {validationError}
        </p>
      )}

      {/* Navegação da etapa */}
      <div className="procedure-step-navigation">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedProcedure}
          className="pagination-button"
        >
          Próximo
        </button>
      </div>
    </section>
  )
}