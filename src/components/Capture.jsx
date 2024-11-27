import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Capture() {
  const [progress, setProgress] = useState(0);
  const [captureComplete, setCaptureComplete] = useState(false);
  const navigate = useNavigate();

  // Simulación de los datos del empleado
  const employeeData = {
    name: "Juan Pérez",
    id: "12345",
    department: "Marketing",
    lastLogin: "2024-11-26 14:30",
  };
  const emotion = "Feliz"; 

  const startProcess = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setCaptureComplete(true);
          navigate('/captura/empleado', { state: { employeeData, emotion } }); // Enviar los datos al siguiente componente
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="space-y-6">
          {!captureComplete && (
            <>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-6xl">📸</span>
              </div>
              <div className="w-full h-2 bg-gray-300 mt-4 rounded-full">
                <div
                  className="h-2 bg-blue-600"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-lg text-gray-800">Capturando imagen...</p>
              <button
                onClick={startProcess}
                className="mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
              >
                Iniciar Proceso
              </button>
            </>
          )}

          {captureComplete && (
            <div>
              <h2 className="text-xl text-gray-800">Captura Completa</h2>
              <p className="text-lg text-gray-800">¡La imagen ha sido capturada con éxito!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Capture;
