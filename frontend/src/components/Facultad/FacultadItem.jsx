import React from 'react';

const FacultadItem = ({ facultad, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{facultad.facultadId}</td>
      <td>{facultad.nombre}</td>
      <td>{facultad.ubicacion || '-'}</td>
      <td>{facultad.decano || '-'}</td>
      <td>
        <span className={`status ${facultad.activo ? 'active' : 'inactive'}`}>
          {facultad.activo ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(facultad)}
        >
          Editar
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(facultad.facultadId)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default FacultadItem;