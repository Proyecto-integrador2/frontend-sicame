import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EmployeeInfo({ onConfirm, onCancel }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { employeeData, emotion } = location.state || {};

  // Si no hay datos de empleado, mostramos un mensaje
  if (!employeeData) {
    return <p>Esperando la captura de datos...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        {/* Sección superior: foto del empleado y su información */}
        <div className="mb-6 flex">
          <div className="flex-none w-48 h-64 bg-gray-300 rounded-lg">
            {/* Aquí se mostrará la foto del empleado */}
            {/* Por ahora es un espacio con color gris y bordes redondeados */}
          </div>
          <div className="ml-6 flex flex-col justify-between">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">{employeeData.name}</h3>
              <p className="text-sm text-gray-600">ID: {employeeData.id}</p>
              <p className="text-sm text-gray-600">Departamento: {employeeData.department}</p>
              <p className="text-sm text-gray-600">Último registro: {employeeData.lastLogin}</p>
              
              <p className="text-lg text-gray-800 mt-1" >
                Estado emocional detectado: <strong>{emotion}</strong>
              </p>
            </div>
            
          </div>
        </div>

        {/*  botones */}
        <div className="space-x-4 flex justify-between mt-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-200"
          >
            Confirmar Asistencia
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-400 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-500 transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeInfo;
