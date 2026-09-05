// Importa componentes de UI já existentes
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'
import { Button } from './Button'
import { ProcedureForm } from './ProcedureForm'
// Importa tipos
import type { Procedure } from '../../services/procedureService'
import type { ProcedureFormData } from '../../validations/procedureSchema'

// Props da ProcedureModal
export interface ProcedureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  procedure?: Procedure | null  // presente = modo edição; ausente/null = modo criação
  onSubmit: (data: ProcedureFormData) => void | Promise<void>
  isSubmitting?: boolean
}

/**
 * Modal com o ProcedureForm dentro, reutilizável para criar ou editar (Issue #54).
 *
 * Estrutura idêntica ao ClinicModal (Issue #47). Diferente daquele caso,
 * aqui NÃO foi necessário nenhum "as any" ao montar defaultValues: como o
 * Procedure (procedureService.ts) já usa o mesmo tipo ProcedureCategory
 * que o ProcedureFormData (procedureSchema.ts) desde o início, os dois
 * lados são type-compatible diretamente.
 */
export const ProcedureModal = ({
  open,
  onOpenChange,
  procedure,
  onSubmit,
  isSubmitting = false,
}: ProcedureModalProps) => {
  const isEditMode = Boolean(procedure)
  const formId = 'procedure-form'

  const handleCancel = () => {
    onOpenChange(false)
  }

  // Monta os valores iniciais do formulário a partir do procedimento (modo edição)
  const defaultValues = procedure
    ? {
        name: procedure.name,
        category: procedure.category,
        time: procedure.time,
        description: procedure.description,
      }
    : undefined

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="lg">
      {/* Título dinâmico: "Novo Procedimento" ou "Editar Procedimento" */}
      <ModalHeader>
        {isEditMode ? 'Editar Procedimento' : 'Novo Procedimento'}
      </ModalHeader>

      <ModalBody>
        {/* A key força o formulário a remontar ao trocar de procedimento
            ou ao alternar entre criar/editar, garantindo defaultValues corretos */}
        <ProcedureForm
          key={procedure?.id ?? 'new'}
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

ProcedureModal.displayName = 'ProcedureModal'