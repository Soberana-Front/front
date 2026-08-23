import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProfitIndicatorProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export const ProfitIndicator: React.FC<ProfitIndicatorProps> = ({
  value,
  showIcon = true,
  className = '',
}) => {
  const isPositive = value >= 0;
  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
        isPositive
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-rose-50 text-rose-700 border border-rose-200'
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