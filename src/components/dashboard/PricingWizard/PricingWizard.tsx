import { useNavigate } from 'react-router'

import ClinicStep from '../ClinicStep/ClinicStep'
import ProcedureStep from '../ProcedureStep/ProcedureStep'
import ChatConversation from '../ChatConversation/ChatConversation'
import PricingResult from '../PricingResult/PricingResult'

import {
  FormSteps,
  type Step,
} from '../../ui/FormSteps'

import {
  usePricingWizard,
} from '../../../hooks/usePricingWizard'

// ========================================
// ETAPAS DO WIZARD
// ========================================

// Configuração visual das quatro etapas.
const WIZARD_STEPS: Step[] = [
  {
    label: 'Clínica',
    value: 1,
  },
  {
    label: 'Procedimento',
    value: 2,
  },
  {
    label: 'Conversa',
    value: 3,
  },
  {
    label: 'Resultado',
    value: 4,
  },
]

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

// Componente responsável por integrar
// todo o fluxo da nova precificação.
export default function PricingWizard() {
  // Permite redirecionar o usuário ao finalizar.
  const navigate = useNavigate()

  // ========================================
  // ESTADO CENTRAL DO WIZARD
  // ========================================

  /**
   * Toda a lógica de estado agora vem
   * do hook usePricingWizard.
   *
   * Isso remove a necessidade de manter
   * vários useState dentro deste componente.
   */
  const {
    currentStep,
    selectedClinic,
    selectedProcedure,
    chatMessages,
    pricingResult,
    isLoading,

    goToStep,

    selectClinic,
    selectProcedure,

    addChatMessage,

    calculatePricing,
  } = usePricingWizard()

  // ========================================
  // NAVEGAÇÃO
  // ========================================

  /**
   * Permite navegar somente para etapas
   * que já foram alcançadas.
   */
  const handleStepClick = (stepIndex: number) => {
    // Não permite pular etapas futuras.
    if (stepIndex > currentStep) {
      return
    }

    goToStep(stepIndex)
  }

  /**
   * Volta uma etapa.
   */
  const handlePrevious = () => {
    goToStep(currentStep - 1)
  }

  // ========================================
  // ETAPA 1 — CLÍNICA
  // ========================================

  const handleClinicNext = (
    clinic: typeof selectedClinic,
  ) => {
    if (!clinic) {
      return
    }

    // Salva a clínica no hook.
    selectClinic(clinic)

    // Avança para a etapa seguinte.
    goToStep(1)
  }

  // ========================================
  // ETAPA 2 — PROCEDIMENTO
  // ========================================

  const handleProcedureNext = (
    procedure: typeof selectedProcedure,
  ) => {
    if (!procedure) {
      return
    }

    // Salva o procedimento no hook.
    selectProcedure(procedure)

    // Avança para a conversa.
    goToStep(2)
  }

  // ========================================
  // ETAPA 3 — CONVERSA
  // ========================================

  const handleConversationComplete = () => {
    /**
     * O ChatConversation já controla a conclusão
     * visual da conversa.
     *
     * Aqui apenas mantemos o callback disponível
     * para o fluxo do wizard.
     */
  }

  const handleChatNext = () => {
    /**
     * O próprio ChatConversation só chama
     * onNext quando a conversa está concluída.
     *
     * Portanto podemos avançar diretamente.
     */
    calculatePricing()

    goToStep(3)
  }

  // ========================================
  // ETAPA 4 — RESULTADO
  // ========================================

  const handleFinish = () => {
    // Finaliza o fluxo e retorna ao dashboard.
    navigate('/dashboard')
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================

  return (
    <section className="pricing-wizard">
      {/* Cabeçalho da página */}
      <header className="pricing-wizard-header">
        <div>
          <p className="pricing-wizard-eyebrow">
            Nova Precificação
          </p>

          <h1 className="pricing-wizard-title">
            Criar nova precificação
          </h1>

          <p className="pricing-wizard-description">
            Siga as etapas para chegar ao preço ideal
            do seu procedimento.
          </p>
        </div>
      </header>

      {/* Indicador das quatro etapas */}
      <div className="pricing-wizard-steps">
        <FormSteps
          steps={WIZARD_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Conteúdo da etapa atual */}
      <div className="pricing-wizard-content">

        {/* ====================================
            ETAPA 1 — CLÍNICA
            ==================================== */}

        {currentStep === 0 && (
          <ClinicStep
            initialClinicId={
              selectedClinic?.id
            }
            onNext={handleClinicNext}
          />
        )}

        {/* ====================================
            ETAPA 2 — PROCEDIMENTO
            ==================================== */}

        {currentStep === 1 && (
          <ProcedureStep
            initialProcedureId={
              selectedProcedure?.id
            }
            onNext={handleProcedureNext}
          />
        )}

        {/* ====================================
            ETAPA 3 — CONVERSA COM A IA
            ==================================== */}

        {currentStep === 2 && (
          <ChatConversation
            messages={chatMessages}
            onAddMessage={addChatMessage}
            onNext={handleChatNext}
            onConversationComplete={
              handleConversationComplete
            }
          />
        )}

        {/* ====================================
            ETAPA 4 — RESULTADO
            ==================================== */}

        {currentStep === 3 && (
          <PricingResult
            data={pricingResult || undefined}
            onFinish={handleFinish}
          />
        )}
      </div>

      {/* Indicador de carregamento do cálculo.
          Mantido fora das etapas para não alterar
          o layout existente. */}
      {isLoading && (
        <p className="pricing-wizard-loading">
          Calculando precificação...
        </p>
      )}

      {/* Botão voltar.
          Não aparece na primeira etapa. */}
      {currentStep > 0 && (
        <div className="pricing-wizard-navigation">
          <button
            type="button"
            onClick={handlePrevious}
            className="pricing-wizard-back-button"
          >
            Voltar
          </button>
        </div>
      )}
    </section>
  )
}