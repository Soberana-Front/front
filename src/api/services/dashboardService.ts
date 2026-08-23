import axios from 'axios';

// Configuração da instância do Axios com a baseURL (pode vir de variável de ambiente)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipagens das respostas
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

// Serviço do Dashboard com os 4 métodos solicitados na Issue
export const dashboardService = {
  // Retorna os indicadores (preço, lucro, hora, média)
  getIndicators: async (): Promise<IndicatorResponse> => {
    const response = await api.get<IndicatorResponse>('/dashboard/indicators');
    return response.data;
  },

  // Retorna lista de clínicas
  getClinics: async (): Promise<ClinicResponse[]> => {
    const response = await api.get<ClinicResponse[]>('/clinics');
    return response.data;
  },

  // Retorna lista de procedimentos
  getProcedures: async (): Promise<ProcedureResponse[]> => {
    const response = await api.get<ProcedureResponse[]>('/procedures');
    return response.data;
  },

  // Retorna as últimas 5 precificações
  getRecentHistory: async (): Promise<RecentHistoryResponse[]> => {
    const response = await api.get<RecentHistoryResponse[]>('/dashboard/recent-history');
    return response.data;
  },
};

export default dashboardService;