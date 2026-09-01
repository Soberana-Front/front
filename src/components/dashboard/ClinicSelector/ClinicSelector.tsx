// Importa React e hook useState para gerenciar estado interno
import { useState } from 'react';
// Importa ícone de prédio para o seletor
import { Building2 } from 'lucide-react';

// ========================================
// INTERFACE DE DADOS DA CLÍNICA
// ========================================
export interface Clinic {
  id: string;
  name: string;
  city?: string;
  type?: string;
  materialsSupplier?: string;
  remunerationType?: string;
  commission?: string;
}

// ========================================
// PROPS DO COMPONENTE
// ========================================
interface ClinicSelectorProps {
  clinics?: Clinic[];
  selectedClinicId?: string;
  onSelectClinic?: (clinicId: string) => void;
}

// ========================================
// DADOS MOCKADOS (para desenvolvimento)
// ========================================
const MOCK_CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'Clínica OdontoSoberana',
    city: 'São Paulo - SP',
    type: 'Odontologia Geral',
    materialsSupplier: 'Próprio',
    remunerationType: 'Porcentagem',
    commission: '40%',
  },
  {
    id: '2',
    name: 'Clínica Sorriso Perfeito',
    city: 'Rio de Janeiro - RJ',
    type: 'Estética',
    materialsSupplier: 'Clínica',
    remunerationType: 'Hora Fixa',
    commission: '0%',
  },
];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export default function ClinicSelector({
  clinics = MOCK_CLINICS,
  selectedClinicId,
  onSelectClinic,
}: ClinicSelectorProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string>(selectedClinicId || '');

  const activeId = selectedClinicId !== undefined ? selectedClinicId : internalSelectedId;
  const selectedClinic = clinics.find((c) => c.id === activeId);

  const handleChange = (id: string) => {
    setInternalSelectedId(id);
    if (onSelectClinic) {
      onSelectClinic(id);
    }
  };

  return (
    <div className="clinic-selector-card">
      
      {/* Título do seletor com indicador verde */}
      <div className="clinic-selector-title">
        <span className="clinic-selector-dot" />
        CLÍNICA SELECIONADA
      </div>

      {/* SELECT DROPDOWN */}
      <div className="clinic-selector-select-wrapper">
        <select
          value={activeId}
          onChange={(e) => handleChange(e.target.value)}
          className="clinic-selector-select"
        >
          <option value="" disabled>
            Selecione uma clínica
          </option>
          {clinics.map((clinic) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
        
        {/* Ícone decorativo à direita (substitui a seta padrão) */}
        <div className="clinic-selector-icon">
          <Building2 className="w-4 h-4" />
        </div>
      </div>

      {/* DETALHES DA CLÍNICA SELECIONADA */}
      <div className="clinic-selector-details">
        <div>
          <span className="clinic-selector-label">Nome da Clínica</span>
          <span className="clinic-selector-value">{selectedClinic?.name || '—'}</span>
        </div>
        <div>
          <span className="clinic-selector-label">Cidade</span>
          <span className="clinic-selector-value">{selectedClinic?.city || '—'}</span>
        </div>
        <div>
          <span className="clinic-selector-label">Tipo</span>
          <span className="clinic-selector-value">{selectedClinic?.type || '—'}</span>
        </div>
        <div>
          <span className="clinic-selector-label">Quem fornece materiais</span>
          <span className="clinic-selector-value">{selectedClinic?.materialsSupplier || '—'}</span>
        </div>
        <div>
          <span className="clinic-selector-label">Forma de remuneração</span>
          <span className="clinic-selector-value">{selectedClinic?.remunerationType || '—'}</span>
        </div>
        <div>
          <span className="clinic-selector-label">Comissão</span>
          <span className="clinic-selector-value">{selectedClinic?.commission || '—'}</span>
        </div>
      </div>
    </div>
  );
}