import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reportes from "./Reportes";
import Gestion from "./Gestion";

function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState("reportes");

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      {/* Header */}
      <header className="mb-6">
        {/* Logo */}
        <img src={"./logo.png"} className="mx-auto w-16 pb-2" alt="logo" />
        <h1 className="text-center text-3xl font-semibold text-gray-800">
          Panel de administración SICAME
        </h1>
        <Link to="/">
          <button className="border rounded-lg p-1 bg-gray-600 text-white text-sm font-medium hover:bg-gray-800">
            Volver
          </button>
        </Link>
      </header>

      {/* Botones de navegación */}
      <div className="space-x-4 flex mb-6">
        <button
          onClick={() => setSelectedSection("reportes")}
          className={`py-3 px-6 rounded-lg w-full text-gray-800 transition duration-200 ${
            selectedSection === "reportes"
              ? "bg-gray-300 font-semibold shadow-md"
              : "border hover:bg-gray-200"
          }`}
        >
          Reportes
        </button>
        <button
          onClick={() => setSelectedSection("gestion")}
          className={`py-3 px-6 rounded-lg w-full text-gray-800 transition duration-200 ${
            selectedSection === "gestion"
              ? "bg-gray-300 font-semibold shadow-md"
              : "border hover:bg-gray-200"
          }`}
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
