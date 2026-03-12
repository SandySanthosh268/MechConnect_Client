import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getProfile = () => api.get('/users/me');

// Customer
export const updateCustomerProfile = (data) => api.put('/customers/profile', data);

// Mechanic
export const updateMechanicProfile = (data) => api.put('/mechanics/profile', data);
export const getApprovedMechanics = () => api.get('/mechanics/approved');
export const searchMechanics = (query) => api.get(`/mechanics/search?query=${query || ''}`);

// Vehicles
export const getMyVehicles = () => api.get('/vehicles');
export const addVehicle = (data) => api.post('/vehicles', data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Services
export const getMechanicServices = (mechanicId) => api.get(`/services/mechanic/${mechanicId}`);
export const getMyServices = () => api.get('/services/my-services');
export const addService = (data) => api.post('/services', data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getCustomerBookings = () => api.get('/bookings/customer');
export const getMechanicBookings = () => api.get('/bookings/mechanic');
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status });

// Pickups
export const requestPickup = (data) => api.post('/pickups/request', data);
export const updatePickupStatus = (id, status) => api.patch(`/pickups/${id}/status`, { status });

// Payments
export const processPayment = (data) => api.post('/payments/process', data);

// Ratings & Feedback
export const submitRating = (data) => api.post('/ratings', data);
export const getMechanicRatings = (mechanicId) => api.get(`/ratings/mechanic/${mechanicId}`);
export const submitFeedback = (data) => api.post('/feedback', data);
export const getMechanicFeedback = (mechanicId) => api.get(`/feedback/mechanic/${mechanicId}`);

// Admin
export const getPendingMechanics = () => api.get('/admin/mechanics/pending');
export const approveMechanic = (id) => api.patch(`/admin/mechanics/${id}/approve`);
export const rejectMechanic = (id) => api.patch(`/admin/mechanics/${id}/reject`);
export const getAllCustomers = () => api.get('/admin/customers');
export const getAllMechanics = () => api.get('/admin/mechanics');
export const getAdminStats = () => api.get('/admin/dashboard/stats');

export default api;
