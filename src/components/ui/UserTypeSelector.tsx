import * as React from 'react';
import { cn } from '../../utils/cn';
import { Label } from './Label';

export type UserType = 'student' | 'professional' | null;

export interface UserTypeSelectorProps {
  /** Tipo de usuário selecionado */
  value: UserType;
  /** Função chamada ao mudar o tipo */
  onChange: (value: UserType) => void;
  /** Desabilita os campos */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

export const UserTypeSelector = ({
  value,
  onChange,
  disabled = false,
  className,
}: UserTypeSelectorProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label>Tipo de usuário</Label>
      <div className="flex gap-4">
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