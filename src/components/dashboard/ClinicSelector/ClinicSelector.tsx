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
  clinics?: Clinic[]; // Lista de clínicas (opcional, usa mock se não fornecido)
  selectedClinicId?: string; // ID da clínica selecionada (controlado externamente)
  onSelectClinic?: (clinicId: string) => void; // Callback ao selecionar
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
  clinics = MOCK_CLINICS, // Usa mock se nenhuma lista for fornecida
  selectedClinicId,
  onSelectClinic,
}: ClinicSelectorProps) {
  // Estado interno para ID selecionado (usado quando não controlado externamente)
  const [internalSelectedId, setInternalSelectedId] = useState<string>(selectedClinicId || '');

  // Determina o ID ativo: prefere o controlado externamente, senão usa o interno
  const activeId = selectedClinicId !== undefined ? selectedClinicId : internalSelectedId;
  
  // Encontra a clínica atual baseada no ID ativo
  const selectedClinic = clinics.find((c) => c.id === activeId);

  /**
   * Função chamada quando o usuário altera a seleção
   * Atualiza estado interno e chama callback externo se fornecido
   */
  const handleChange = (id: string) => {
    setInternalSelectedId(id);
    if (onSelectClinic) {
      onSelectClinic(id);
    }
  };

  return (
    // ========================================
    // CARD PRINCIPAL DO SELETOR
    // ========================================
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 w-full">
      
      {/* Título do seletor com indicador verde */}
      <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        CLÍNICA SELECIONADA
      </div>

      {/* ========================================
          SELECT DROPDOWN
      ======================================== */}
      <div className="relative">
        <select
          value={activeId}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer appearance-none"
        >
          {/* Opção placeholder (desabilitada) */}
          <option value="" disabled>
            Selecione uma clínica
          </option>
          {/* Lista de clínicas */}
          {clinics.map((clinic) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
        
        {/* Ícone decorativo à direita (substitui a seta padrão) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <Building2 className="w-4 h-4" />
        </div>
      </div>

      {/* ========================================
          DETALHES DA CLÍNICA SELECIONADA
          Exibe informações da clínica em formato de lista
      ======================================== */}
      <div className="space-y-3 pt-2 text-xs">
        <div>
          <span className="text-gray-400 block font-normal">Nome da Clínica</span>
          <span className="text-gray-800 font-medium">{selectedClinic?.name || '—'}</span>
        </div>
        <div>
          <span className="text-gray-400 block font-normal">Cidade</span>
          <span className="text-gray-800 font-medium">{selectedClinic?.city || '—'}</span>
        </div>
        <div>
          <span className="text-gray-400 block font-normal">Tipo</span>
          <span className="text-gray-800 font-medium">{selectedClinic?.type || '—'}</span>
        </div>
        <div>
          <span className="text-gray-400 block font-normal">Quem fornece materiais</span>
          <span className="text-gray-800 font-medium">{selectedClinic?.materialsSupplier || '—'}</span>
        </div>
        <div>
          <span className="text-gray-400 block font-normal">Forma de remuneração</span>
          <span className="text-gray-800 font-medium">{selectedClinic?.remunerationType || '—'}</span>
        </div>
        <div>
          <span className="text-gray-400 block font-normal">Comissão</span>
          <span className="text-gray-800 font-medium">{selectedClinic?.commission || '—'}</span>
        </div>
      </div>
    </div>
  );
}