import { useState } from 'react'
import { useNavigate } from 'react-router'

import ClinicStep from '../ClinicStep/ClinicStep'
import ProcedureStep from '../ProcedureStep/ProcedureStep'
import ChatConversation from '../ChatConversation/ChatConversation'
import PricingResult from '../PricingResult/PricingResult'

import {
  MOCK_PRICING_DATA,
  type PricingSummaryData,
} from '../PricingSumary/PricingSumary'

import type { Procedure } from '../../../services/procedureService'

import {
  FormSteps,
  type Step,
} from '../../ui/FormSteps'

// ========================================
// ETAPAS DO WIZARD
// ========================================

// Configuração visual das quatro etapas
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
  // Permite redirecionar o usuário ao finalizar
  const navigate = useNavigate()

  // Índice da etapa atual:
  // 0 = Clínica
  // 1 = Procedimento
  // 2 = Conversa
  // 3 = Resultado
  const [currentStep, setCurrentStep] = useState(0)

  // ========================================
  // ESTADO DA CLÍNICA
  // ========================================

  // Guarda a clínica selecionada pelo usuário
  const [selectedClinicId, setSelectedClinicId] =
    useState('')

  // ========================================
  // ESTADO DO PROCEDIMENTO
  // ========================================

  // Guarda o procedimento selecionado
  const [selectedProcedure, setSelectedProcedure] =
    useState<Procedure | null>(null)

  // ========================================
  // ESTADO DA CONVERSA
  // ========================================

  // Indica se a conversa da etapa 3 foi concluída
  const [chatCompleted, setChatCompleted] =
    useState(false)

  // ========================================
  // ESTADO DO RESULTADO
  // ========================================

  // Resultado atual da precificação.
  //
  // Por enquanto utilizamos o mock existente.
  // A integração real poderá substituir este estado
  // posteriormente sem alterar a estrutura do wizard.
  const [pricingResult] =
    useState<PricingSummaryData>(
      MOCK_PRICING_DATA,
    )

  // ========================================
  // NAVEGAÇÃO DO WIZARD
  // ========================================

  // Permite navegar somente para etapas
  // que já foram alcançadas.
  const handleStepClick = (stepIndex: number) => {
    // Não permite pular etapas futuras
    if (stepIndex > currentStep) {
      return
    }

    setCurrentStep(stepIndex)
  }

  // Volta uma etapa
  const handlePrevious = () => {
    setCurrentStep((currentStepValue) =>
      Math.max(currentStepValue - 1, 0),
    )
  }

  // ========================================
  // ETAPA 1 — CLÍNICA
  // ========================================

  const handleClinicNext = (clinicId: string) => {
    // Salva a clínica no estado central
    setSelectedClinicId(clinicId)

    // Avança para a segunda etapa
    setCurrentStep(1)
  }

  // ========================================
  // ETAPA 2 — PROCEDIMENTO
  // ========================================

  const handleProcedureNext = (
    procedure: Procedure,
  ) => {
    // Salva o procedimento no estado central
    setSelectedProcedure(procedure)

    // Avança para a conversa
    setCurrentStep(2)
  }

  // ========================================
  // ETAPA 3 — CONVERSA
  // ========================================

  const handleConversationComplete = () => {
    // Marca a conversa como concluída
    setChatCompleted(true)
  }

  const handleChatNext = () => {
    // Não permite avançar enquanto a conversa
    // não tiver sido concluída
    if (!chatCompleted) {
      return
    }

    // Avança para o resultado
    setCurrentStep(3)
  }

  // ========================================
  // ETAPA 4 — RESULTADO
  // ========================================

  const handleFinish = () => {
    // Finaliza o fluxo e retorna ao dashboard
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
            initialClinicId={selectedClinicId}
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
            data={pricingResult}
            onFinish={handleFinish}
          />
        )}
      </div>

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