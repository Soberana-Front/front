// Importa hook de estado do React
import { useState } from 'react'
// Importa componentes de UI já existentes
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'
import { Button } from './Button'

// Props do DeleteConfirmation
export interface DeleteConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string                          // nome do item exibido na mensagem (Critério de Aceite)
  onConfirm: () => void | Promise<void>      // ação de exclusão (mockada por enquanto, na Issue #50)
}

/**
 * Modal de confirmação de exclusão, reutilizável (Issue #49).
 *
 * Fica com a responsabilidade de chamar onConfirm e tratar o resultado:
 * mostra um spinner no botão enquanto executa (isConfirming), e se der
 * erro, exibe a mensagem na própria modal em vez de deixar a Promise
 * rejeitada sem tratamento nenhum. Assim o componente pai (ex: ClinicsPage)
 * só precisa passar a função de exclusão, sem se preocupar com esse controle.
 */
export const DeleteConfirmation = ({
  open,
  onOpenChange,
  itemName,
  onConfirm,
}: DeleteConfirmationProps) => {
  // Controla o estado de "excluindo" (desabilita botões e mostra loading)
  const [isConfirming, setIsConfirming] = useState(false)
  // Guarda uma mensagem de erro caso a exclusão falhe
  const [error, setError] = useState<string | null>(null)

  // Fecha a modal e limpa o erro (chamado ao cancelar ou fechar por fora)
  const handleClose = () => {
    setError(null)
    onOpenChange(false)
  }

  // Executa a exclusão com tratamento de erro
  const handleConfirm = async () => {
    setIsConfirming(true)
    setError(null)

    try {
      await onConfirm()
      // Só fecha a modal se a exclusão deu certo
      onOpenChange(false)
    } catch (err) {
      // Mantém a modal aberta e mostra a mensagem, permitindo tentar de novo
      setError('Não foi possível excluir. Tente novamente.')
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <Modal open={open} onOpenChange={handleClose} size="sm">
      <ModalHeader>Confirmar exclusão</ModalHeader>

      <ModalBody>
        {/* Mensagem dinâmica com o nome do item (Critério de Aceite) */}
        <p className="delete-confirmation-message">
          Tem certeza que deseja excluir <strong>{itemName}</strong>?
        </p>

        {/* Mensagem de erro, exibida somente se a exclusão falhar */}
        {error && <p className="delete-confirmation-error">{error}</p>}
      </ModalBody>

      <ModalFooter>
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={isConfirming}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleConfirm}
          isLoading={isConfirming}
        >
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

DeleteConfirmation.displayName = 'DeleteConfirmation'