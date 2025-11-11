// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';

const FullPageSpinner: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
);

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};