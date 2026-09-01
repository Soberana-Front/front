// Importa React para usar JSX e tipos
import React from 'react';

// Props do componente de exibição de preço
interface PriceDisplayProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'muted';
  className?: string;
}

// Mapeia tamanhos para classes customizadas
const sizeClasses = {
  sm: 'price-display-sm',
  md: 'price-display-md',
  lg: 'price-display-lg',
};

// Mapeia variantes para classes customizadas
const variantClasses = {
  default: 'price-display-default',
  primary: 'price-display-primary',
  muted: 'price-display-muted',
};

// Componente que exibe um valor monetário formatado em R$
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  value,
  size = 'md',
  variant = 'default',
  className = '',
}) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return (
    <span className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {formattedValue}
    </span>
  );
};