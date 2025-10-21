import React from 'react';

const CarreraItem = ({ carrera, facultadNombre, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{carrera.carreraId}</td>
      <td>{carrera.nombre}</td>
      <td>{facultadNombre}</td>
      <td>{carrera.duracionSemestres}</td>
      <td>{carrera.tituloOtorgado || '-'}</td>
      <td>
        <span className={`status ${carrera.activo ? 'active' : 'inactive'}`}>
          {carrera.activo ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className="actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(carrera)}
        >
          Editar
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(carrera.carreraId)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CarreraItem;