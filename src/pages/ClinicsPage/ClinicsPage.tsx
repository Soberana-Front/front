// Importa hooks do React e ícone
import { useState } from 'react'
import { Plus } from 'lucide-react'
// Importa layout do dashboard e componentes de UI já criados
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout'
import { SearchBar } from '../../components/ui/SearchBar'
import { Pagination } from '../../components/ui/Pagination'
import { ClinicTable } from '../../components/ui/ClinicTable'
import { ClinicModal } from '../../components/ui/ClinicModal'
import { Button } from '../../components/ui/Button'
// Importa o hook de estado de clínicas (Issue #50)
import { useClinics } from '../../hooks/useClinics'
import type { Clinic } from '../../services/clinicService'
import type { ClinicFormOutput } from '../../validations/clinicSchema'

/**
 * Página de listagem de Clínicas (Issue #45).
 *
 * Junta todas as peças construídas nas issues anteriores: SearchBar (#58),
 * Pagination (#59), ClinicTable (#48), ClinicForm+ClinicModal (#46/#47) e
 * useClinics (#50). Esta página é quem decide o que fazer com os eventos
 * que os componentes "burros" disparam (abrir modal, confirmar exclusão etc).
 */
export const ClinicsPage = () => {
  const {
    clinics,
    isLoading,
    error,
    pagination,
    search,
    filterClinics,
    goToPage,
    createClinic,
    updateClinic,
    deleteClinic,
  } = useClinics()

  // Controla se a modal está aberta e qual clínica está sendo editada
  // (null = modo criação, uma Clinic = modo edição)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Abre a modal em modo criação (botão "Cadastrar")
  const handleOpenCreateModal = () => {
    setEditingClinic(null)
    setIsModalOpen(true)
  }

  // Abre a modal em modo edição (ícone de lápis na tabela)
  const handleOpenEditModal = (clinic: Clinic) => {
    setEditingClinic(clinic)
    setIsModalOpen(true)
  }

  // Submissão do formulário: decide entre criar ou editar, e fecha a modal ao final
  const handleSubmit = async (data: ClinicFormOutput) => {
    setIsSubmitting(true)
    try {
      if (editingClinic) {
        await updateClinic(editingClinic.id, data)
      } else {
        await createClinic(data)
      }
      setIsModalOpen(false)
    } catch {
      // useClinics já guarda a mensagem amigável em `error`, exibida logo abaixo da busca
    } finally {
      setIsSubmitting(false)
    }
  }

  // Exclusão: por enquanto usa window.confirm como confirmação temporária.
  // Quando a Issue #49 (DeleteConfirmation) estiver pronta, troco isso pela modal de verdade.
  const handleDelete = async (clinic: Clinic) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir ${clinic.name}?`)
    if (!confirmed) return
    await deleteClinic(clinic.id)
  }

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Cabeçalho da página com título e botão Cadastrar */}
        <div className="clinics-page-header">
          <div>
            <h1 className="dashboard-header-title">Clínicas</h1>
            <p className="dashboard-header-subtitle">Gerencie as clínicas cadastradas</p>
          </div>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4" />
            Cadastrar
          </Button>
        </div>

        {/* Barra de pesquisa (filtro local, Issue #58) */}
        <div className="clinics-page-toolbar">
          <SearchBar
            value={search}
            onSearch={filterClinics}
            placeholder="Pesquisar por nome, cidade ou estado..."
          />
        </div>

        {/* Mensagem de erro (ex: falha ao criar/editar/excluir) */}
        {error && <p className="clinics-page-error">{error}</p>}

        {/* Tabela com dados mockados/paginados (Issue #48) */}
        <ClinicTable
          clinics={clinics}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
        />

        {/* Paginação (Issue #59) */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      </div>

      {/* Modal de criação/edição (Issue #47) */}
      <ClinicModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        clinic={editingClinic}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </DashboardLayout>
  )
}

export default ClinicsPage