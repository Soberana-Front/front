// Importa React para usar JSX e o tipo React.FC
import React from 'react';

// Função centralizada para formatação de valores monetários
import { formatCurrency } from '@/utils/formatCurrency';

// Props do componente reutilizável de exibição de preço
interface PriceDisplayProps {
  // Valor monetário que será exibido
  value: number;

  // Define o tamanho da fonte
  size?: 'sm' | 'md' | 'lg';

  // Define o estilo visual do valor
  variant?: 'default' | 'highlight';

  // Texto opcional exibido antes do valor
  label?: string;

  // Permite adicionar classes extras ao componente
  className?: string;
}

// Mapeia os tamanhos para as classes globais definidas no index.css
const sizeClasses = {
  sm: 'price-display-sm',
  md: 'price-display-md',
  lg: 'price-display-lg',
};

// Mapeia as variantes para as classes globais definidas no index.css
const variantClasses = {
  default: 'price-display-default',
  highlight: 'price-display-highlight',
};

// Componente reutilizável para exibição de valores monetários
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  value,
  size = 'md',
  variant = 'default',
  label,
  className = '',
}) => {
  // Utiliza a função centralizada para manter a formatação monetária
  // padronizada em todo o projeto.
  const formattedValue = formatCurrency(value);

  return (
    <span
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {label && <span className="price-display-label">{label}: </span>}
      {formattedValue}
    </span>
  );
};