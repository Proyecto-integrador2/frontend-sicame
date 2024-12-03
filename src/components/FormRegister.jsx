import React, { useState } from 'react';
import { registrarEmpleado } from '../api/axiosInstance';
import { Link } from 'react-router-dom';

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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registrar Empleado</h2>
      <div>
      <Link to="/admin" className="text-gray-600 text-sm font-medium hover:text-gray-800">
          Volver
        </Link>

      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Nombre</label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Correo</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cargo */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Cargo</label>
          <input
            type="text"
            placeholder="Cargo del empleado"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Foto */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Foto</label>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div className={`mt-4 p-3 rounded-md ${mensaje.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            <p>{mensaje}</p>
          </div>
        )}

        {/* Botón de registro */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarEmpleadoForm;
