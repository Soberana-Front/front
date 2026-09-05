// Importa o Select já existente na UI
import { Select } from './Select'

// Props do CategoryFilter
export interface CategoryFilterProps {
  categories: string[]                    // lista de categorias disponíveis (extraída dos procedimentos)
  value: string                           // categoria selecionada ('' = todas)
  onChange: (category: string) => void    // chamado ao trocar a categoria
  className?: string
}

// Opção fixa "Todas as categorias", sempre no topo do select
const ALL_CATEGORIES_VALUE = ''

/**
 * Filtro por categoria, usado na página de Procedimentos (Issue #52).
 *
 * Componente "burro": recebe a lista de categorias já pronta (o componente
 * pai decide de onde ela vem — hoje, do próprio useProcedures) e só
 * repassa a escolha do usuário via onChange. Reaproveita o Select
 * existente em vez de criar um dropdown novo do zero.
 */
export const CategoryFilter = ({
  categories,
  value,
  onChange,
  className,
}: CategoryFilterProps) => {
  const options = [
    { value: ALL_CATEGORIES_VALUE, label: 'Todas as categorias' },
    ...categories.map((category) => ({ value: category, label: category })),
  ]

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      className={className}
      aria-label="Filtrar por categoria"
    />
  )
}

CategoryFilter.displayName = 'CategoryFilter'