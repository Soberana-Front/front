// Importa ícones de editar/excluir
import { Pencil, Trash2 } from 'lucide-react'
// Importa o EmptyState já criado (Issue #60)
import { EmptyState } from './EmptyState'
// Importa o tipo de Procedimento (ainda a ser definido no procedureService, Issue #57)
import type { Procedure } from '../../services/procedureService'

// Props do ProcedureTable
export interface ProcedureTableProps {
  procedures: Procedure[]
  isLoading?: boolean
  onEdit: (procedure: Procedure) => void
  onDelete: (procedure: Procedure) => void
}

// Corta a descrição para não quebrar o layout da tabela (Critério: "Descrição resumida")
const truncateDescription = (text: string, maxLength = 60): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

/**
 * Tabela de procedimentos com ações (Issue #55).
 *
 * Segue exatamente o mesmo padrão "burro" do ClinicTable (Issue #48):
 * só exibe dados e dispara onEdit/onDelete, sem decidir o que acontece
 * depois disso (quem decide é a ProceduresPage, Issue #52).
 */
export const ProcedureTable = ({
  procedures,
  isLoading = false,
  onEdit,
  onDelete,
}: ProcedureTableProps) => {
  if (isLoading) {
    return (
      <div className="clinic-table-wrapper">
        <div className="clinic-table-status">Carregando procedimentos...</div>
      </div>
    )
  }

  if (procedures.length === 0) {
    return (
      <div className="clinic-table-wrapper">
        <EmptyState
          title="Nenhum procedimento encontrado"
          subtitle="Comece cadastrando um novo procedimento"
        />
      </div>
    )
  }

  return (
    // Reaproveita as classes .clinic-table-* já existentes (são genéricas,
    // não têm nada específico de Clínica no nome — poderiam até ser
    // renomeadas para .data-table-* no futuro, mas não mexi nisso agora
    // pra não alterar CSS de um componente que já está em produção)
    <div className="clinic-table-wrapper">
      <table className="clinic-table">
        <thead className="clinic-table-head">
          <tr>
            <th className="clinic-table-th">Nome</th>
            <th className="clinic-table-th">Categoria</th>
            <th className="clinic-table-th clinic-table-th-right">Tempo (min)</th>
            <th className="clinic-table-th">Descrição</th>
            <th className="clinic-table-th clinic-table-th-center">Ações</th>
          </tr>
        </thead>

        <tbody className="clinic-table-body">
          {procedures.map((procedure) => (
            <tr key={procedure.id} className="clinic-table-row">
              <td className="clinic-table-td clinic-table-td-name">{procedure.name}</td>
              <td className="clinic-table-td">{procedure.category}</td>
              <td className="clinic-table-td clinic-table-td-right">{procedure.time} min</td>
              <td className="clinic-table-td" title={procedure.description}>
                {truncateDescription(procedure.description ?? '')}
              </td>
              <td className="clinic-table-td clinic-table-td-center">
                <div className="clinic-table-actions">
                  <button
                    type="button"
                    onClick={() => onEdit(procedure)}
                    className="clinic-table-action-btn clinic-table-action-edit"
                    aria-label={`Editar ${procedure.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(procedure)}
                    className="clinic-table-action-btn clinic-table-action-delete"
                    aria-label={`Excluir ${procedure.name}`}
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

ProcedureTable.displayName = 'ProcedureTable'