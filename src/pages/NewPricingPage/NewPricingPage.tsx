// Importa o layout padrão utilizado
// pelas páginas do dashboard
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout'

// Importa o wizard que controla
// todo o fluxo de nova precificação
import PricingWizard from '../../components/dashboard/PricingWizard/PricingWizard'

// Página de Nova Precificação
//
// Responsabilidade:
// - Utilizar o DashboardLayout existente
// - Renderizar o PricingWizard
//
// Toda a lógica das quatro etapas fica
// centralizada no PricingWizard.
export default function NewPricingPage() {
  return (
    <DashboardLayout>
      {/* Container padrão utilizado no dashboard */}
      <div className="dashboard-container">
        {/* Fluxo completo da nova precificação */}
        <PricingWizard />
      </div>
    </DashboardLayout>
  )
}