// Importa utilitário de classes
import { cn } from '../../../utils/cn';
// Importa utilitário de formatação de moeda
import { formatCurrency } from '../../../utils/formatCurrency';
// Importa ícones
import { TrendingUp, TrendingDown } from 'lucide-react';

// Props do componente
interface PriceDifferenceCardProps {
  clinicAName: string;
  clinicBName: string;
  priceA: number;
  priceB: number;
  className?: string;
}

// Componente que exibe a diferença percentual do preço final entre duas clínicas
export const PriceDifferenceCard = ({
  clinicAName,
  clinicBName,
  priceA,
  priceB,
  className,
}: PriceDifferenceCardProps) => {
  // Evita divisão por zero
  const base = priceB === 0 ? 1 : priceB;

  // Calcula a diferença percentual (A em relação a B)
  const percentDiff = ((priceA - priceB) / base) * 100;

  // Determina se A é mais cara (positivo) ou mais barata (negativo)
  const isMoreExpensive = percentDiff > 0;
  const isEqual = Math.abs(percentDiff) < 0.01; // considerado igual

  // Formata o valor absoluto com 1 casa decimal
  const formattedPercent = Math.abs(percentDiff).toFixed(1);

  // Valor absoluto da diferença em R$
  const absoluteDiff = Math.abs(priceA - priceB);

  // Se os preços são iguais
  if (isEqual) {
    return (
      <div className={cn('price-diff-card price-diff-card-neutral', className)}>
        <div className="price-diff-card-content">
          <p className="price-diff-card-message">
            As clínicas têm o mesmo preço final
          </p>
          <p className="price-diff-card-value">
            {formatCurrency(priceA)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'price-diff-card',
        isMoreExpensive
          ? 'price-diff-card-expensive'
          : 'price-diff-card-cheaper',
        className
      )}
    >
      <div className="price-diff-card-content">
        {/* Ícone de tendência */}
        <div className="price-diff-card-icon">
          {isMoreExpensive ? (
            <TrendingUp className="w-6 h-6" />
          ) : (
            <TrendingDown className="w-6 h-6" />
          )}
        </div>

        {/* Mensagem principal */}
        <p className="price-diff-card-message">
          <strong>{clinicAName}</strong> é{' '}
          <strong>{formattedPercent}%</strong>{' '}
          {isMoreExpensive ? 'mais cara' : 'mais barata'} que{' '}
          <strong>{clinicBName}</strong>
        </p>

        {/* Diferença em R$ */}
        <p className="price-diff-card-value">
          Diferença: {formatCurrency(absoluteDiff)}
        </p>
      </div>
    </div>
  );
};