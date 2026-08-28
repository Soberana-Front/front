// Importa React e a função de formatação de moeda
import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

// Interface com os dados do resumo de precificação
export interface PricingSummaryData {
  clinicCosts: number;      // Custos da clínica
  procedureCost: number;    // Custo do procedimento
  taxIncidences: number;    // Incidências de impostos
  profit: number;           // Lucro
  result: number;           // Resultado
  directCost: number;       // Custo direto
  correctedCost: number;    // Custo corrigido
  finalPrice: number;       // Preço final
}

// Dados mockados iniciais (todos zerados)
export const MOCK_PRICING_DATA: PricingSummaryData = {
  clinicCosts: 0,
  procedureCost: 0,
  taxIncidences: 0,
  profit: 0,
  result: 0,
  directCost: 0,
  correctedCost: 0,
  finalPrice: 0,
};

// Props do componente
interface PricingSummaryProps {
  data?: PricingSummaryData; // Dados do resumo (opcional, usa mock)
}

// Componente que exibe o resumo da precificação
export const PricingSummary: React.FC<PricingSummaryProps> = ({
  data = MOCK_PRICING_DATA, // Usa mock se nenhum dado for fornecido
}) => {
  // Lista de itens do resumo (rótulo + valor)
  const items = [
    { label: 'Custos da Clínica', value: data.clinicCosts },
    { label: 'Procedimento', value: data.procedureCost },
    { label: 'Incidências', value: data.taxIncidences },
    { label: 'Lucro', value: data.profit },
    { label: 'Resultado', value: data.result },
    { label: 'Custo Direto', value: data.directCost },
    { label: 'Custo Corrigido', value: data.correctedCost },
  ];

  return (
    // Container principal do resumo
    <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
        Resumo da Precificação
      </h2>

      <div className="space-y-3">
        {/* Renderiza todos os itens de custo e resultado */}
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm text-gray-600"
          >
            <span>{item.label}</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}

        {/* Destaque especial para o Preço Final (azul) */}
        <div className="mt-4 pt-3 border-t-2 border-gray-100 flex justify-between items-center bg-blue-50 p-3 rounded-md">
          <span className="text-base font-bold text-blue-900">
            Preço Final
          </span>
          <span className="text-lg font-extrabold text-blue-600">
            {formatCurrency(data.finalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};