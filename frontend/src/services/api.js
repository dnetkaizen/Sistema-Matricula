import axios from 'axios';

// Configuración básica de axios - Usa variable de entorno para flexibilidad (Docker vs local)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8082',  // Default a 8082 para Docker
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor para debug (solo en desarrollo)
if (import.meta.env.MODE === 'development') {
  api.interceptors.request.use(
    (config) => {
      console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ Request error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ Response received from ${response.config.url}:`, response.status);
      return response;
    },
    (error) => {
      console.error('❌ Response error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        code: error.code
      });

      if (error.code === 'ECONNREFUSED') {
        alert('❌ El backend no está corriendo. Asegúrate de que Spring Boot esté ejecutándose en puerto 8082 (Docker) o 8080 (local)');
      }

      return Promise.reject(error);
    }
  );
}

// Funciones API para Facultad (para componentes que las usan directamente)
export const getFacultades = () => api.get('/api/facultades');
export const getFacultad = (id) => api.get(`/api/facultades/${id}`);
export const createFacultad = (data) => api.post('/api/facultades', data);
export const updateFacultad = (id, data) => api.put(`/api/facultades/${id}`, data);
export const deleteFacultad = (id) => api.delete(`/api/facultades/${id}`);

// Funciones API para Carrera
export const getCarreras = () => api.get('/api/carreras');
export const getCarrera = (id) => api.get(`/api/carreras/${id}`);
export const getCarrerasByFacultad = (facultadId) => api.get(`/api/carreras/facultad/${facultadId}`);
export const createCarrera = (data) => api.post('/api/carreras', data);
export const updateCarrera = (id, data) => api.put(`/api/carreras/${id}`, data);
export const deleteCarrera = (id) => api.delete(`/api/carreras/${id}`);

export default api;