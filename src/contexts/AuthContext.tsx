import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, LoginCredentials, RegisterData } from '../services/authService';
import { api } from '../services/api';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do localStorage ao iniciar
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

  // Função auxiliar para guardar token e usuário
  const setAuthData = (token: string, user: User) => {
    localStorage.setItem('@Soberana:token', token);
    localStorage.setItem('@Soberana:user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token);
    setUser(user);
  };

  // Login
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

  // Registro
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

  // Logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    // Não redirecionamos aqui para permitir que o componente chame useNavigate()
  };

  // Esqueci senha
  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  // Resetar senha
  const resetPassword = async (data: { token: string; password: string; passwordConfirmation: string }) => {
    await authService.resetPassword(data);
  };

  // Verificar autenticação (buscar dados do usuário se token válido)
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
      // Token inválido ou expirado
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Derivado: isAuthenticated
  const isAuthenticated = !!user && !!token;

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};