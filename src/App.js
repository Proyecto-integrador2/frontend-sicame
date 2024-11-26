import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrarEmpleadoForm from './components/FormRegister';
import MarcarAsistenciaForm from './components/Presence';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registrar-empleado" element={<RegistrarEmpleadoForm />} />
        <Route path="/marcar-asistencia" element={<MarcarAsistenciaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
