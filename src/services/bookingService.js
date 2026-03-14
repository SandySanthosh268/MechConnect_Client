import api from './api';

export const createBooking = (data) => api.post('/bookings', data);
export const getCustomerBookings = () => api.get('/bookings/customer');
export const getMechanicBookings = () => api.get('/bookings/mechanic');
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status });

export const requestPickup = (data) => api.post('/pickups/request', data);
export const updatePickupStatus = (id, status) => api.patch(`/pickups/${id}/status`, { status });

export const processPayment = (data) => api.post('/payments/process', data);
