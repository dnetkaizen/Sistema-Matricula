import api from './api';

export const facultadService = {
  getAll: () => api.get('/facultades'),
  getById: (id) => api.get(`/facultades/${id}`),
  create: (facultad) => api.post('/facultades', facultad),
  update: (id, facultad) => api.put(`/facultades/${id}`, facultad),
  delete: (id) => api.delete(`/facultades/${id}`),
};