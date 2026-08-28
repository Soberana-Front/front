// Importa React e utilitários
import * as React from 'react';
import { cn } from '../../utils/cn';
// Importa componente Label
import { Label } from './Label';

// Define os tipos de usuário possíveis (incluindo null para nenhum selecionado)
export type UserType = 'student' | 'professional' | null;

// Props do seletor de tipo de usuário
export interface UserTypeSelectorProps {
  value: UserType;
  onChange: (value: UserType) => void;
  disabled?: boolean;
  className?: string;
}

// Componente com radio buttons para selecionar tipo de usuário
export const UserTypeSelector = ({
  value,
  onChange,
  disabled = false,
  className,
}: UserTypeSelectorProps) => {
  return (
    // Container com espaçamento vertical
    <div className={cn('space-y-2', className)}>
      {/* Rótulo do grupo de radio buttons */}
      <Label>Tipo de usuário</Label>
      {/* Grupo de opções lado a lado */}
      <div className="flex gap-4">
        {/* Opção: Estudante */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="student"
            checked={value === 'student'}
            onChange={() => onChange('student')}
            disabled={disabled}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <span className="text-sm text-gray-700">Estudante</span>
        </label>
        {/* Opção: Profissional */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="professional"
            checked={value === 'professional'}
            onChange={() => onChange('professional')}
            disabled={disabled}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <span className="text-sm text-gray-700">Profissional</span>
        </label>
      </div>
    </div>
  );
};