import React, { useState } from 'react';
import { registrarEmpleado } from '../api/axiosInstance';

const RegistrarEmpleadoForm = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cargo, setCargo] = useState('');
  const [foto, setFoto] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('cargo', cargo);
    formData.append('foto', foto);

    try {
      const response = await registrarEmpleado(formData);
      setMensaje(response.success || 'Empleado registrado correctamente');
    } catch (error) {
      setMensaje(error.error || 'Error al registrar el empleado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Empleado</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
      <input type="file" onChange={(e) => setFoto(e.target.files[0])} required />
      <button type="submit">Registrar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default RegistrarEmpleadoForm;