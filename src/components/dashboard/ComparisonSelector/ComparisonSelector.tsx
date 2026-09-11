// Importa React e hooks
import { useState } from 'react';
// Importa componentes UI
import { Select, SelectOption } from '../../ui/Select';
import { Button } from '../../ui/Button';
// Importa ícone
import { GitCompare } from 'lucide-react';

// Interfaces de dados
export interface Clinic {
  id: string;
  name: string;
}

export interface Procedure {
  id: string;
  name: string;
}

// Props do componente
interface ComparisonSelectorProps {
  clinics: Clinic[];
  procedures: Procedure[];
  onCompare: (data: {
    clinicAId: string;
    clinicBId: string;
    procedureId: string;
  }) => void;
  isLoading?: boolean;
}

// Dados mockados (temporários até integração com API)
const MOCK_CLINICS: Clinic[] = [
  { id: '1', name: 'Clínica OdontoSoberana' },
  { id: '2', name: 'Clínica Sorriso Perfeito' },
  { id: '3', name: 'Clínica Odonto Prime' },
];

const MOCK_PROCEDURES: Procedure[] = [
  { id: '1', name: 'Consulta Odontológica' },
  { id: '2', name: 'Limpeza e Profilaxia' },
  { id: '3', name: 'Tratamento de Canal' },
  { id: '4', name: 'Clareamento Dental' },
];

// Componente de seleção para comparação
export const ComparisonSelector = ({
  clinics = MOCK_CLINICS,
  procedures = MOCK_PROCEDURES,
  onCompare,
  isLoading = false,
}: ComparisonSelectorProps) => {
  // Estados dos seletores
  const [clinicAId, setClinicAId] = useState('');
  const [clinicBId, setClinicBId] = useState('');
  const [procedureId, setProcedureId] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Converte clínicas para o formato de opções do Select
  const clinicOptions: SelectOption[] = clinics.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  // Converte procedimentos para o formato de opções do Select
  const procedureOptions: SelectOption[] = procedures.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  // Valida e dispara a comparação
  const handleCompare = () => {
    setError(null);

    // Valida se todos os campos foram selecionados
    if (!clinicAId || !clinicBId || !procedureId) {
      setError('Selecione as duas clínicas e o procedimento.');
      return;
    }

    // Valida se as clínicas são diferentes
    if (clinicAId === clinicBId) {
      setError('As clínicas selecionadas devem ser diferentes.');
      return;
    }

    // Dispara a comparação
    onCompare({ clinicAId, clinicBId, procedureId });
  };

  return (
    <div className="comparison-selector-container">
      {/* Cabeçalho */}
      <div className="comparison-selector-header">
        <GitCompare className="w-5 h-5 text-indigo-600" />
        <h3 className="comparison-selector-title">Comparar Clínicas</h3>
      </div>

      {/* Formulário de seleção */}
      <div className="comparison-selector-form">
        <Select
          label="Clínica A"
          options={clinicOptions}
          placeholder="Selecione uma clínica"
          value={clinicAId}
          onChange={(e) => setClinicAId(e.target.value)}
          required
        />

        <Select
          label="Clínica B"
          options={clinicOptions}
          placeholder="Selecione uma clínica"
          value={clinicBId}
          onChange={(e) => setClinicBId(e.target.value)}
          required
        />

        <Select
          label="Procedimento"
          options={procedureOptions}
          placeholder="Selecione um procedimento"
          value={procedureId}
          onChange={(e) => setProcedureId(e.target.value)}
          required
        />
      </div>

      {/* Mensagem de erro */}
      {error && <p className="comparison-selector-error">{error}</p>}

      {/* Botão de comparar */}
      <Button
        onClick={handleCompare}
        disabled={isLoading}
        isLoading={isLoading}
        className="comparison-selector-btn"
      >
        Comparar
      </Button>
    </div>
  );
};