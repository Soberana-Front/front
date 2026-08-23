import React, { useState } from 'react';

// Tipagem para os procedimentos
export interface Procedure {
  id: string;
  name: string;
}

// Dados mockados para exibição inicial
export const MOCK_PROCEDURES: Procedure[] = [
  { id: '1', name: 'Consulta Odontológica' },
  { id: '2', name: 'Limpeza e Profilaxia' },
  { id: '3', name: 'Tratamento de Canal' },
  { id: '4', name: 'Aplicação de Flúor' },
];

interface ProcedureSelectorProps {
  onSelectProcedure?: (procedure: Procedure | null) => void;
  procedures?: Procedure[];
}

export const ProcedureSelector: React.FC<ProcedureSelectorProps> = ({
  onSelectProcedure,
  procedures = MOCK_PROCEDURES,
}) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedId(id);

    const foundProcedure = procedures.find((proc) => proc.id === id) || null;
    
    // Atualiza o estado pai/contexto se a callback for passada
    if (onSelectProcedure) {
      onSelectProcedure(foundProcedure);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xs">
      <label 
        htmlFor="procedure-select" 
        className="text-sm font-medium text-gray-700"
      >
        Procedimento
      </label>
      
      <select
        id="procedure-select"
        value={selectedId}
        onChange={handleChange}
        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {/* Placeholder exigido na issue */}
        <option value="" disabled>
          Selecione um procedimento
        </option>
        
        {/* Lista de procedimentos */}
        {procedures.map((proc) => (
          <option key={proc.id} value={proc.id}>
            {proc.name}
          </option>
        ))}
      </select>
    </div>
  );
};