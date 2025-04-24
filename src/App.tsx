import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SellTicket from './pages/SellTicket';
import ManageRoutes from './pages/ManageRoutes';
import ManageTickets from './pages/ManageTickets';
import ManageMembers from './pages/ManageMembers';
import Reports from './pages/Reports';
import ManageCompany from './pages/ManageCompany';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
export function App() {
  return <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="sell-ticket" element={<SellTicket />} />
              <Route path="manage-routes" element={<ManageRoutes />} />
              <Route path="manage-tickets" element={<ManageTickets />} />
              <Route path="manage-members" element={<ManageMembers />} />
              <Route path="reports" element={<Reports />} />
              <Route path="manage-company" element={<ProtectedRoute requiredRole="superadmin">
                    <ManageCompany />
                  </ProtectedRoute>} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>;
}