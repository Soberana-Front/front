import { useCallback, useState } from 'react'

import type { Clinic } from '../components/dashboard/ClinicSelector/ClinicSelector'
import type { Procedure } from '../services/procedureService'

import {
  MOCK_PRICING_DATA,
  type PricingSummaryData,
} from '../components/dashboard/PricingSumary/PricingSumary'

// ========================================
// TIPOS DO WIZARD
// ========================================

/**
 * Representa uma mensagem enviada durante
 * a conversa de precificação.
 */
export interface PricingWizardMessage {
  id: number
  sender: 'user' | 'ia'
  message: string
  timestamp: string
}

/**
 * O resultado da precificação utiliza o tipo
 * que já existe no projeto.
 *
 * Dessa forma não criamos um segundo tipo
 * com os mesmos campos.
 */
export type PricingResult = PricingSummaryData

// ========================================
// CONSTANTES DE NAVEGAÇÃO
// ========================================

/**
 * O wizard possui quatro etapas.
 *
 * 0 - Clínica
 * 1 - Procedimento
 * 2 - Conversa
 * 3 - Resultado
 */
const FIRST_STEP = 0
const LAST_STEP = 3

// ========================================
// HOOK PRINCIPAL
// ========================================

/**
 * Hook responsável por centralizar o estado
 * e a lógica principal do wizard de precificação.
 *
 * A ideia é evitar que o PricingWizard precise
 * controlar vários useState diretamente.
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
  // MENSAGENS DA CONVERSA
  // ========================================

  /**
   * A primeira mensagem é criada pelo próprio
   * hook para que o histórico já esteja disponível
   * desde o início da etapa de conversa.
   */
  const [chatMessages, setChatMessages] = useState<
    PricingWizardMessage[]
  >([
    {
      id: 1,
      sender: 'ia',
      message:
        'Olá! Vamos precificar seu procedimento. Me conte mais sobre os custos envolvidos...',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])

  // ========================================
  // RESULTADO DA PRECIFICAÇÃO
  // ========================================

  /**
   * O resultado começa como null porque
   * o cálculo ainda não foi executado.
   */
  const [pricingResult, setPricingResult] =
    useState<PricingResult | null>(null)

  // ========================================
  // ESTADO DE CARREGAMENTO
  // ========================================

  const [isLoading, setIsLoading] = useState(false)

  // ========================================
  // NAVEGAÇÃO
  // ========================================

  /**
   * Avança uma etapa.
   *
   * Math.min impede que currentStep ultrapasse
   * a última etapa disponível.
   */
  const nextStep = useCallback(() => {
    setCurrentStep((step) =>
      Math.min(step + 1, LAST_STEP),
    )
  }, [])

  /**
   * Volta uma etapa.
   *
   * Math.max impede que currentStep fique
   * abaixo da primeira etapa.
   */
  const prevStep = useCallback(() => {
    setCurrentStep((step) =>
      Math.max(step - 1, FIRST_STEP),
    )
  }, [])

  /**
   * Vai diretamente para uma etapa específica.
   *
   * Valores fora do intervalo 0-3 são ignorados.
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
   * Define a clínica atualmente selecionada.
   */
  const selectClinic = useCallback((clinic: Clinic) => {
    setSelectedClinic(clinic)
  }, [])

  // ========================================
  // PROCEDIMENTO
  // ========================================

  /**
   * Define o procedimento atualmente selecionado.
   */
  const selectProcedure = useCallback(
    (procedure: Procedure) => {
      setSelectedProcedure(procedure)
    },
    [],
  )

  // ========================================
  // CHAT
  // ========================================

  /**
   * Adiciona uma nova mensagem ao histórico
   * da conversa.
   */
  const addChatMessage = useCallback(
    (message: PricingWizardMessage) => {
      setChatMessages((messages) => [
        ...messages,
        message,
      ])
    },
    [],
  )

  /**
   * Remove todas as mensagens e inicia novamente
   * a conversa com a mensagem inicial da IA.
   */
  const resetChat = useCallback(() => {
    setChatMessages([
      {
        id: 1,
        sender: 'ia',
        message:
          'Olá! Vamos precificar seu procedimento. Me conte mais sobre os custos envolvidos...',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
  }, [])

  // ========================================
  // VALIDAÇÃO
  // ========================================

  /**
   * Valida a etapa atualmente selecionada.
   *
   * Etapa 0:
   * precisa ter uma clínica.
   *
   * Etapa 1:
   * precisa ter um procedimento.
   *
   * Etapa 2:
   * precisa ter uma interação do usuário
   * na conversa.
   *
   * Etapa 3:
   * precisa ter um resultado calculado.
   */
  const validateCurrentStep = useCallback(() => {
    switch (currentStep) {
      case 0:
        return selectedClinic !== null

      case 1:
        return selectedProcedure !== null

      case 2:
        return chatMessages.some(
          (message) => message.sender === 'user',
        )

      case 3:
        return pricingResult !== null

      default:
        return false
    }
  }, [
    currentStep,
    selectedClinic,
    selectedProcedure,
    chatMessages,
    pricingResult,
  ])

  // ========================================
  // CÁLCULO MOCKADO
  // ========================================

  /**
   * Executa o cálculo mockado da precificação.
   *
   * O backend real poderá substituir essa lógica
   * futuramente sem precisar alterar o componente
   * PricingWizard.
   */
  const calculatePricing = useCallback(() => {
    setIsLoading(true)

    window.setTimeout(() => {
      setPricingResult(MOCK_PRICING_DATA)
      setIsLoading(false)
    }, 500)
  }, [])

  // ========================================
  // RESET COMPLETO
  // ========================================

  /**
   * Reinicia todo o wizard.
   */
  const resetWizard = useCallback(() => {
    setCurrentStep(FIRST_STEP)
    setSelectedClinic(null)
    setSelectedProcedure(null)

    setChatMessages([
      {
        id: 1,
        sender: 'ia',
        message:
          'Olá! Vamos precificar seu procedimento. Me conte mais sobre os custos envolvidos...',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])

    setPricingResult(null)
    setIsLoading(false)
  }, [])

  // ========================================
  // RETORNO
  // ========================================

  return {
    // Estado
    currentStep,
    selectedClinic,
    selectedProcedure,
    chatMessages,
    pricingResult,
    isLoading,

    // Navegação
    nextStep,
    prevStep,
    goToStep,

    // Seleções
    selectClinic,
    selectProcedure,

    // Chat
    addChatMessage,
    resetChat,

    // Validação e cálculo
    validateCurrentStep,
    calculatePricing,

    // Reset
    resetWizard,
  }
}

export default usePricingWizard