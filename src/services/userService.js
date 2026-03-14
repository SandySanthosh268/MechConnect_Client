import api from './api';

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProfile = () => api.get('/users/me');
export const updateCustomerProfile = (data) => api.put('/customers/profile', data);
export const updateMechanicProfile = (data) => api.put('/mechanics/profile', data);

// Admin - User management
export const getAllCustomers = () => api.get('/admin/customers');
export const getAllMechanics = () => api.get('/admin/mechanics');
export const getAdminStats = () => api.get('/admin/dashboard/stats');
