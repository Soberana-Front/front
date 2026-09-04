// Importa componentes de UI já existentes
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'
import { Button } from './Button'
import { ClinicForm } from './ClinicForm'
// Importa tipos e utilitário de formatação de moeda
import type { Clinic } from '../../services/clinicService'
import type { ClinicFormOutput } from '../../validations/clinicSchema'
import { formatCurrency } from '../../utils/formatCurrency'

// Props da ClinicModal
export interface ClinicModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clinic?: Clinic | null                          // presente = modo edição; ausente/null = modo criação
  onSubmit: (data: ClinicFormOutput) => void | Promise<void>
  isSubmitting?: boolean                            // desabilita os botões durante o envio
}

/**
 * Modal com o ClinicForm dentro, reutilizável para criar ou editar (Issue #47).
 *
 * O título e os valores iniciais mudam conforme a presença de `clinic`.
 * O botão "Salvar" fica no rodapé (ModalFooter), fora da tag <form>, e
 * dispara o submit através do atributo form={formId} — por isso o
 * ClinicForm expõe essa prop.
 */
export const ClinicModal = ({
  open,
  onOpenChange,
  clinic,
  onSubmit,
  isSubmitting = false,
}: ClinicModalProps) => {
  const isEditMode = Boolean(clinic)
  const formId = 'clinic-form'

  // Fecha a modal ao clicar em "Cancelar"
  const handleCancel = () => {
    onOpenChange(false)
  }

  // Monta os valores iniciais do formulário a partir da clínica (modo edição)
  // Convertendo rent/costs de number para a string formatada que o Input espera
  const defaultValues = clinic
    ? {
        name: clinic.name,
        city: clinic.city,
        // clinic.state e clinic.type agora já são BrazilianState/ClinicType
      // (mesmos tipos literais do formulário), então não precisam mais de "as any"
        state: clinic.state,
        address: clinic.address,
        type: clinic.type,
        commission: clinic.commission,
        rent: formatCurrency(clinic.rent),
        costs: formatCurrency(clinic.costs),
      }
    : undefined

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="lg">
      {/* Título dinâmico: "Nova Clínica" ou "Editar Clínica" */}
      <ModalHeader>
        {isEditMode ? 'Editar Clínica' : 'Nova Clínica'}
      </ModalHeader>

      <ModalBody>
        {/* A key força o formulário a remontar (resetar) ao trocar de clínica
            ou ao alternar entre criar/editar, garantindo defaultValues corretos */}
        <ClinicForm
          key={clinic?.id ?? 'new'}
          formId={formId}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form={formId}
          isLoading={isSubmitting}
        >
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

ClinicModal.displayName = 'ClinicModal'