import React from 'react';

const Navbar = ({ currentView, onViewChange }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>Sistema de Matrícula</h1>
      </div>
      <div className="nav-links">
        <button
          className={`nav-link ${currentView === 'facultades' ? 'active' : ''}`}
          onClick={() => onViewChange('facultades')}
        >
          Facultades
        </button>
        <button
          className={`nav-link ${currentView === 'carreras' ? 'active' : ''}`}
          onClick={() => onViewChange('carreras')}
        >
          Carreras
        </button>
      </div>
    </nav>
  );
};

export default Navbar;