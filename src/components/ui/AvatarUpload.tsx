// Importa hooks do React e ícone
import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'

// Tipos de imagem aceitos e tamanho máximo do arquivo
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 2
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

// Props do AvatarUpload
export interface AvatarUploadProps {
  imageUrl?: string | null           // foto atual (null/undefined = mostra as iniciais)
  name: string                       // nome do usuário, usado para gerar as iniciais
  onChange: (file: File) => void     // chamado com o arquivo já validado
  isUploading?: boolean              // desabilita o clique enquanto a foto é enviada
}

/**
 * Gera as iniciais a partir do nome (ex: "Ana Souza" -> "AS").
 * Usa só as duas primeiras palavras para o círculo não ficar poluído.
 */
const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

/**
 * Foto de perfil com opção de troca.
 *
 * Componente "burro", no mesmo espírito do ClinicTable/ClinicForm: só exibe
 * a foto, valida o arquivo escolhido e avisa a página pelo onChange.
 * Quem decide o que fazer com o arquivo (enviar, mostrar toast) é a página.
 *
 * O <input type="file"> fica escondido; o círculo inteiro é um botão que
 * abre a janela de seleção de arquivo através do ref.
 */
export const AvatarUpload = ({
  imageUrl,
  name,
  onChange,
  isUploading = false,
}: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Abre a janela de seleção de arquivo
  const handleClick = () => {
    if (isUploading) return
    inputRef.current?.click()
  }

  // Valida o arquivo escolhido antes de repassar para a página
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    // Limpa o input para permitir escolher o MESMO arquivo de novo depois
    // (sem isso, o onChange não dispara se o arquivo for repetido)
    e.target.value = ''

    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setValidationError('Formato inválido. Use JPG, PNG ou WEBP.')
      return
    }

    if (file.size > MAX_SIZE_BYTES) {
      setValidationError(`A imagem deve ter no máximo ${MAX_SIZE_MB} MB.`)
      return
    }

    setValidationError(null)
    onChange(file)
  }

  return (
    <div className="avatar-upload">
      {/* Círculo clicável com a foto ou as iniciais */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className="avatar-upload-button"
        aria-label="Alterar foto de perfil"
      >
        {imageUrl ? (
          <img src={imageUrl} alt={`Foto de ${name}`} className="avatar-upload-image" />
        ) : (
          <span className="avatar-upload-initials">{getInitials(name)}</span>
        )}

        {/* Selo com ícone de câmera no canto do círculo */}
        <span className="avatar-upload-badge">
          <Camera className="h-4 w-4" />
        </span>
      </button>

      {/* Texto de apoio abaixo da foto */}
      <p className="avatar-upload-hint">
        {isUploading ? 'Enviando foto...' : `JPG, PNG ou WEBP até ${MAX_SIZE_MB} MB`}
      </p>

      {/* Erro de validação do arquivo */}
      {validationError && <p className="avatar-upload-error">{validationError}</p>}

      {/* Input real, escondido */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

AvatarUpload.displayName = 'AvatarUpload'