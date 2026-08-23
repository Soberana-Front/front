import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout/DashboardLayout';
import IndicatorsGrid from '../components/IndicatorsGrid/IndicatorsGrid';
import ClinicSelector from '../components/ClinicSelector/ClinicSelector';
import { ProcedureSelector } from '../components/ProcedureSelector/ProcedureSelector';
import { PricingSummary } from '../components/PricingSumary/PricingSumary';
import { QuickActions } from '../components/QuickActions/QuickActions';
import { ChatWindow } from '../components/ChatWindow/ChatWindow';
import { RecentHistory } from '../components/RecentHistory/RecentHistory';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto">
        {/* 1. Indicadores no Topo */}
        <IndicatorsGrid />

        {/* 2. Grid Principal do Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Coluna Esquerda: Seletores e Ações Rápidas */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-5">
              <ClinicSelector />
              <ProcedureSelector />
            </div>

            <QuickActions />
          </div>

          {/* Coluna Central: ChatWindow (IA) */}
          <div className="lg:col-span-5 h-[560px]">
            <ChatWindow />
          </div>

          {/* Coluna Direita: Resumo da Precificação + Histórico */}
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