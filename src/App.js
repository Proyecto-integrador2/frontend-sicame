import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrarEmpleadoForm from './components/FormRegister';
import MarcarAsistenciaForm from './components/Presence';
import Home from './components/Home';
import Capture from './components/Capture';
import EmployeeInfo from './components/EmployeeInfo';
import AdminPanel from './components/AdminPanel';
import Reportes from './components/Reportes';
import Gestion from './components/Gestion';
import ExitEmployee from './components/ExitEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/entrada" element={<Capture />} />
        <Route path="/salida" element={<ExitEmployee />} />
        <Route path="/asistencia/empleado" element={<EmployeeInfo />} />
       
        <Route path="/registrar-empleado" element={<RegistrarEmpleadoForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/reportes" element={<Reportes />} />
        <Route path="/admin/gestion" element={<Gestion />} />  

        <Route path="/marcar-asistencia" element={<MarcarAsistenciaForm />} />
      </Routes>
    </Router>
  );
}

export default App;
