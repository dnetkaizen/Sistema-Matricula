import api from './api';

export const carreraService = {
  getAll: () => api.get('/api/carreras'),
  getById: (id) => api.get(`/api/carreras/${id}`),
  getByFacultad: (facultadId) => api.get(`/api/carreras/facultad/${facultadId}`),
  create: (carrera) => api.post('/api/carreras', carrera),
  update: (id, carrera) => api.put(`/api/carreras/${id}`, carrera),
  delete: (id) => api.delete(`/api/carreras/${id}`),
};