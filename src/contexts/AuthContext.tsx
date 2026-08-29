// Importa React e hooks
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importa serviço de autenticação e tipos
import { authService, User, LoginCredentials, RegisterData } from '../services/authService';
// Importa instância do Axios
import { api } from '../services/api';

// Define o tipo do contexto de autenticação
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: { token: string; password: string; passwordConfirmation: string }) => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider do contexto de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estados do usuário, token e loading
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega token e usuário do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('@Soberana:token');
    const storedUser = localStorage.getItem('@Soberana:user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  // Persiste token e usuário no localStorage e headers do Axios
  const setAuthData = (token: string, user: User) => {
    localStorage.setItem('@Soberana:token', token);
    localStorage.setItem('@Soberana:user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token);
    setUser(user);
  };

  // Função de login
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        setAuthData(response.data.token, response.data.user);
      } else {
        throw new Error(response.message || 'Erro ao fazer login');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro de usuário
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      if (response.success && response.data) {
        setAuthData(response.data.token, response.data.user);
      } else {
        throw new Error(response.message || 'Erro ao criar conta');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  // Solicita recuperação de senha
  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  // Redefine a senha com token
  const resetPassword = async (data: { token: string; password: string; passwordConfirmation: string }) => {
    await authService.resetPassword(data);
  };

  // Verifica autenticação e busca dados do usuário
  const checkAuth = async () => {
    const storedToken = localStorage.getItem('@Soberana:token');
    if (!storedToken) {
      setUser(null);
      setToken(null);
      return;
    }

    setIsLoading(true);
    try {
      const userData = await authService.getMe();
      setUser(userData);
      setToken(storedToken);
      localStorage.setItem('@Soberana:user', JSON.stringify(userData));
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Indica se o usuário está autenticado
 /* const isAuthenticated = !!user && !!token;        PRECISA SER DESCOMENTADO DEPOIS DE TESTAR VISUALIZAR PAGINAS */

 const isAuthenticated = import.meta.env.DEV
  ? true
  : !!user && !!token;
// PRECISA SER APAGADO AS TRES LINHAS A CIMA DEPOIS DE TESTAR

  // Retorna o provider com os valores do contexto
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};