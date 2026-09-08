import { useState } from 'react'

/* ========================================
 * TIPOS
 * ======================================== */

/**
 * Categorias permitidas para novos itens
 * de custo da precificação.
 *
 * Essas categorias seguem a documentação
 * oficial do projeto.
 */
export type AdicionarItemCategory =
  | 'material'
  | 'comissao'
  | 'imposto'
  | 'gasto_adicional'
  | 'outro'

/**
 * Estrutura do item que será criado.
 */
export interface AdicionarItemData {
  category: AdicionarItemCategory
  name: string
  value: number
}

/* ========================================
 * PROPS
 * ======================================== */

interface AdicionarItemProps {
  /**
   * Função executada quando o usuário
   * confirma o novo item.
   */
  onAddItem: (item: AdicionarItemData) => void

  /**
   * Permite desabilitar o componente quando
   * a conversa já foi finalizada ou a IA
   * estiver processando uma resposta.
   */
  disabled?: boolean
}

/* ========================================
 * CATEGORIAS
 * ======================================== */

/**
 * Lista apresentada ao usuário.
 *
 * O value utiliza o formato esperado pelo
 * domínio da aplicação.
 */
const CATEGORIES: Array<{
  value: AdicionarItemCategory
  label: string
}> = [
  {
    value: 'material',
    label: 'Material',
  },
  {
    value: 'comissao',
    label: 'Comissão',
  },
  {
    value: 'imposto',
    label: 'Imposto',
  },
  {
    value: 'gasto_adicional',
    label: 'Gasto adicional',
  },
  {
    value: 'outro',
    label: 'Outros',
  },
]

/* ========================================
 * COMPONENTE
 * ======================================== */

/**
 * Componente responsável por permitir que
 * o usuário adicione manualmente um item
 * durante a conversa de precificação.
 *
 * A responsabilidade deste componente é
 * somente coletar os dados.
 *
 * O cálculo financeiro não acontece aqui.
 */
export default function AdicionarItem({
  onAddItem,
  disabled = false,
}: AdicionarItemProps) {
  /* ========================================
   * ESTADOS DO FORMULÁRIO
   * ======================================== */

  const [isOpen, setIsOpen] = useState(false)

  const [category, setCategory] =
    useState<AdicionarItemCategory>('material')

  const [name, setName] = useState('')

  const [value, setValue] = useState('')

  const [error, setError] = useState('')

  /* ========================================
   * ABRIR MODAL
   * ======================================== */

  const handleOpen = () => {
    if (disabled) {
      return
    }

    setError('')
    setIsOpen(true)
  }

  /* ========================================
   * FECHAR MODAL
   * ======================================== */

  const handleClose = () => {
    setIsOpen(false)
    setError('')
  }

  /* ========================================
   * ADICIONAR ITEM
   * ======================================== */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedName = name.trim()

    /**
     * Aceita valores utilizando vírgula ou ponto.
     *
     * Exemplos:
     * 35
     * 35,50
     * 35.50
     */
    const normalizedValue = Number(
      value.replace(',', '.'),
    )

    /* Validação do nome */
    if (!normalizedName) {
      setError('Informe o nome do item.')
      return
    }

    /* Validação do valor */
    if (
      !value.trim() ||
      Number.isNaN(normalizedValue) ||
      normalizedValue <= 0
    ) {
      setError('Informe um valor válido maior que zero.')
      return
    }

    /* Envia o item para o componente pai */
    onAddItem({
      category,
      name: normalizedName,
      value: normalizedValue,
    })

    /* Limpa o formulário */
    setName('')
    setValue('')
    setCategory('material')
    setError('')

    /* Fecha o modal */
    setIsOpen(false)
  }

  /* ========================================
   * RENDERIZAÇÃO
   * ======================================== */

  return (
    <>
      {/* ====================================
       * BOTÃO ADICIONAR
       * ==================================== */}

      <button
        type="button"
        className="adicionar-item__button"
        onClick={handleOpen}
        disabled={disabled}
      >
        + Adicionar item
      </button>

      {/* ====================================
       * MODAL
       * ==================================== */}

      {isOpen && (
        <div
          className="adicionar-item__overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose()
            }
          }}
        >
          <div
            className="adicionar-item__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="adicionar-item-title"
          >
            {/* ====================================
             * CABEÇALHO
             * ==================================== */}

            <div className="adicionar-item__header">
              <div>
                <span className="adicionar-item__step">
                  Edição manual
                </span>

                <h2
                  id="adicionar-item-title"
                  className="adicionar-item__title"
                >
                  Adicionar item
                </h2>

                <p className="adicionar-item__description">
                  Informe os dados do novo componente de custo.
                </p>
              </div>

              <button
                type="button"
                className="adicionar-item__close"
                onClick={handleClose}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            {/* ====================================
             * FORMULÁRIO
             * ==================================== */}

            <form
              className="adicionar-item__form"
              onSubmit={handleSubmit}
            >
              {/* CATEGORIA */}

              <div className="adicionar-item__field">
                <label
                  htmlFor="adicionar-item-category"
                  className="adicionar-item__label"
                >
                  Categoria
                </label>

                <select
                  id="adicionar-item-category"
                  className="adicionar-item__input"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target
                        .value as AdicionarItemCategory,
                    )
                  }
                >
                  {CATEGORIES.map((itemCategory) => (
                    <option
                      key={itemCategory.value}
                      value={itemCategory.value}
                    >
                      {itemCategory.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* NOME */}

              <div className="adicionar-item__field">
                <label
                  htmlFor="adicionar-item-name"
                  className="adicionar-item__label"
                >
                  Nome
                </label>

                <input
                  id="adicionar-item-name"
                  type="text"
                  className="adicionar-item__input"
                  placeholder="Ex.: Broca diamantada"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  autoComplete="off"
                />
              </div>

              {/* VALOR */}

              <div className="adicionar-item__field">
                <label
                  htmlFor="adicionar-item-value"
                  className="adicionar-item__label"
                >
                  Valor
                </label>

                <div className="adicionar-item__value-wrapper">
                  <span className="adicionar-item__currency">
                    R$
                  </span>

                  <input
                    id="adicionar-item-value"
                    type="text"
                    inputMode="decimal"
                    className="adicionar-item__value-input"
                    placeholder="0,00"
                    value={value}
                    onChange={(event) =>
                      setValue(event.target.value)
                    }
                  />
                </div>
              </div>

              {/* ERRO */}

              {error && (
                <p
                  className="adicionar-item__error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {/* ====================================
               * AÇÕES
               * ==================================== */}

              <div className="adicionar-item__actions">
                <button
                  type="button"
                  className="adicionar-item__cancel"
                  onClick={handleClose}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="adicionar-item__submit"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}