import api from './api';

export const getApprovedMechanics = () => api.get('/mechanics/approved');
export const searchMechanics = (query) => api.get(`/mechanics/search?query=${query || ''}`);

export const getMechanicServices = (mechanicId) => api.get(`/services/mechanic/${mechanicId}`);
export const getMyServices = () => api.get('/services/my-services');
export const addService = (data) => api.post('/services', data);
export const deleteService = (id) => api.delete(`/services/${id}`);

export const submitRating = (data) => api.post('/ratings', data);
export const getMechanicRatings = (mechanicId) => api.get(`/ratings/mechanic/${mechanicId}`);
export const submitFeedback = (data) => api.post('/feedback', data);
export const getMechanicFeedback = (mechanicId) => api.get(`/feedback/mechanic/${mechanicId}`);

// Admin - Mechanic Approval
export const getPendingMechanics = () => api.get('/admin/mechanics/pending');
export const approveMechanic = (id) => api.patch(`/admin/mechanics/${id}/approve`);
export const rejectMechanic = (id) => api.patch(`/admin/mechanics/${id}/reject`);

// Vehicles
export const getMyVehicles = () => api.get('/vehicles');
export const addVehicle = (data) => api.post('/vehicles', data);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);
