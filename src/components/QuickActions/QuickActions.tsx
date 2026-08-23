import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeftRight } from 'lucide-react';

interface QuickActionsProps {
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleNewPricing = () => {
    navigate('/precificacao/nova');
  };

  const handleCompareClinics = () => {
    navigate('/comparacoes');
  };

  return (
    <div className={`flex flex-wrap gap-3 items-center ${className}`}>
      {/* Botão Nova Precificação */}
      <button
        type="button"
        onClick={handleNewPricing}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Nova Precificação</span>
      </button>

      {/* Botão Comparar Clínicas */}
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