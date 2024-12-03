import React from "react";
import { useNavigate } from "react-router-dom";

function Gestion() {
  const navigate = useNavigate();
  const empleados = [
    { foto: "", nombre: "Juan Pérez", id: "EMPO01", cargo: "Operario", emocion: "Feliz" },
    { foto: "", nombre: "María García", id: "EMPO02", cargo: "Supervisora", emocion: "Neutral" },
    { foto: "", nombre: "Carlos Rodríguez", id: "EMPO03", cargo: "Técnico", emocion: "Estresado" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Empleados</h2>
      
      <div className="mb-4">
        <button  onClick={() =>navigate('/registrar-empleado')}
        
        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200">
          + Agregar Empleado
          
        </button>
      </div>
      
      {/* Tabla de empleados */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border-b">Foto</th>
            <th className="py-2 px-4 text-left border-b">Nombre</th>
            <th className="py-2 px-4 text-left border-b">ID</th>
            <th className="py-2 px-4 text-left border-b">Cargo</th>
            <th className="py-2 px-4 text-left border-b">Última Emoción</th>
            <th className="py-2 px-4 text-left border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div> {/* Imagen del empleado */}
              </td>
              <td className="py-2 px-4">{empleado.nombre}</td>
              <td className="py-2 px-4">{empleado.id}</td>
              <td className="py-2 px-4">{empleado.cargo}</td>
              <td className="py-2 px-4">{empleado.emocion}</td>
              <td className="py-2 px-4">
                <button className="text-blue-500 hover:underline">Editar</button>
                <button className="text-red-500 hover:underline ml-4">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Gestion;
