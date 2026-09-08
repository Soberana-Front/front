import { useState } from 'react'

import { Building2 } from 'lucide-react'

// ========================================
// INTERFACE DE DADOS DA CLÍNICA
// ========================================

export interface Clinic {
  id: string
  name: string
  city?: string
  type?: string
  materialsSupplier?: string
  remunerationType?: string
  commission?: string
}

// ========================================
// PROPS DO COMPONENTE
// ========================================

interface ClinicSelectorProps {
  clinics?: Clinic[]
  selectedClinicId?: string

  /**
   * Mantém o callback original do componente.
   *
   * Outros componentes do projeto podem continuar
   * recebendo somente o ID da clínica.
   */
  onSelectClinic?: (clinicId: string) => void

  /**
   * Novo callback opcional.
   *
   * Permite que o componente que precisar dos
   * dados completos receba o objeto Clinic.
   *
   * É opcional para não quebrar os usos existentes.
   */
  onSelectClinicData?: (clinic: Clinic) => void
}

// ========================================
// DADOS MOCKADOS
// ========================================

const MOCK_CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'Clínica OdontoSoberana',
    city: 'São Paulo - SP',
    type: 'Odontologia Geral',
    materialsSupplier: 'Próprio',
    remunerationType: 'Porcentagem',
    commission: '40%',
  },
  {
    id: '2',
    name: 'Clínica Sorriso Perfeito',
    city: 'Rio de Janeiro - RJ',
    type: 'Estética',
    materialsSupplier: 'Clínica',
    remunerationType: 'Hora Fixa',
    commission: '0%',
  },
]

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export default function ClinicSelector({
  clinics = MOCK_CLINICS,
  selectedClinicId,
  onSelectClinic,
  onSelectClinicData,
}: ClinicSelectorProps) {
  // Estado interno mantido para preservar
  // o comportamento original do componente.
  const [internalSelectedId, setInternalSelectedId] =
    useState<string>(selectedClinicId || '')

  /**
   * Quando selectedClinicId é fornecido pelo componente
   * pai, ele passa a ser a fonte principal da seleção.
   *
   * Caso contrário, usamos o estado interno.
   */
  const activeId =
    selectedClinicId !== undefined
      ? selectedClinicId
      : internalSelectedId

  // Procura os dados completos da clínica selecionada.
  const selectedClinic = clinics.find(
    (clinic) => clinic.id === activeId,
  )

  // ========================================
  // ALTERAÇÃO DA SELEÇÃO
  // ========================================

  const handleChange = (id: string) => {
    setInternalSelectedId(id)

    // Mantém o comportamento original.
    onSelectClinic?.(id)

    /**
     * Procura o objeto completo para componentes
     * que utilizam os dados da clínica.
     */
    const clinic = clinics.find(
      (currentClinic) => currentClinic.id === id,
    )

    if (clinic) {
      onSelectClinicData?.(clinic)
    }
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================

  return (
    <div className="clinic-selector-card">
      {/* Título do seletor com indicador verde */}
      <div className="clinic-selector-title">
        <span className="clinic-selector-dot" />

        CLÍNICA SELECIONADA
      </div>

      {/* SELECT DROPDOWN */}
      <div className="clinic-selector-select-wrapper">
        <select
          value={activeId}
          onChange={(e) =>
            handleChange(e.target.value)
          }
          className="clinic-selector-select"
        >
          <option value="" disabled>
            Selecione uma clínica
          </option>

          {clinics.map((clinic) => (
            <option
              key={clinic.id}
              value={clinic.id}
            >
              {clinic.name}
            </option>
          ))}
        </select>

        {/* Ícone decorativo */}
        <div className="clinic-selector-icon">
          <Building2 className="w-4 h-4" />
        </div>
      </div>

      {/* DETALHES DA CLÍNICA SELECIONADA */}
      <div className="clinic-selector-details">
        <div>
          <span className="clinic-selector-label">
            Nome da Clínica
          </span>

          <span className="clinic-selector-value">
            {selectedClinic?.name || '—'}
          </span>
        </div>

        <div>
          <span className="clinic-selector-label">
            Cidade
          </span>

          <span className="clinic-selector-value">
            {selectedClinic?.city || '—'}
          </span>
        </div>

        <div>
          <span className="clinic-selector-label">
            Tipo
          </span>

          <span className="clinic-selector-value">
            {selectedClinic?.type || '—'}
          </span>
        </div>

        <div>
          <span className="clinic-selector-label">
            Quem fornece materiais
          </span>

          <span className="clinic-selector-value">
            {selectedClinic?.materialsSupplier || '—'}
          </span>
        </div>

        <div>
          <span className="clinic-selector-label">
            Forma de remuneração
          </span>

          <span className="clinic-selector-value">
            {selectedClinic?.remunerationType || '—'}
          </span>
        </div>

        <div>
          <span className="clinic-selector-label">
            Comissão
          </span>

          <span className="clinic-selector-value">
            {selectedClinic?.commission || '—'}
          </span>
        </div>
      </div>
    </div>
  )
}