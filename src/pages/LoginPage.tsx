// src/pages/LoginPage.tsx

import { useState, type FormEvent } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

function FullPageSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Chama o 'login' simulado do AuthContext
      await login(email, password, rememberMe);
      navigate('/contracts', { replace: true });
    } catch (err: unknown) {
      // O 'authService' simulado ainda pode lançar erros
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <FullPageSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/contracts" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl mb-3">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hub<span className="text-primary">Docs</span>
        </h1>
        <p className="text-gray-600 mt-1">Acesse sua conta</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-8">
        
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label 
              htmlFor="email-address" 
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              E-mail
            </label>
            <Input
              id="email-address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com (senha: 1234)" // Dica para o mock
              disabled={loading}
              className="w-full px-3 py-2"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
              className="w-full px-3 py-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center select-none cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-600 font-medium">
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 text-sm"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary hover:text-primary-600 font-medium underline-offset-2 hover:underline">
              Criar conta
            </Link>
          </div>
        </form>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        © 2025 HubDocs. Todos os direitos reservados.
      </p>
    </div>
  );
}