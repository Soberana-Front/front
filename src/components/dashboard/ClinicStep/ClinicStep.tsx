import { useState } from 'react'

import ClinicSelector from '../ClinicSelector/ClinicSelector'
import type { Clinic } from '../ClinicSelector/ClinicSelector'

// ========================================
// PROPS
// ========================================

interface ClinicStepProps {
  /**
   * ID da clínica anteriormente selecionada.
   *
   * Mantemos essa prop para preservar o funcionamento
   * atual do wizard quando o usuário volta para essa etapa.
   */
  initialClinicId?: string

  /**
   * Agora o callback entrega a clínica completa.
   *
   * Isso permite que o usePricingWizard mantenha:
   *
   * selectedClinic: Clinic | null
   */
  onNext?: (clinic: Clinic) => void
}

// ========================================
// COMPONENTE
// ========================================

export default function ClinicStep({
  initialClinicId = '',
  onNext,
}: ClinicStepProps) {
  // Guarda a clínica completa selecionada.
  const [selectedClinic, setSelectedClinic] =
    useState<Clinic | null>(null)

  // Guarda uma mensagem de validação.
  const [validationError, setValidationError] =
    useState<string | null>(null)

  // ========================================
  // SELEÇÃO DA CLÍNICA
  // ========================================

  const handleSelectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic)
    setValidationError(null)
  }

  // ========================================
  // AVANÇAR
  // ========================================

  const handleNext = () => {
    if (!selectedClinic) {
      setValidationError(
        'Selecione uma clínica para continuar.',
      )

      return
    }

    // Entrega a clínica completa ao PricingWizard.
    onNext?.(selectedClinic)
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================

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

      {/* Reutiliza o seletor existente */}
      <ClinicSelector
        selectedClinicId={
          selectedClinic?.id || initialClinicId
        }
        onSelectClinicData={handleSelectClinic}
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
          disabled={!selectedClinic}
          className="pagination-button"
        >
          Próximo
        </button>
      </div>
    </section>
  )
}