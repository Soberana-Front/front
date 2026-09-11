// Importa a instância do Axios já configurada (baseURL + interceptors)
import { api } from './api';
// Importa o tipo de resultado da comparação
import type { ComparisonClinicData } from '../components/dashboard/ComparisonTable/ComparisonTable';

// TIPOS

// Payload enviado para o endpoint de comparação
export interface CompareClinicsPayload {
  clinicAId: string;
  clinicBId: string;
  procedureId: string;
}

// Resultado completo retornado pela API
export interface ComparisonResult {
  id: string;
  clinicA: ComparisonClinicData;
  clinicB: ComparisonClinicData;
  difference: {
    percentDiff: number;
    absoluteDiff: number;
    isMoreExpensive: boolean;
    isEqual: boolean;
  };
  createdAt: string;
}

// Resposta padrão da API
export interface ComparisonResponse {
  success: boolean;
  data: ComparisonResult;
  message?: string;
}

// Lista de comparações (para histórico)
export interface ComparisonListResponse {
  success: boolean;
  data: ComparisonResult[];
  message?: string;
}


// SERVIÇO


export const comparisonService = {
  /**
   * Cria uma nova comparação entre duas clínicas para um procedimento.
   * POST /comparison
   */
  async compareClinics(data: CompareClinicsPayload): Promise<ComparisonResponse> {
    const response = await api.post<ComparisonResponse>('/comparison', data);
    return response.data;
  },

  /**
   * Busca uma comparação já realizada pelo ID.
   * GET /comparison/:id
   */
  async getComparison(id: string): Promise<ComparisonResponse> {
    const response = await api.get<ComparisonResponse>(`/comparison/${id}`);
    return response.data;
  },

  /**
   * Lista todas as comparações realizadas pelo usuário autenticado.
   * GET /comparison
   */
  async listComparisons(): Promise<ComparisonListResponse> {
    const response = await api.get<ComparisonListResponse>('/comparison');
    return response.data;
  },
};

export default comparisonService;