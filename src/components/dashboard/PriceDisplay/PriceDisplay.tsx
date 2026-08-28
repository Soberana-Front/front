// Importa React para usar JSX e tipos
import React from 'react';

// Props do componente de exibição de preço
interface PriceDisplayProps {
  value: number;                           // Valor numérico a ser formatado
  size?: 'sm' | 'md' | 'lg';               // Tamanho do texto
  variant?: 'default' | 'primary' | 'muted'; // Cor do texto
  className?: string;                      // Classes CSS adicionais
}

// Mapeia tamanhos para classes Tailwind
const sizeClasses = {
  sm: 'text-xs md:text-sm font-medium',
  md: 'text-base md:text-lg font-semibold',
  lg: 'text-2xl md:text-3xl font-bold',
};

// Mapeia variantes para cores
const variantClasses = {
  default: 'text-slate-900',
  primary: 'text-emerald-600',
  muted: 'text-slate-500',
};

// Componente que exibe um valor monetário formatado em R$
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  value,
  size = 'md',           // Tamanho padrão: médio
  variant = 'default',    // Cor padrão: escura
  className = '',
}) => {
  // Formata o valor para moeda brasileira (R$)
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return (
    // Span com classes combinadas: tamanho + cor + customização
    <span className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {formattedValue}
    </span>
  );
};