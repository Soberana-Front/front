import { useCallback, useState } from 'react'

import type {
  Clinic,
} from '../components/dashboard/ClinicSelector/ClinicSelector'

import type {
  Procedure,
} from '../services/procedureService'

import {
  MOCK_PRICING_DATA,
  type PricingSummaryData,
} from '../components/dashboard/PricingSumary/PricingSumary'

import {
  usePricingChat,
} from './usePricingChat'

// ========================================
// TIPOS DO WIZARD
// ========================================

/**
 * Tipo utilizado para representar o resultado
 * da precificação.
 *
 * Reutilizamos o tipo já existente no projeto
 * para evitar duplicação de interfaces.
 */
export type PricingResult = PricingSummaryData

// ========================================
// CONSTANTES
// ========================================

/**
 * Primeira etapa do wizard.
 */
const FIRST_STEP = 0

/**
 * Última etapa do wizard.
 *
 * 0 - Clínica
 * 1 - Procedimento
 * 2 - Conversa
 * 3 - Resultado
 */
const LAST_STEP = 3

// ========================================
// HOOK PRINCIPAL
// ========================================

/**
 * Hook responsável pelo estado geral do
 * wizard de precificação.
 *
 * A lógica específica do chat é delegada
 * ao usePricingChat.
 */
export function usePricingWizard() {
  // ========================================
  // ETAPA ATUAL
  // ========================================

  const [currentStep, setCurrentStep] =
    useState<number>(FIRST_STEP)

  // ========================================
  // CLÍNICA SELECIONADA
  // ========================================

  const [selectedClinic, setSelectedClinic] =
    useState<Clinic | null>(null)

  // ========================================
  // PROCEDIMENTO SELECIONADO
  // ========================================

  const [selectedProcedure, setSelectedProcedure] =
    useState<Procedure | null>(null)

  // ========================================
  // RESULTADO DA PRECIFICAÇÃO
  // ========================================

  const [pricingResult, setPricingResult] =
    useState<PricingResult | null>(null)

  // ========================================
  // CARREGAMENTO
  // ========================================

  const [isLoading, setIsLoading] = useState(false)

  // ========================================
  // CHAT
  // ========================================

  /**
   * A lógica da conversa fica no hook
   * usePricingChat.
   *
   * O wizard apenas expõe esses dados para
   * os componentes que precisam deles.
   */
  const {
    messages: chatMessages,
    isTyping,
    isCompleted: isChatCompleted,
    sendMessage,
    addItem,
    finishConversation,
    resetChat,
  } = usePricingChat()

  // ========================================
  // NAVEGAÇÃO
  // ========================================

  /**
   * Avança uma etapa.
   *
   * Nunca ultrapassa a última etapa.
   */
  const nextStep = useCallback(() => {
    setCurrentStep((step) =>
      Math.min(step + 1, LAST_STEP),
    )
  }, [])

  /**
   * Volta uma etapa.
   *
   * Nunca ultrapassa a primeira etapa.
   */
  const prevStep = useCallback(() => {
    setCurrentStep((step) =>
      Math.max(step - 1, FIRST_STEP),
    )
  }, [])

  /**
   * Navega diretamente para uma etapa válida.
   */
  const goToStep = useCallback((step: number) => {
    if (step < FIRST_STEP || step > LAST_STEP) {
      return
    }

    setCurrentStep(step)
  }, [])

  // ========================================
  // CLÍNICA
  // ========================================

  /**
   * Armazena a clínica selecionada.
   */
  const selectClinic = useCallback(
    (clinic: Clinic) => {
      setSelectedClinic(clinic)
    },
    [],
  )

  // ========================================
  // PROCEDIMENTO
  // ========================================

  /**
   * Armazena o procedimento selecionado.
   */
  const selectProcedure = useCallback(
    (procedure: Procedure) => {
      setSelectedProcedure(procedure)
    },
    [],
  )

  // ========================================
  // VALIDAÇÃO
  // ========================================

  /**
   * Valida a etapa atualmente selecionada.
   */
  const validateCurrentStep = useCallback(() => {
    switch (currentStep) {
      // Etapa da clínica.
      case 0:
        return selectedClinic !== null

      // Etapa do procedimento.
      case 1:
        return selectedProcedure !== null

      // Etapa da conversa.
      case 2:
        return isChatCompleted

      // Etapa do resultado.
      case 3:
        return pricingResult !== null

      default:
        return false
    }
  }, [
    currentStep,
    selectedClinic,
    selectedProcedure,
    isChatCompleted,
    pricingResult,
  ])

  // ========================================
  // CÁLCULO MOCKADO
  // ========================================

  /**
   * Simula o cálculo da precificação.
   *
   * O mock será posteriormente substituído
   * pela integração com o backend.
   */
  const calculatePricing = useCallback(() => {
    setIsLoading(true)

    window.setTimeout(() => {
      setPricingResult(MOCK_PRICING_DATA)
      setIsLoading(false)
    }, 500)
  }, [])

  // ========================================
  // RESET
  // ========================================

  /**
   * Reinicia completamente o wizard.
   */
  const resetWizard = useCallback(() => {
    setCurrentStep(FIRST_STEP)
    setSelectedClinic(null)
    setSelectedProcedure(null)
    setPricingResult(null)
    setIsLoading(false)

    // Também reinicia a conversa.
    resetChat()
  }, [resetChat])

  // ========================================
  // RETORNO
  // ========================================

  return {
    // Estado do wizard.
    currentStep,
    selectedClinic,
    selectedProcedure,

    // Estado do chat.
    chatMessages,
    isTyping,
    isChatCompleted,

    // Resultado.
    pricingResult,

    // Carregamento.
    isLoading,

    // Navegação.
    nextStep,
    prevStep,
    goToStep,

    // Seleções.
    selectClinic,
    selectProcedure,

    // Chat.
    sendMessage,
    addItem,
    finishConversation,
    resetChat,

    // Validação e cálculo.
    validateCurrentStep,
    calculatePricing,

    // Reset completo.
    resetWizard,
  }
}

export default usePricingWizard