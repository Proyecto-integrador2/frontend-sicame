import React, { useState } from 'react';
import { marcarAsistencia } from '../api/axiosInstance';

const MarcarAsistenciaForm = () => {
  const [fecha, setFecha] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fecha', fecha);
    formData.append('hora_entrada', horaEntrada);
    formData.append('foto', foto);

    try {
      const response = await marcarAsistencia(formData);
      setMensaje(response.success || 'Asistencia registrada correctamente');
    } catch (error) {
      setMensaje(error.error || 'Error al marcar asistencia');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Marcar Asistencia</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fecha */}
        <div className="flex flex-col">
          <label htmlFor="fecha" className="text-gray-600">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Hora de Entrada */}
        <div className="flex flex-col">
          <label htmlFor="hora_entrada" className="text-gray-600">Hora de Entrada</label>
          <input
            type="time"
            id="hora_entrada"
            value={horaEntrada}
            onChange={(e) => setHoraEntrada(e.target.value)}
            required
            className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Foto */}
        <div className="flex flex-col">
          <label htmlFor="foto" className="text-gray-600">Foto</label>
          <input
            type="file"
            id="foto"
            onChange={(e) => setFoto(e.target.files[0])}
            required
            className="mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mensaje de éxito o error */}
        {mensaje && (
          <p className="text-center text-lg mt-4">
            {mensaje}
          </p>
        )}

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Marcar Asistencia
        </button>
      </form>
    </div>
  );
};

export default MarcarAsistenciaForm;
