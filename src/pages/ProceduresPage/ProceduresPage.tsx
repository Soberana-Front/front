// Importa hooks do React e ícone
import { useState } from 'react'
import { Plus } from 'lucide-react'
// Importa layout do dashboard e componentes de UI já criados
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout'
import { SearchBar } from '../../components/ui/SearchBar'
import { CategoryFilter } from '../../components/ui/CategoryFilter'
import { Pagination } from '../../components/ui/Pagination'
import { ProcedureTable } from '../../components/ui/ProcedureTable'
import { ProcedureModal } from '../../components/ui/ProcedureModal'
import { DeleteConfirmation } from '../../components/ui/DeleteConfirmation'
import { Button } from '../../components/ui/Button'
// Importa o hook de estado de procedimentos (Issue #56) e as categorias do schema
import { useProcedures } from '../../hooks/useProcedures'
import { PROCEDURE_CATEGORIES } from '../../validations/procedureSchema'
import type { Procedure } from '../../services/procedureService'
import type { ProcedureFormData } from '../../validations/procedureSchema'

/**
 * Página de listagem de Procedimentos (Issue #52).
 *
 * Estrutura idêntica à ClinicsPage (Issue #45), com uma peça a mais
 * (CategoryFilter) e já nascendo com o DeleteConfirmation desde o início
 * (na ClinicsPage isso foi um ajuste feito depois, aqui já entra pronto).
 */
export const ProceduresPage = () => {
  const {
    procedures,
    isLoading,
    error,
    pagination,
    search,
    category,
    filterProcedures,
    filterByCategory,
    goToPage,
    createProcedure,
    updateProcedure,
    deleteProcedure,
  } = useProcedures()

  // Controla a modal de criação/edição
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProcedure, setEditingProcedure] = useState<Procedure | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Controla a modal de confirmação de exclusão
  const [deletingProcedure, setDeletingProcedure] = useState<Procedure | null>(null)

  // Abre a modal em modo criação (botão "Cadastrar")
  const handleOpenCreateModal = () => {
    setEditingProcedure(null)
    setIsModalOpen(true)
  }

  // Abre a modal em modo edição (ícone de lápis na tabela)
  const handleOpenEditModal = (procedure: Procedure) => {
    setEditingProcedure(procedure)
    setIsModalOpen(true)
  }

  // Submissão do formulário: decide entre criar ou editar, e fecha a modal ao final
  const handleSubmit = async (data: ProcedureFormData) => {
    setIsSubmitting(true)
    try {
      if (editingProcedure) {
        await updateProcedure(editingProcedure.id, data)
      } else {
        await createProcedure(data)
      }
      setIsModalOpen(false)
    } catch {
      // useProcedures já guarda a mensagem amigável em `error`, exibida abaixo da busca
    } finally {
      setIsSubmitting(false)
    }
  }

  // Chamado pelo ícone de lixeira na ProcedureTable — só abre a modal de confirmação
  const handleDeleteClick = (procedure: Procedure) => {
    setDeletingProcedure(procedure)
  }

  // Chamado pelo botão "Confirmar" dentro do DeleteConfirmation
  const handleConfirmDelete = async () => {
    if (!deletingProcedure) return
    await deleteProcedure(deletingProcedure.id)
  }

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Cabeçalho da página com título e botão Cadastrar */}
        <div className="clinics-page-header">
          <div>
            <h1 className="dashboard-header-title">Procedimentos</h1>
            <p className="dashboard-header-subtitle">Gerencie os procedimentos cadastrados</p>
          </div>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4" />
            Cadastrar
          </Button>
        </div>

        {/* Pesquisa (Issue #58) + filtro por categoria, lado a lado */}
        <div className="procedures-page-toolbar">
          <SearchBar
            value={search}
            onSearch={filterProcedures}
            placeholder="Pesquisar por nome..."
            className="procedures-page-search"
          />
          <CategoryFilter
            categories={[...PROCEDURE_CATEGORIES]}
            value={category}
            onChange={filterByCategory}
          />
        </div>

        {/* Mensagem de erro (ex: falha ao criar/editar/excluir) */}
        {error && <p className="clinics-page-error">{error}</p>}

        {/* Tabela com dados mockados/paginados (Issue #55) */}
        <ProcedureTable
          procedures={procedures}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteClick}
        />

        {/* Paginação (Issue #59) */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      </div>

      {/* Modal de criação/edição (Issue #54) */}
      <ProcedureModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        procedure={editingProcedure}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Modal de confirmação de exclusão (reaproveitando a Issue #49) */}
      <DeleteConfirmation
        open={Boolean(deletingProcedure)}
        onOpenChange={(open: boolean) => !open && setDeletingProcedure(null)}
        itemName={deletingProcedure?.name ?? ''}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  )
}

export default ProceduresPage