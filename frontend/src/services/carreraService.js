import api from './api';

export const carreraService = {
  getAll: () => api.get('/carreras'),
  getById: (id) => api.get(`/carreras/${id}`),
  getByFacultad: (facultadId) => api.get(`/carreras/facultad/${facultadId}`),
  create: (carrera) => api.post('/carreras', carrera),
  update: (id, carrera) => api.put(`/carreras/${id}`, carrera),
  delete: (id) => api.delete(`/carreras/${id}`),
};