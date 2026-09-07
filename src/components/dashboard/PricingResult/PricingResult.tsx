import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  MOCK_PRICING_DATA,
  PricingSummaryData,
} from '../PricingSumary/PricingSumary';

// Props do resultado final da precificação
interface PricingResultProps {
  // Dados calculados da precificação
  data?: PricingSummaryData;

  // Callback executado ao finalizar
  onFinish?: () => void;
}

// Componente responsável pela etapa 4 do fluxo de precificação
export const PricingResult: React.FC<PricingResultProps> = ({
  data = MOCK_PRICING_DATA,
  onFinish,
}) => {
  // Lista dos valores detalhados da precificação
  const items = [
    {
      label: 'Custos da Clínica',
      value: data.clinicCosts,
    },
    {
      label: 'Procedimento',
      value: data.procedureCost,
    },
    {
      label: 'Incidências',
      value: data.taxIncidences,
    },
    {
      label: 'Lucro',
      value: data.profit,
    },
    {
      label: 'Resultado',
      value: data.result,
    },
    {
      label: 'Custo Direto',
      value: data.directCost,
    },
    {
      label: 'Custo Corrigido',
      value: data.correctedCost,
    },
  ];

  // Exportação mockada conforme especificação da Issue #65
  const handleExportPDF = () => {
    console.log('Exportar PDF - funcionalidade mockada');
  };

  return (
    <section className="pricing-result">
      {/* Cabeçalho da etapa */}
      <header className="pricing-result__header">
        <span className="pricing-result__step">
          Etapa 4
        </span>

        <h2 className="pricing-result__title">
          Resultado da Precificação
        </h2>

        <p className="pricing-result__description">
          Confira os valores calculados para sua precificação.
        </p>
      </header>

      {/* Card principal com os resultados */}
      <div className="pricing-result__card">
        {/* Lista dos valores calculados */}
        <div className="pricing-result__items">
          {items.map((item) => (
            <div
              key={item.label}
              className="pricing-result__item"
            >
              <span className="pricing-result__label">
                {item.label}
              </span>

              <span className="pricing-result__value">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}

          {/* Preço final recebe destaque visual */}
          <div className="pricing-result__final">
            <span className="pricing-result__final-label">
              Preço Final
            </span>

            <span className="pricing-result__final-value">
              {formatCurrency(data.finalPrice)}
            </span>
          </div>
        </div>

        {/* Ações disponíveis na etapa final */}
        <div className="pricing-result__actions">
          <button
            type="button"
            className="pricing-result__export-button"
            onClick={handleExportPDF}
          >
            Exportar PDF
          </button>

          <button
            type="button"
            className="pricing-result__finish-button"
            onClick={onFinish}
          >
            Finalizar
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingResult;