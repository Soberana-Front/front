// Importa React e hook de navegação
import React from 'react';
import { useNavigate } from 'react-router';
import { Plus, ArrowLeftRight } from 'lucide-react';

// Props do componente (aceita classes CSS adicionais)
interface QuickActionsProps {
  className?: string;
}

// Componente com botões de ações rápidas
export const QuickActions: React.FC<QuickActionsProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  // Navega para a página de nova precificação
  const handleNewPricing = () => {
    navigate('/precificacao/nova');
  };

  // Navega para a página de comparações
  const handleCompareClinics = () => {
    navigate('/comparacoes');
  };

  return (
    // Container flexível com espaçamento
    <div className={`flex flex-wrap gap-3 items-center ${className}`}>
      
      {/* Botão principal: Nova Precificação (azul) */}
      <button
        type="button"
        onClick={handleNewPricing}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Nova Precificação</span>
      </button>

      {/* Botão secundário: Comparar Clínicas (branco com borda) */}
      <button
        type="button"
        onClick={handleCompareClinics}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-sm rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        <ArrowLeftRight className="w-4 h-4 text-gray-500" />
        <span>Comparar Clínicas</span>
      </button>
    </div>
  );
};