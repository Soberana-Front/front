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
  onSelectProcedure?: (procedure: Procedure | null) => void; // Callback ao selecionar
  procedures?: Procedure[]; // Lista de procedimentos (opcional)
}

// Componente que exibe um select para escolher o procedimento
export const ProcedureSelector: React.FC<ProcedureSelectorProps> = ({
  onSelectProcedure,
  procedures = MOCK_PROCEDURES, // Usa mock se nenhuma lista for fornecida
}) => {
  // Estado para armazenar o ID selecionado
  const [selectedId, setSelectedId] = useState<string>('');

  // Função chamada quando o usuário altera a seleção
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedId(id);

    // Encontra o procedimento selecionado (ou null)
    const foundProcedure = procedures.find((proc) => proc.id === id) || null;
    
    // Se houver callback, chama com o procedimento encontrado
    if (onSelectProcedure) {
      onSelectProcedure(foundProcedure);
    }
  };

  return (
    // Container do seletor com label
    <div className="flex flex-col gap-1.5 w-full max-w-xs">
      <label 
        htmlFor="procedure-select" 
        className="text-sm font-medium text-gray-700"
      >
        Procedimento
      </label>
      
      {/* Select dropdown */}
      <select
        id="procedure-select"
        value={selectedId}
        onChange={handleChange}
        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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