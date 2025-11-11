// src/features/auth/authService.ts

// --- Tipos (Definidos localmente para este mock) ---
type LoginCredentials = { 
  email: string; 
  password: string;
  rememberMe?: boolean;
};
export type AuthUser = { id: number; name: string; email: string };
type AuthResponse = { token: string; user: AuthUser };
// --------------------------------------------------

export const TOKEN_KEY = 'hubdocs_token';
export const USER_KEY = 'hubdocs_user';

// --- Dados Mockados ---
const MOCK_USER: AuthUser = {
  id: 1,
  name: 'Usuário Mockado',
  email: 'mock@exemplo.com'
};
const MOCK_TOKEN = 'mock-jwt-token-12345';
// ---------------------

class AuthService {
  /**
   * (MOCK) Simula o login.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('[MOCK AUTH] Tentativa de login com:', credentials.email);
    
    // Simula atraso da rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simula falha de login
    if (credentials.password !== '1234') {
      console.error('[MOCK AUTH] Falha no login: Senha incorreta');
      throw new Error('Email ou senha inválidos.');
    }

    const response: AuthResponse = {
      token: MOCK_TOKEN,
      user: MOCK_USER
    };
    
    this.setSession(response);
    console.log('[MOCK AUTH] Login bem-sucedido');
    return response;
  }

  /**
   * (MOCK) Simula o logout.
   */
  async logout(): Promise<void> {
    console.log('[MOCK AUTH] Logout');
    await new Promise(resolve => setTimeout(resolve, 300));
    this.clearSession();
  }

  /**
   * (MOCK) Simula a busca do usuário atual.
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    console.log('[MOCK AUTH] Verificando token...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = this.getToken();
    if (!token) {
      console.log('[MOCK AUTH] Nenhum token encontrado.');
      this.clearSession();
      return null;
    }

    console.log('[MOCK AUTH] Token válido. Retornando usuário.');
    return this.getStoredUser();
  }

  // --- Funções do LocalStorage (Sem alteração) ---

  private setSession(data: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getStoredUser(): AuthUser | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();