import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';

export interface AuthUser {
  name: string;
  initials: string;
}

interface AuthContextValue {
  user: AuthUser | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(storedUser);

    if (typeof parsedUser === 'string') {
      return {
        name: parsedUser,
        initials: parsedUser
          .split(' ')
          .map((part: string) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      };
    }

    const name =
      typeof parsedUser.name === 'string'
        ? parsedUser.name
        : 'Doutor(a)';

    const initials =
      typeof parsedUser.initials === 'string'
        ? parsedUser.initials
        : name
            .split(' ')
            .filter(Boolean)
            .map((part: string) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

    return {
      name,
      initials,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const user = useMemo(() => getStoredUser(), []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}