// Importa o tipo ReactNode para o ícone
import { ReactNode } from 'react';

// Define as variantes de cores disponíveis
export type IndicatorVariant = 'primary' | 'success' | 'warning' | 'danger';

// Props do componente
interface IndicatorCardProps {
  title: string;          // Título do indicador
  value: string;          // Valor exibido (ex: R$ 1.500,00)
  icon?: ReactNode;       // Ícone opcional
  subtitle?: string;      // Subtítulo opcional
  variant?: IndicatorVariant; // Cor do card
}

// Mapeia estilos para cada variante (fundo do ícone, cor, borda)
const variantStyles: Record<IndicatorVariant, { iconBg: string; iconColor: string; border: string }> = {
  primary: {
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    border: 'border-gray-100 hover:border-indigo-200',
  },
  success: {
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-gray-100 hover:border-emerald-200',
  },
  warning: {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'border-gray-100 hover:border-amber-200',
  },
  danger: {
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    border: 'border-gray-100 hover:border-rose-200',
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
  // Obtém os estilos da variante selecionada (fallback para primary)
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    // Card com fundo branco, borda e sombra suave
    <div
      className={`bg-white rounded-2xl p-5 border transition-all shadow-sm ${styles.border} flex flex-col justify-between h-full`}
    >
      {/* Cabeçalho: título + ícone */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className={`p-2 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.iconColor}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Corpo: valor + subtítulo */}
      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1 font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}