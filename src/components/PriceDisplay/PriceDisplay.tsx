import React from 'react';

interface PriceDisplayProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'muted';
  className?: string;
}

const sizeClasses = {
  sm: 'text-xs md:text-sm font-medium',
  md: 'text-base md:text-lg font-semibold',
  lg: 'text-2xl md:text-3xl font-bold',
};

const variantClasses = {
  default: 'text-slate-900',
  primary: 'text-emerald-600',
  muted: 'text-slate-500',
};

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

export default PriceDisplay;