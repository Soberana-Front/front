// Importa hooks do React
import { useState, useCallback } from 'react';
// Importa tipo de dados da comparação
import { ComparisonClinicData } from '../components/dashboard/ComparisonTable/ComparisonTable';


// Interface básica de clínica
export interface Clinic {
  id: string;
  name: string;
}

// Interface básica de procedimento
export interface Procedure {
  id: string;
  name: string;
}

// Resultado completo da comparação
export interface ComparisonResult {
  clinicA: ComparisonClinicData;
  clinicB: ComparisonClinicData;
  difference: {
    percentDiff: number;         // % de diferença (A em relação a B)
    absoluteDiff: number;         // R$ de diferença
    isMoreExpensive: boolean;     // A é mais cara que B?
    isEqual: boolean;             // Preços iguais?
  };
  chartData: {
    priceComparison: Array<{ name: string; [key: string]: string | number }>;
    costDistributionA: Array<{ name: string; value: number }>;
    costDistributionB: Array<{ name: string; value: number }>;
    profitVsCost: Array<{ name: string; Custo: number; Lucro: number }>;
  };
}

// DADOS MOCKADOS (temporários até integração com API)


export const MOCK_CLINICS: Clinic[] = [
  { id: '1', name: 'Clínica OdontoSoberana' },
  { id: '2', name: 'Clínica Sorriso Perfeito' },
  { id: '3', name: 'Clínica Odonto Prime' },
];

export const MOCK_PROCEDURES: Procedure[] = [
  { id: '1', name: 'Consulta Odontológica' },
  { id: '2', name: 'Limpeza e Profilaxia' },
  { id: '3', name: 'Tratamento de Canal' },
  { id: '4', name: 'Clareamento Dental' },
];

// FUNÇÕES AUXILIARES

// Simula a busca dos dados de uma clínica para o procedimento (mock)
const fetchClinicData = (
  clinic: Clinic,
  procedure: Procedure,
): ComparisonClinicData => {
  // Gera valores simulados com base no id da clínica
  const seed = Number(clinic.id) * 10 + Number(procedure.id);

  return {
    clinicId: clinic.id,
    clinicName: clinic.name,
    tempo: 30 + (seed % 40),
    materiais: 30 + (seed % 30),
    custosFixos: 80 + (seed % 60),
    custosVariaveis: 20 + (seed % 20),
    horaClinica: 60 + (seed % 40),
    comissao: 30 + (seed % 15),
    impostos: 10 + (seed % 10),
    margem: 20 + (seed % 15),
    precoFinal: 250 + (seed % 150),
  };
};

// Calcula a diferença entre as clínicas
const calculateDifference = (
  clinicA: ComparisonClinicData,
  clinicB: ComparisonClinicData,
) => {
  const base = clinicB.precoFinal === 0 ? 1 : clinicB.precoFinal;
  const percentDiff = ((clinicA.precoFinal - clinicB.precoFinal) / base) * 100;
  const absoluteDiff = Math.abs(clinicA.precoFinal - clinicB.precoFinal);

  return {
    percentDiff,
    absoluteDiff,
    isMoreExpensive: percentDiff > 0,
    isEqual: Math.abs(percentDiff) < 0.01,
  };
};

// Gera os dados para os gráficos
const generateChartData = (
  clinicA: ComparisonClinicData,
  clinicB: ComparisonClinicData,
) => {
  // Gráfico 1: Comparação de Preço Final
  const priceComparison = [
    {
      name: 'Preço Final',
      [clinicA.clinicName]: clinicA.precoFinal,
      [clinicB.clinicName]: clinicB.precoFinal,
    },
  ];

  // Gráfico 2: Distribuição dos Custos
  const costDistributionA = [
    { name: 'Materiais', value: clinicA.materiais },
    { name: 'Custos Fixos', value: clinicA.custosFixos },
    { name: 'Custos Variáveis', value: clinicA.custosVariaveis },
  ];

  const costDistributionB = [
    { name: 'Materiais', value: clinicB.materiais },
    { name: 'Custos Fixos', value: clinicB.custosFixos },
    { name: 'Custos Variáveis', value: clinicB.custosVariaveis },
  ];

  // Gráfico 3: Lucro vs Custo
  const totalCostA = clinicA.materiais + clinicA.custosFixos + clinicA.custosVariaveis;
  const totalCostB = clinicB.materiais + clinicB.custosFixos + clinicB.custosVariaveis;

  const profitVsCost = [
    {
      name: clinicA.clinicName,
      Custo: totalCostA,
      Lucro: clinicA.precoFinal - totalCostA,
    },
    {
      name: clinicB.clinicName,
      Custo: totalCostB,
      Lucro: clinicB.precoFinal - totalCostB,
    },
  ];

  return {
    priceComparison,
    costDistributionA,
    costDistributionB,
    profitVsCost,
  };
};

// HOOK PRINCIPAL

export const useComparison = () => {
  // Estado das clínicas e procedimento selecionados
  const [clinicA, setClinicA] = useState<Clinic | null>(null);
  const [clinicB, setClinicB] = useState<Clinic | null>(null);
  const [procedure, setProcedure] = useState<Procedure | null>(null);

  // Estado do resultado da comparação
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  // Estados de loading e erro
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função principal de comparação
  const compare = useCallback(
    async (clinicAId: string, clinicBId: string, procedureId: string) => {
      setIsLoading(true);
      setError(null);
      setComparisonResult(null);

      try {
        // Validações básicas
        if (clinicAId === clinicBId) {
          throw new Error('As clínicas selecionadas devem ser diferentes.');
        }

        // Busca as clínicas e procedimento
        const foundClinicA = MOCK_CLINICS.find((c) => c.id === clinicAId);
        const foundClinicB = MOCK_CLINICS.find((c) => c.id === clinicBId);
        const foundProcedure = MOCK_PROCEDURES.find((p) => p.id === procedureId);

        if (!foundClinicA || !foundClinicB || !foundProcedure) {
          throw new Error('Clínica ou procedimento não encontrado.');
        }

        // Simula delay de rede
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // Atualiza estados
        setClinicA(foundClinicA);
        setClinicB(foundClinicB);
        setProcedure(foundProcedure);

        // Busca os dados das clínicas (mock)
        const dataA = fetchClinicData(foundClinicA, foundProcedure);
        const dataB = fetchClinicData(foundClinicB, foundProcedure);

        // Calcula diferenças
        const difference = calculateDifference(dataA, dataB);

        // Gera dados para gráficos
        const chartData = generateChartData(dataA, dataB);

        // Monta o resultado final
        const result: ComparisonResult = {
          clinicA: dataA,
          clinicB: dataB,
          difference,
          chartData,
        };

        setComparisonResult(result);
        return result;
      } catch (err: any) {
        setError(err.message || 'Erro ao comparar clínicas. Tente novamente.');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Função para limpar o resultado
  const reset = useCallback(() => {
    setClinicA(null);
    setClinicB(null);
    setProcedure(null);
    setComparisonResult(null);
    setError(null);
  }, []);

  return {
    // Estados
    clinicA,
    clinicB,
    procedure,
    comparisonResult,
    isLoading,
    error,
    // Ações
    compare,
    reset,
    // Dados mockados expostos para os seletores
    mockClinics: MOCK_CLINICS,
    mockProcedures: MOCK_PROCEDURES,
  };
};