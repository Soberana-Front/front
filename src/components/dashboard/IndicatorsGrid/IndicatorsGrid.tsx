// Importa ícones para cada indicador
import { DollarSign, TrendingUp, Clock, BarChart3 } from 'lucide-react';
// Importa o componente de card de indicador
import IndicatorCard from '../IndicatorCard/IndicatorCard';

// Props do componente com valores opcionais e fallbacks
interface IndicatorsGridProps {
  precoCalculado?: string;   // Valor do preço calculado
  lucro?: string;            // Valor do lucro
  horaClinica?: string;      // Valor da hora clínica
  mediaMercado?: string;     // Valor da média de mercado
}

// Componente que organiza 4 indicadores em grid responsivo
export default function IndicatorsGrid({
  precoCalculado = "R$ 0,00",  // Fallback para valores não fornecidos
  lucro = "R$ 0,00",
  horaClinica = "R$ 0,00",
  mediaMercado = "R$ 0,00",
}: IndicatorsGridProps) {
  return (
    // Grid responsivo: 1 coluna (mobile) → 2 (tablet) → 4 (desktop)
    <div className="indicators-grid">
      
      {/* Card: Preço Calculado */}
      <IndicatorCard
        title="PREÇO CALCULADO"
        value={precoCalculado}
        subtitle="Baseado nos parâmetros atuais"
        variant="primary"
        icon={<DollarSign className="w-5 h-5" />}
      />

      {/* Card: Lucro */}
      <IndicatorCard
        title="LUCRO"
        value={lucro}
        subtitle="0,0% de margem"
        variant="success"
        icon={<TrendingUp className="w-5 h-5" />}
      />

      {/* Card: Hora Clínica */}
      <IndicatorCard
        title="HORA CLÍNICA"
        value={horaClinica}
        subtitle="Custo por hora efetiva"
        variant="warning"
        icon={<Clock className="w-5 h-5" />}
      />

      {/* Card: Média de Mercado */}
      <IndicatorCard
        title="MÉDIA DE MERCADO"
        value={mediaMercado}
        subtitle="Referência regional"
        variant="primary"
        icon={<BarChart3 className="w-5 h-5" />}
      />
    </div>
  );
}