// Importa React e ícones de tendência
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Props do indicador de lucro
interface ProfitIndicatorProps {
  value: number;              // Valor percentual do lucro
  showIcon?: boolean;         // Exibir ícone (padrão: true)
  className?: string;         // Classes CSS adicionais
}

// Componente que exibe um badge de lucro com ícone e cor
export const ProfitIndicator: React.FC<ProfitIndicatorProps> = ({
  value,
  showIcon = true,
  className = '',
}) => {
  const isPositive = value >= 0;                                 // Define se é positivo ou negativo
  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(1)}%`; // Formata o valor com sinal

  return (
    // Badge com cor condicional (verde para positivo, vermelho para negativo)
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
        isPositive
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-rose-50 text-rose-700 border border-rose-200'
      } ${className}`}
    >
      {/* Ícone de tendência (seta para cima ou para baixo) */}
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

// Exportação padrão do componente
export default ProfitIndicator;