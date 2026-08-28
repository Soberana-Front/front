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
  items?: HistoryItem[];           // Lista de itens (opcional)
  onItemClick?: (item: HistoryItem) => void; // Callback ao clicar
}

// Função local de formatação (será substituída pelo utilitário global)
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Componente que exibe as últimas precificações
export const RecentHistory: React.FC<RecentHistoryProps> = ({
  items = MOCK_HISTORY,
  onItemClick,
}) => {
  // Ao clicar, chama o callback externo ou loga no console
  const handleSelect = (item: HistoryItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      console.log(`Redirecionando para detalhes da precificação #${item.id}`);
    }
  };

  return (
    // Container principal do histórico
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      
      {/* Cabeçalho com ícone de relógio */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
        <Clock className="w-4 h-4 text-indigo-600" />
        <h3 className="font-bold text-slate-800 text-xs tracking-wider uppercase">
          Histórico Recente
        </h3>
      </div>

      {/* Lista dos 5 primeiros itens */}
      <div className="divide-y divide-slate-100">
        {items.slice(0, 5).map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group"
          >
            {/* Informações do item: procedimento + clínica + data */}
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                {item.procedureName}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{item.clinicName}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
            </div>

            {/* Preço e ícone de navegação */}
            <div className="flex items-center gap-3">
              <span className="font-bold text-indigo-700 text-sm whitespace-nowrap bg-indigo-50 px-2.5 py-1 rounded-lg shadow-sm border border-indigo-100">
               {formatCurrency(item.finalPrice)}
              </span>  
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};