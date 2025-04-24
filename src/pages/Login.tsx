import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserIcon, LockIcon, SunIcon, MoonIcon } from 'lucide-react';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login,
    isAuthenticated,
    isLoading
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid username or password');
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <button onClick={toggleTheme} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        {theme === 'dark' ? <SunIcon size={24} className="text-gray-400" /> : <MoonIcon size={24} className="text-gray-600" />}
      </button>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-8">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-md">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              </div>
            </div>
            <h1 className="text-center text-white text-2xl font-bold">
              Bus Ticketing System
            </h1>
            <p className="text-center text-white text-opacity-90 mt-1">
              Log in to access your account
            </p>
          </div>
          <div className="px-6 py-8">
            {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-400" />
                  </div>
                  <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 dark:text-white sm:text-sm" placeholder="Enter your username" required />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Hint: Use "cashier", "admin", or "super" in your username to
                  test different roles
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={18} className="text-gray-400" />
                  </div>
                  <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 dark:text-white sm:text-sm" placeholder="Enter your password" required />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Hint: Use "password" for testing
                </p>
              </div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50">
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;