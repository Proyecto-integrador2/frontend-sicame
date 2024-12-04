import React from "react";
import { useNavigate } from "react-router-dom";
import { listarEmpleados } from "../api/axiosInstance";

function Gestion() {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = React.useState([]);

  React.useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const data = await listarEmpleados();
        setEmpleados(data);
      } catch (error) {
        console.error("Error al listar empleados:", error);
      }
    };

    fetchEmpleados();
  }, []);

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
            <th className="py-2 px-4 text-left border-b">ID</th>
            <th className="py-2 px-4 text-left border-b">Nombre</th> 
            <th className="py-2 px-4 text-left border-b">Cargo</th>
            <th className="py-2 px-4 text-left border-b">Última Emoción</th>
            <th className="py-2 px-4 text-left border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.empleado_id} className="border-b">
              <td className="py-2 px-4">{empleado.empleado_id}</td>
              <td className="py-2 px-4">{empleado.nombre}</td>
              <td className="py-2 px-4">{empleado.cargo}</td>
              <td className="py-2 px-4">{empleado.ultima_emocion}</td>
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
