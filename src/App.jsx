import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { DashboardLayout } from './components/DashboardLayout'
import LandingPage from './pages/public/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import MechanicDashboard from './pages/mechanic/MechanicDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import { connectWebSocket, disconnectWebSocket } from './services/websocket'
import Toast from './components/Toast'

function AppRoutes() {
  const { isAuthenticated, role, loading, user } = useAuth()
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      connectWebSocket((msg) => {
        setNotification({ message: msg.message || 'New update received!', type: 'info' })
      })
    }
    return () => disconnectWebSocket()
  }, [isAuthenticated, user, loading])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const getHomePath = () => {
    if (role === 'ROLE_ADMIN') return '/admin'
    if (role === 'ROLE_MECHANIC') return '/mechanic'
    return '/customer'
  }

  return (
    <>
      {notification && <Toast {...notification} onClose={() => setNotification(null)} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to={getHomePath()} replace /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={getHomePath()} replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to={getHomePath()} replace /> : <Register />} />

        {/* Protected Dashboard Routes */}
        <Route path="/customer/*" element={
          <ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}>
            <DashboardLayout>
              <CustomerDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/mechanic/*" element={
          <ProtectedRoute allowedRoles={['ROLE_MECHANIC']}>
            <DashboardLayout>
              <MechanicDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
