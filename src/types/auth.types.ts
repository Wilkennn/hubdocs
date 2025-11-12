export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'legal' | 'sales';
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'legal' | 'sales';
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}