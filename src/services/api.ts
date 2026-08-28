// Importa o Axios para requisições HTTP
import axios from 'axios';

// Cria instância do Axios com configurações padrão
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Interceptor de requisição: adiciona token de autenticação no header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@Soberana:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta: trata erros globais (401, mensagens, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se for erro 401 (não autorizado), limpa token e redireciona para login
    if (error.response?.status === 401) {
      localStorage.removeItem('@Soberana:token');
      localStorage.removeItem('@Soberana:user');
      delete api.defaults.headers.common['Authorization'];
      
      // Se não estiver na página de login, redireciona
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Extrai mensagem de erro da resposta ou usa fallback
    const errorMessage = error.response?.data?.message || error.message || 'Erro na requisição';
    console.error('[API Error]', errorMessage);
    
    return Promise.reject(error);
  }
);