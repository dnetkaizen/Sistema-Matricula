import api from './api';

export const facultadService = {
  getAll: () => api.get('/api/facultades'),
  getById: (id) => api.get(`/api/facultades/${id}`),
  create: (facultad) => api.post('/api/facultades', facultad),
  update: (id, facultad) => api.put(`/api/facultades/${id}`, facultad),
  delete: (id) => api.delete(`/api/facultades/${id}`),
};