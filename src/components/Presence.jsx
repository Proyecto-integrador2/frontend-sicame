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
    <form onSubmit={handleSubmit}>
      <h2>Marcar Asistencia</h2>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      <input type="time" value={horaEntrada} onChange={(e) => setHoraEntrada(e.target.value)} required />
      <input type="file" onChange={(e) => setFoto(e.target.files[0])} required />
      <button type="submit">Marcar Asistencia</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default MarcarAsistenciaForm;
