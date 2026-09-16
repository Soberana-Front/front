// Importa componentes de UI já existentes (reaproveitados)
import { Input } from './Input'
import { Select, type SelectOption } from './Select'
import { Button } from './Button'
// Ícones
import { Filter, X } from 'lucide-react'
// Utilitário de classes CSS (mesmo padrão do Pagination.tsx / HistoryCard.tsx)
import { cn } from '../../utils/cn'

// ============================================================
// TIPO EXPORTADO: HistoryFiltersState
// ============================================================
/**
 * Formato do estado dos filtros. Exportado aqui (em vez de ficar só na
 * History.tsx) porque agora é este componente quem "dita" o formato dos
 * filtros — a página só guarda o estado e repassa pra cá.
 */
export interface HistoryFiltersState {
  dateFrom: string    // yyyy-mm-dd (formato nativo do <input type="date">)
  dateTo: string
  clinicId: string    // '' = todas
  procedureId: string // '' = todos
}

// Valor inicial "zerado", pra quem for usar o componente não precisar
// redigitar os 4 campos vazios toda vez (usado no useState inicial da
// página e no botão "Limpar")
export const EMPTY_HISTORY_FILTERS: HistoryFiltersState = {
  dateFrom: '',
  dateTo: '',
  clinicId: '',
  procedureId: '',
}

// Props do HistoryFilters
export interface HistoryFiltersProps {
  filters: HistoryFiltersState                              // valores atuais dos campos (rascunho)
  onChange: (field: keyof HistoryFiltersState, value: string) => void // chamado a cada campo alterado
  onApply: () => void                                        // clique em "Filtrar"
  onClear: () => void                                        // clique em "Limpar"
  clinicOptions: SelectOption[]                              // opções do select de Clínica
  procedureOptions: SelectOption[]                           // opções do select de Procedimento
  className?: string
}

/**
 * Barra de filtros do Histórico (Issue #86).
 *
 * Componente "burro", no mesmo espírito do CategoryFilter/HistoryCard: não
 * guarda estado próprio (nem sabe filtrar nada) — só mostra os campos com
 * os valores que recebe e avisa o pai (`onChange`) a cada alteração.
 * Quem decide o que "aplicar filtro" e "limpar filtro" significam
 * continua sendo a página (hoje a History.tsx), via onApply/onClear.
 *
 * Os 4 filtros são independentes entre si (cada Select/Input mexe só no
 * seu próprio campo) — a combinação deles (AND) é feita na página, no
 * useMemo que calcula `filteredItems`.
 *
 * Este JSX antes estava embutido na History.tsx (Issue #84); foi só
 * extraído pra cá, sem mudar a aparência nem o comportamento.
 */
export const HistoryFilters = ({
  filters,
  onChange,
  onApply,
  onClear,
  clinicOptions,
  procedureOptions,
  className,
}: HistoryFiltersProps) => {
  return (
    <div className={cn('history-filters-card', className)}>
      {/* Título "Filtros" com ícone */}
      <div className="history-filters-title">
        <Filter className="h-4 w-4" />
        <span>Filtros</span>
      </div>

      {/* Data (início e fim) — date picker nativo via <input type="date"> */}
      <div className="history-filters-grid">
        <Input
          type="date"
          label="De"
          value={filters.dateFrom}
          onChange={(e) => onChange('dateFrom', e.target.value)}
        />
        <Input
          type="date"
          label="Até"
          value={filters.dateTo}
          onChange={(e) => onChange('dateTo', e.target.value)}
        />

        {/* Clínica (select) */}
        <Select
          label="Clínica"
          placeholder="Todas as clínicas"
          value={filters.clinicId}
          onChange={(e) => onChange('clinicId', e.target.value)}
          options={clinicOptions}
        />

        {/* Procedimento (select) */}
        <Select
          label="Procedimento"
          placeholder="Todos os procedimentos"
          value={filters.procedureId}
          onChange={(e) => onChange('procedureId', e.target.value)}
          options={procedureOptions}
        />
      </div>

      {/* Botões "Limpar" e "Filtrar" */}
      <div className="history-filters-actions">
        <Button variant="secondary" onClick={onClear}>
          <X className="h-4 w-4" />
          Limpar
        </Button>
        <Button onClick={onApply}>
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>
    </div>
  )
}

HistoryFilters.displayName = 'HistoryFilters'
