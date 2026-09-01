// Importa layout principal do dashboard
import { DashboardLayout } from '../../components/dashboard/DashboardLayout/DashboardLayout';
// Importa grade de indicadores
import IndicatorsGrid from '../../components/dashboard/IndicatorsGrid/IndicatorsGrid';
// Importa seletor de clínica
import ClinicSelector from '../../components/dashboard/ClinicSelector/ClinicSelector';
// Importa seletor de procedimento
import { ProcedureSelector } from '../../components/dashboard/ProcedureSelector/ProcedureSelector';
// Importa resumo de precificação
import { PricingSummary } from '../../components/dashboard/PricingSumary/PricingSumary';
// Importa botões de ações rápidas
import { QuickActions } from '../../components/dashboard/QuickActions/QuickActions';
// Importa janela de chat com IA
import { ChatWindow } from '../../components/dashboard/ChatWindow/ChatWindow';
// Importa histórico recente
import { RecentHistory } from '../../components/dashboard/RecentHistory/RecentHistory';

// Página principal do dashboard
export const DashboardPage: React.FC = () => {
  return (
    // Layout com sidebar e header
    <DashboardLayout>
      {/* Container com espaçamento e largura máxima centralizada */}
      <div className="dashboard-container">
        {/* Linha com os 4 indicadores principais */}
        <IndicatorsGrid />

        {/* Grid de 3 colunas (seletores, chat, resumo) */}
        <div className="dashboard-grid">
          
          {/* Coluna esquerda: seletores e ações rápidas */}
          <div className="dashboard-col-left">
            <div className="dashboard-selectors-card">
              <ClinicSelector />
              <ProcedureSelector />
            </div>

            <QuickActions />
          </div>

          {/* Coluna central: chat com IA */}
          <div className="dashboard-col-center">
            <ChatWindow />
          </div>

          {/* Coluna direita: resumo da precificação e histórico */}
          <div className="dashboard-col-right">
            <PricingSummary />
            <RecentHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;