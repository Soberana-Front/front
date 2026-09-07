import { useState } from 'react'

import ClinicSelector from '../ClinicSelector/ClinicSelector'

// Props da primeira etapa do wizard
interface ClinicStepProps {
  // ID da clínica anteriormente selecionada
  initialClinicId?: string

  // Callback executado ao avançar para a próxima etapa
  onNext?: (clinicId: string) => void
}

// Primeira etapa do fluxo de nova precificação
//
// Responsabilidades:
// - Exibir o seletor de clínicas existente
// - Controlar a clínica selecionada
// - Validar a seleção
// - Entregar a clínica selecionada ao PricingWizard
export default function ClinicStep({
  initialClinicId = '',
  onNext,
}: ClinicStepProps) {
  // Guarda a clínica selecionada nesta etapa
  const [selectedClinicId, setSelectedClinicId] =
    useState(initialClinicId)

  // Guarda uma mensagem de validação
  const [validationError, setValidationError] =
    useState<string | null>(null)

  // Atualiza a clínica selecionada
  const handleSelectClinic = (clinicId: string) => {
    setSelectedClinicId(clinicId)
    setValidationError(null)
  }

  // Valida a seleção antes de avançar
  const handleNext = () => {
    if (!selectedClinicId) {
      setValidationError(
        'Selecione uma clínica para continuar.',
      )

      return
    }

    // Envia o ID selecionado para o componente principal
    onNext?.(selectedClinicId)
  }

  return (
    <section className="clinic-step">
      {/* Cabeçalho da etapa */}
      <header className="clinic-step-header">
        <p className="clinic-step-indicator">
          Etapa 1
        </p>

        <h2 className="clinic-step-title">
          Selecione a clínica
        </h2>

        <p className="clinic-step-description">
          Escolha a clínica onde o procedimento será precificado.
        </p>
      </header>

      {/* Reutiliza o ClinicSelector já existente no projeto */}
      <ClinicSelector
        selectedClinicId={selectedClinicId}
        onSelectClinic={handleSelectClinic}
      />

      {/* Mensagem de validação */}
      {validationError && (
        <p
          role="alert"
          className="clinic-step-error"
        >
          {validationError}
        </p>
      )}

      {/* Ação para avançar */}
      <div className="clinic-step-navigation">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedClinicId}
          className="pagination-button"
        >
          Próximo
        </button>
      </div>
    </section>
  )
}