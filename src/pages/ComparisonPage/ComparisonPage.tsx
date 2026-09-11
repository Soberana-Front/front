// Importa React e hooks
import { useState } from "react";
// Importa layout do dashboard
import { DashboardLayout } from "../../components/dashboard/DashboardLayout/DashboardLayout";
// Importa componentes de comparação
import { ComparisonSelector } from "../../components/dashboard/ComparisonSelector/ComparisonSelector";
import {
  ComparisonTable,
  ComparisonClinicData,
} from "../../components/dashboard/ComparisonTable/ComparisonTable";
import { PriceDifferenceCard } from "../../components/dashboard/PriceDifferenceCard/PriceDifferenceCard";
import { ComparisonCharts } from "../../components/dashboard/ComparisonCharts/ComparisonCharts";
// Importa componentes UI
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
// Importa ícone
import { GitCompare } from "lucide-react";

// Dados mockados (temporários até integração com API)
const MOCK_CLINICS = [
  { id: "1", name: "Clínica OdontoSoberana" },
  { id: "2", name: "Clínica Sorriso Perfeito" },
  { id: "3", name: "Clínica Odonto Prime" },
];

const MOCK_PROCEDURES = [
  { id: "1", name: "Consulta Odontológica" },
  { id: "2", name: "Limpeza e Profilaxia" },
  { id: "3", name: "Tratamento de Canal" },
  { id: "4", name: "Clareamento Dental" },
];

// Função que simula a busca dos dados de comparação (mock)
const fetchComparisonData = async (
  clinicAId: string,
  clinicBId: string,
  procedureId: string,
): Promise<{
  clinicA: ComparisonClinicData;
  clinicB: ComparisonClinicData;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const clinicA = MOCK_CLINICS.find((c) => c.id === clinicAId);
  const clinicB = MOCK_CLINICS.find((c) => c.id === clinicBId);

  if (!clinicA || !clinicB) {
    throw new Error("Clínica não encontrada");
  }

  return {
    clinicA: {
      clinicId: clinicA.id,
      clinicName: clinicA.name,
      tempo: 60,
      materiais: 50,
      custosFixos: 120,
      custosVariaveis: 30,
      horaClinica: 80,
      comissao: 40,
      impostos: 15,
      margem: 30,
      precoFinal: 350,
    },
    clinicB: {
      clinicId: clinicB.id,
      clinicName: clinicB.name,
      tempo: 45,
      materiais: 45,
      custosFixos: 100,
      custosVariaveis: 25,
      horaClinica: 90,
      comissao: 35,
      impostos: 12,
      margem: 25,
      precoFinal: 320,
    },
  };
};

// Página de comparações
const ComparisonPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    clinicA: ComparisonClinicData;
    clinicB: ComparisonClinicData;
  } | null>(null);

  const handleCompare = async (data: {
    clinicAId: string;
    clinicBId: string;
    procedureId: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const comparisonData = await fetchComparisonData(
        data.clinicAId,
        data.clinicBId,
        data.procedureId,
      );
      setResult(comparisonData);
    } catch (err: any) {
      setError(err.message || "Erro ao comparar clínicas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="comparison-page-container">
        {/* Cabeçalho da página */}
        <div className="comparison-page-header">
          <div className="flex items-center gap-3">
            <div className="comparison-page-icon">
              <GitCompare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="comparison-page-title">Comparar Clínicas</h1>
              <p className="comparison-page-subtitle">
                Compare preços, custos e lucros entre duas clínicas para um
                mesmo procedimento
              </p>
            </div>
          </div>
        </div>

        {/* Seletor de comparação */}
        <ComparisonSelector
          clinics={MOCK_CLINICS}
          procedures={MOCK_PROCEDURES}
          onCompare={handleCompare}
          isLoading={isLoading}
        />

        {/* Mensagem de erro */}
        {error && <div className="comparison-page-error">{error}</div>}

        {/* Estado de carregamento */}
        {isLoading && (
          <div className="comparison-page-loading">
            <Spinner
              size="lg"
              label="Buscando dados para comparação..."
              labelPosition="bottom"
            />
          </div>
        )}

        {/* Resultado da comparação */}
        {!isLoading && result && (
          <div className="comparison-page-results">
            <PriceDifferenceCard
              clinicAName={result.clinicA.clinicName}
              clinicBName={result.clinicB.clinicName}
              priceA={result.clinicA.precoFinal}
              priceB={result.clinicB.precoFinal}
            />

            <ComparisonTable
              clinicA={result.clinicA}
              clinicB={result.clinicB}
            />

            <ComparisonCharts
              clinicA={result.clinicA}
              clinicB={result.clinicB}
            />
          </div>
        )}

        {/* Estado vazio (antes de comparar) */}
        {!isLoading && !result && !error && (
          <EmptyState
            icon={GitCompare}
            title="Nenhuma comparação realizada"
            subtitle="Selecione duas clínicas e um procedimento acima para ver a comparação."
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ComparisonPage;
