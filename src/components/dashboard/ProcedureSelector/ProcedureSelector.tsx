// Importa React e hook useState para controle de seleção
import React, { useState } from 'react';

// Interface que define a estrutura de um procedimento
export interface Procedure {
  id: string;
  name: string;
}

// Dados mockados para desenvolvimento
export const MOCK_PROCEDURES: Procedure[] = [
  { id: '1', name: 'Consulta Odontológica' },
  { id: '2', name: 'Limpeza e Profilaxia' },
  { id: '3', name: 'Tratamento de Canal' },
  { id: '4', name: 'Aplicação de Flúor' },
];

// Props do seletor de procedimento
interface ProcedureSelectorProps {
  onSelectProcedure?: (procedure: Procedure | null) => void;
  procedures?: Procedure[];
}

// Componente que exibe um select para escolher o procedimento
export const ProcedureSelector: React.FC<ProcedureSelectorProps> = ({
  onSelectProcedure,
  procedures = MOCK_PROCEDURES,
}) => {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedId(id);

    const foundProcedure = procedures.find((proc) => proc.id === id) || null;
    
    if (onSelectProcedure) {
      onSelectProcedure(foundProcedure);
    }
  };

  return (
    // Container do seletor com label
    <div className="procedure-selector-container">
      <label htmlFor="procedure-select" className="procedure-selector-label">
        Procedimento
      </label>
      
      {/* Select dropdown */}
      <select
        id="procedure-select"
        value={selectedId}
        onChange={handleChange}
        className="procedure-selector-select"
      >
        {/* Opção placeholder (desabilitada) */}
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