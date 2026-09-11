// Importa componentes do Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
// Importa utilitário de formatação
import { formatCurrency } from '../../../utils/formatCurrency';
// Importa tipo de dados da comparação
import { ComparisonClinicData } from '../ComparisonTable/ComparisonTable';

// Props do componente
interface ComparisonChartsProps {
  clinicA: ComparisonClinicData;
  clinicB: ComparisonClinicData;
}

// Cores padrão
const COLORS = {
  clinicA: '#6366f1',
  clinicB: '#8b5cf6',
  materials: '#f59e0b',
  fixedCosts: '#3b82f6',
  variableCosts: '#ef4444',
  profit: '#10b981',
};

// Formatter para o Tooltip (aceita qualquer tipo e converte para número)
const currencyFormatter = (value: any): string => {
  return formatCurrency(Number(value));
};

// ========================================
// GRÁFICO 1: Comparação do Preço Final
// ========================================
const PriceComparisonChart = ({
  clinicA,
  clinicB,
}: ComparisonChartsProps) => {
  const data = [
    {
      name: 'Preço Final',
      [clinicA.clinicName]: clinicA.precoFinal,
      [clinicB.clinicName]: clinicB.precoFinal,
    },
  ];

  return (
    <div className="comparison-chart-card">
      <h3 className="comparison-chart-title">Comparação do Preço Final</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `R$ ${v}`} />
          <Tooltip formatter={currencyFormatter} />
          <Legend />
          <Bar dataKey={clinicA.clinicName} fill={COLORS.clinicA} radius={[8, 8, 0, 0]} />
          <Bar dataKey={clinicB.clinicName} fill={COLORS.clinicB} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ========================================
// GRÁFICO 2: Distribuição dos Custos
// ========================================
const CostDistributionChart = ({
  clinicA,
  clinicB,
}: ComparisonChartsProps) => {
  const dataA = [
    { name: 'Materiais', value: clinicA.materiais },
    { name: 'Custos Fixos', value: clinicA.custosFixos },
    { name: 'Custos Variáveis', value: clinicA.custosVariaveis },
  ];

  const dataB = [
    { name: 'Materiais', value: clinicB.materiais },
    { name: 'Custos Fixos', value: clinicB.custosFixos },
    { name: 'Custos Variáveis', value: clinicB.custosVariaveis },
  ];

  const costColors = [COLORS.materials, COLORS.fixedCosts, COLORS.variableCosts];

  return (
    <div className="comparison-chart-card">
      <h3 className="comparison-chart-title">Distribuição dos Custos</h3>

      <div className="comparison-pie-grid">
        {/* Gráfico Clínica A */}
        <div>
          <h4 className="comparison-chart-subtitle">{clinicA.clinicName}</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataA}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                label={(entry) => `${entry.name}`}
              >
                {dataA.map((_, index) => (
                  <Cell key={index} fill={costColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={currencyFormatter} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Clínica B */}
        <div>
          <h4 className="comparison-chart-subtitle">{clinicB.clinicName}</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataB}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                label={(entry) => `${entry.name}`}
              >
                {dataB.map((_, index) => (
                  <Cell key={index} fill={costColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={currencyFormatter} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ========================================
// GRÁFICO 3: Lucro vs Custo
// ========================================
const ProfitVsCostChart = ({
  clinicA,
  clinicB,
}: ComparisonChartsProps) => {
  const totalCostA = clinicA.materiais + clinicA.custosFixos + clinicA.custosVariaveis;
  const totalCostB = clinicB.materiais + clinicB.custosFixos + clinicB.custosVariaveis;

  const profitA = clinicA.precoFinal - totalCostA;
  const profitB = clinicB.precoFinal - totalCostB;

  const data = [
    {
      name: clinicA.clinicName,
      Custo: totalCostA,
      Lucro: profitA,
    },
    {
      name: clinicB.clinicName,
      Custo: totalCostB,
      Lucro: profitB,
    },
  ];

  return (
    <div className="comparison-chart-card">
      <h3 className="comparison-chart-title">Lucro vs Custo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `R$ ${v}`} />
          <Tooltip formatter={currencyFormatter} />
          <Legend />
          <Bar dataKey="Custo" stackId="a" fill={COLORS.variableCosts} />
          <Bar dataKey="Lucro" stackId="a" fill={COLORS.profit} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export const ComparisonCharts = ({
  clinicA,
  clinicB,
}: ComparisonChartsProps) => {
  return (
    <div className="comparison-charts-container">
      <PriceComparisonChart clinicA={clinicA} clinicB={clinicB} />
      <CostDistributionChart clinicA={clinicA} clinicB={clinicB} />
      <ProfitVsCostChart clinicA={clinicA} clinicB={clinicB} />
    </div>
  );
};