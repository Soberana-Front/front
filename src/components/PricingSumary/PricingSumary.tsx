import React from 'react';

// Interface com os dados que o componente aceita
export interface PricingSummaryData {
  clinicCosts: number;
  procedureCost: number;
  taxIncidences: number;
  profit: number;
  result: number;
  directCost: number;
  correctedCost: number;
  finalPrice: number;
}

// Dados mockados iniciais (padrão R$ 0,00)
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

interface PricingSummaryProps {
  data?: PricingSummaryData;
}

// Funcao auxiliar para formatar valores em Reais (R$)
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  data = MOCK_PRICING_DATA,
}) => {
  // Lista dos itens padrão
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

        {/* Destaque especial para o Preço Final */}
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