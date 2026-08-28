// Importa hooks do React
import { useState, useEffect } from 'react';

// Tipos dos dados do dashboard
export interface IndicatorData {
  calculatedPrice: number;
  profit: number;
  profitMargin: number;
  clinicalHour: number;
  marketAverage: number;
}

export interface ClinicOption {
  id: string;
  name: string;
}

export interface ProcedureOption {
  id: string;
  name: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  clinicName: string;
  procedureName: string;
  finalPrice: number;
}

export interface DashboardData {
  indicators: IndicatorData;
  clinics: ClinicOption[];
  procedures: ProcedureOption[];
  recentHistory: HistoryItem[];
}

// Dados mockados para desenvolvimento
const MOCK_DASHBOARD_DATA: DashboardData = {
  indicators: {
    calculatedPrice: 0.0,
    profit: 0.0,
    profitMargin: 0.0,
    clinicalHour: 0.0,
    marketAverage: 0.0,
  },
  clinics: [
    { id: '1', name: 'Clínica Odonto Prime' },
    { id: '2', name: 'Soberana Odontologia' },
    { id: '3', name: 'Sorriso & Saúde' },
  ],
  procedures: [
    { id: '101', name: 'Limpeza e Profilaxia' },
    { id: '102', name: 'Tratamento de Canal' },
    { id: '103', name: 'Clareamento Dental' },
  ],
  recentHistory: [
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
  ],
};

// Hook que simula busca de dados do dashboard
export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função que carrega os dados (mock)
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData(MOCK_DASHBOARD_DATA);
    } catch (err) {
      setError('Erro ao carregar dados do dashboard.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega dados ao montar o componente
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Retorna dados, loading, erro e função para recarregar
  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};