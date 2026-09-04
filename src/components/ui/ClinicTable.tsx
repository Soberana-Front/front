// Importa ícones de editar/excluir e utilitário de formatação de moeda
import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
// Importa o tipo de Clínica já definido no service (Issue #51)
import type { Clinic } from '../../services/clinicService'
import { EmptyState } from './EmptyState'

// Props do componente ClinicTable
export interface ClinicTableProps {
  clinics: Clinic[]                 // Lista de clínicas já filtrada/paginada (vem do useClinics)
  isLoading?: boolean                // Exibe estado de carregamento
  onEdit: (clinic: Clinic) => void   // Chamado ao clicar no ícone de editar
  onDelete: (clinic: Clinic) => void // Chamado ao clicar no ícone de excluir
}

/**
 * Tabela de clínicas com ações de editar/excluir (Issue #48).
 *
 * Este componente é "burro": só recebe a lista já pronta (filtrada e
 * paginada pelo useClinics) e mostra. Não decide o que acontece ao clicar
 * em editar/excluir — apenas chama onEdit/onDelete, e quem usa a tabela
 * (a página de Clínicas) decide abrir o ClinicModal ou o DeleteConfirmation.
 */
export const ClinicTable = ({
  clinics,
  isLoading = false,
  onEdit,
  onDelete,
}: ClinicTableProps) => {
  // Estado de carregamento: mostra uma linha única com mensagem
  if (isLoading) {
    return (
      <div className="clinic-table-wrapper">
        <div className="clinic-table-status">Carregando clínicas...</div>
      </div>
    )
  }

  // Lista vazia: mostra mensagem simples.
  /*<div className="clinic-table-wrapper">
        <div className="clinic-table-status">Nenhuma clínica encontrada.</div>
      </div> */
  // (Quando a Issue #60 - EmptyState - estiver pronta, trocar este bloco
  // pelo componente <EmptyState /> reutilizável.)
  if (clinics.length === 0) {
    return (
      <div className="clinic-table-wrapper">
        <EmptyState
          title="Nenhuma clínica encontrada"
          subtitle="Comece cadastrando uma nova clínica"
        />
      </div>
    )
  }

  return (
    <div className="clinic-table-wrapper">
      <table className="clinic-table">
        {/* Cabeçalho com todas as colunas pedidas na Issue #45/#48 */}
        <thead className="clinic-table-head">
          <tr>
            <th className="clinic-table-th">Nome</th>
            <th className="clinic-table-th">Cidade</th>
            <th className="clinic-table-th">Estado</th>
            <th className="clinic-table-th">Endereço</th>
            <th className="clinic-table-th">Tipo</th>
            <th className="clinic-table-th clinic-table-th-right">Comissão</th>
            <th className="clinic-table-th clinic-table-th-right">Aluguel</th>
            <th className="clinic-table-th clinic-table-th-right">Custos</th>
            <th className="clinic-table-th clinic-table-th-center">Ações</th>
          </tr>
        </thead>

        <tbody className="clinic-table-body">
          {clinics.map((clinic) => (
            <tr key={clinic.id} className="clinic-table-row">
              <td className="clinic-table-td clinic-table-td-name">{clinic.name}</td>
              <td className="clinic-table-td">{clinic.city}</td>
              <td className="clinic-table-td">{clinic.state}</td>
              <td className="clinic-table-td">{clinic.address}</td>
              <td className="clinic-table-td">{clinic.type}</td>

              {/* Comissão formatada com % */}
              <td className="clinic-table-td clinic-table-td-right">
                {clinic.commission}%
              </td>

              {/* Aluguel e Custos formatados em R$ (reaproveita formatCurrency já usado no dashboard) */}
              <td className="clinic-table-td clinic-table-td-right">
                {formatCurrency(clinic.rent)}
              </td>
              <td className="clinic-table-td clinic-table-td-right">
                {formatCurrency(clinic.costs)}
              </td>

              {/* Ações: editar (lápis) e excluir (lixeira) */}
              <td className="clinic-table-td clinic-table-td-center">
                <div className="clinic-table-actions">
                  <button
                    type="button"
                    onClick={() => onEdit(clinic)}
                    className="clinic-table-action-btn clinic-table-action-edit"
                    aria-label={`Editar ${clinic.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(clinic)}
                    className="clinic-table-action-btn clinic-table-action-delete"
                    aria-label={`Excluir ${clinic.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ClinicTable.displayName = 'ClinicTable'