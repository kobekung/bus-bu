import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export type UserRole = 'cashier' | 'admin' | 'superadmin';
interface User {
  id: string;
  username: string;
  role: UserRole;
  companyId?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      // Mock authentication logic
      if (password !== 'password') {
        throw new Error('Invalid credentials');
      }
      // Determine role based on username for demo purposes
      let role: UserRole = 'cashier';
      if (username.includes('admin')) {
        role = 'admin';
      } else if (username.includes('super')) {
        role = 'superadmin';
      }
      const user = {
        id: `user-${Date.now()}`,
        username,
        role,
        companyId: role !== 'superadmin' ? 'company-1' : undefined
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};