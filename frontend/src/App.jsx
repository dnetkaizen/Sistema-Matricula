import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar.jsx';
import FacultadList from './components/Facultad/FacultadList.jsx';
import CarreraList from './components/Carrera/CarreraList.jsx';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('facultades');

  const renderContent = () => {
    switch (currentView) {
      case 'facultades':
        return <FacultadList />;
      case 'carreras':
        return <CarreraList />;
      default:
        return <FacultadList />;
    }
  };

  return (
    <div className="app">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;