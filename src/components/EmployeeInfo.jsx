import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSpeechRecognition from "../api/speech";
import { actualizarObservaciones } from "../api/axiosInstance";
import swal from 'sweetalert';

function EmployeeInfo({ onConfirm, onCancel }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { employeeData, emotion } = location.state || {};
  const { isListening, transcript, setIsListening } = useSpeechRecognition();
  const [observation, setObservation] = useState("Sin observaciones");
  const [timer, setTimer] = useState(null);

  // Saludo inicial con síntesis de voz
  useEffect(() => {
    if (employeeData) {
      const firstName = employeeData.name.split(" ")[0];
      const msg = new SpeechSynthesisUtterance();
      msg.text = `Hola ${firstName}, este es la información de asistencia generada. ¿Está de acuerdo? Cuéntame si tienes alguna observación.`;
      msg.lang = "es-419";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    }
  }, [employeeData]);

  // Escucha de observaciones por voz
  useEffect(() => {
    if (isListening) {
      // Configurar temporizador para 30 segundos
      const newTimer = setTimeout(() => {
        setIsListening(false); // Detener escucha tras 30 segundos
        if (!transcript) {
          setObservation("Sin observaciones");
        }
      }, 30000);

      setTimer(newTimer);
    } else {
      clearTimeout(timer);
      if (transcript) {
        setObservation(transcript); // Guardar observación transcrita
      }
    }

    return () => clearTimeout(timer);
  }, [isListening, transcript, setIsListening, timer]);

  // Iniciar escucha manualmente
  const startListening = () => {
    setObservation("Escuchando...");
    setIsListening(true);
  };

  // Confirmar asistencia y actualizar observaciones
  const handleConfirm = async () => {
    try {
      const response = await actualizarObservaciones(employeeData.id_emocion, observation);
      if (response.message === 'Observaciones actualizadas correctamente') {
        swal({
          title: "Éxito",
          text: "Asistencia confirmada correctamente",
          icon: "success",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "custom-btn",
              closeModal: true,
            },
          },
        }).then(() => {
          navigate('/'); 
        });
      }
    } catch (error) {
      console.error("Error al actualizar las observaciones", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6 flex">
          <div className="flex-none w-48 h-64 bg-gray-300 rounded-lg overflow-hidden">
            {location.state.photo ? (
              <img
                src={URL.createObjectURL(location.state.photo)}
                alt="Foto del empleado"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No hay foto disponible
              </div>
            )}
          </div>
          <div className="ml-6 flex flex-col justify-between">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-800">{employeeData.name}</h3>
              <p className="text-sm text-gray-600">ID: {employeeData.id}</p>
              <p className="text-sm text-gray-600">Rol: {employeeData.department}</p>
              <p className="text-sm text-gray-600">Último registro: {employeeData.lastLogin}</p>
              <p className="text-lg text-gray-800 mt-1">
                Estado emocional detectado: <strong>{emotion}</strong>
              </p>
              <p className="text-lg text-gray-800 mt-1">
                Observaciones: <strong>{observation}</strong>
              </p>
              {/* Botón para añadir observaciones */}
              <button
                onClick={startListening}
                className={`mt-4 py-2 px-4 rounded-lg w-full ${
                  isListening ? "bg-blue-500 text-white" : "bg-gray-500 text-white"
                } hover:bg-blue-600 transition duration-200`}
              >
                {isListening ? "Escuchando..." : "Añadir Observación"}
              </button>
            </div>
          </div>
        </div>
        <div className="space-x-4 flex justify-between mt-4">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-200"
          >
            Confirmar Asistencia
          </button>
          <button
            onClick={() => navigate("/")}
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
