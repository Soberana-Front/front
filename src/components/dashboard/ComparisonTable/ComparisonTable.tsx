// Importa utilitário de formatação de moeda
import { formatCurrency } from '../../../utils/formatCurrency';
// Importa utilitário de classes
import { cn } from '../../../utils/cn';

// Tipo de formatação de cada parâmetro
type ParamFormat = 'currency' | 'percent' | 'minutes';

// Interface de dados de uma clínica para a comparação
export interface ComparisonClinicData {
  clinicId: string;
  clinicName: string;
  tempo: number;              // em minutos
  materiais: number;          // em R$
  custosFixos: number;        // em R$
  custosVariaveis: number;    // em R$
  horaClinica: number;        // em R$
  comissao: number;           // em %
  impostos: number;           // em %
  margem: number;             // em %
  precoFinal: number;         // em R$
}

// Props do componente
interface ComparisonTableProps {
  clinicA: ComparisonClinicData;
  clinicB: ComparisonClinicData;
  className?: string;
}

// Definição dos parâmetros da tabela (label + chave + formato)
const PARAMS: { label: string; key: keyof Omit<ComparisonClinicData, 'clinicId' | 'clinicName'>; format: ParamFormat }[] = [
  { label: 'Tempo', key: 'tempo', format: 'minutes' },
  { label: 'Materiais', key: 'materiais', format: 'currency' },
  { label: 'Custos Fixos', key: 'custosFixos', format: 'currency' },
  { label: 'Custos Variáveis', key: 'custosVariaveis', format: 'currency' },
  { label: 'Hora Clínica', key: 'horaClinica', format: 'currency' },
  { label: 'Comissão', key: 'comissao', format: 'percent' },
  { label: 'Impostos', key: 'impostos', format: 'percent' },
  { label: 'Margem', key: 'margem', format: 'percent' },
  { label: 'Preço Final', key: 'precoFinal', format: 'currency' },
];

// Formata um valor conforme o tipo
const formatValue = (value: number, format: ParamFormat): string => {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percent':
      return `${value.toFixed(1)}%`;
    case 'minutes':
      return `${value} min`;
    default:
      return String(value);
  }
};

// Formata a diferença (com sinal + ou -)
const formatDifference = (diff: number, format: ParamFormat): string => {
  const sign = diff > 0 ? '+' : '';
  switch (format) {
    case 'currency':
      return `${sign}${formatCurrency(diff)}`;
    case 'percent':
      return `${sign}${diff.toFixed(1)}%`;
    case 'minutes':
      return `${sign}${diff} min`;
    default:
      return String(diff);
  }
};

// Componente da tabela de comparação
export const ComparisonTable = ({
  clinicA,
  clinicB,
  className,
}: ComparisonTableProps) => {
  return (
    <div className={cn('comparison-table-container', className)}>
      <table className="comparison-table">
        {/* Cabeçalho */}
        <thead>
          <tr className="comparison-table-head-row">
            <th className="comparison-table-th">Parâmetro</th>
            <th className="comparison-table-th">{clinicA.clinicName}</th>
            <th className="comparison-table-th">{clinicB.clinicName}</th>
            <th className="comparison-table-th">Diferença</th>
          </tr>
        </thead>

        {/* Corpo da tabela */}
        <tbody>
          {PARAMS.map((param, index) => {
            const valueA = clinicA[param.key];
            const valueB = clinicB[param.key];
            const diff = valueB - valueA;

            // Cor da diferença: verde se positiva (B maior), vermelha se negativa
            const diffColor =
              diff > 0
                ? 'comparison-table-diff-positive'
                : diff < 0
                ? 'comparison-table-diff-negative'
                : 'comparison-table-diff-neutral';

            return (
              <tr
                key={param.key}
                className={cn(
                  'comparison-table-row',
                  index % 2 === 1 && 'comparison-table-row-alt'
                )}
              >
                <td className="comparison-table-td comparison-table-td-label">
                  {param.label}
                </td>
                <td className="comparison-table-td">
                  {formatValue(valueA, param.format)}
                </td>
                <td className="comparison-table-td">
                  {formatValue(valueB, param.format)}
                </td>
                <td className={cn('comparison-table-td', diffColor)}>
                  {formatDifference(diff, param.format)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};