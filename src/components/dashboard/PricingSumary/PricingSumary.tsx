// Importa React e a função de formatação de moeda
import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

// Interface com os dados do resumo de precificação
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
  data?: PricingSummaryData;
}

// Componente que exibe o resumo da precificação
export const PricingSummary: React.FC<PricingSummaryProps> = ({
  data = MOCK_PRICING_DATA,
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
    <div className="pricing-summary-container">
      <h2 className="pricing-summary-title">
        Resumo da Precificação
      </h2>

      <div className="pricing-summary-items">
        {/* Renderiza todos os itens de custo e resultado */}
        {items.map((item, index) => (
          <div key={index} className="pricing-summary-item">
            <span>{item.label}</span>
            <span className="pricing-summary-item-value">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}

        {/* Destaque especial para o Preço Final (azul) */}
        <div className="pricing-summary-highlight">
          <span className="pricing-summary-highlight-label">
            Preço Final
          </span>
          <span className="pricing-summary-highlight-value">
            {formatCurrency(data.finalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};