// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

// Auth
import { AuthProvider } from './features/auth/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layout e Páginas
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { ContractsListPage } from './pages/ContractsListPage';
import { ContractEditorPage } from './pages/ContractEditorPage';
// import { TemplatesPage } from './pages/TemplatesPage';
// import { ClausesPage } from './pages/ClausesPage';

function App() {
  return (
    <AuthProvider>
      {/* O React Query ainda é necessário para o 'useMutation' simulado funcionar */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rotas Privadas */}
            <Route element={<ProtectedRoute />}>
              
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/contracts" replace />} />
                <Route path="contracts" element={<ContractsListPage />} />
                {/* <Route path="templates" element={<TemplatesPage />} /> */}
                {/* <Route path="clauses" element={<ClausesPage />} /> */}
              </Route>
              
              <Route 
                path="contracts/:id" // Ajuste: :id
                element={<ContractEditorPage />} 
              />
              
            </Route>
            
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;