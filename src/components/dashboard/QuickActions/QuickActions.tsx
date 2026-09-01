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
    <div className={`quick-actions-container ${className}`}>
      
      {/* Botão principal: Nova Precificação (azul) */}
      <button
        type="button"
        onClick={handleNewPricing}
        className="quick-action-primary"
      >
        <Plus className="w-4 h-4" />
        <span>Nova Precificação</span>
      </button>

      {/* Botão secundário: Comparar Clínicas (branco com borda) */}
      <button
        type="button"
        onClick={handleCompareClinics}
        className="quick-action-secondary"
      >
        <ArrowLeftRight className="w-4 h-4 text-gray-500" />
        <span>Comparar Clínicas</span>
      </button>
    </div>
  );
};