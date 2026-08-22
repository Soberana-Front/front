import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Percent,
  Plus,
  Settings,
  SlidersHorizontal,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react'

type MetricCardProps = {
  title: string
  value: string
  description: string
  icon: React.ElementType
  iconClassName: string
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: MetricCardProps) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-lg font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon size={14} />
        </div>
      </div>
    </article>
  )
}

type NavItemProps = {
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[11px] transition ${
        active
          ? 'bg-violet-50 font-semibold text-violet-700'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      <Icon size={14} strokeWidth={1.7} />
      <span>{label}</span>
    </button>
  )
}

type PricingSectionProps = {
  title: string
  value: string
  open?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

function PricingSection({
  title,
  value,
  open = false,
  children,
  onClick,
}: PricingSectionProps) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown size={13} className="text-violet-600" />
          ) : (
            <ChevronRight size={13} className="text-slate-400" />
          )}

          <span className="text-[10px] font-semibold text-slate-700">
            {title}
          </span>
        </div>

        <span
          className={`text-[9px] font-medium ${
            open ? 'text-violet-700' : 'text-slate-400'
          }`}
        >
          {value}
        </span>
      </button>

      {open && children}
    </div>
  )
}

export function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState('Resultado')
  const [message, setMessage] = useState('')

  function toggleSection(section: string) {
    setOpenSection((current) => (current === section ? '' : section))
  }

  function sendMessage() {
    if (!message.trim()) return

    setMessage('')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/20 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[160px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-[56px] items-center border-b border-slate-100 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-blue-600 text-[10px] font-bold text-white shadow-sm">
              S
            </div>

            <span className="text-sm font-bold tracking-tight text-slate-900">
              Soberana
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto text-slate-400 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2.5 py-4">
          <p className="mb-2 px-2 text-[8px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          <div className="space-y-1">
            <NavItem
              icon={LayoutDashboard}
              label="Dashboard"
              active
            />

            <NavItem
              icon={Building2}
              label="Clínicas"
            />

            <NavItem
              icon={ClipboardList}
              label="Procedimentos"
            />

            <NavItem
              icon={SlidersHorizontal}
              label="Comparações"
            />

            <NavItem
              icon={History}
              label="Histórico"
            />

            <NavItem
              icon={User}
              label="Perfil"
            />

            <NavItem
              icon={Settings}
              label="Configurações"
            />
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-2.5">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[11px] text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-h-screen lg:pl-[160px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[56px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900">
                Dashboard
              </h1>

              <p className="mt-0.5 text-[9px] text-slate-400">
                Precifique seus procedimentos com precisão
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[9px] text-slate-500 sm:flex">
              <CalendarDays size={11} />
              16 Jul, 2026
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
              DR
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="mx-auto max-w-[1500px] p-4 lg:p-5">
          {/* Metrics */}
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Preço Calculado"
              value="R$ 0,00"
              description="Baseado nos parâmetros atuais"
              icon={CircleDollarSign}
              iconClassName="bg-violet-50 text-violet-600"
            />

            <MetricCard
              title="Lucro"
              value="R$ 0,00"
              description="0,0% de margem"
              icon={BarChart3}
              iconClassName="bg-emerald-50 text-emerald-600"
            />

            <MetricCard
              title="Hora Clínica"
              value="R$ 0,00"
              description="Custo por hora efetiva"
              icon={Clock3}
              iconClassName="bg-amber-50 text-amber-600"
            />

            <MetricCard
              title="Média de Mercado"
              value="R$ 0,00"
              description="Referência regional"
              icon={BarChart3}
              iconClassName="bg-fuchsia-50 text-fuchsia-600"
            />
          </section>

          {/* Main columns */}
          <section className="mt-3 grid gap-3 xl:grid-cols-[190px_minmax(0,1fr)_225px]">
            {/* Left column */}
            <div className="space-y-3">
              {/* Clinic card */}
              <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <h2 className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                    Clínica selecionada
                  </h2>
                </div>

                <div className="mt-4 space-y-3">
                  <InfoRow label="Nome da Clínica" value="—" />
                  <InfoRow label="Cidade" value="—" />
                  <InfoRow label="Tipo" value="—" />
                  <InfoRow label="Quem fornece materiais" value="—" />
                  <InfoRow label="Forma de remuneração" value="—" />
                  <InfoRow label="Comissão" value="—" />
                </div>

                <div className="my-4 h-px bg-slate-100" />

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

                  <h2 className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                    Procedimento
                  </h2>
                </div>

                <div className="mt-3">
                  <InfoRow
                    label="Procedimento Selecionado"
                    value="—"
                  />
                </div>
              </article>

              {/* Actions */}
              <div className="space-y-1.5">
                <ActionButton
                  icon={Building2}
                  label="Selecionar Clínica"
                  primary
                />

                <ActionButton
                  icon={ClipboardList}
                  label="Selecionar Procedimento"
                />

                <ActionButton
                  icon={Calculator}
                  label="Nova Precificação"
                />

                <ActionButton
                  icon={Users}
                  label="Comparar Clínicas"
                  subtle
                />
              </div>
            </div>

            {/* Chat */}
            <section className="flex min-h-[530px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              {/* Chat header */}
              <div className="flex h-[42px] items-center gap-2 border-b border-slate-100 px-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-[8px] font-bold text-white">
                  S
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-800">
                      Soberana AI
                    </span>

                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  </div>

                  <p className="text-[8px] text-emerald-600">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="max-w-[88%] rounded-xl rounded-tl-sm bg-blue-50 p-3">
                  <p className="text-[10px] leading-5 text-slate-700">
                    Olá! Vamos calcular o preço do seu procedimento. 👋
                  </p>

                  <p className="mt-3 text-[10px] leading-5 text-slate-600">
                    Para começar, selecione uma clínica e um procedimento
                    usando os botões à esquerda. Depois, me diga como posso
                    ajudar — posso ajustar custos, calcular margens ou simular
                    cenários.
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-slate-100 p-3">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-violet-50">
                  <MessageCircle
                    size={13}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        sendMessage()
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-600 text-white transition hover:bg-violet-700"
                  >
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 py-3">
                <h2 className="text-[10px] font-bold uppercase tracking-wide text-slate-700">
                  Resumo da Precificação
                </h2>

                <button
                  type="button"
                  className="flex items-center gap-1 text-[9px] font-semibold text-violet-600 hover:text-violet-700"
                >
                  <Plus size={11} />
                  Novo Item
                </button>
              </div>

              <div className="px-3">
                <PricingSection
                  title="Custos da Clínica"
                  value="R$ 0,00"
                  open={openSection === 'Custos da Clínica'}
                  onClick={() => toggleSection('Custos da Clínica')}
                >
                  <PricingItem label="Custos Fixos" value="R$ 0,00" />
                  <PricingItem label="Custos Variáveis" value="R$ 0,00" />
                  <PricingItem label="Horas Efetivas" value="0,0 h" />
                  <PricingItem label="Hora Clínica" value="R$ 0,00" />
                </PricingSection>

                <PricingSection
                  title="Procedimento"
                  value="R$ 0,00"
                  open={openSection === 'Procedimento'}
                  onClick={() => toggleSection('Procedimento')}
                >
                  <PricingItem label="Tempo" value="0 min" />
                  <PricingItem label="Materiais" value="R$ 0,00" />
                  <PricingItem label="Custos Adicionais" value="R$ 0,00" />
                </PricingSection>

                <PricingSection
                  title="Incidências"
                  value="0,0%"
                  open={openSection === 'Incidências'}
                  onClick={() => toggleSection('Incidências')}
                >
                  <PricingItem label="Impostos" value="0,0%" />
                  <PricingItem label="Taxa Cartão" value="0,0%" />
                  <PricingItem label="Comissão" value="0,0%" />
                </PricingSection>

                <PricingSection
                  title="Lucro"
                  value="0,0%"
                  open={openSection === 'Lucro'}
                  onClick={() => toggleSection('Lucro')}
                >
                  <PricingItem label="Margem" value="0,0%" />
                </PricingSection>

                <PricingSection
                  title="Resultado"
                  value="R$ 0,00"
                  open={openSection === 'Resultado'}
                  onClick={() => toggleSection('Resultado')}
                >
                  <div className="space-y-3 pb-3">
                    <ResultRow
                      label="Custo Direto"
                      value="R$ 0,00"
                    />

                    <ResultRow
                      label="Custo Corrigido"
                      value="R$ 0,00"
                    />

                    <ResultRow
                      label="Preço Final"
                      value="R$ 0,00"
                      highlight
                    />
                  </div>
                </PricingSection>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-[8px] text-slate-400">{label}</p>
      <p className="mt-0.5 text-[9px] font-medium text-slate-600">
        {value}
      </p>
    </div>
  )
}

function ActionButton({
  icon: Icon,
  label,
  primary = false,
  subtle = false,
}: {
  icon: React.ElementType
  label: string
  primary?: boolean
  subtle?: boolean
}) {
  return (
    <button
      type="button"
      className={`flex h-8 w-full items-center justify-center gap-2 rounded-lg border px-2 text-[9px] font-medium transition ${
        primary
          ? 'border-violet-600 bg-violet-600 text-white shadow-sm hover:bg-violet-700'
          : subtle
            ? 'border-transparent bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            : 'border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700'
      }`}
    >
      <Icon size={11} />
      {label}
    </button>
  )
}

function PricingItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-t border-slate-50 py-2 pl-5">
      <span className="text-[8px] text-slate-500">{label}</span>

      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-medium text-slate-600">
          {value}
        </span>

        <Pencil size={9} className="text-slate-300" />
      </div>
    </div>
  )
}

function ResultRow({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[9px] text-slate-500">{label}</span>

      <span
        className={`text-[9px] font-semibold ${
          highlight ? 'text-violet-700' : 'text-slate-600'
        }`}
      >
        {value}
      </span>
    </div>
  )
}