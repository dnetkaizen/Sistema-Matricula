import React, { useState, useEffect } from 'react';
import { carreraService } from '../../services/carreraService';
import { facultadService } from '../../services/facultadService';
import CarreraItem from './CarreraItem';
import CarreraForm from './CarreraForm';

const CarreraList = () => {
  const [carreras, setCarreras] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCarrera, setEditingCarrera] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('🔄 CARGANDO DATOS REALES DE LA BASE DE DATOS...');
      setLoading(true);
      setError(null);
      
      const facultadesRes = await facultadService.getAll();
      console.log('✅ FACULTADES DE LA BD:', facultadesRes.data);
      
      const carrerasRes = await carreraService.getAll();
      console.log('✅ CARRERAS DE LA BD:', carrerasRes.data);
      
      setFacultades(facultadesRes.data);
      setCarreras(carrerasRes.data);
      
    } catch (error) {
      console.error('💥 ERROR DE CONEXIÓN:', error);
      const message = error.response?.data?.message || 'NO SE PUEDE CONECTAR AL BACKEND: ' + error.message;
      setError(message);
      setFacultades([]);
      setCarreras([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (facultades.length === 0) {
      alert('No hay facultades disponibles. Primero crea facultades en la base de datos.');
      return;
    }
    setEditingCarrera(null);
    setShowForm(true);
  };

  const handleEdit = (carrera) => {
    setEditingCarrera(carrera);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta carrera?')) {
      try {
        await carreraService.delete(id);
        await loadData(); // Recargar datos reales
        alert('Carrera eliminada correctamente');
      } catch (error) {
        console.error('Error eliminando carrera:', error);
        alert('Error al eliminar carrera: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCarrera(null);
  };

  const handleFormSubmit = () => {
    loadData(); // Recargar datos reales
    handleFormClose();
  };

  const getFacultadNombre = (facultadId) => {
    const facultad = facultades.find(f => f.facultadId === facultadId);
    return facultad ? facultad.nombre : 'N/A';
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>Conectando con la base de datos...</h3>
        <p>Cargando datos reales desde PostgreSQL</p>
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
            <li><strong>Verifica la base de datos PostgreSQL</strong> esté conectada</li>
          </ol>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={loadData}
          style={{ marginTop: '15px' }}
        >
          🔄 Reintentar Conexión
        </button>
      </div>
    );
  }

  return (
    <div className="carrera-list">
      <div className="header">
        <h2>Gestión de Carreras - DATOS REALES DE BD</h2>
        <div className="header-info">
          <span className="info-badge">
            📊 {facultades.length} facultades • {carreras.length} carreras
          </span>
          <button className="btn btn-primary" onClick={handleCreate}>
            + Nueva Carrera
          </button>
        </div>
      </div>

      {showForm && (
        <CarreraForm
          carrera={editingCarrera}
          facultades={facultades}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}

      <div className="table-container">
        {carreras.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Facultad</th>
                <th>Duración</th>
                <th>Título</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carreras.map((carrera) => (
                <CarreraItem
                  key={carrera.carreraId}
                  carrera={carrera}
                  facultadNombre={getFacultadNombre(carrera.facultadId)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <h3>No hay carreras en la base de datos</h3>
            <p>Las carreras se cargarán desde PostgreSQL cuando el backend funcione</p>
            <button className="btn btn-primary" onClick={loadData}>
              🔄 Recargar Datos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarreraList;