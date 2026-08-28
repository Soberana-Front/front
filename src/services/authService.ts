// Importa instância do Axios
import { api } from './api';

// Credenciais para login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Dados para registro de usuário
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  phone: string;
  cpf: string;
  userType: 'student' | 'professional' | null;
  cro?: string;
  settings?: {
    currency: string;
    profitMargin: number;
    taxRate: number;
    cardFee: number;
  };
}

// Resposta padrão da API de autenticação
export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    token: string;
  };
  message?: string;
}

// Dados do usuário logado
export interface User {
  id: string;
  name: string;
  email: string;
}

// Serviço de autenticação com todos os métodos da API
export const authService = {
  // Login: envia credenciais e retorna token + usuário
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Registro: cria novo usuário com dados completos
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  // Solicita link de recuperação de senha por e-mail
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Redefine senha com token recebido por e-mail
  async resetPassword(data: { token: string; password: string; passwordConfirmation: string }): Promise<{ success: boolean; message: string }> {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  // Busca dados do usuário autenticado
  async getMe(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Remove token e dados do localStorage e limpa header do Axios
  logout(): void {
    localStorage.removeItem('@Soberana:token');
    localStorage.removeItem('@Soberana:user');
    delete api.defaults.headers.common['Authorization'];
  },
};