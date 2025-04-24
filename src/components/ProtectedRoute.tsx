import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'cashier' | 'admin' | 'superadmin';
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const {
    isAuthenticated,
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && user?.role) {
    const roles = {
      cashier: ['cashier', 'admin', 'superadmin'],
      admin: ['admin', 'superadmin'],
      superadmin: ['superadmin']
    };
    if (!roles[requiredRole].includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }
  return <>{children}</>;
};
export default ProtectedRoute;