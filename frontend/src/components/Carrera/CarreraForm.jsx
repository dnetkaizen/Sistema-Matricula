import React, { useState, useEffect } from 'react';
import { carreraService } from '../../services/carreraService';

const CarreraForm = ({ carrera, facultades, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    facultadId: '',
    nombre: '',
    descripcion: '',
    duracionSemestres: '',
    tituloOtorgado: '',
    activo: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (carrera) {
      setFormData({
        facultadId: carrera.facultadId || '',
        nombre: carrera.nombre || '',
        descripcion: carrera.descripcion || '',
        duracionSemestres: carrera.duracionSemestres || '',
        tituloOtorgado: carrera.tituloOtorgado || '',
        activo: carrera.activo !== undefined ? carrera.activo : true
      });
    }
  }, [carrera]);

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
      const dataToSend = {
        ...formData,
        facultadId: parseInt(formData.facultadId),
        duracionSemestres: parseInt(formData.duracionSemestres)
      };

      if (carrera) {
        await carreraService.update(carrera.carreraId, dataToSend);
        alert('Carrera actualizada correctamente');
      } else {
        await carreraService.create(dataToSend);
        alert('Carrera creada correctamente');
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving carrera:', error);
      alert('Error al guardar carrera');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{carrera ? 'Editar Carrera' : 'Nueva Carrera'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Facultad *</label>
            <select
              name="facultadId"
              value={formData.facultadId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar facultad</option>
              {facultades.map(facultad => (
                <option key={facultad.facultadId} value={facultad.facultadId}>
                  {facultad.nombre}
                </option>
              ))}
            </select>
          </div>

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
            <label>Duración (semestres) *</label>
            <input
              type="number"
              name="duracionSemestres"
              value={formData.duracionSemestres}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Título otorgado</label>
            <input
              type="text"
              name="tituloOtorgado"
              value={formData.tituloOtorgado}
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
              {loading ? 'Guardando...' : (carrera ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarreraForm;