import React, { useState, useEffect } from 'react';
import { facultadService } from '../../services/facultadService';

const FacultadForm = ({ facultad, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    decano: '',
    activo: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (facultad) {
      setFormData({
        nombre: facultad.nombre || '',
        descripcion: facultad.descripcion || '',
        ubicacion: facultad.ubicacion || '',
        decano: facultad.decano || '',
        activo: facultad.activo !== undefined ? facultad.activo : true
      });
    }
  }, [facultad]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (facultad) {
        await facultadService.update(facultad.facultadId, formData);
        alert('Facultad actualizada correctamente');
      } else {
        await facultadService.create(formData);
        alert('Facultad creada correctamente');
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving facultad:', error);
      alert('Error al guardar facultad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{facultad ? 'Editar Facultad' : 'Nueva Facultad'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Decano</label>
            <input
              type="text"
              name="decano"
              value={formData.decano}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
              Activo
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (facultad ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultadForm;