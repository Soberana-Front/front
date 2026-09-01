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
    <div className={cn('user-type-selector', className)}>
      <Label>Tipo de usuário</Label>
      <div className="user-type-options">
        {/* Opção: Estudante */}
        <label className="user-type-option">
          <input
            type="radio"
            name="userType"
            value="student"
            checked={value === 'student'}
            onChange={() => onChange('student')}
            disabled={disabled}
            className="user-type-radio"
          />
          <span className="user-type-label">Estudante</span>
        </label>
        {/* Opção: Profissional */}
        <label className="user-type-option">
          <input
            type="radio"
            name="userType"
            value="professional"
            checked={value === 'professional'}
            onChange={() => onChange('professional')}
            disabled={disabled}
            className="user-type-radio"
          />
          <span className="user-type-label">Profissional</span>
        </label>
      </div>
    </div>
  );
};