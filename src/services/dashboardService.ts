// Importa o Axios para requisições HTTP
import axios from 'axios';

// Cria instância do Axios com baseURL e headers padrão
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos das respostas dos endpoints do dashboard
export interface IndicatorResponse {
  calculatedPrice: number;
  profit: number;
  profitMargin: number;
  clinicalHour: number;
  marketAverage: number;
}

export interface ClinicResponse {
  id: string;
  name: string;
}

export interface ProcedureResponse {
  id: string;
  name: string;
}

export interface RecentHistoryResponse {
  id: string;
  date: string;
  clinicName: string;
  procedureName: string;
  finalPrice: number;
}

// Serviço com os 4 métodos para buscar dados do dashboard
export const dashboardService = {
  // Busca os indicadores (preço, lucro, hora, média de mercado)
  getIndicators: async (): Promise<IndicatorResponse> => {
    const response = await api.get<IndicatorResponse>('/dashboard/indicators');
    return response.data;
  },

  // Busca lista de clínicas
  getClinics: async (): Promise<ClinicResponse[]> => {
    const response = await api.get<ClinicResponse[]>('/clinics');
    return response.data;
  },

  // Busca lista de procedimentos
  getProcedures: async (): Promise<ProcedureResponse[]> => {
    const response = await api.get<ProcedureResponse[]>('/procedures');
    return response.data;
  },

  // Busca as últimas 5 precificações
  getRecentHistory: async (): Promise<RecentHistoryResponse[]> => {
    const response = await api.get<RecentHistoryResponse[]>('/dashboard/recent-history');
    return response.data;
  },
};

export default dashboardService;