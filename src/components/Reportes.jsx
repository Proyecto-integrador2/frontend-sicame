import React, { useState } from "react";

function Reportes() {
  const [fecha, setFecha] = useState("");
  const [empleado, setEmpleado] = useState("");
  const [tipoReporte, setTipoReporte] = useState("");

  

  const reportesData = [
    {
      nombre: "Juan Pérez",
      id: "EMP001",
      fecha: "2023-11-26",
      entrada: "08:00",
      salida: "17:00",
      emocion: "Feliz",
      comentarios: "Buen día de trabajo",
    },
    {
      nombre: "María García",
      id: "EMP002",
      fecha: "2023-11-26",
      entrada: "08:15",
      salida: "17:30",
      emocion: "Neutral",
      comentarios: "Día normal",
    },
    {
      nombre: "Carlos Rodríguez",
      id: "EMP003",
      fecha: "2023-11-26",
      entrada: "07:55",
      salida: "16:45",
      emocion: "Estresado",
      comentarios: "Mucho trabajo hoy",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reportes de Asistencia y Emociones</h2>

      {/* Filtros */}
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border px-4 py-2 rounded-lg"
          placeholder="dd/mm/aaaa"
        />
        <select
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Seleccionar empleado</option>
          <option value="EMP001">Juan Pérez</option>
          <option value="EMP002">María García</option>
          <option value="EMP003">Carlos Rodríguez</option>
        </select>
        <select
          value={tipoReporte}
          onChange={(e) => setTipoReporte(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Seleccionar tipo</option>
          <option value="asistencia">Asistencia</option>
          <option value="emociones">Emociones</option>
        </select>
        <button className="bg-black text-white py-2 px-4 rounded-lg">Exportar</button>
      </div>

      {/* Tabla de reportes */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Entrada</th>
              <th className="px-4 py-2 border">Salida</th>
              <th className="px-4 py-2 border">Emoción</th>
              <th className="px-4 py-2 border">Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {reportesData.map((reporte, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{reporte.nombre}</td>
                <td className="px-4 py-2 border">{reporte.id}</td>
                <td className="px-4 py-2 border">{reporte.fecha}</td>
                <td className="px-4 py-2 border">{reporte.entrada}</td>
                <td className="px-4 py-2 border">{reporte.salida}</td>
                <td className="px-4 py-2 border">{reporte.emocion}</td>
                <td className="px-4 py-2 border">{reporte.comentarios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reportes;
