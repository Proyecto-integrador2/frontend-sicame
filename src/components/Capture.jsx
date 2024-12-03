import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { marcarAsistencia } from '../api/axiosInstance';
import swal from 'sweetalert';

function Capture() {
  const [progress, setProgress] = useState(0);
  const [captureComplete, setCaptureComplete] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (photo) => {
    const now = new Date();
    const fecha = now.toLocaleDateString('es-ES');
    const horaEntrada = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const formData = new FormData();
    formData.append('fecha', fecha);
    formData.append('hora_entrada', horaEntrada);
    formData.append('foto', photo);

    try {
      const response = await marcarAsistencia(formData);
      console.log('Response:', response);
      setMensaje(response.success || 'Asistencia registrada correctamente');

      // Actualizar employeeData con los datos de la respuesta
      const employeeData = {
        name: response.empleado,
        id: response.id,
        department: response.cargo,
        lastLogin: response.ultimo_registro.fecha + ' ' + response.ultimo_registro.hora_entrada,
        emotion: response.emocion,
        id_emocion: response.id_emocion,
      };

      // Navegar con los datos del empleado y la foto capturada
      navigate('/asistencia/empleado', {
        state: { employeeData: employeeData, photo, emotion: response.emocion, process: "in" },
      });
    } catch (error) {  
      handleNoFace(error.error);
    }
  };

  const handleNoFace = async (error) => {
    swal({
      title: "Por favor, reintenta la operación",
      text: error,
      icon: "error",
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

  const startCamera = async () => {
    setIsCameraStarted(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraStarted(false);
  };

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        takePhoto();
        startProcess();
      }
    }, 1000);
  };

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const photo = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      handleSubmit(photo);
    }, 'image/jpeg');
    stopCamera();
  };

  const startProcess = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setCaptureComplete(true);
          //navigate('/captura/empleado', { state: { employeeData, emotion } }); // Enviar los datos al siguiente componente
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
              {!isCameraStarted ? (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-6xl">📸</span>
                </div>
              ) : (
                <>
                  <video ref={videoRef} className="w-full h-auto mb-4"></video>
                  <div className="w-full h-2 bg-gray-300 rounded-full mt-4">
                    <div
                      className="h-2 bg-gray-900"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-lg text-gray-800">Capturando imagen...</p>
                </>
              )}
              {countdown !== null && <div className="text-4xl mb-4">{countdown}</div>}
              <button
                onClick={() => { startCamera(); startCountdown(); }}
                className="mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
              >
                Iniciar Proceso
              </button>
              <div>
                <Link to="/" className="text-gray-600 text-sm font-medium hover:text-gray-800">
                  Volver
                </Link>
              </div>
            </>
          )}
          {captureComplete && (
            <div>
              <h2 className="text-xl text-gray-800">Captura Completa</h2>
              <p className="text-lg text-gray-800">{mensaje}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Capture;
