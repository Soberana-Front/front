// Importa React e ícones de tendência
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Props do indicador de lucro
interface ProfitIndicatorProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

// Componente que exibe um badge de lucro com ícone e cor
export const ProfitIndicator: React.FC<ProfitIndicatorProps> = ({
  value,
  showIcon = true,
  className = '',
}) => {
  const isPositive = value >= 0;
  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div
      className={`profit-indicator ${
        isPositive ? 'profit-indicator-positive' : 'profit-indicator-negative'
      } ${className}`}
    >
      {showIcon &&
        (isPositive ? (
          <TrendingUp className="w-3.5 h-3.5" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5" />
        ))}
      <span>{formattedValue}</span>
    </div>
  );
};

export default ProfitIndicator;