import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reportes from "./Reportes";
import Gestion from "./Gestion";

function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Panel de administración SICAME</h1>
        <Link to="/" className="text-gray-600 text-sm font-medium hover:text-gray-800">
          Volver
        </Link>
      </header>

      {/* Botones de navegación */}
      <div className="space-x-4 flex mb-6">
        <button
          onClick={() => setSelectedSection("reportes")}
          className="border py-3 px-6 rounded-lg w-full text-gray-800 hover:bg-gray-200 transition duration-200"
        >
          Reportes
        </button>
        <button
          onClick={() => setSelectedSection("gestion")}
          className="border py-3 px-6 rounded-lg w-full text-gray-800 hover:bg-gray-200 transition duration-200"
        >
          Gestión de Empleados
        </button>
      </div>

       {/* Componente seleccionado */}
       <div className="flex-grow border-t p-4">
        {selectedSection === "reportes" && <Reportes />} 
        {selectedSection === "gestion" && <Gestion />}   
      
      </div>
    </div>
  );
}

export default AdminPanel;
