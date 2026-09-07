import React from 'react';
import { FileDown } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

// Props do botão reutilizável de exportação
interface ExportPDFButtonProps {
  className?: string;
}

// Componente responsável por simular a exportação do PDF
export const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({
  className = '',
}) => {
  const { showToast } = useToast();

  // Simula a exportação do PDF e informa o sucesso ao usuário
  const handleExportPDF = () => {
    console.log('Exportar PDF - funcionalidade mockada');

    showToast('PDF exportado com sucesso!', 'success');
  };

  return (
    <button
      type="button"
      className={`pricing-result__export-button ${className}`}
      onClick={handleExportPDF}
    >
      <FileDown className="h-4 w-4" />
      <span>Exportar PDF</span>
    </button>
  );
};

export default ExportPDFButton;