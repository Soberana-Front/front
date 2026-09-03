// Importa React, ícones e utilitário de classes CSS
import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../utils/cn'

// Props do componente SearchBar
export interface SearchBarProps {
  value: string                      // Valor atual do campo (controlado pelo componente pai)
  onSearch: (value: string) => void  // Callback disparado após o debounce, com o termo pesquisado
  placeholder?: string               // Texto de placeholder configurável (Critério de Aceite)
  debounceMs?: number                // Tempo de debounce em milissegundos (padrão: 400ms)
  className?: string                 // Classes CSS adicionais
}

/**
 * Barra de pesquisa reutilizável (Issue #58).
 *
 * Funciona como um componente "não controlado" internamente: mantém seu próprio
 * estado de texto (internalValue) pra digitação ficar fluida, mas só avisa o
 * componente pai (via onSearch) depois que o usuário para de digitar por
 * `debounceMs` milissegundos. Isso evita disparar um filtro/requisição a
 * cada tecla digitada.
 */
export const SearchBar = ({
  value,
  onSearch,
  placeholder = 'Pesquisar...',
  debounceMs = 400,
  className,
}: SearchBarProps) => {
  // Estado interno do texto digitado (atualiza a UI imediatamente)
  const [internalValue, setInternalValue] = React.useState(value)

  // Guarda a referência do timer de debounce entre renderizações
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sincroniza o estado interno se o valor vier alterado de fora
  // (ex: um botão "Limpar filtros" no componente pai)
  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  // Dispara a busca com atraso (debounce) a cada mudança do input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)

    // Cancela o timer anterior (se o usuário continuar digitando)
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Agenda a chamada de onSearch para depois do debounce
    debounceTimer.current = setTimeout(() => {
      onSearch(newValue)
    }, debounceMs)
  }

  // Limpa o timer pendente se o componente for desmontado
  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  return (
    <div className={cn('search-bar-wrapper', className)}>
      <div className="search-bar-input-wrapper">
        {/* Ícone de lupa fixo à esquerda */}
        <Search className="search-bar-icon" />

        {/* Campo de texto da pesquisa */}
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-bar-input"
          aria-label="Pesquisar"
        />
      </div>
    </div>
  )
}

SearchBar.displayName = 'SearchBar'