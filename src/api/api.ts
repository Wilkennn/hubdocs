import axios from 'axios';
import { authService } from '../features/auth/authService'; 

export const api = axios.create({
  // Use variáveis de ambiente para a URL da API
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// --- INTERCEPTOR DE REQUISIÇÃO (Para enviar o token) ---
api.interceptors.request.use(
  (config) => {
    // 1. Pega o token do authService
    const token = authService.getToken(); 
    
    if (token) {
      // 2. Anexa o token no cabeçalho
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, // Sucesso: não faz nada
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado ou inválido. Fazendo logout.');
      authService.logout(); 
    }
    return Promise.reject(error);
  }
);