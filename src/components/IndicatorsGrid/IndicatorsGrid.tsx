import { DollarSign, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import IndicatorCard from '../IndicatorCard/IndicatorCard';

interface IndicatorsGridProps {
  precoCalculado?: string;
  lucro?: string;
  horaClinica?: string;
  mediaMercado?: string;
}

export default function IndicatorsGrid({
  precoCalculado = "R$ 0,00",
  lucro = "R$ 0,00",
  horaClinica = "R$ 0,00",
  mediaMercado = "R$ 0,00",
}: IndicatorsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <IndicatorCard
        title="PREÇO CALCULADO"
        value={precoCalculado}
        subtitle="Baseado nos parâmetros atuais"
        variant="primary"
        icon={<DollarSign className="w-5 h-5" />}
      />

      <IndicatorCard
        title="LUCRO"
        value={lucro}
        subtitle="0,0% de margem"
        variant="success"
        icon={<TrendingUp className="w-5 h-5" />}
      />

      <IndicatorCard
        title="HORA CLÍNICA"
        value={horaClinica}
        subtitle="Custo por hora efetiva"
        variant="warning"
        icon={<Clock className="w-5 h-5" />}
      />

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