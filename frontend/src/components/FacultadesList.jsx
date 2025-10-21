// frontend/src/components/FacultadesList.jsx (ejemplo)
import React, { useState, useEffect } from 'react';
import { getFacultades, deleteFacultad } from '../services/api';

const FacultadesList = () => {
  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFacultades();
  }, []);

  const loadFacultades = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getFacultades();
      setFacultades(response.data);
    } catch (err) {
      const message = err.response?.data?.message || 'Error al cargar facultades';
      setError(message);
      console.error('Error loading facultades:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar facultad?')) {
      try {
        await deleteFacultad(id);
        setFacultades(facultades.filter(f => f.facultadId !== id));
      } catch (err) {
        const message = err.response?.data?.message || 'Error al eliminar';
        setError(message);
        console.error('Error deleting facultad:', err);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Facultades</h2>
      <ul>
        {facultades.map(f => (
          <li key={f.facultadId}>
            {f.nombre} - {f.descripcion}
            <button onClick={() => handleDelete(f.facultadId)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultadesList;
