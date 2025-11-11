export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'legal' | 'sales';
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'legal' | 'sales';
}

export interface AuthResponse {
  user: AuthUser;
  access_token: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  /** True apenas durante a verificação inicial do token */
  loading: boolean;
  /** A função de login, agora alinhada com a LoginPage */
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  /** Derivado do estado 'user'. True se o usuário estiver logado. */
  isAuthenticated: boolean;
}

