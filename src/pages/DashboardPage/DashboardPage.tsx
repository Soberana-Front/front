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
      <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto">
        {/* Linha com os 4 indicadores principais */}
        <IndicatorsGrid />

        {/* Grid de 3 colunas (seletores, chat, resumo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Coluna esquerda: seletores e ações rápidas */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-5">
              <ClinicSelector />
              <ProcedureSelector />
            </div>

            <QuickActions />
          </div>

          {/* Coluna central: chat com IA */}
          <div className="lg:col-span-5 h-140">
            <ChatWindow />
          </div>

          {/* Coluna direita: resumo da precificação e histórico */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <PricingSummary />
            <RecentHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;