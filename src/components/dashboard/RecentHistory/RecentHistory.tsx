// Importa React e ícones
import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';

// Interface que define um item do histórico
export interface HistoryItem {
  id: string;
  date: string;
  clinicName: string;
  procedureName: string;
  finalPrice: number;
}

// Dados mockados com 5 precificações recentes
export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    date: '22/08/2026',
    clinicName: 'Clínica Odonto Prime',
    procedureName: 'Limpeza e Profilaxia',
    finalPrice: 180.0,
  },
  {
    id: '2',
    date: '21/08/2026',
    clinicName: 'Soberana Odontologia',
    procedureName: 'Tratamento de Canal',
    finalPrice: 650.0,
  },
  {
    id: '3',
    date: '20/08/2026',
    clinicName: 'Clínica Odonto Prime',
    procedureName: 'Consulta Odontológica',
    finalPrice: 150.0,
  },
  {
    id: '4',
    date: '18/08/2026',
    clinicName: 'Sorriso & Saúde',
    procedureName: 'Aplicação de Flúor',
    finalPrice: 120.0,
  },
  {
    id: '5',
    date: '15/08/2026',
    clinicName: 'Soberana Odontologia',
    procedureName: 'Clareamento Dental',
    finalPrice: 450.0,
  },
];

// Props do componente
interface RecentHistoryProps {
  items?: HistoryItem[];
  onItemClick?: (item: HistoryItem) => void;
}

// Função local de formatação (será substituída pelo utilitário global)
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Componente que exibe as últimas precificações
export const RecentHistory: React.FC<RecentHistoryProps> = ({
  items = MOCK_HISTORY,
  onItemClick,
}) => {
  const handleSelect = (item: HistoryItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      console.log(`Redirecionando para detalhes da precificação #${item.id}`);
    }
  };

  return (
    // Container principal do histórico
    <div className="recent-history-container">
      
      {/* Cabeçalho com ícone de relógio */}
      <div className="recent-history-header">
        <Clock className="w-4 h-4 text-indigo-600" />
        <h3 className="recent-history-title">
          Histórico Recente
        </h3>
      </div>

      {/* Lista dos 5 primeiros itens */}
      <div className="recent-history-list">
        {items.slice(0, 5).map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="recent-history-item"
          >
            {/* Informações do item: procedimento + clínica + data */}
            <div className="recent-history-item-info">
              <span className="recent-history-item-name">
                {item.procedureName}
              </span>
              <div className="recent-history-item-meta">
                <span>{item.clinicName}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </div>

            {/* Preço e ícone de navegação */}
            <div className="recent-history-item-price-wrapper">
              <span className="recent-history-item-price">
               {formatCurrency(item.finalPrice)}
              </span>  
              <ChevronRight className="recent-history-item-chevron" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};