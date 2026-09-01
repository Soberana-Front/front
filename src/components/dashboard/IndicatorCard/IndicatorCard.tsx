// Importa o tipo ReactNode para o ícone
import { ReactNode } from 'react';

// Define as variantes de cores disponíveis
export type IndicatorVariant = 'primary' | 'success' | 'warning' | 'danger';

// Props do componente
interface IndicatorCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  subtitle?: string;
  variant?: IndicatorVariant;
}

// Mapeia estilos para cada variante (borda do card e cores do ícone)
const variantStyles: Record<IndicatorVariant, { borderClass: string; iconBgClass: string; iconColorClass: string }> = {
  primary: {
    borderClass: 'indicator-card-border-primary',
    iconBgClass: 'indicator-card-icon-primary',
    iconColorClass: 'indicator-card-icon-primary',
  },
  success: {
    borderClass: 'indicator-card-border-success',
    iconBgClass: 'indicator-card-icon-success',
    iconColorClass: 'indicator-card-icon-success',
  },
  warning: {
    borderClass: 'indicator-card-border-warning',
    iconBgClass: 'indicator-card-icon-warning',
    iconColorClass: 'indicator-card-icon-warning',
  },
  danger: {
    borderClass: 'indicator-card-border-danger',
    iconBgClass: 'indicator-card-icon-danger',
    iconColorClass: 'indicator-card-icon-danger',
  },
};

// Componente principal do card indicador
export default function IndicatorCard({
  title,
  value,
  icon,
  subtitle,
  variant = 'primary',
}: IndicatorCardProps) {
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <div className={`indicator-card ${styles.borderClass}`}>
      {/* Cabeçalho: título + ícone */}
      <div className="indicator-card-header">
        <span className="indicator-card-title">
          {title}
        </span>
        {icon && (
          <div className={`indicator-card-icon ${styles.iconBgClass} ${styles.iconColorClass}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Corpo: valor + subtítulo */}
      <div className="indicator-card-body">
        <div className="indicator-card-value">
          {value}
        </div>
        {subtitle && (
          <p className="indicator-card-subtitle">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}