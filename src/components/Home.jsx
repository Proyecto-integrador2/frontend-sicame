import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleStartProcess = () => {
    navigate('/captura');
  };

  const handleRegisterUser = () => {
    navigate('/registrar-empleado'); 
  };

  const handleAdminPanel = () => {
    navigate('/admin'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">SICAME</h1>
          <p className="text-lg text-gray-600">Sistema de Control de Asistencia y Monitoreo Emocional</p>
        </div>

        {/* Botones de navegación */}
        <div className="space-y-4">
          <button
            onClick={handleStartProcess}
            className="w-full h-16 bg-gray-900 text-white rounded-lg text-xl font-semibold hover:bg-gray-800 transition duration-200"
          >
            Iniciar Registro de Asistencia
          </button>

          <button
            onClick={handleRegisterUser}
            className="w-full h-16  bg-gray-900 text-white rounded-lg text-xl font-semibold hover:bg-gray-800 transition duration-200"
          >
            Registrar Usuario
          </button>

          <button
            onClick={handleAdminPanel}
            className="w-full h-16  bg-gray-900 text-white rounded-lg text-xl font-semibold hover:bg-gray-800 transition duration-200"
          >
            Panel de Administración
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
