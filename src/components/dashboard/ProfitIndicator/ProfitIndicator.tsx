// Importa o React e o tipo React.FC para definir o componente tipado
import React from 'react';

// Importa os ícones utilizados para representar visualmente
// lucro positivo e lucro negativo
import { TrendingUp, TrendingDown } from 'lucide-react';

// Define as propriedades aceitas pelo componente reutilizável
interface ProfitIndicatorProps {
  // Valor do lucro em porcentagem.
  // Exemplos: 35.5, 10, -5.2
  value: number;

  // Texto opcional exibido antes do percentual.
  // Exemplo: "Lucro: 35,5%"
  label?: string;

  // Permite controlar se o ícone de tendência será exibido
  showIcon?: boolean;

  // Permite adicionar classes CSS extras quando necessário
  className?: string;
}

// Componente reutilizável responsável por exibir
// um indicador percentual de lucro
export const ProfitIndicator: React.FC<ProfitIndicatorProps> = ({
  value,
  label,
  showIcon = true,
  className = '',
}) => {
  // Define se o valor representa lucro positivo
  const isPositive = value > 0;

  // Define se o valor representa prejuízo
  const isNegative = value < 0;

  // Define a classe visual de acordo com o valor.
  // As classes são centralizadas no index.css global.
  const indicatorClass = isPositive
    ? 'profit-indicator-positive'
    : isNegative
      ? 'profit-indicator-negative'
      : 'profit-indicator-neutral';

  // Formata o percentual utilizando uma casa decimal.
  // O símbolo de porcentagem é exibido conforme a especificação da Issue #67.
  const formattedValue = `${value.toFixed(1)}%`;

  return (
    <div className={`profit-indicator ${indicatorClass} ${className}`}>
      {/* Exibe o ícone somente quando showIcon estiver habilitado */}
      {showIcon &&
        (isPositive ? (
          <TrendingUp className="w-3.5 h-3.5" />
        ) : isNegative ? (
          <TrendingDown className="w-3.5 h-3.5" />
        ) : null)}

      {/* Exibe o label somente quando ele for informado */}
      {label && (
        <span className="profit-indicator-label">
          {label}:
        </span>
      )}

      {/* Exibe o percentual do lucro */}
      <span>{formattedValue}</span>
    </div>
  );
};

// Exportação padrão para manter compatibilidade
// com imports existentes no projeto
export default ProfitIndicator;