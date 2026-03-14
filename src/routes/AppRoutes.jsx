import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Layouts
import CustomerLayout from '../layouts/CustomerLayout';
import MechanicLayout from '../layouts/MechanicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Customer Pages
import CustomerOverview from '../pages/customer/CustomerOverview';
import VehicleManagement from '../pages/customer/VehicleManagement';
import SearchMechanics from '../pages/customer/SearchMechanics';
import BookingHistory from '../pages/customer/BookingHistory';
import CustomerProfile from '../pages/customer/CustomerProfile';

// Mechanic Pages
import MechanicOverview from '../pages/mechanic/MechanicOverview';
import BookingRequests from '../pages/mechanic/BookingRequests';
import ServiceManagement from '../pages/mechanic/ServiceManagement';
import WorkshopProfile from '../pages/mechanic/WorkshopProfile';
import RatingsFeedback from '../pages/mechanic/RatingsFeedback';

// Admin Pages
import AdminOverview from '../pages/admin/AdminOverview';
import UserManagement from '../pages/admin/UserManagement';
import MechanicVerification from '../pages/admin/MechanicVerification';
import BookingMonitoring from '../pages/admin/BookingMonitoring';
import SystemAnalytics from '../pages/admin/SystemAnalytics';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route path="/customer" element={<ProtectedRoute allowedRoles={['ROLE_CUSTOMER']}><CustomerLayout /></ProtectedRoute>}>
        <Route index element={<CustomerOverview />} />
        <Route path="vehicles" element={<VehicleManagement />} />
        <Route path="mechanics" element={<SearchMechanics />} />
        <Route path="booking-history" element={<BookingHistory />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* Mechanic Routes */}
      <Route path="/mechanic" element={<ProtectedRoute allowedRoles={['ROLE_MECHANIC']}><MechanicLayout /></ProtectedRoute>}>
        <Route index element={<MechanicOverview />} />
        <Route path="booking-requests" element={<BookingRequests />} />
        <Route path="services" element={<ServiceManagement />} />
        <Route path="profile" element={<WorkshopProfile />} />
        <Route path="ratings-feedback" element={<RatingsFeedback />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="mechanics" element={<MechanicVerification />} />
        <Route path="booking-monitoring" element={<BookingMonitoring />} />
        <Route path="system-analytics" element={<SystemAnalytics />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
