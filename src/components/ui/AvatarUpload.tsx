// Importa hooks do React e ícones
import { useRef, useState } from 'react'
import { Camera, Loader2 } from 'lucide-react'
// Utilitário para juntar classes condicionalmente (mesmo usado no Input, Button, Card)
import { cn } from '../../utils/cn'

// ===========================
// REGRAS DO ARQUIVO
// ===========================

// Tipos de imagem aceitos e tamanho máximo do arquivo
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 2
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

// ===========================
// TIPOS
// ===========================

// Props do AvatarUpload
export interface AvatarUploadProps {
  imageUrl?: string | null           // foto atual (null/undefined = mostra as iniciais)
  name: string                       // nome do usuário, usado para gerar as iniciais
  onChange: (file: File) => void     // chamado com o arquivo já validado
  isUploading?: boolean              // true enquanto o upload (mockado) acontece
}

// ===========================
// FUNÇÕES AUXILIARES
// ===========================

/**
 * Gera as iniciais a partir do nome (ex: "Ana Souza" -> "AS").
 * Usa só as duas primeiras palavras para o círculo não ficar poluído.
 * charAt(0) em vez de part[0]: com a configuração do TypeScript do projeto,
 * part[0] é tipado como "string | undefined" e não compila.
 */
const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

// ===========================
// COMPONENTE
// ===========================

/**
 * Foto de perfil com upload (Issue #90).
 *
 * Funcionalidades:
 * - Exibe o avatar atual: a imagem, ou as iniciais quando não há foto;
 * - Ao passar o mouse (ou focar com Tab), mostra um overlay escuro com ícone de câmera;
 * - Ao clicar, abre o seletor de arquivo do sistema;
 * - Valida tipo e tamanho e repassa o arquivo pelo onChange.
 *
 * Onde está o mock do upload:
 * este componente é "burro", como ClinicTable e ClinicForm. Ele NÃO envia
 * o arquivo; só avisa a página. Quem simula o upload é o useProfile
 * (updateAvatar: espera 300 ms e cria uma URL temporária da imagem).
 * Enquanto isso, a página passa isUploading = true e o overlay fica
 * fixo com um spinner. Quando o profileService existir, só o hook muda;
 * este componente continua igual.
 */
export const AvatarUpload = ({
  imageUrl,
  name,
  onChange,
  isUploading = false,
}: AvatarUploadProps) => {
  // Referência para o <input type="file"> escondido, para abri-lo pelo clique no círculo
  const inputRef = useRef<HTMLInputElement>(null)
  // Mensagem de erro de validação (formato ou tamanho inválido)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Clique no círculo: abre a janela de seleção de arquivo
  const handleClick = () => {
    if (isUploading) return
    inputRef.current?.click()
  }

  // Arquivo escolhido: valida antes de repassar para a página
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    // Limpa o input para permitir escolher o MESMO arquivo de novo depois
    // (sem isso, o onChange não dispara se o arquivo for repetido)
    e.target.value = ''

    // Usuário fechou a janela sem escolher nada
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setValidationError('Formato inválido. Use JPG, PNG ou WEBP.')
      return
    }

    if (file.size > MAX_SIZE_BYTES) {
      setValidationError(`A imagem deve ter no máximo ${MAX_SIZE_MB} MB.`)
      return
    }

    // Arquivo válido: limpa erro anterior e avisa a página
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
        aria-busy={isUploading}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={`Foto de ${name}`} className="avatar-upload-image" />
        ) : (
          <span className="avatar-upload-initials">{getInitials(name)}</span>
        )}

        {/* Overlay escuro por cima da foto.
            - Normalmente invisível; aparece no hover/foco (regra no index.css).
            - Durante o upload fica sempre visível (classe -visible) e troca
              a câmera por um spinner, para o usuário saber que algo está acontecendo. */}
        <span
          className={cn('avatar-upload-overlay', isUploading && 'avatar-upload-overlay-visible')}
          aria-hidden="true"
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <Camera className="h-6 w-6" />
              <span className="avatar-upload-overlay-text">Alterar</span>
            </>
          )}
        </span>
      </button>

      {/* Texto de apoio abaixo da foto.
          No celular não existe hover, então este texto é o que indica
          que a foto é clicável. */}
      <p className="avatar-upload-hint">
        {isUploading
          ? 'Enviando foto...'
          : `Clique na foto para alterar · JPG, PNG ou WEBP até ${MAX_SIZE_MB} MB`}
      </p>

      {/* Erro de validação do arquivo */}
      {validationError && <p className="avatar-upload-error">{validationError}</p>}

      {/* Input real, escondido — só é aberto pelo clique no círculo */}
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