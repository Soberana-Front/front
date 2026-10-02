//A página, com o formulário no mesmo arquivo
// Importa hooks do React e do react-hook-form, resolver do Zod e ícone
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
// Importa layout do dashboard e componentes de UI já existentes
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
// Importa schema, limites, hook, toast e tipos
import {
  settingsSchema,
  CURRENCY_OPTIONS,
  PERCENT_MIN,
  PERCENT_MAX,
  SERVICE_TIME_MIN,
  SERVICE_TIME_MAX,
  type SettingsFormData,
} from '../../validations/settingsSchema'
import { useSettings } from '../../hooks/useSettings'
import { useToast } from '../../contexts/ToastContext'
import type { UserSettings } from '../../services/settingsService'

// ============================================================
// FORMULÁRIO
// ============================================================

// Props do formulário interno da página
interface SettingsFormProps {
  settings: UserSettings                              // valores atuais (vindos do mock)
  isSaving: boolean                                   // true enquanto o "Salvar" processa
  onSubmit: (data: SettingsFormData) => Promise<void> // chamado só com dados válidos
}

/**
 * Formulário de configurações.
 *
 * Fica no mesmo arquivo da página porque só é usado aqui (mesma decisão
 * da página Alterar Senha). Ele só é montado DEPOIS que as configurações
 * carregam — assim o useForm já nasce com os valores certos em defaultValues.
 *
 * Campos numéricos:
 * - `register(..., { valueAsNumber: true })` entrega número (e não texto)
 *   para o Zod, como no campo Comissão do ClinicForm;
 * - o `defaultValue={String(...)}` é por causa do estado interno do Input.tsx
 *   (mesmo motivo do ProfileForm). O String() é necessário porque o Input
 *   trata o número 0 como "vazio" — sem ele, uma taxa 0 apareceria em branco.
 * - step/min/max são só ajuda para as setinhas do navegador;
 *   quem valida de verdade é o Zod (o form tem noValidate).
 */
const SettingsForm = ({ settings, isSaving, onSubmit }: SettingsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  })

  return (
    // noValidate: desliga os balões nativos do navegador,
    // para aparecerem só as mensagens do Zod
    <form onSubmit={handleSubmit(onSubmit)} className="settings-form" noValidate>
      {/* Seção 1: moeda */}
      <section className="settings-section">
        <h2 className="settings-section-title">Moeda</h2>
        <div className="settings-form-grid">
          <Select
            label="Moeda"
            options={CURRENCY_OPTIONS.map((option) => ({ ...option }))}
            error={errors.currency?.message}
            required
            {...register('currency')}
          />
        </div>
      </section>

      {/* Seção 2: valores padrão usados na precificação */}
      <section className="settings-section">
        <h2 className="settings-section-title">Padrões de precificação</h2>
        <div className="settings-form-grid">
          {/* Margem de lucro padrão (%) */}
          <Input
            label="Margem de lucro padrão (%)"
            type="number"
            step="0.01"
            min={PERCENT_MIN}
            max={PERCENT_MAX}
            defaultValue={String(settings.profitMargin)}
            error={errors.profitMargin?.message}
            required
            {...register('profitMargin', { valueAsNumber: true })}
          />

          {/* Alíquota padrão de impostos (%) */}
          <Input
            label="Alíquota padrão de impostos (%)"
            type="number"
            step="0.01"
            min={PERCENT_MIN}
            max={PERCENT_MAX}
            defaultValue={String(settings.taxRate)}
            error={errors.taxRate?.message}
            required
            {...register('taxRate', { valueAsNumber: true })}
          />

          {/* Taxa padrão de cartão (%) */}
          <Input
            label="Taxa padrão de cartão (%)"
            type="number"
            step="0.01"
            min={PERCENT_MIN}
            max={PERCENT_MAX}
            defaultValue={String(settings.cardFee)}
            error={errors.cardFee?.message}
            required
            {...register('cardFee', { valueAsNumber: true })}
          />

          {/* Tempo médio de atendimento (minutos inteiros) */}
          <Input
            label="Tempo médio de atendimento (minutos)"
            type="number"
            step="1"
            min={SERVICE_TIME_MIN}
            max={SERVICE_TIME_MAX}
            defaultValue={String(settings.averageServiceTime)}
            error={errors.averageServiceTime?.message}
            required
            {...register('averageServiceTime', { valueAsNumber: true })}
          />
        </div>
      </section>

      {/* Botão Salvar, alinhado à direita */}
      <div className="settings-actions">
        <Button type="submit" isLoading={isSaving}>
          <Save className="h-4 w-4" />
          Salvar
        </Button>
      </div>
    </form>
  )
}

// ============================================================
// PÁGINA
// ============================================================

/**
 * Página de Configurações (Issue #93).
 *
 * Campos: Moeda, Margem de lucro, Alíquota de impostos, Taxa de cartão
 * e Tempo médio de atendimento — todos com valores mockados (useSettings).
 * O botão "Salvar" valida e chama o updateSettings mockado.
 *
 * Diferente do Perfil, aqui não há modo visualização/edição:
 * a issue não pede, então os campos já abrem editáveis.
 */
export const SettingsPage = () => {
  const { settings, isLoading, error, updateSettings } = useSettings()
  const { showToast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // Botão "Salvar": só é chamado se o Zod aprovou todos os campos
  const handleSubmit = async (data: SettingsFormData) => {
    setIsSaving(true)
    try {
      await updateSettings(data)
      showToast('Configurações salvas com sucesso!', 'success')
    } catch {
      showToast('Não foi possível salvar as configurações. Tente novamente.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* Cabeçalho da página */}
        <div>
          <h1 className="dashboard-header-title">Configurações</h1>
          <p className="dashboard-header-subtitle">
            Valores padrão usados nas suas precificações
          </p>
        </div>

        {/* Erro ao carregar (mesmo estilo de erro da página de Perfil) */}
        {error && <p className="profile-page-error">{error}</p>}

        {/* Carregando as configurações */}
        {isLoading && (
          <div className="profile-page-loading">
            <Spinner size="lg" />
          </div>
        )}

        {/* Formulário: só aparece depois que os valores carregaram */}
        {!isLoading && settings && (
          <div className="settings-card">
            <SettingsForm settings={settings} isSaving={isSaving} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage