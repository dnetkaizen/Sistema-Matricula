import React, { useState, useEffect } from 'react';
import { facultadService } from '../../services/facultadService';
import FacultadItem from './FacultadItem';
import FacultadForm from './FacultadForm';

const FacultadList = () => {
  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFacultad, setEditingFacultad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFacultades();
  }, []);

  const loadFacultades = async () => {
    try {
      console.log('🔄 CARGANDO FACULTADES REALES DE LA BD...');
      setLoading(true);
      setError(null);
      
      const response = await facultadService.getAll();
      console.log('✅ FACULTADES DE POSTGRESQL:', response.data);
      setFacultades(response.data);
      
    } catch (error) {
      console.error('💥 ERROR:', error);
      setError('No se puede conectar al backend: ' + error.message);
      setFacultades([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingFacultad(null);
    setShowForm(true);
  };

  const handleEdit = (facultad) => {
    setEditingFacultad(facultad);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta facultad?')) {
      try {
        await facultadService.delete(id);
        loadFacultades();
        alert('Facultad eliminada correctamente');
      } catch (error) {
        console.error('Error deleting facultad:', error);
        alert('Error al eliminar facultad');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFacultad(null);
  };

  const handleFormSubmit = () => {
    loadFacultades();
    handleFormClose();
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>Conectando con la base de datos...</h3>
        <p>Cargando facultades desde PostgreSQL</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ 
        padding: '20px', 
        background: '#ffebee', 
        borderRadius: '10px',
        margin: '20px'
      }}>
        <h2>❌ ERROR DE CONEXIÓN</h2>
        <p><strong>{error}</strong></p>
        
        <div style={{ marginTop: '20px' }}>
          <h4>🔧 PARA SOLUCIONAR:</h4>
          <ol>
            <li><strong>Verifica que Spring Boot esté corriendo</strong> en puerto 8080</li>
            <li><strong>Abre en el navegador:</strong> 
              <a href="http://localhost:8080/api/facultades" target="_blank" style={{marginLeft: '10px'}}>
                http://localhost:8080/api/facultades
              </a>
            </li>
            <li><strong>Revisa la terminal del backend</strong> por errores</li>
          </ol>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={loadFacultades}
          style={{ marginTop: '15px' }}
        >
          🔄 Reintentar Conexión
        </button>
      </div>
    );
  }

  return (
    <div className="facultad-list">
      <div className="header">
        <h2>Gestión de Facultades - DATOS REALES DE BD</h2>
        <div className="header-info">
          <span className="info-badge">
            📊 {facultades.length} facultades registradas
          </span>
          <button className="btn btn-primary" onClick={handleCreate}>
            Nueva Facultad
          </button>
        </div>
      </div>

      {showForm && (
        <FacultadForm
          facultad={editingFacultad}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}

      <div className="table-container">
        {facultades.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Decano</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facultades.map((facultad) => (
                <FacultadItem
                  key={facultad.facultadId}
                  facultad={facultad}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <h3>No hay facultades en la base de datos</h3>
            <p>Las facultades se cargarán desde PostgreSQL cuando el backend funcione</p>
            <button className="btn btn-primary" onClick={handleCreate}>
              Crear Primera Facultad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultadList;