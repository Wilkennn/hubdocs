import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { authService, type AuthUser, TOKEN_KEY, USER_KEY } from './authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(authService.getStoredUser());
  const [loading, setLoading] = useState(true);

  const validateAndSetUser = useCallback(async () => {
    if (authService.isAuthenticated()) {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Falha ao validar token (mock):", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Efeito de inicialização
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      await validateAndSetUser();
      setLoading(false);
    };
    initAuth();
  }, [validateAndSetUser]);

  // Efeito para sincronização entre abas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TOKEN_KEY || event.key === USER_KEY) {
        validateAndSetUser();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [validateAndSetUser]);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    // A função de login do 'authService' (mockada) já lida com 'throw error'
    const response = await authService.login({ email, password, rememberMe });
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}